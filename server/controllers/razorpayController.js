const crypto = require("crypto");

const Razorpay = require("razorpay");


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

checkout = async (req, res) => {
  try {
    let amount= 100;
    const email = "sakushwaha697@gmail.com";
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      res.status(200).json({
        success: true,
        order,
      });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
    // console.log(expectedSignature);
    // console.log(razorpay_signature);

    const isAuthentic = (expectedSignature === razorpay_signature);

    if (isAuthentic) {
      // Database comes here

      const paymentJson = {
        orderId: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        signature: razorpay_signature
      };
      const response = db.collection("payments").doc(razorpay_order_id).set(paymentJson);

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
    checkout,
    paymentVerification
  };