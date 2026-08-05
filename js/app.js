// =======================================
// SAMRAMBA KERALAM 2030
// Frontend Controller
// =======================================

const CONFIG = {

    WEB_APP_URL:
    "https://script.google.com/macros/s/AKfycbzQFLeWMQAX7gbedsu859N8nEZnGoAFinj4dn1JgpX0La7GSy-2xGHK38MdjcHM2ckk/exec",

    PRODUCT_PRICE: 499,

    CURRENCY: "INR"

};

//------------------------------------------
// Page Ready
//------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    lucide.createIcons();

    console.log("SAMRAMBA KERALAM 2030 Loaded");

    const pricingButton =
        document.getElementById("pricingButton");

    if (pricingButton) {

        pricingButton.addEventListener("click", function () {

            window.location.href =
                CONFIG.WEB_APP_URL + "?page=register";

        });

    }

});