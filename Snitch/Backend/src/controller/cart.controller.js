import cartmodel from "../models/cart.model.js";
import productmodel from "../models/product.model.js";
import { stockofvariants } from "../dao/product.dao.js";
import mongoose from "mongoose";

export const addtocart = async (req, res) => {
  const { productId, variantId } = req.params;

  const { quantity = 1 } = req.body;

  const product = await productmodel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const stock = await stockofvariants(productId, variantId);
  if (stock === null) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cart =
    (await cartmodel.findOne({ user: req.user._id })) ||
    (await cartmodel.create({ user: req.user._id, items: [] }));

  const isproductalreadyincart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (isproductalreadyincart) {
    const quantityInCartItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );
    const quantityInCart = quantityInCartItem?.quantity || 0;

    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartmodel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      message: "Cart updated successfully",
      success: true,
    });
  }

  if (quantity > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock`,
      success: false,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  return res.status(200).json({
    message: "Product added to cart successfully",
    success: true,
  });
};

export const getcart = async (req, res) => {
  const user = req.user;

  let cart =
    (await cartmodel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user._id),
        },
      },
      { $unwind: { path: "$items" } },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: { path: "$items.product" } },
      {
        $unwind: { path: "$items.product.variants" },
      },
      {
        $match: {
          $expr: {
            $eq: ["$items.variant", "$items.product.variants._id"],
          },
        },
      },
      {
        $addFields: {
          itemprice: {
            price: {
              $multiply: ["$items.quantity", "$items.product.price.amount"],
            },
            currency: "$items.product.price.currency",
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          totalprice: { $sum: "$itemprice.price" },
          currency: {
            $first: "$itemprice.currency",
          },
          // keep key name consistent for frontend and reducers
          items: { $push: "$items" },
        },
      },
    ]))[0];

  if (!cart) {
    cart = await cartmodel.create({ user: user._id });
  }

  return res.status(200).json({
    message: "Cart fetched successfully",
    success: true,
    cart,
  });
};

export const incrementCartItemQuantity = async (req, res) => {
  const { productId, variantId } = req.params;

  const product = await productmodel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cart = await cartmodel.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }

  const stock = await stockofvariants(productId, variantId);

  if (stock === null) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cartItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (!cartItem) {
    return res.status(404).json({
      message: "Item not found in cart",
      success: false,
    });
  }

  const itemQuantityInCart = cartItem.quantity || 0;

  if (itemQuantityInCart + 1 > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
      success: false,
    });
  }

  await cartmodel.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": productId,
      "items.variant": variantId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true },
  );

  return res.status(200).json({
    message: "Cart item quantity incremented successfully",
    success: true,
  });
};

export const decrementCartItemQuantity = async (req, res) => {
  const { productId, variantId } = req.params;

  const product = await productmodel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cart = await cartmodel.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }

  const cartItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (!cartItem) {
    return res.status(404).json({
      message: "Item not found in cart",
      success: false,
    });
  }

  const itemQuantityInCart = cartItem.quantity || 0;

  if (itemQuantityInCart <= 1) {
    return res.status(400).json({
      message: "Item quantity cannot be less than 1",
      success: false,
    });
  }

  await cartmodel.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": productId,
      "items.variant": variantId,
    },
    { $inc: { "items.$.quantity": -1 } },
    { new: true },
  );

  return res.status(200).json({
    message: "Cart item quantity decremented successfully",
    success: true,
  });
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  const cart = await cartmodel.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }

  const itemExists = cart.items.some((item) => item._id.toString() === itemId);

  if (!itemExists) {
    return res.status(404).json({
      message: "Item not found in cart",
      success: false,
    });
  }

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();
  await cart.populate("items.product");

  return res.status(200).json({
    message: "Item removed from cart successfully",
    success: true,
    cart,
  });
};
