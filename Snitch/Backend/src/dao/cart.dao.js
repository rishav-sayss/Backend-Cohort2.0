import cartmodel from "../models/cart.model.js";
import mongoose from "mongoose";

export async function getCartDetails(userId) {
  let cart = (
    await cartmodel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
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
    ])
  )[0];

  return cart || null;
}
