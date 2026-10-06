const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (nama === "" || email === "" || password === "") {
        message.textContent = "Semua data harus diisi!";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password minimal 6 karakter!";
        message.style.color = "red";
        return;
    }

    message.textContent = "Pendaftaran berhasil!";
    message.style.color = "green";

    form.reset();
});