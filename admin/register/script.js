const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");


// =========================================
// SUBMIT SIGN UP
// =========================================

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
    }

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        signupMessage.textContent =
            "Konfirmasi password tidak sama.";

        signupMessage.className = "form-message error";
        return;
    }

    // Tampilkan pesan pendaftaran
    signupMessage.textContent =
        "Pendaftaran berhasil divalidasi. Silakan login.";

    signupMessage.className = "form-message success";

    // Pindah ke halaman Login setelah jeda singkat
    setTimeout(function() {
        window.location.href = "../login/index.html?registered=1";
    }, 1200);
});