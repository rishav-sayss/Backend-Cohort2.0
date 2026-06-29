let express = require("express")
let {RegisterController , LoginController,getAccessTokenController} =  require("../controllers/auth.controller")
let router = express.Router()

router.get("/get-accessToken", getAccessTokenController );
router.post("/register", RegisterController);
router.get("/login", LoginController);



module.exports  = router