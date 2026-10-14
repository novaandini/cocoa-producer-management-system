javascript
document.addEventListener("DOMContentLoaded", function () {
    const ordersList = document.getElementById("ordersList");
    const emptyState = document.getElementById("emptyState");
    const emptyTitle = document.getElementById("emptyTitle");
    const emptyMessage = document.getElementById("emptyMessage");
    const searchOrder = document.getElementById("searchOrder");
    const statusFilter = document.getElementById("statusFilter");

    const totalOrders = document.getElementById("totalOrders");
    const waitingOrders = document.getElementById("waitingOrders");
    const totalValue = document.getElementById("totalValue");

    // Ambil data pesanan dari localStorage
    function getOrders() {
        try {
            const savedOrders = JSON.parse(
                localStorage.getItem("kakaoOrders") || "[]"
            );

            return Array.isArray(savedOrders) ? savedOrders : [];
        } catch (error) {
            console.error("Gagal membaca data pesanan:", error);
            return [];
        }
    }

    // Format nominal Rupiah
    function formatRupiah(value) {
        const amount = Number(value) || 0;

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Ambil status utama pesanan
    function getStatus(order) {
        return String(
            order.orderStatus ||
            order.status ||
            order.paymentStatus ||
            "Menunggu Pembayaran"
        ).trim();
    }

    // Format tanggal pesanan
    function formatDate(value) {
        if (!value) return "Tanggal tidak tersedia";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    // Tentukan class warna status
    function getStatusClass(status) {
        const value = status.toLowerCase();

        if (value.includes("selesai")) return "selesai";
        if (value.includes("kirim")) return "dikirim";
        if (value.includes("batal")) return "dibatalkan";
        if (value.includes("proses")) return "diproses";

        return "";
    }

    // Buat elemen teks agar data tetap aman ditampilkan
    function createTextElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        element.textContent = text;

        return element;
    }

    // Perbarui statistik
    function updateStats(orders) {
        totalOrders.textContent = orders.length;

        const waiting = orders.filter(function (order) {
            const status = getStatus(order).toLowerCase();

            return (
                status.includes("menunggu verifikasi") ||
                status.includes("menunggu pembayaran") ||
                status.includes("belum dibayar")
            );
        });

        waitingOrders.textContent = waiting.length;

        const sum = orders.reduce(function (total, order) {
            return total + (Number(order.total) || 0);
        }, 0);

        totalValue.textContent = formatRupiah(sum);
    }

    // Tampilkan satu kartu pesanan
    function createOrderCard(order) {
        const card = document.createElement("article");
        card.className = "order-card";

        const info = document.createElement("div");
        info.className = "order-info";

        const orderNumber = order.orderNumber || order.id || "Pesanan";
        const productName = order.productName || order.product || "Produk Kakao";
        const quantity = Number(order.quantity) || 1;
        const total = order.total ?? order.totalPrice ?? 0;
        const status = getStatus(order);

        info.appendChild(
            createTextElement("h3", "", "#" + orderNumber)
        );

        info.appendChild(
            createTextElement("p", "", "Produk: " + productName)
        );

        info.appendChild(
            createTextElement("p", "", "Jumlah: " + quantity)
        );

        info.appendChild(
            createTextElement("p", "", "Total: " + formatRupiah(total))
        );

        info.appendChild(
            createTextElement("p", "", "Tanggal: " + formatDate(order.createdAt))
        );

        const statusContainer = document.createElement("div");
        statusContainer.className = "order-status";

        const statusLabel = createTextElement(
            "span",
            "status " + getStatusClass(status),
            status
        );

        statusContainer.appendChild(statusLabel);

        card.appendChild(info);
        card.appendChild(statusContainer);

        return card;
    }

    // Render daftar pesanan sesuai pencarian dan filter
    function renderOrders() {
        const orders = getOrders();

        const keyword = searchOrder.value
            .toLowerCase()
            .trim();

        const selectedStatus = statusFilter.value;

        const filteredOrders = orders.filter(function (order) {
            const number = String(
                order.orderNumber || order.id || ""
            ).toLowerCase();

            const product = String(
                order.productName || order.product || ""
            ).toLowerCase();

            const status = getStatus(order);

            const matchesSearch =
                number.includes(keyword) ||
                product.includes(keyword);

            const matchesStatus =
                selectedStatus === "all" ||
                status.toLowerCase() === selectedStatus.toLowerCase();

            return matchesSearch && matchesStatus;
        });

        ordersList.replaceChildren();

        filteredOrders.forEach(function (order) {
            ordersList.appendChild(createOrderCard(order));
        });

        // Perbarui statistik berdasarkan semua pesanan
        updateStats(orders);

        // Tampilkan pesan kosong sesuai kondisi
        if (filteredOrders.length === 0) {
            emptyState.style.display = "block";

            if (orders.length === 0) {
                emptyTitle.textContent = "Belum Ada Riwayat Pesanan";
                emptyMessage.textContent =
                    "Pesanan yang sudah dibuat akan muncul di sini.";
            } else {
                emptyTitle.textContent = "Pesanan Tidak Ditemukan";
                emptyMessage.textContent =
                    "Coba ubah kata pencarian atau filter status.";
            }
        } else {
            emptyState.style.display = "none";
        }
    }

    // Event pencarian dan filter
    searchOrder.addEventListener("input", renderOrders);
    statusFilter.addEventListener("change", renderOrders);

    // Render awal
    renderOrders();
});
