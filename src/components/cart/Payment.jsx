import { useState } from "react";


function Payment(props) {
    const [paymentError, setPaymentError] = useState("");

    const pay = () => {
        const paymentData = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": props.totalSum,
            "order_reference": Math.random()*999999,
            "nonce": "a9b7f7" + new Date() + Math.random() * 999999,
            "timestamp": new Date(),
            "customer_url": "https://react-webshop-07-22.web.app/tellimus"
        }
            
        fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
            method:"POST",
            body: JSON.stringify(paymentData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
            }
        }).then(res => res.json()).then(data => {
            if (data.payment_link === undefined) {
                setPaymentError("Maksma minek ei onnestunud, proovi mone aja parast uuesti!")
            } else {
            window.location.href= data.payment_link}
        })
    }

    return ( 
    <div>
        <button onClick={pay}>Maksa</button>
        <div>{paymentError}</div>
    </div> 
    );
}

export default Payment;