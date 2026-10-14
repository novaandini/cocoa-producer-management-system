const accounts = [
    {
        id: "A001",
        name: "Budi Santoso",
        username: "budi.santoso",
        email: "budi.santoso@example.com",
        phone_number: "081234560001",
        status: "active"
    },
    {
        id: "A002",
        name: "Sari Dewi",
        username: "sari.dewi",
        email: "sari.dewi@example.com",
        phone_number: "081234560002",
        status: "active"
    },
    {
        id: "A003",
        name: "Andi Pratama",
        username: "andi.pratama",
        email: "andi.pratama@example.com",
        phone_number: "081234560003",
        status: "nonactive"
    },
    {
        id: "A004",
        name: "Made Adnyana",
        username: "made.adnyana",
        email: "made.adnyana@example.com",
        phone_number: "081234560004",
        status: "active"
    },
    {
        id: "A005",
        name: "Putri Maharani",
        username: "putri.maharani",
        email: "putri.maharani@example.com",
        phone_number: "081234560005",
        status: "active"
    },
    {
        id: "A006",
        name: "Agus Setiawan",
        username: "agus.setiawan",
        email: "agus.setiawan@example.com",
        phone_number: "081234560006",
        status: "nonactive"
    },
    {
        id: "A007",
        name: "Dewi Lestari",
        username: "dewi.lestari",
        email: "dewi.lestari@example.com",
        phone_number: "081234560007",
        status: "active"
    },
    {
        id: "A008",
        name: "Komang Wirawan",
        username: "komang.wirawan",
        email: "komang.wirawan@example.com",
        phone_number: "081234560008",
        status: "active"
    },
    {
        id: "A009",
        name: "Rina Anggraini",
        username: "rina.anggraini",
        email: "rina.anggraini@example.com",
        phone_number: "081234560009",
        status: "nonactive"
    },
    {
        id: "A010",
        name: "Kadek Saputra",
        username: "kadek.saputra",
        email: "kadek.saputra@example.com",
        phone_number: "081234560010",
        status: "active"
    },
    {
        id: "A011",
        name: "Admin Kakao",
        username: "admin.kakao",
        email: "admin.kakao@example.com",
        phone_number: "081234560011",
        status: "active"
    },
    {
        id: "A012",
        name: "Yoga Permana",
        username: "yoga.permana",
        email: "yoga.permana@example.com",
        phone_number: "081234560012",
        status: "nonactive"
    }
];

const stats = [
    {
        category: "Jumlah Akun",
        values: accounts.length,
    },
    {
        category: "Akun Aktif",
        values: accounts.filter(user => user.status === "active").length,
    },
    {
        category: "Akun Nonaktif",
        values: accounts.filter(user => user.status === "nonactive").length,
    },
    {
        category: "Persentase Akun Aktif",
        values: accounts.length > 0
            ? `${Math.round(
                (accounts.filter(user => user.status === "active").length
                / accounts.length) * 100
            )}%`
            : "0%",
    },
];

const tableBody = document.getElementById("tableBody");

accounts.forEach((account) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="name">
            ${account.username}
        </td>

        <td class="muted">
            ${account.name}
        </td>

        <td class="muted">
            ${account.email}
        </td>

        <td class="muted">
            ${account.phone_number}
        </td>

        <td class="action-cell">
            <div class="table-actions">
                <a href="#" class="action edit"
                    data-id="${account.id}">Edit</a>

                <a href="#" class="action delete"
                    data-id="${account.id}">Delete</a>
            </div>
        </td>
    `;

    tableBody.appendChild(row);
});

function updateStats() {
    const statsContainer = document.getElementById("statsContainer");

    statsContainer.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <p>${stat.category}</p>
            <h3>${stat.values}</h3>
        </div>
    `).join("");
}

updateStats();

const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const itemsPerPageSelect = document.getElementById("itemsPerPage");

const paginationInfo = document.querySelector(".table-footer > span");
const paginationButtons = document.querySelector(".pagination");

let itemsPerPage = Number(itemsPerPageSelect.value);
let currentPage = 1;
let filteredaccounts = [...accounts];

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

        displayaccounts();
    });
});

function sortaccounts(data) {
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

function displayaccounts() {
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedaccounts = sortaccounts(filteredaccounts);

    const currentaccounts = sortedaccounts.slice(
        startIndex,
        endIndex
    );

    currentaccounts.forEach((account) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="name">
                ${account.username}
            </td>

            <td class="muted">
                ${account.name}
            </td>

            <td class="muted">
                ${account.email}
            </td>

            <td class="muted">
                ${account.phone_number}
            </td>

            <td class="action-cell">
                <div class="table-actions">
                    <a href="#" class="action edit"
                        data-id="${account.id}">Edit</a>

                    <a href="#" class="action delete"
                        data-id="${account.id}">Delete</a>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });

    updatePagination();
}


// ==============================
// PAGINATION
// ==============================

function updatePagination() {
    const totalData = filteredaccounts.length;
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
            displayaccounts();
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
            displayaccounts();
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
            displayaccounts();
        }
    });

    paginationButtons.appendChild(nextButton);
}


// ==============================
// SEARCH DAN FILTER
// ==============================

function filteraccounts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value.toLowerCase();

    filteredaccounts = accounts.filter((account) => {
        const matchSearch =
            account.username.toLowerCase().includes(searchText) ||
            account.name.toLowerCase().includes(searchText) ||
            account.email.toLowerCase().includes(searchText) ||
            account.phone_number.toLowerCase().includes(searchText);

        const matchStatus =
            selectedStatus === "" ||
            account.status.toLowerCase() === selectedStatus;

        return matchSearch && matchStatus;
    });

    currentPage = 1;
    displayaccounts();
}

// ==============================
// JUMLAH DATA PER HALAMAN
// ==============================

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = Number(itemsPerPageSelect.value);
    currentPage = 1;
    displayaccounts();
});


// ==============================
// EVENT LISTENER
// ==============================

searchInput.addEventListener("input", filteraccounts);
statusFilter.addEventListener("change", filteraccounts);


// ==============================
// TAMPILKAN DATA AWAL
// ==============================

displayaccounts();