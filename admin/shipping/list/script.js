const shipments = [
    {
        id: "SHP001",
        order_id: "ORD001",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140001",
        shipping_cost: 25000,
        weight: 10,
        status: "delivered",
        shipped_date: "2026-10-01",
        estimated_delivery: "2026-10-03"
    },
    {
        id: "SHP002",
        order_id: "ORD002",
        customer_name: "Sari Dewi",
        origin: "Jembrana, Bali",
        destination: "Surabaya, Jawa Timur",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140002",
        shipping_cost: 45000,
        weight: 15,
        status: "in_transit",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-14"
    },
    {
        id: "SHP003",
        order_id: "ORD003",
        customer_name: "Andi Pratama",
        origin: "Jembrana, Bali",
        destination: "Jakarta Selatan, DKI Jakarta",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140003",
        shipping_cost: 65000,
        weight: 20,
        status: "shipped",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-17"
    },
    {
        id: "SHP004",
        order_id: "ORD004",
        customer_name: "Made Adnyana",
        origin: "Jembrana, Bali",
        destination: "Bandung, Jawa Barat",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140004",
        shipping_cost: 55000,
        weight: 12,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP005",
        order_id: "ORD005",
        customer_name: "Putri Maharani",
        origin: "Jembrana, Bali",
        destination: "Yogyakarta, DI Yogyakarta",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140005",
        shipping_cost: 50000,
        weight: 8,
        status: "delivered",
        shipped_date: "2026-10-08",
        estimated_delivery: "2026-10-09"
    },
    {
        id: "SHP006",
        order_id: "ORD006",
        customer_name: "Agus Setiawan",
        origin: "Jembrana, Bali",
        destination: "Malang, Jawa Timur",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140006",
        shipping_cost: 40000,
        weight: 18,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-16"
    },
    {
        id: "SHP007",
        order_id: "ORD007",
        customer_name: "Dewi Lestari",
        origin: "Jembrana, Bali",
        destination: "Makassar, Sulawesi Selatan",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140007",
        shipping_cost: 85000,
        weight: 25,
        status: "shipped",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-18"
    },
    {
        id: "SHP008",
        order_id: "ORD008",
        customer_name: "Komang Wirawan",
        origin: "Jembrana, Bali",
        destination: "Gianyar, Bali",
        courier: "JNE",
        service: "JTR",
        tracking_number: "JNE202610140008",
        shipping_cost: 120000,
        weight: 100,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP009",
        order_id: "ORD009",
        customer_name: "Rina Anggraini",
        origin: "Jembrana, Bali",
        destination: "Semarang, Jawa Tengah",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140009",
        shipping_cost: 60000,
        weight: 16,
        status: "cancelled",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP010",
        order_id: "ORD010",
        customer_name: "Kadek Saputra",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140010",
        shipping_cost: 20000,
        weight: 5,
        status: "delivered",
        shipped_date: "2026-10-10",
        estimated_delivery: "2026-10-12"
    },
    {
        id: "SHP011",
        order_id: "ORD011",
        customer_name: "Yoga Permana",
        origin: "Jembrana, Bali",
        destination: "Tangerang, Banten",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140011",
        shipping_cost: 70000,
        weight: 22,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-15"
    },
    {
        id: "SHP012",
        order_id: "ORD012",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140012",
        shipping_cost: 30000,
        weight: 10,
        status: "pending",
        shipped_date: null,
        estimated_delivery: null
    }
];

const stats = [
    {
        category: "Jumlah Pengiriman",
        values: shipments.length,
    },
    {
        category: "Pengiriman Pending",
        values: shipments.filter(shipment => shipment.status === "pending").length,
    },
    {
        category: "Pesanan sedang disiapkan",
        values: shipments.filter(shipment => shipment.status === "processing").length,
    },
    {
        category: "Barang sudah diserahkan untuk dikirim",
        values: shipments.filter(shipment => shipment.status === "shipped").length,
    },
];

const tableBody = document.getElementById("tableBody");

shipments.forEach((shipment) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="name">
            ${shipment.order_id}
        </td>

        <td class="muted">
            ${shipment.tracking_number}
        </td>

        <td class="muted">
            ${shipment.shipped_date}
        </td>

        <td class="muted">
            ${shipment.estimated_delivery}
        </td>

        <td class="action-cell">
            <div class="table-actions">
                <a href="#" class="action detail"
                    data-id="${shipment.id}">Detail</a>
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
let filteredshipments = [...shipments];

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

        displayshipments();
    });
});

function sortshipments(data) {
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

function displayshipments() {
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedshipments = sortshipments(filteredshipments);

    const currentshipments = sortedshipments.slice(
        startIndex,
        endIndex
    );

    currentshipments.forEach((shipment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="name">
                ${shipment.order_id}
            </td>

            <td class="muted">
                ${shipment.tracking_number}
            </td>

            <td class="muted">
                ${shipment.shipped_date}
            </td>

            <td class="muted">
                ${shipment.estimated_delivery}
            </td>

            <td class="action-cell">
                <div class="table-actions">
                    <a href="#" class="action detail"
                        data-id="${shipment.id}">Detail</a>
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
    const totalData = filteredshipments.length;
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
            displayshipments();
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
            displayshipments();
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
            displayshipments();
        }
    });

    paginationButtons.appendChild(nextButton);
}


// ==============================
// SEARCH DAN FILTER
// ==============================

function filtershipments() {
    const searchText = searchInput.value.toLowerCase().trim();

    filteredshipments = shipments.filter((shipment) => {
        const matchSearch =
            shipment.order_id.toLowerCase().includes(searchText) ||
            shipment.tracking_number.toLowerCase().includes(searchText) ||
            shipment.shipped_date.toLowerCase().includes(searchText) ||
            shipment.estimated_delivery.toLowerCase().includes(searchText);

        return matchSearch;
    });

    currentPage = 1;
    displayshipments();
}

// ==============================
// JUMLAH DATA PER HALAMAN
// ==============================

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = Number(itemsPerPageSelect.value);
    currentPage = 1;
    displayshipments();
});


// ==============================
// EVENT LISTENER
// ==============================

searchInput.addEventListener("input", filtershipments);
statusFilter.addEventListener("change", filtershipments);


// ==============================
// TAMPILKAN DATA AWAL
// ==============================

displayshipments();