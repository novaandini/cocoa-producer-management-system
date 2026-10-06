/* ========================================= */
/* PRODUCT DATA */
/* ========================================= */

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
    }

};



/* ========================================= */
/* GET PRODUCT */
/* ========================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const productId = urlParams.get("product") || "a";

const product = products[productId] || products.a;



/* ========================================= */
/* SHOW PRODUCT */
/* ========================================= */

document.getElementById("productImage").src =
    product.image;

document.getElementById("productImage").alt =
    product.name;


document.getElementById("productBadge").textContent =
    `GRADE ${product.grade}`;


document.getElementById("productCategory").textContent =
    product.category;


document.getElementById("productName").textContent =
    product.name;


document.getElementById("productDescription").textContent =
    product.description;


document.getElementById("productGrade").textContent =
    product.grade;


document.getElementById("productType").textContent =
    product.type;


document.getElementById("productStock").textContent =
    product.stock;


document.getElementById("descriptionOne").textContent =
    product.descriptionOne;



/* ========================================= */
/* QUANTITY */
/* ========================================= */

const quantityInput =
    document.getElementById("quantity");

const minusButton =
    document.getElementById("minus");

const plusButton =
    document.getElementById("plus");



/* MINUS */

minusButton.addEventListener("click", function () {

    let quantity =
        parseInt(quantityInput.value);

    if (quantity > 1) {

        quantityInput.value =
            quantity - 1;

    }

});



/* PLUS */

plusButton.addEventListener("click", function () {

    let quantity =
        parseInt(quantityInput.value);

    if (quantity < product.stock) {

        quantityInput.value =
            quantity + 1;

    }

});



/* ========================================= */
/* INPUT LIMIT */
/* ========================================= */

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

        }


        if (quantity > product.stock) {

            quantityInput.value =
                product.stock;

        }

    }
);
