const express =  require("express");
const {
  checkout,
  paymentVerification,
} = require("../controllers/razorpayController.js");

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentverification").post(paymentVerification);
// export default router;
module.exports = router;
