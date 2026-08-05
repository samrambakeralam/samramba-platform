// =======================================
// SAMRAMBA KERALAM 2030
// Frontend Controller
// =======================================

const CONFIG = {

    WEB_APP_URL:
    "https://script.google.com/macros/s/AKfycbzQFLeWMQAX7gbedsu859N8nEZnGoAFinj4dn1JgpX0La7GSy-2xGHK38MdjcHM2ckk/exec",

    PRODUCT_PRICE:499,

    CURRENCY:"INR"

};


//------------------------------------------
// Page Ready
//------------------------------------------

document.addEventListener("DOMContentLoaded", function(){

    lucide.createIcons();

    console.log("SAMRAMBA KERALAM 2030 Loaded");

    const form = document.getElementById("registrationForm");

    if(form){

        form.addEventListener("submit", submitRegistration);

    }

});


//------------------------------------------
// Submit Registration
//------------------------------------------

function submitRegistration(e){

    e.preventDefault();

    const formData = new FormData();

formData.append("action", "register");

    formData.append(
        "name",
        document.getElementById("studentName").value.trim()
    );

    formData.append(
        "email",
        document.getElementById("studentEmail").value.trim()
    );

    formData.append(
        "institution",
        document.getElementById("institution").value.trim()
    );

    console.log("Submitting FormData...");

    fetch(CONFIG.WEB_APP_URL, {

        method: "POST",

        body: formData

    })

    .then(response => response.json())

.then(result => {

    console.log("SERVER RESPONSE:");

    console.log(result);

    if(!result.success){

        alert(result.message);

        return;

    }

    //====================================
// Razorpay Checkout Options
//====================================

const options = {

    key: result.razorpay.key,

    amount: result.razorpay.amount,

    currency: result.razorpay.currency,

    name: "SAMRAMBA KERALAM 2030",

    description: "Entrepreneurship Bundle",

    order_id: result.razorpay.orderID,

    prefill: {

        name: document.getElementById("studentName").value.trim(),

        email: document.getElementById("studentEmail").value.trim()

    },

    theme: {

        color: "#0B2E6D"

    },

    handler: function (response) {

    console.log("Payment Successful");

    console.log(response);

    const verifyData = new FormData();

    verifyData.append("action", "verifyPayment");

    verifyData.append("customerID", result.customerID);

    verifyData.append("razorpay_payment_id", response.razorpay_payment_id);

    verifyData.append("razorpay_order_id", response.razorpay_order_id);

    verifyData.append("razorpay_signature", response.razorpay_signature);

    fetch(CONFIG.WEB_APP_URL, {

        method: "POST",

        body: verifyData

    })

    .then(response => response.json())

    .then(result => {

        console.log(result);

        if(result.success){

            alert("Payment Verified Successfully!");

            // Next step:
            // window.location.href = "success.html";

        } else {

            alert(result.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Verification Failed.");

    });

}

};

//====================================
// Open Razorpay
//====================================

const rzp = new Razorpay(options);

rzp.open();

})

    .catch(error => {

        console.error(error);

        alert(error);

    });

}