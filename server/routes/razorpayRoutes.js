const express =  require("express");
const {
  checkout,
  paymentVerification,
} = require("../controllers/razorpayController.js");
const fetchuser = require("../middleware/fetchuser.js");

const router = express.Router();

router.route("/checkout").post(fetchuser,checkout);
router.route("/paymentverification").post(paymentVerification);
module.exports = router;
