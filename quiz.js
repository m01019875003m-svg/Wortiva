// ================================
// عناصر الصفحة
// ================================

const quizWord =
    document.getElementById("quizWord");

const quizOptions =
    document.getElementById("quizOptions");

const quizResult =
    document.getElementById("quizResult");

const nextQuestion =
    document.getElementById("nextQuestion");

const quizProgress =
    document.getElementById("quizProgress");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const finalScore =
    document.getElementById("finalScore");

const finalPercentage =
    document.getElementById("finalPercentage");

const earnedXP =
    document.getElementById("earnedXP");

const correctAnswers =
    document.getElementById("correctAnswers");

const retryQuiz =
    document.getElementById("retryQuiz");

const homeButton =
    document.getElementById("homeButton");


// ================================
// إعدادات الاختبار
// ================================

const selectedLevel =
    localStorage.getItem("quizLevel");

const selectedCategory =
    localStorage.getItem("quizCategory");

const selectedCount =
    Number(
        localStorage.getItem("quizCount") || 5
    );


// ================================
// الكلمات
// ================================

function getQuizWords() {

    let availableWords =
        wordsList.filter(function (word) {

            const levelMatch =
                word.level === selectedLevel;

            const categoryMatch =
                selectedCategory === "all" ||
                word.category === selectedCategory;

            return (
                levelMatch &&
                categoryMatch
            );

        });


    return shuffle(availableWords).slice(
        0,
        selectedCount
    );

}


let quizWords =
    getQuizWords();


// ================================
// المتغيرات
// ================================

let currentQuestion = 0;

let score = 0;

let answered = false;


// ================================
// خلط الكلمات
// ================================

function shuffle(array) {

    return array.sort(function () {

        return Math.random() - 0.5;

    });

}


// ================================
// إنشاء الاختيارات
// ================================

function createOptions(correctWord) {

    let options = [correctWord];


    const otherWords =
        wordsList.filter(function (word) {

            return (
                word.german !==
                correctWord.german
            );

        });


    shuffle(otherWords);


    for (
        let i = 0;
        i < 3 &&
        i < otherWords.length;
        i++
    ) {

        options.push(otherWords[i]);

    }


    return shuffle(options);

}


// ================================
// عرض السؤال
// ================================

function showQuestion() {

    if (quizWords.length === 0) {

        quizWord.textContent =
            "لا توجد كلمات كافية";

        return;

    }


    answered = false;

    quizResult.textContent = "";

    nextQuestion.style.display =
        "none";


    const word =
        quizWords[currentQuestion];


    quizWord.textContent =
        word.article
            ? word.article + " " + word.german
            : word.german;


    quizProgress.textContent =
        `السؤال ${currentQuestion + 1} من ${quizWords.length}`;


    quizOptions.innerHTML = "";


    const options =
        createOptions(word);


    options.forEach(function (option) {

        const button =
            document.createElement("button");

        button.className =
            "quiz-option";


        button.textContent =
            option.arabic;


        button.addEventListener(
            "click",
            function () {

                checkAnswer(
                    option,
                    word,
                    button
                );

            }
        );


        quizOptions.appendChild(button);

    });

}


// ================================
// التحقق من الإجابة
// ================================

function checkAnswer(
    selectedWord,
    correctWord,
    selectedButton
) {

    if (answered) {
        return;
    }


    answered = true;


    const allButtons =
        document.querySelectorAll(
            ".quiz-option"
        );


    allButtons.forEach(function (button) {

        button.disabled = true;

    });


    if (
        selectedWord.german ===
        correctWord.german
    ) {

        score++;


        quizResult.textContent =
            "✅ إجابة صحيحة! +10 XP";


        selectedButton.classList.add(
            "correct"
        );


    } else {

        quizResult.textContent =
            `❌ الإجابة الصحيحة: ${correctWord.arabic}`;


        selectedButton.classList.add(
            "wrong"
        );


        allButtons.forEach(
            function (button) {

                if (
                    button.textContent ===
                    correctWord.arabic
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    nextQuestion.style.display =
        "inline-block";

}


// ================================
// السؤال التالي
// ================================

nextQuestion.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (
            currentQuestion >=
            quizWords.length
        ) {

            finishQuiz();

            return;

        }


        showQuestion();

    }
);


// ================================
// إنهاء الاختبار
// ================================

function finishQuiz() {

    quizScreen.style.display =
        "none";

    resultScreen.style.display =
        "block";


    const total =
        quizWords.length;


    const percentage =
        total > 0
            ? Math.round((score / total) * 100)
            : 0;


    const xp =
        score * 10;


    // حفظ XP
    let totalXP =
        Number(
            localStorage.getItem("xp") || 0
        );


    totalXP += xp;


    localStorage.setItem(
        "xp",
        totalXP
    );


    // عرض النتيجة
    finalScore.textContent =
        `${score} / ${total}`;


    finalPercentage.textContent =
        `${percentage}%`;


    earnedXP.textContent =
        `${xp} XP`;


    correctAnswers.textContent =
        score;

}


// ================================
// إعادة الاختبار
// ================================

retryQuiz.addEventListener(
    "click",
    function () {

        quizWords =
            getQuizWords();

        currentQuestion = 0;

        score = 0;

        quizScreen.style.display =
            "block";

        resultScreen.style.display =
            "none";

        showQuestion();

    }
);


// ================================
// الرئيسية
// ================================

homeButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "index.html";

    }
);


// ================================
// تشغيل الاختبار
// ================================

showQuestion();