let {
  loginService,
  resgisterService,
  getAccessTokenService,
} = require("../service/authService");
let { authMiddelwere } = require("../middelwere/authmiddelwere");

let RegisterController = async (req, res) => {
  let { accessToken, refreshToken, newUser } = await resgisterService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    samSite: "lax",
    secure: false,
    MaxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    samSite: "lax",
    secure: false,
    MaxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "USer registered successfully",
    user: newUser,
  });
};

let LoginController = async (req, res) => {
  let { accessToken, refreshToken, isExisted } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    samSite: "lax",
    secure: false,
    MaxAge: 10 *  60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    samSite: "lax",
    secure: false,
    MaxAge: 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "USer Logidin successfully",
    user: isExisted,
  });
};

let getAccessTokenController = async (req, res) => {
  try {
    let refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let accessToken = await getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access token generated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  RegisterController,
  LoginController,
  getAccessTokenController,
};
