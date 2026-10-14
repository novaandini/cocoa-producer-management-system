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
        <td class="muted">
            ${product.id}
        </td>
        <td class="product-name">
            ${product.name}
        </td>

        <td class="muted">
            ${product.type}
        </td>

        <td class="muted">
            <span class="grade grade-${product.grade.toLowerCase()}">
                Grade ${product.grade}
            </span>
        </td>

        <td class="muted">
            ${product.stock} kg
        </td>

        <td class="muted">
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

function updateStats() {
    const statsContainer = document.getElementById("statsContainer");

    // Mengambil semua grade unik dari array products
    const grades = [...new Set(products.map(product => product.grade))];

    // Membuat kartu Total Produk
    let statsHTML = `
        <div class="stat-card">
            <p>Total Produk</p>
            <h3>${products.length}</h3>
        </div>
    `;

    // Membuat kartu untuk setiap grade yang ditemukan
    grades.forEach(grade => {
        const total = products.filter(
            product => product.grade === grade
        ).length;

        statsHTML += `
            <div class="stat-card">
                <p>Total Produk Grade ${grade}</p>
                <h3>${total}</h3>
            </div>
        `;
    });

    statsContainer.innerHTML = statsHTML;
}

updateStats();

const searchInput = document.getElementById("search");
const gradeFilter = document.getElementById("gradeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const itemsPerPageSelect = document.getElementById("itemsPerPage");

const paginationInfo = document.querySelector(".table-footer > span");
const paginationButtons = document.querySelector(".pagination");

let itemsPerPage = Number(itemsPerPageSelect.value);
let currentPage = 1;
let filteredProducts = [...products];

// ==============================
// SORTING
// ==============================

let sortColumn = "";
let sortDirection = "asc";

const sortableHeaders = document.querySelectorAll(
    "thead th[data-sort]"
);

sortableHeaders.forEach((header) => {
    header.style.cursor = "pointer";

    header.addEventListener("click", () => {
        const column = header.dataset.sort;

        // Jika kolom sama, balik arah sorting
        if (sortColumn === column) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortColumn = column;
            sortDirection = "asc";
        }

        displayProducts();
    });
});

function sortProducts(data) {
    if (!sortColumn) {
        return data;
    }

    return [...data].sort((a, b) => {
        let valueA = a[sortColumn];
        let valueB = b[sortColumn];

        // Sorting angka untuk stok
        if (sortColumn === "stock") {
            valueA = Number(valueA);
            valueB = Number(valueB);

            return sortDirection === "asc"
                ? valueA - valueB
                : valueB - valueA;
        }

        // Sorting alfabetis untuk teks
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();

        const result = valueA.localeCompare(valueB, "id");

        return sortDirection === "asc" ? result : -result;
    });
}

// ==============================
// MENAMPILKAN DATA
// ==============================

function displayProducts() {
    productTableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedProducts = sortProducts(filteredProducts);

    const currentProducts = sortedProducts.slice(
        startIndex,
        endIndex
    );

    currentProducts.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.type}</td>

            <td>
                <span class="grade grade-${product.grade.toLowerCase()}">
                    Grade ${product.grade}
                </span>
            </td>

            <td>${product.stock} kg</td>
            <td>${product.description}</td>

            <td class="action-cell">
                <div class="table-actions">
                    <a href="#" class="action edit"
                       data-id="${product.id}">Edit</a>

                    <a href="#" class="action delete"
                       data-id="${product.id}">Delete</a>
                </div>
            </td>
        `;

        productTableBody.appendChild(row);
    });

    updatePagination();
}


// ==============================
// PAGINATION
// ==============================

function updatePagination() {
    const totalData = filteredProducts.length;
    const totalPages = Math.ceil(totalData / itemsPerPage);

    const startData = totalData === 0
        ? 0
        : (currentPage - 1) * itemsPerPage + 1;

    const endData = Math.min(
        currentPage * itemsPerPage,
        totalData
    );

    paginationInfo.textContent =
        `Showing ${startData} to ${endData} of ${totalData} items`;

    paginationButtons.innerHTML = "";

    // Previous
    const previousButton = document.createElement("button");
    previousButton.textContent = "‹";
    previousButton.setAttribute("aria-label", "Previous page");
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
            pageButton.classList.add("current-page");
            pageButton.setAttribute("aria-current", "page");
        }

        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayProducts();
        });

        paginationButtons.appendChild(pageButton);
    }

    // Next
    const nextButton = document.createElement("button");
    nextButton.textContent = "›";
    nextButton.setAttribute("aria-label", "Next page");
    nextButton.disabled =
        totalPages === 0 || currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
        }
    });

    paginationButtons.appendChild(nextButton);
}


// ==============================
// SEARCH DAN FILTER
// ==============================

function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedGrade = gradeFilter.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();

    filteredProducts = products.filter((product) => {
        const matchSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.type.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        const matchGrade =
            selectedGrade === "" ||
            product.grade.toLowerCase() === selectedGrade;

        const matchCategory =
            selectedCategory === "" ||
            product.type.toLowerCase() === selectedCategory;

        return matchSearch && matchGrade && matchCategory;
    });

    // Kembali ke halaman pertama setelah filter berubah
    currentPage = 1;
    displayProducts();
}


// ==============================
// JUMLAH DATA PER HALAMAN
// ==============================

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = Number(itemsPerPageSelect.value);
    currentPage = 1;
    displayProducts();
});


// ==============================
// EVENT LISTENER
// ==============================

searchInput.addEventListener("input", filterProducts);
gradeFilter.addEventListener("change", filterProducts);
categoryFilter.addEventListener("change", filterProducts);


// ==============================
// TAMPILKAN DATA AWAL
// ==============================

displayProducts();