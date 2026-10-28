const PRODUCTS_API_URL = "http://127.0.0.1:8000/api/products";

const productTableBody = document.getElementById("productTableBody");
const statsContainer = document.getElementById("statsContainer");
const searchInput = document.getElementById("search");
const gradeFilter = document.getElementById("gradeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const itemsPerPageSelect = document.getElementById("itemsPerPage");
const paginationInfo = document.querySelector(".table-footer > span");
const paginationButtons = document.querySelector(".pagination");

let products = [];
let filteredProducts = [];
let itemsPerPage = Number(itemsPerPageSelect.value);
let currentPage = 1;
let sortColumn = "";
let sortDirection = "asc";

function normalizeProduct(product) {
    return {
        ...product,
        name: product.product_name || "",
        type: product.product_type || "",
        stock: product.stock ?? null
    };
}

function formatProductType(type) {
    return type === "non_fermented" ? "Non-Fermentasi" : "Fermentasi";
}

function displayStock(stock) {
    return stock === null || stock === undefined ? "-" : `${stock} kg`;
}

async function loadProducts() {
    productTableBody.innerHTML = `
        <tr><td colspan="7">Loading products...</td></tr>
    `;

    try {
        const token = getAuthToken();
        const response = await fetch(PRODUCTS_API_URL, {
            headers: {
                Accept: "application/json",
                ...(token
                    ? { Authorization: `Bearer ${token}` }
                    : {})
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to load products.");
        }

        products = (result.data || []).map(normalizeProduct);
        filteredProducts = [...products];

        updateStats();
        displayProducts();
    } catch (error) {
        console.error(error);
        productTableBody.innerHTML = `
            <tr><td colspan="7">${error.message}</td></tr>
        `;
    }
}

function updateStats() {
    const grades = [...new Set(products.map(product => product.grade))];

    let statsHTML = `
        <div class="stat-card">
            <p>Total Produk</p>
            <h3>${products.length}</h3>
        </div>
    `;

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

function sortProducts(data) {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
        let valueA = a[sortColumn];
        let valueB = b[sortColumn];

        if (sortColumn === "stock" || sortColumn === "id") {
            valueA = Number(valueA) || 0;
            valueB = Number(valueB) || 0;

            return sortDirection === "asc"
                ? valueA - valueB
                : valueB - valueA;
        }

        valueA = String(valueA ?? "").toLowerCase();
        valueB = String(valueB ?? "").toLowerCase();

        const result = valueA.localeCompare(valueB, "id");
        return sortDirection === "asc" ? result : -result;
    });
}

function displayProducts() {
    productTableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = sortProducts(filteredProducts).slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (currentProducts.length === 0) {
        productTableBody.innerHTML = `
            <tr><td colspan="7">No products found.</td></tr>
        `;
    }

    currentProducts.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${formatProductType(product.type)}</td>
            <td>
                <span class="grade grade-${String(product.grade).toLowerCase()}">
                    Grade ${product.grade}
                </span>
            </td>
            <td>${displayStock(product.stock)}</td>
            <td>${product.description || "-"}</td>
            <td class="action-cell">
                <div class="table-actions">
                    <a href="../form/index.html?id=${product.id}" class="action edit" data-id="${product.id}">Edit</a>
                    <a href="#" class="action delete" data-id="${product.id}">Delete</a>
                </div>
            </td>
        `;

        productTableBody.appendChild(row);
    });

    updatePagination();
}

function updatePagination() {
    const totalData = filteredProducts.length;
    const totalPages = Math.ceil(totalData / itemsPerPage);
    const startData = totalData === 0
        ? 0
        : (currentPage - 1) * itemsPerPage + 1;
    const endData = Math.min(currentPage * itemsPerPage, totalData);

    paginationInfo.textContent =
        `Showing ${startData} to ${endData} of ${totalData} items`;
    paginationButtons.innerHTML = "";

    const previousButton = document.createElement("button");
    previousButton.textContent = "‹";
    previousButton.disabled = currentPage === 1;
    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
        }
    });
    paginationButtons.appendChild(previousButton);

    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = page;

        if (page === currentPage) {
            pageButton.classList.add("current-page");
            pageButton.setAttribute("aria-current", "page");
        }

        pageButton.addEventListener("click", () => {
            currentPage = page;
            displayProducts();
        });

        paginationButtons.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "›";
    nextButton.disabled = totalPages === 0 || currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
        }
    });
    paginationButtons.appendChild(nextButton);
}

function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedGrade = gradeFilter.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();

    filteredProducts = products.filter(product => {
        const searchableText = [
            product.product_code,
            product.name,
            product.type,
            product.description
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(searchText) &&
            (!selectedGrade || product.grade.toLowerCase() === selectedGrade) &&
            (!selectedCategory || product.type.toLowerCase() === selectedCategory);
    });

    currentPage = 1;
    displayProducts();
}

document.querySelectorAll("thead th[data-sort]").forEach(header => {
    header.style.cursor = "pointer";

    header.addEventListener("click", () => {
        const column = header.dataset.sort;

        if (sortColumn === column) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortColumn = column;
            sortDirection = "asc";
        }

        displayProducts();
    });
});

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = Number(itemsPerPageSelect.value);
    currentPage = 1;
    displayProducts();
});

searchInput.addEventListener("input", filterProducts);
gradeFilter.addEventListener("change", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

loadProducts();
