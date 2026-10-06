const paymentForm = document.getElementById("paymentForm");
const paymentContent = document.getElementById("paymentContent");

const paymentDetail = document.getElementById("paymentDetail");
const paymentTitle = document.getElementById("paymentTitle");
const paymentDetailContent = document.getElementById("paymentDetailContent");

const paidButton = document.getElementById("paidButton");
const changePayment = document.getElementById("changePayment");

const paymentSuccess = document.getElementById("paymentSuccess");


paymentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
    );


    if (!selectedPayment) {

        alert("Silakan pilih metode pembayaran terlebih dahulu.");

        return;
    }


    const paymentMethod = selectedPayment.value;


    if (paymentMethod === "bank") {

        paymentTitle.textContent = "Transfer Bank";

        paymentDetailContent.innerHTML = `
            <div class="payment-account">

                <span>Bank Tujuan</span>

                <strong>Bank BCA</strong>

            </div>


            <div class="payment-account">

                <span>Nomor Rekening</span>

                <strong>1234567890</strong>

                <p>
                    a.n. Produsen Kakao
                </p>

            </div>
        `;

    }


    if (paymentMethod === "va") {

        paymentTitle.textContent = "Virtual Account";

        paymentDetailContent.innerHTML = `
            <div class="payment-account">

                <span>Nomor Virtual Account</span>

                <strong>8808 1234 5678 9012</strong>

                <p>
                    Gunakan nomor ini untuk menyelesaikan pembayaran.
                </p>

            </div>
        `;

    }


    if (paymentMethod === "qris") {

        paymentTitle.textContent = "Pembayaran QRIS";

        paymentDetailContent.innerHTML = `
            <div class="qris-area">

                <div class="qris-placeholder">
                    QRIS
                </div>

                <p>
                    Scan QR menggunakan aplikasi pembayaran
                    yang mendukung QRIS.
                </p>

            </div>
        `;

    }


    paymentContent.style.display = "none";

    paymentDetail.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


changePayment.addEventListener("click", function() {

    paymentDetail.style.display = "none";

    paymentContent.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


paidButton.addEventListener("click", function() {

    paymentDetail.style.display = "none";

    paymentSuccess.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});