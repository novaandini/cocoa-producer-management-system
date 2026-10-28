const loginForm = document.getElementById("loginForm");
const forgotPassword = document.getElementById("forgotPassword");
const message = document.getElementById("message");

const LOGIN_API_URL = "http://127.0.0.1:8000/api/auth/login";

// =========================================
// PESAN SETELAH BERHASIL DAFTAR
// =========================================

const params = new URLSearchParams(window.location.search);

if (params.get("registered") === "1") {
    message.textContent = "Silakan login dengan akun kamu.";
    message.className = "form-message success";
}


// =========================================
// LUPA PASSWORD
// =========================================

forgotPassword.addEventListener("click", function(event) {
    event.preventDefault();

    message.textContent =
        "Fitur lupa password belum tersedia.";

    message.className = "form-message";
});


// =========================================
// SUBMIT LOGIN
// =========================================

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    const payload = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch(LOGIN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            window.location.href = "../dashboard/index.html";
            localStorage.setItem("auth_token", data.token);
            localStorage.setItem("auth_user", JSON.stringify(data.user));
        } else {
            // Login failed
            message.textContent = data.message || "Login gagal.";
            message.className = "form-message error";
        }
    } catch (error) {
        console.error("Error during login:", error);
        message.textContent = "Terjadi kesalahan. Silakan coba lagi.";
        message.className = "form-message error";
    }
});