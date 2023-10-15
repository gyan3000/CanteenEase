import axios from 'axios';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
    return typeof val === 'object'
}

function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}

function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', stringifyValue(params[key]))
        form.appendChild(input)
    })
    console.log(form);
    return form
}


function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
}

const PaytmButton = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [payDisable, setPayDisable] = useState(false);

    // const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    // const { user } = useSelector((state) => state.user);

    // const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const totalPrice = 1000;
    const paymentData = {
        amount: Math.round(1000),
        email: "sakushwaha697@gmail.com",
        phoneNo: "9140798230",
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // paymentBtn.current.disabled = true;
        setPayDisable(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                'http://localhost:5000/api/payment/process',
                paymentData,
                config,
            );
            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }
            post(info)
        } catch (error) {
            // paymentBtn.current.disabled = false;
            setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
    };
    return (
        <>
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">
                        <div className="w-full bg-white">

                            <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="payment-radio-group"
                                        defaultValue="paytm"
                                        name="payment-radio-button"
                                    >
                                        <FormControlLabel
                                            value="paytm"
                                            control={<Radio />}
                                            label={
                                                <div className="flex items-center gap-4">
                                                    <img draggable="false" className="h-6 w-6 object-contain" src="https://rukminim1.flixcart.com/www/96/96/promos/01/09/2020/a07396d4-0543-4b19-8406-b9fcbf5fd735.png" alt="Paytm Logo" />
                                                    <span>Paytm</span>
                                                </div>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <input type="submit" value={`Pay ₹${totalPrice.toLocaleString()}`} disabled={payDisable ? true : false} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PaytmButton;