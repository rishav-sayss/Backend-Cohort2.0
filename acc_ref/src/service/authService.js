let UserModel = require("../models/user.model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generatetoken");
const { model } = require("mongoose");

let resgisterService = async (data) => {
  try {
    let { name, email, password } = data;

    if (!email || !password) throw new Error("all fields are required");

    let isExisted = await UserModel.findOne({
      email,
    });

    if (isExisted) throw new Error("User Already Exist ");

    let hashPass = bcrypt.hashSync(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
      newUser,
    };
  } catch (error) {
    throw new Error(error);
  }
};

let loginService = async (data) => {
  try {
    let { email, password } = data;

    if (!email || !password) throw new Error("all fields are required");

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted) throw new Error("User Not  Exist from this email ");

    let hashPass = await bcrypt.compare(password, isExisted.password);

    if (!hashPass) {
      throw new Error("Invalid credentials");
    }

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return {
      accessToken,
      refreshToken,
      isExisted,
    };
  } catch (error) {
    throw new Error(error);
  }
};

let getAccessTokenService = async (refreshToken) => {
  let decode = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  console.log(decode);
  if (!decode) throw new Error("unauthorized");

  let user = await UserModel.findById(decode.id);

  if (refreshToken !== user.refreshToken) throw new Error("unauthorized");

  let accessToken = generateAccessToken(user._id);

  return accessToken;
};

module.exports = {
  resgisterService,
  loginService,
  getAccessTokenService,
};
