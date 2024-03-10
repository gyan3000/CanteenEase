const crypto = require("crypto");

const Razorpay = require("razorpay");
const User = require("../models/User");
const Menu = require("../models/Menu");


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

checkout = async (req, res) => {
  try {
    const items = req.body.items;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const itemIds = items?.map(item => item.id);
    const menuItems = await Menu.find({ _id: { $in: itemIds } });
    const unavailableItems = [];
    const totalAmount = items?.reduce((acc, item) => {
      const menuItem = menuItems?.find(menuItem => menuItem._id.toString() === item.id.toString());
      if (!menuItem.availability) {
        unavailableItems.push(menuItem.name);
      }
      return acc + menuItem?.price * item.quantity;
    }, 0);
    if (unavailableItems.length > 0) {
      return res.status(201).json({ unavailable: unavailableItems });
    }
    const options = {
      amount: Number(totalAmount * 100),
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
      const response = await instance.payments.fetch(razorpay_payment_id);
      // console.log(response);
      // res.redirect(
      //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      // );
      res.json("Success");
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