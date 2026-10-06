// =========================================
// PRODUCT DETAIL - QUANTITY
// =========================================

const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const quantityInput = document.getElementById("quantity");


// Tombol minus
minusButton.addEventListener("click", function () {

    let quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }

});


// Tombol plus
plusButton.addEventListener("click", function () {

    let quantity = parseInt(quantityInput.value);

    if (quantity < 500) {
        quantityInput.value = quantity + 1;
    }

});

