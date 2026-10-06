/* =========================
   PRODUCTS PAGE
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PRODUCT CARDS
    ========================= */

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("is-hovered");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("is-hovered");
        });

    });


    /* =========================
       PRODUCT DETAIL LINKS
    ========================= */

    const detailLinks = document.querySelectorAll(".product-bottom a");

    detailLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const productCard = link.closest(".product-card");

            if (!productCard) {
                return;
            }

            const productName =
                productCard.querySelector("h3");

            if (productName) {
                console.log(
                    "Membuka detail:",
                    productName.textContent.trim()
                );
            }

        });

    });


    /* =========================
       SIMPLE SCROLL EFFECT
    ========================= */

    const productSection = document.querySelector(".products");

    if (productSection) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        observer.observe(productSection);
    }

});
