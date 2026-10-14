const payments = [
    {
        id: "PAY001",
        order_id: "ORD001",
        customer_name: "Budi Santoso",
        product_name: "Cocoa Bean Grade A",
        amount: 2500000,
        payment_method: "bank_transfer",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261001-001",
        status: "settlement",
        payment_date: "2026-10-01"
    },
    {
        id: "PAY002",
        order_id: "ORD002",
        customer_name: "Sari Dewi",
        product_name: "Cocoa Bean Grade B",
        amount: 1800000,
        payment_method: "credit_card",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261002-002",
        status: "settlement",
        payment_date: "2026-10-02"
    },
    {
        id: "PAY003",
        order_id: "ORD003",
        customer_name: "Andi Pratama",
        product_name: "Cocoa Bean Grade A",
        amount: 3200000,
        payment_method: "qris",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261003-003",
        status: "pending",
        payment_date: "2026-10-03"
    },
    {
        id: "PAY004",
        order_id: "ORD004",
        customer_name: "Made Adnyana",
        product_name: "Cocoa Bean Grade C",
        amount: 1200000,
        payment_method: "bank_transfer",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261004-004",
        status: "expire",
        payment_date: "2026-10-04"
    },
    {
        id: "PAY005",
        order_id: "ORD005",
        customer_name: "Putri Maharani",
        product_name: "Cocoa Bean Grade A",
        amount: 4500000,
        payment_method: "gopay",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261005-005",
        status: "settlement",
        payment_date: "2026-10-05"
    },
    {
        id: "PAY006",
        order_id: "ORD006",
        customer_name: "Agus Setiawan",
        product_name: "Cocoa Bean Grade B",
        amount: 2100000,
        payment_method: "qris",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261006-006",
        status: "deny",
        payment_date: "2026-10-06"
    },
    {
        id: "PAY007",
        order_id: "ORD007",
        customer_name: "Dewi Lestari",
        product_name: "Cocoa Bean Grade A",
        amount: 5000000,
        payment_method: "bank_transfer",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261007-007",
        status: "settlement",
        payment_date: "2026-10-07"
    },
    {
        id: "PAY008",
        order_id: "ORD008",
        customer_name: "Komang Wirawan",
        product_name: "Cocoa Bean Grade C",
        amount: 1500000,
        payment_method: "credit_card",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261008-008",
        status: "cancel",
        payment_date: "2026-10-08"
    },
    {
        id: "PAY009",
        order_id: "ORD009",
        customer_name: "Rina Anggraini",
        product_name: "Cocoa Bean Grade B",
        amount: 2750000,
        payment_method: "gopay",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261009-009",
        status: "settlement",
        payment_date: "2026-10-09"
    },
    {
        id: "PAY010",
        order_id: "ORD010",
        customer_name: "Kadek Saputra",
        product_name: "Cocoa Bean Grade A",
        amount: 3600000,
        payment_method: "qris",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261010-010",
        status: "pending",
        payment_date: "2026-10-10"
    },
    {
        id: "PAY011",
        order_id: "ORD011",
        customer_name: "Yoga Permana",
        product_name: "Cocoa Bean Grade B",
        amount: 1900000,
        payment_method: "bank_transfer",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261011-011",
        status: "settlement",
        payment_date: "2026-10-11"
    },
    {
        id: "PAY012",
        order_id: "ORD012",
        customer_name: "Budi Santoso",
        product_name: "Cocoa Bean Grade C",
        amount: 950000,
        payment_method: "credit_card",
        payment_gateway: "Midtrans",
        transaction_id: "MID-20261012-012",
        status: "refund",
        payment_date: "2026-10-12"
    }
];

function getPaymentStats() {
    const successfulPayments = payments.filter(
        payment => payment.status === "settlement"
    );

    return [
        {
            category: "Total Pembayaran",
            values: payments.length
        },
        {
            category: "Pembayaran Berhasil",
            values: successfulPayments.length
        },
        {
            category: "Menunggu Pembayaran",
            values: payments.filter(
                payment => payment.status === "pending"
            ).length
        },
        {
            category: "Total Pendapatan",
            values: successfulPayments.reduce(
                (total, payment) => total + payment.amount,
                0
            ).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            })
        }
    ];
}

const tableBody = document.getElementById("tableBody");

payments.forEach((payment) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="name">
            ${payment.id}
        </td>

        <td class="muted">
            ${payment.order_id}
        </td>

        <td class="muted">
            ${payment.amount}
        </td>

        <td class="muted">
            ${payment.status}
        </td>

        <td class="action-cell">
            <div class="table-actions">
                <a href="#" class="action edit"
                    data-id="${payment.id}">Detail</a>
            </div>
        </td>
    `;

    tableBody.appendChild(row);
});

function updateStats() {
    const statsContainer = document.getElementById("statsContainer");

    statsContainer.innerHTML = getPaymentStats().map(stat => `
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
let filteredpayments = [...payments];

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

        displaypayments();
    });
});

function sortpayments(data) {
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

function displaypayments() {
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedpayments = sortpayments(filteredpayments);

    const currentpayments = sortedpayments.slice(
        startIndex,
        endIndex
    );

    currentpayments.forEach((payment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="name">
                ${payment.id}
            </td>

            <td class="muted">
                ${payment.order_id}
            </td>

            <td class="muted">
                ${payment.amount}
            </td>

            <td class="muted">
                ${payment.status}
            </td>

            <td class="action-cell">
                <div class="table-actions">
                    <a href="#" class="action edit"
                        data-id="${payment.id}">Detail</a>
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
    const totalData = filteredpayments.length;
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
            displaypayments();
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
            displaypayments();
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
            displaypayments();
        }
    });

    paginationButtons.appendChild(nextButton);
}


// ==============================
// SEARCH DAN FILTER
// ==============================

function filterpayments() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value.toLowerCase();

    filteredpayments = payments.filter((payment) => {
        const matchSearch =
            payment.id.toLowerCase().includes(searchText) ||
            payment.order_id.toLowerCase().includes(searchText) ||
            payment.amount.toLowerCase().includes(searchText) ||
            payment.status.toLowerCase().includes(searchText);

        const matchStatus =
            selectedStatus === "" ||
            payment.status.toLowerCase() === selectedStatus;

        return matchSearch && matchStatus;
    });

    currentPage = 1;
    displaypayments();
}

// ==============================
// JUMLAH DATA PER HALAMAN
// ==============================

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = Number(itemsPerPageSelect.value);
    currentPage = 1;
    displaypayments();
});


// ==============================
// EVENT LISTENER
// ==============================

searchInput.addEventListener("input", filterpayments);
statusFilter.addEventListener("change", filterpayments);


// ==============================
// TAMPILKAN DATA AWAL
// ==============================

displaypayments();