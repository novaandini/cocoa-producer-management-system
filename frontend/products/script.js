/* =====================================================
   DATA PRODUK
===================================================== */

const products = [

    {
        id: "a",
        name: "Cocoa Bean A",
        type: "Fermentasi",
        category: "fermentasi",
        grade: "A",
        stock: 500,
        image: "../home/cocoa-bean-a.jpg",
        description:
            "Biji kakao fermentasi Grade A untuk kebutuhan pengolahan kakao."
    },

    {
        id: "b",
        name: "Cocoa Bean B",
        type: "Fermentasi",
        category: "fermentasi",
        grade: "B",
        stock: 800,
        image: "../home/cocoa-bean-b.jpg",
        description:
            "Biji kakao fermentasi Grade B dengan stok yang tersedia."
    },

    {
        id: "c",
        name: "Cocoa Bean C",
        type: "Non-Fermentasi",
        category: "non-fermentasi",
        grade: "C",
        stock: 300,
        image: "../home/cocoa-bean-c.jpg",
        description:
            "Biji kakao non-fermentasi untuk kebutuhan produk kakao."
    },

    {
        id: "d",
        name: "Cocoa Bean D",
        type: "Fermentasi",
        category: "fermentasi",
        grade: "A",
        stock: 650,
        image: "../home/cocoa-bean-d.jpg",
        description:
            "Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg."
    },

    {
        id: "e",
        name: "Cocoa Bean E",
        type: "Fermentasi",
        category: "fermentasi",
        grade: "B",
        stock: 450,
        image: "../home/cocoa-bean-e.jpg",
        description:
            "Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg."
    },

    {
        id: "f",
        name: "Cocoa Bean F",
        type: "Non-Fermentasi",
        category: "non-fermentasi",
        grade: "B",
        stock: 700,
        image: "../home/cocoa-bean-f.jpg",
        description:
            "Biji kakao non-fermentasi Grade B dengan stok 700 kg."
    },

    {
        id: "g",
        name: "Cocoa Bean G",
        type: "Fermentasi",
        category: "fermentasi",
        grade: "C",
        stock: 350,
        image: "../home/cocoa-bean-g.jpg",
        description:
            "Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg."
    },

    {
        id: "h",
        name: "Cocoa Bean H",
        type: "Non-Fermentasi",
        category: "non-fermentasi",
        grade: "A",
        stock: 550,
        image: "../home/cocoa-bean-h.jpg",
        description:
            "Biji kakao non-fermentasi Grade A dengan stok 550 kg."
    }

];


/* =====================================================
   ELEMENT HTML
===================================================== */

const productsGrid = document.getElementById("productsGrid");

const emptyState = document.getElementById("emptyState");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const gradeButtons =
    document.querySelectorAll(".grade-btn");


/* =====================================================
   FILTER YANG SEDANG AKTIF
===================================================== */

let selectedType = "all";

let selectedGrade = "all";


/* =====================================================
   TAMPILKAN PRODUK
===================================================== */

function displayProducts() {

    productsGrid.innerHTML = "";


    /* Filter produk */

    const filteredProducts = products.filter(function(product) {

        const typeMatch =
            selectedType === "all" ||
            product.category === selectedType;


        const gradeMatch =
            selectedGrade === "all" ||
            product.grade === selectedGrade;


        return typeMatch && gradeMatch;

    });


    /* Jika tidak ada produk */

    if (filteredProducts.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    /* Buat card produk */

    filteredProducts.forEach(function(product) {

        const productCard =
            document.createElement("article");

        productCard.className = "product-card";


        productCard.innerHTML = `

            <div class="product-image-wrap">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

                <span class="product-badge">
                    GRADE ${product.grade}
                </span>

            </div>


            <div class="product-content">

                <span class="product-type">
                    ${product.type}
                </span>


                <h3 class="product-name">
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-info">

                    <div class="info-box">

                        <span class="info-label">
                            Grade
                        </span>

                        <span class="info-value">
                            ${product.grade}
                        </span>

                    </div>


                    <div class="info-box">

                        <span class="info-label">
                            Stok
                        </span>

                        <span class="info-value">
                            ${product.stock} kg
                        </span>

                    </div>

                </div>


                <a
                    href="../detail_product/index.html?product=${product.id}"
                    class="detail-button">

                    Lihat Detail →

                </a>

            </div>

        `;


        productsGrid.appendChild(productCard);

    });

}


/* =====================================================
   FILTER JENIS PENGOLAHAN
===================================================== */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        /* Hapus active dari semua */

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* Tambahkan active ke tombol yang dipilih */

        button.classList.add("active");


        /* Simpan filter */

        selectedType =
            button.dataset.type;


        /* Tampilkan ulang */

        displayProducts();

    });

});


/* =====================================================
   FILTER GRADE
===================================================== */

gradeButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        /* Hapus active dari semua */

        gradeButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* Tambahkan active */

        button.classList.add("active");


        /* Simpan grade */

        selectedGrade =
            button.dataset.grade;


        /* Tampilkan ulang */

        displayProducts();

    });

});


/* =====================================================
   JALANKAN SAAT HALAMAN DIBUKA
===================================================== */

displayProducts();
