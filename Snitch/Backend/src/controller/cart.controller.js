import cartmodel from "../models/cart.model.js";
import productmodel from "../models/product.model.js";
import { stockofvariants } from "../dao/product.dao.js";
import mongoose from "mongoose";
import { createOrder } from "../service/payment.service.js";
import { getCartDetails } from "../dao/cart.dao.js";
import paymentModel from "../models/payment.model.js";
import { config } from "../config/config.js";

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

  let cart = await getCartDetails(user._id);

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

export const createOrderController = async (req, res) => {
  let cart = await getCartDetails(req.user._id);
  console.log(cart);
  if (!cart) {
    return res.status(400).json({
      message: "Cart is empty",
      success: false,
    });
  }

  const order = await createOrder({
    amount: cart.totalprice,
    currency: cart.currency,
  });

  const payment = await paymentModel.create({
    user: req.user._id,
    razorpay: {
      orderId: order.id,
    },
    price: {
      amount: cart.totalprice,
      currency: cart.currency,
    },
    orderItems: cart.items.map((item) => ({
      title: item.product.title,
      productId: item.product._id,
      variantId: item.variant,
      quantity: item.quantity,
      images: item.product.variants.images || item.product.images,
      description: item.product.description,
      price: {
        amount: item.product.variants.price.amount || item.product.price.amount,
        currency:
          item.product.variants.price.currency || item.product.price.currency,
      },
    })),
  });

  return res.status(200).json({
    message: "Order created successfully",
    success: true,
    order,
  });
};

export const verifyOrderController = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const payment = await paymentModel.findOne({
    "razorpay.orderId": razorpay_order_id,
    status: "pending",
  });

  if (!payment) {
    return res.status(400).json({
      message: "Payment not found",
      success: false,
    });
  }

  const isPaymentValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    config.testsecretkey,
  );

  if (!isPaymentValid) {
    payment.status = "failed";
    await payment.save();

    return res.status(400).json({
      message: "Payment verification failed",
      success: false,
    });
  }

  payment.status = "paid";

  payment.razorpay.paymentId = razorpay_payment_id;
  payment.razorpay.signature = razorpay_signature;

  await payment.save();

  return res.status(200).json({
    message: "Payment verified successfully",
    success: true,
  });
};
