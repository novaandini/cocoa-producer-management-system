/* =========================================
   PRODUCT DATA
========================================= */

const products = {

    a: {
        name: "Cocoa Bean A",
        category: "FERMENTASI",
        grade: "A",
        type: "Fermentasi",
        stock: 500,
        image: "../home/cocoa-bean-a.jpg",

        description:
            "Biji kakao fermentasi dengan kualitas Grade A yang diproses untuk menghasilkan kualitas kakao yang baik dan sesuai kebutuhan.",

        descriptionOne:
            "Cocoa Bean A merupakan biji kakao fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 500 kg."
    },

    b: {
        name: "Cocoa Bean B",
        category: "FERMENTASI",
        grade: "B",
        type: "Fermentasi",
        stock: 800,
        image: "../home/cocoa-bean-b.jpg",

        description:
            "Biji kakao fermentasi dengan kualitas Grade B yang tersedia untuk memenuhi kebutuhan customer.",

        descriptionOne:
            "Cocoa Bean B merupakan biji kakao fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 800 kg."
    },

    c: {
        name: "Cocoa Bean C",
        category: "NON-FERMENTASI",
        grade: "C",
        type: "Non-Fermentasi",
        stock: 300,
        image: "../home/cocoa-bean-c.jpg",

        description:
            "Biji kakao non-fermentasi dengan kualitas Grade C yang tersedia untuk memenuhi kebutuhan customer.",

        descriptionOne:
            "Cocoa Bean C merupakan biji kakao non-fermentasi dengan kualitas Grade C. Produk ini tersedia dalam jumlah stok 300 kg."
    },

    d: {
        name: "Cocoa Bean D",
        category: "FERMENTASI",
        grade: "A",
        type: "Fermentasi",
        stock: 650,
        image: "../home/cocoa-bean-d.jpg",

        description:
            "Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg.",

        descriptionOne:
            "Cocoa Bean D merupakan biji kakao fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 650 kg."
    },

    e: {
        name: "Cocoa Bean E",
        category: "FERMENTASI",
        grade: "B",
        type: "Fermentasi",
        stock: 450,
        image: "../home/cocoa-bean-e.jpg",

        description:
            "Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg.",

        descriptionOne:
            "Cocoa Bean E merupakan biji kakao fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 450 kg."
    },

    f: {
        name: "Cocoa Bean F",
        category: "NON-FERMENTASI",
        grade: "B",
        type: "Non-Fermentasi",
        stock: 700,
        image: "../home/cocoa-bean-f.png",

        description:
            "Biji kakao non-fermentasi Grade B dengan stok 700 kg.",

        descriptionOne:
            "Cocoa Bean F merupakan biji kakao non-fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 700 kg."
    },

    g: {
        name: "Cocoa Bean G",
        category: "FERMENTASI",
        grade: "C",
        type: "Fermentasi",
        stock: 350,
        image: "../home/cocoa-bean-g.jpg",

        description:
            "Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg.",

        descriptionOne:
            "Cocoa Bean G merupakan biji kakao fermentasi dengan kualitas Grade C. Produk ini tersedia dalam jumlah stok 350 kg."
    },

    h: {
        name: "Cocoa Bean H",
        category: "NON-FERMENTASI",
        grade: "A",
        type: "Non-Fermentasi",
        stock: 550,
        image: "../home/cocoa-bean-h.jpg",

        description:
            "Biji kakao non-fermentasi Grade A dengan stok 550 kg.",

        descriptionOne:
            "Cocoa Bean H merupakan biji kakao non-fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 550 kg."
    }

};



/* =========================================
   GET PRODUCT ID FROM URL
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("product");



/* =========================================
   SELECT PRODUCT
========================================= */

// Jika URL berisi ?product=a
// maka yang dipilih adalah products.a
//
// Jika URL berisi ?product=b
// maka yang dipilih adalah products.b
//
// dan seterusnya.

const product =
    products[productId] || products.a;



/* =========================================
   PRODUCT ELEMENTS
========================================= */

const productImage =
    document.getElementById("productImage");

const productBadge =
    document.getElementById("productBadge");

const productCategory =
    document.getElementById("productCategory");

const productName =
    document.getElementById("productName");

const productDescription =
    document.getElementById("productDescription");

const productGrade =
    document.getElementById("productGrade");

const productType =
    document.getElementById("productType");

const productStock =
    document.getElementById("productStock");

const descriptionOne =
    document.getElementById("descriptionOne");



/* =========================================
   DISPLAY PRODUCT
========================================= */

if (productImage) {

    productImage.src =
        product.image;

    productImage.alt =
        product.name;

}


if (productBadge) {

    productBadge.textContent =
        `GRADE ${product.grade}`;

}


if (productCategory) {

    productCategory.textContent =
        product.category;

}


if (productName) {

    productName.textContent =
        product.name;

}


if (productDescription) {

    productDescription.textContent =
        product.description;

}


if (productGrade) {

    productGrade.textContent =
        product.grade;

}


if (productType) {

    productType.textContent =
        product.type;

}


if (productStock) {

    productStock.textContent =
        product.stock;

}


if (descriptionOne) {

    descriptionOne.textContent =
        product.descriptionOne;

}



/* =========================================
   QUANTITY ELEMENTS
========================================= */

const quantityInput =
    document.getElementById("quantity");

const minusButton =
    document.getElementById("minus");

const plusButton =
    document.getElementById("plus");



/* =========================================
   SET MAX STOCK
========================================= */

if (quantityInput) {

    quantityInput.max =
        product.stock;

}



/* =========================================
   MINUS BUTTON
========================================= */

if (minusButton && quantityInput) {

    minusButton.addEventListener(
        "click",
        function () {

            let quantity =
                parseInt(quantityInput.value);

            if (
                isNaN(quantity) ||
                quantity <= 1
            ) {

                quantityInput.value = 1;

                return;

            }

            quantityInput.value =
                quantity - 1;

        }
    );

}



/* =========================================
   PLUS BUTTON
========================================= */

if (plusButton && quantityInput) {

    plusButton.addEventListener(
        "click",
        function () {

            let quantity =
                parseInt(quantityInput.value);

            if (isNaN(quantity)) {

                quantity = 1;

            }

            if (quantity < product.stock) {

                quantityInput.value =
                    quantity + 1;

            }

        }
    );

}



/* =========================================
   MANUAL QUANTITY INPUT
========================================= */

if (quantityInput) {

    quantityInput.addEventListener(
        "input",
        function () {

            let quantity =
                parseInt(quantityInput.value);


            if (
                isNaN(quantity) ||
                quantity < 1
            ) {

                quantityInput.value = 1;

                return;

            }


            if (quantity > product.stock) {

                quantityInput.value =
                    product.stock;

            }

        }
    );

}
