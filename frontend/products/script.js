document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       FILTER PRODUK
    ========================= */

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const productCards =
        document.querySelectorAll(".product-card");

    const catalogCount =
        document.getElementById("catalogCount");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Hapus active dari semua tombol */

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });


            /* Tambahkan active ke tombol yang dipilih */

            button.classList.add("active");


            /* Ambil jenis filter */

            const selectedFilter =
                button.getAttribute("data-filter");


            let visibleProducts = 0;


            /* Filter produk */

            productCards.forEach(function (card) {

                const productType =
                    card.getAttribute("data-type");


                if (
                    selectedFilter === "all" ||
                    productType === selectedFilter
                ) {

                    card.classList.remove("hidden");

                    visibleProducts++;

                } else {

                    card.classList.add("hidden");

                }

            });


            /* Update jumlah produk */

            if (visibleProducts === 1) {

                catalogCount.textContent =
                    "1 Produk tersedia";

            } else {

                catalogCount.textContent =
                    visibleProducts + " Produk tersedia";

            }

        });

    });


    /* =========================
       DETAIL PRODUCT
    ========================= */

    const detailLinks =
        document.querySelectorAll(".detail-button");


    detailLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const productCard =
                link.closest(".product-card");


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
       CARD ANIMATION
    ========================= */

    const productGrid =
        document.querySelector(".product-grid");


    if (productGrid) {

        const cards =
            productGrid.querySelectorAll(".product-card");


        cards.forEach(function (card, index) {

            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";


            setTimeout(function () {

                card.style.transition =
                    "opacity 0.5s ease, transform 0.5s ease";

                card.style.opacity = "1";
                card.style.transform = "translateY(0)";

            }, 100 + (index * 120));

        });

    }

});
