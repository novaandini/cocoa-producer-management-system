const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    window.location.href = "../payment/index.html";
});