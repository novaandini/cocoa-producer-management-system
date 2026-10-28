const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

const REGISTER_API_URL =
    "http://127.0.0.1:8000/api/auth/register";


// =========================================
// SUBMIT SIGN UP
// =========================================

signupForm.addEventListener("submit", async function(event) {
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

    const payload = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone_number: document
            .getElementById("phoneNumber")
            .value.trim(),
        password: newPassword,
        password_confirmation: confirmPassword
    };

    signupMessage.textContent = "Mendaftarkan akun...";
    signupMessage.className = "form-message";

    try {
        const response = await fetch(REGISTER_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const validationErrors = data.errors
                ? Object.values(data.errors).flat().join(" ")
                : "";

            throw new Error(
                validationErrors || data.message || "Pendaftaran gagal."
            );
        }

        // API mengembalikan token setelah register berhasil.
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.user));

        signupMessage.textContent =
            data.message || "Pendaftaran berhasil.";
        signupMessage.className = "form-message success";

        setTimeout(function () {
            window.location.href = "../login/index.html?registered=1";
        }, 1200);
    } catch (error) {
        signupMessage.textContent = error.message;
        signupMessage.className = "form-message error";
    }
});
