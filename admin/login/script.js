const loginForm = document.getElementById("loginForm");
const forgotPassword = document.getElementById("forgotPassword");
const message = document.getElementById("message");


// =========================================
// PESAN SETELAH BERHASIL DAFTAR
// (dikirim dari halaman register lewat ?registered=1)
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

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    // Simulasi login frontend
    window.location.href = "../dashboard/index.html";
});