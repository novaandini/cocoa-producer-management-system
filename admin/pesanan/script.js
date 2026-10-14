```javascript
const ordersTable = document.getElementById("ordersTable");
const searchOrder = document.getElementById("searchOrder");
const statusFilter = document.getElementById("statusFilter");
const emptyState = document.getElementById("emptyState");

function updateStatusStyle(select) {
    select.classList.remove(
        "pending",
        "process",
        "shipped",
        "done",
        "cancelled"
    );

    const classes = {
        "Menunggu Pembayaran": "pending",
        "Diproses": "process",
        "Dikirim": "shipped",
        "Selesai": "done",
        "Dibatalkan": "cancelled"
    };

    select.classList.add(classes[select.value] || "pending");
}

function filterOrders() {
    if (!ordersTable) return;

    const rows = ordersTable.querySelectorAll("tr");
    const keyword = searchOrder.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    let visibleCount = 0;

    rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        const statusSelect = row.querySelector(".order-status-select");

        const matchesSearch = text.includes(keyword);

        const matchesStatus =
            selectedStatus === "" ||
            (statusSelect && statusSelect.value === selectedStatus);

        const showRow = matchesSearch && matchesStatus;

        row.style.display = showRow ? "" : "none";

        if (showRow) {
            visibleCount++;
        }
    });

    if (emptyState) {
        emptyState.classList.toggle("show", visibleCount === 0);
    }
}

if (ordersTable) {
    const statusSelects = ordersTable.querySelectorAll(
        ".order-status-select"
    );

    statusSelects.forEach(function (select) {
        updateStatusStyle(select);

        select.addEventListener("change", function () {
            updateStatusStyle(select);
            filterOrders();
        });
    });
}

if (searchOrder) {
    searchOrder.addEventListener("input", filterOrders);
}

if (statusFilter) {
    statusFilter.addEventListener("change", filterOrders);
}

filterOrders();
```