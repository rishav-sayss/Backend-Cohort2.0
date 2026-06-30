let express = require("express");
let { authMiddelwere }  = require("../middelwere/authmiddelwere")
let router = express.Router();

router.get("/",  authMiddelwere  ,(req, res) => {
  return res.status(200).json({
    message: "Home fetched",
  });
});

module.exports = router;