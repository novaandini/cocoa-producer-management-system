```javascript
const customerTable = document.getElementById("customerTable");
const searchCustomer = document.getElementById("searchCustomer");
const customerFilter = document.getElementById("customerFilter");
const emptyState = document.getElementById("emptyState");

const customerModal = document.getElementById("customerModal");
const closeModal = document.getElementById("closeModal");

function filterCustomers() {
    const rows = customerTable.querySelectorAll("tr");
    const keyword = searchCustomer.value.toLowerCase().trim();
    const selectedStatus = customerFilter.value;

    let visibleCount = 0;

    rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        const status = row.dataset.status;

        const matchesSearch = text.includes(keyword);

        const matchesStatus =
            selectedStatus === "" || status === selectedStatus;

        const showRow = matchesSearch && matchesStatus;

        row.style.display = showRow ? "" : "none";

        if (showRow) {
            visibleCount++;
        }
    });

    emptyState.classList.toggle("show", visibleCount === 0);
}

function showCustomerDetail(row) {
    document.getElementById("detailId").textContent = row.dataset.id;
    document.getElementById("detailName").textContent = row.dataset.name;
    document.getElementById("detailEmail").textContent = row.dataset.email;
    document.getElementById("detailPhone").textContent = row.dataset.phone;
    document.getElementById("detailOrders").textContent =
        row.dataset.orders + " pesanan";
    document.getElementById("detailStatus").textContent = row.dataset.status;

    customerModal.classList.add("show");
}

searchCustomer.addEventListener("input", filterCustomers);
customerFilter.addEventListener("change", filterCustomers);

customerTable.addEventListener("click", function (event) {
    const button = event.target.closest(".detail-button");

    if (!button) return;

    const row = button.closest("tr");
    showCustomerDetail(row);
});

closeModal.addEventListener("click", function () {
    customerModal.classList.remove("show");
});

customerModal.addEventListener("click", function (event) {
    if (event.target === customerModal) {
        customerModal.classList.remove("show");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        customerModal.classList.remove("show");
    }
});

filterCustomers();
```