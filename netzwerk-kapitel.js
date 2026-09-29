const selectedLevel =
    localStorage.getItem("netzwerkLevel") || "A1";

const netzwerkTitle =
    document.getElementById("netzwerkTitle");

const kapitelList =
    document.getElementById("kapitelList");


// ================================
// Kapitel Netzwerk A1
// ================================

const chaptersA1 = [

    {
        number: 1,
        title: "Guten Tag!"
    },

    {
        number: 2,
        title: "Freunde, Kollegen und ich"
    },

    {
        number: 3,
        title: "In Hamburg"
    },

    {
        number: 4,
        title: "Guten Appetit!"
    },

    {
        number: 5,
        title: "Alltag und Familie"
    },

    {
        number: 6,
        title: "Zeit mit Freunden"
    },

    {
        number: 7,
        title: "Arbeitsalltag"
    },

    {
        number: 8,
        title: "Fit und gesund"
    },

    {
        number: 9,
        title: "Meine Wohnung"
    },

    {
        number: 10,
        title: "Studium und Beruf"
    },

    {
        number: 11,
        title: "Die Jacke gefällt mir!"
    },

    {
        number: 12,
        title: "Ab in den Urlaub!"
    }

];


// ================================
// عرض المستوى
// ================================

netzwerkTitle.textContent =
    `Netzwerk ${selectedLevel}`;


// ================================
// عرض Kapitel
// ================================

if (selectedLevel === "A1") {

    chaptersA1.forEach(function (chapter) {

        const button =
            document.createElement("button");

        button.className = "level-card";

        button.innerHTML = `
            <strong>
                Kapitel ${chapter.number}
            </strong>

            <span>
                ${chapter.title}
            </span>
        `;

        button.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "netzwerkKapitel",
                    chapter.number
                );

                localStorage.setItem(
                    "netzwerkKapitelTitle",
                    chapter.title
                );

                window.location.href =
                    "netzwerk-categories.html";

            }
        );

        kapitelList.appendChild(button);

    });

} else {

    kapitelList.innerHTML = `

        <div class="hero">

            <h2>📚 Netzwerk ${selectedLevel}</h2>

            <p>
                Kapitel هذا المستوى سيتم إضافتها
                من ملف Netzwerk الخاص به.
            </p>

        </div>

    `;

}