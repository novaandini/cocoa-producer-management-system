
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const forgotPassword = document.getElementById("forgotPassword");

const message = document.getElementById("message");
const signupMessage = document.getElementById("signupMessage");


// =========================================
// PINDAH KE SIGN UP
// =========================================

showSignup.addEventListener("click", function(event) {
    event.preventDefault();

    loginView.hidden = true;
    signupView.hidden = false;

    loginForm.reset();
    message.textContent = "";
    message.className = "form-message";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =========================================
// KEMBALI KE LOGIN
// =========================================

showLogin.addEventListener("click", function(event) {
    event.preventDefault();

    signupView.hidden = true;
    loginView.hidden = false;

    signupForm.reset();
    signupMessage.textContent = "";
    signupMessage.className = "form-message";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


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

    // Kembali ke Login setelah jeda singkat
    setTimeout(function() {
        signupView.hidden = true;
        loginView.hidden = false;

        signupForm.reset();

        signupMessage.textContent = "";
        signupMessage.className = "form-message";

        // Bersihkan form login agar siap digunakan
        loginForm.reset();

        message.textContent =
            "Silakan login dengan akun kamu.";

        message.className = "form-message success";

    }, 1200);
});

