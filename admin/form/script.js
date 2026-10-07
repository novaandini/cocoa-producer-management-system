const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    window.location.href = "../index/index.html";
});