// =========================================
// PRODUCT PAGE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("active-card");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("active-card");
        });

    });

});
