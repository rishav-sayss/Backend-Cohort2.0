let express = require("express")
let {RegisterController , LoginController,getAccessTokenController} =  require("../controllers/auth.controller")
let {authMiddelwere}  =  require("../middelwere/authmiddelwere")
let router = express.Router()


router.get("/me",authMiddelwere, (req, res) => {
  return res.status(200).json({
    message: "Currently loggedIn user",
    user: req.user,
  });
});

router.get("/get-accessToken", getAccessTokenController );
router.post("/register", RegisterController);
router.post("/login", LoginController);



module.exports  = router