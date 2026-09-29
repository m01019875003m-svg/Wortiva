const levelCards =
    document.querySelectorAll(".level-card");


levelCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const level =
            this.dataset.level;

        localStorage.setItem(
            "netzwerkLevel",
            level
        );

        window.location.href =
            "netzwerk-kapitel.html";

    });

});