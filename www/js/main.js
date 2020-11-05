$(document).ready(() => {
    mdc.ripple.MDCRipple.attachTo(document.querySelector('#btnSubmit'));
    mdc.textField.MDCTextField.attachTo(document.querySelector("#txtCountryCode"));
    mdc.textField.MDCTextField.attachTo(document.querySelector("#txtContactNo"));
    $("#btnSubmit").click((e)=>{
        let mobileNumber = $("#txtContactNo input").val();
        let countryCode= $("#txtCountryCode input").val();
        let whatsappUrl = 'https://api.whatsapp.com/send?phone='+countryCode + mobileNumber;
        window.open(whatsappUrl);
    });
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
          navigator.serviceWorker
            .register("serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
        })
      }
});