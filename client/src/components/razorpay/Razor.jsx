import React from 'react'
import axios from "axios";
import { toast } from 'react-toastify';

const Razor = () => {
    const email = "sakushwaha697@gmail.com";

    const checkoutHandler = async () => {

        const key = 'rzp_test_SGeWxXlq1BkJ4d'
        if (true) {
            const { data: { order } } = await axios.post("http://localhost:5000/api/checkout")
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Order",
                description: "Payment To main Cafeteria",
                // image: imageUrl,
                order_id: order.id,
                handler: async function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                },
                // callback_url: "http://localhost:5000/api/paymentverification",
                prefill: {
                    name: "saurabh",
                    email: email,
                    contact: ""
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            razor.open();
        }
        else {
            toast.warning("Can't Order")
        }

    }

    return (
        <button id='rzp-button1' onClick={() => checkoutHandler()} >Buy Now</button>
    )
}

export default Razor