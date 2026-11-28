document.addEventListener("DOMContentLoaded", function () {

    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach(function (item, index) {

        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(function () {

            item.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }, index * 150);

    });


    const informationCards =
        document.querySelectorAll(".information-card");

    informationCards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";

        setTimeout(function () {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 900 + (index * 150));

    });

});
