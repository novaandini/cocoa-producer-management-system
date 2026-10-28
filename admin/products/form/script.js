const API_URL = "http://127.0.0.1:8000/api/products";
const form = document.getElementById("form");
const storeMessage = document.getElementById("storeMessage");
const productId = new URLSearchParams(window.location.search).get("id");
const isEditMode = Boolean(productId);

if (isEditMode) {
    document.querySelector(".topbar h1").textContent = "Edit Produk";
    document.querySelector(".form-card h1").textContent = "Edit Produk";
    loadProduct(productId);
}

async function loadProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Gagal mengambil data produk.");
        }

        const product = result.data || result;

        document.getElementById("product_code").value = product.product_code || "";
        document.getElementById("product_name").value = product.product_name || "";
        document.getElementById("product_type").value = product.product_type || "";
        document.getElementById("grade").value = product.grade || "";
        document.getElementById("price_per_kg").value = product.price_per_kg || "";
        document.getElementById("description").value = product.description || "";
        document.getElementById("is_active").value = product.is_active == true ? "1" : "0";
    } catch (error) {
        storeMessage.textContent = error.message;
        storeMessage.className = "form-message error";
    }
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData();

    formData.append(
        "product_code",
        document.getElementById("product_code").value.trim()
    );
    formData.append(
        "product_name",
        document.getElementById("product_name").value.trim()
    );
    formData.append(
        "product_type",
        document.getElementById("product_type").value
    );
    formData.append("grade", document.getElementById("grade").value);
    formData.append(
        "price_per_kg",
        document.getElementById("price_per_kg").value
    );
    formData.append(
        "description",
        document.getElementById("description").value.trim()
    );
    formData.append(
        "is_active",
        document.getElementById("is_active").value
    );

    const imageInput = document.getElementById("image");
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    // Laravel accepts multipart updates reliably through method spoofing.
    const endpoint = isEditMode ? `${API_URL}/${productId}` : API_URL;
    if (isEditMode) {
        formData.append("_method", "PUT");
    }

    storeMessage.textContent = isEditMode
        ? "Memperbarui produk..."
        : "Menambahkan produk...";
    storeMessage.className = "form-message";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getAuthToken()}`
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            const validationErrors = data.errors
                ? Object.values(data.errors).flat().join(" ")
                : "";

            throw new Error(
                validationErrors || data.message || "Operasi produk gagal."
            );
        }

        storeMessage.textContent = data.message ||
            (isEditMode
                ? "Produk berhasil diperbarui."
                : "Produk berhasil ditambahkan.");
        storeMessage.className = "form-message success";

        setTimeout(() => {
            window.location.href = "../list/index.html";
        }, 1000);
    } catch (error) {
        storeMessage.textContent = error.message;
        storeMessage.className = "form-message error";
    }
});
