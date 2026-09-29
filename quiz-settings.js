const quizLevel =
    document.getElementById("quizLevel");

const quizCategory =
    document.getElementById("quizCategory");

const questionCount =
    document.getElementById("questionCount");

const startQuizButton =
    document.getElementById("startQuizButton");

const quizSettingsMessage =
    document.getElementById("quizSettingsMessage");


startQuizButton.addEventListener(
    "click",
    function () {

        const level =
            quizLevel.value;

        const category =
            quizCategory.value;

        const count =
            Number(questionCount.value);


        let availableWords =
            wordsList.filter(function (word) {

                const levelMatch =
                    word.level === level;

                const categoryMatch =
                    category === "all" ||
                    word.category === category;

                return (
                    levelMatch &&
                    categoryMatch
                );

            });


        if (availableWords.length === 0) {

            quizSettingsMessage.textContent =
                "❌ لا توجد كلمات متاحة بهذه الاختيارات.";

            return;

        }


        if (availableWords.length < count) {

            quizSettingsMessage.textContent =
                `⚠️ يوجد فقط ${availableWords.length} كلمات متاحة. اختر عددًا أقل.`;

            return;

        }


        localStorage.setItem(
            "quizLevel",
            level
        );

        localStorage.setItem(
            "quizCategory",
            category
        );

        localStorage.setItem(
            "quizCount",
            count
        );


        window.location.href =
            "quiz.html";

    }
);