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
        image: "../home/cocoa-bean-f.png",
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

const productTableBody = document.getElementById("productTableBody");

products.forEach((product) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            ${product.id}
        </td>
        <td>
            ${product.name}
        </td>

        <td>
            ${product.type}
        </td>

        <td>
            <span class="grade grade-${product.grade.toLowerCase()}">
                Grade ${product.grade}
            </span>
        </td>

        <td>
            ${product.stock} kg
        </td>

        <td>
            ${product.description}
        </td>

        <td>
            <div class="table-actions">

                <a href="#" class="action edit">
                    Edit
                </a>

                <a href="#" class="action delete">
                    Delete
                </a>

            </div>
        </td>
    `;

    productTableBody.appendChild(row);
});

const searchInput = document.getElementById("searchAdmin");
const gradeFilter = document.getElementById("gradeFilter");

const paginationInfo = document.querySelector(".pagination span");
const paginationButtons = document.querySelector(".pagination > div");


// ==============================
// PAGINATION
// ==============================

const itemsPerPage = 5;

let currentPage = 1;


// Data yang sedang ditampilkan
let filteredProducts = products;


// ==============================
// MENAMPILKAN DATA
// ==============================

function displayProducts() {

    productTableBody.innerHTML = "";

    // Menentukan data awal dan akhir
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Mengambil data sesuai halaman
    const currentProducts = filteredProducts.slice(
        startIndex,
        endIndex
    );


    // Membuat baris tabel
    currentProducts.forEach((product) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                ${product.id}
            </td>

            <td>
                ${product.name}
            </td>

            <td>
                ${product.type}
            </td>

            <td>
                <span class="grade grade-${product.grade.toLowerCase()}">
                    Grade ${product.grade}
                </span>
            </td>

            <td>
                ${product.stock} kg
            </td>

            <td>
                ${product.description}
            </td>

            <td>
                <div class="table-actions">

                    <a href="#" class="action edit">
                        Edit
                    </a>

                    <a href="#" class="action delete">
                        Delete
                    </a>

                </div>
            </td>
        `;

        productTableBody.appendChild(row);
    });


    // Update informasi pagination
    updatePagination();
}


// ==============================
// PAGINATION BUTTON
// ==============================

function updatePagination() {

    const totalData = filteredProducts.length;

    const totalPages = Math.ceil(
        totalData / itemsPerPage
    );


    // Menentukan data yang sedang ditampilkan
    const startData =
        totalData === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1;

    const endData = Math.min(
        currentPage * itemsPerPage,
        totalData
    );


    paginationInfo.textContent =
        `Showing ${startData}–${endData} of ${totalData}`;


    // Menghapus tombol pagination lama
    paginationButtons.innerHTML = "";


    // Previous
    const previousButton = document.createElement("button");

    previousButton.textContent = "Previous";

    previousButton.disabled = currentPage === 1;

    previousButton.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            displayProducts();
        }

    });

    paginationButtons.appendChild(previousButton);


    // Nomor halaman
    for (let i = 1; i <= totalPages; i++) {

        const pageButton = document.createElement("button");

        pageButton.textContent = i;


        if (i === currentPage) {
            pageButton.classList.add("current");
        }


        pageButton.addEventListener("click", () => {

            currentPage = i;

            displayProducts();

        });


        paginationButtons.appendChild(pageButton);
    }


    // Next
    const nextButton = document.createElement("button");

    nextButton.textContent = "Next";

    nextButton.disabled =
        currentPage === totalPages ||
        totalPages === 0;


    nextButton.addEventListener("click", () => {

        if (currentPage < totalPages) {

            currentPage++;

            displayProducts();
        }

    });

    paginationButtons.appendChild(nextButton);
}


// ==============================
// SEARCH + FILTER
// ==============================

function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedGrade =
        gradeFilter.value;


    filteredProducts = products.filter((product) => {

        const matchSearch =
            product.name
                .toLowerCase()
                .includes(searchText);


        const matchGrade =
            selectedGrade === "" ||
            product.grade.toLowerCase() === selectedGrade;


        return matchSearch && matchGrade;

    });


    // Kembali ke halaman pertama
    currentPage = 1;

    displayProducts();
}


// ==============================
// EVENT SEARCH
// ==============================

searchInput.addEventListener(
    "input",
    filterProducts
);


// ==============================
// EVENT FILTER
// ==============================

gradeFilter.addEventListener(
    "change",
    filterProducts
);


// ==============================
// TAMPILKAN DATA PERTAMA
// ==============================

displayProducts();