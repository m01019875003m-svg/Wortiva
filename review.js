
// =====================================
// Wortiva - المراجعة الذكية
// =====================================

const allWords = netzwerkA1Words || [];


// =====================================
// عناصر الصفحة
// =====================================

const germanWord =
    document.getElementById("germanWord");

const articleWord =
    document.getElementById("articleWord");

const answerInput =
    document.getElementById("answerInput");

const showAnswerButton =
    document.getElementById("showAnswerButton");

const correctAnswer =
    document.getElementById("correctAnswer");

const arabicAnswer =
    document.getElementById("arabicAnswer");

const againButton =
    document.getElementById("againButton");

const knownButton =
    document.getElementById("knownButton");

const progressText =
    document.getElementById("progressText");

const reviewArea =
    document.getElementById("reviewArea");

const finishedArea =
    document.getElementById("finishedArea");

const resultText =
    document.getElementById("resultText");

const chapterSelect =
    document.getElementById("chapterSelect");

const multipleChoiceArea =
    document.getElementById(
        "multipleChoiceArea"
    );

const choiceButtons =
    document.getElementById(
        "choiceButtons"
    );


// =====================================
// بيانات المراجعة
// =====================================

let reviewData =
    JSON.parse(
        localStorage.getItem(
            "wortivaReviewData"
        ) || "{}"
    );


const speakButton = document.getElementById("speakButton");

if (speakButton) {
    speakButton.addEventListener("click", function () {
        const word = reviewWords[currentIndex];

        if (!word) return;

        const textToSpeak =
            (word.article ? word.article + " " : "") +
            word.german.trim();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        utterance.lang = "de-DE";
        utterance.rate = 0.85;
        utterance.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
}


// =====================================
// مفتاح فريد لكل كلمة
// =====================================

function getWordKey(word) {

    return (
        word.chapter +
        "-" +
        word.category +
        "-" +
        word.order
    );

}


// =====================================
// مستويات المراجعة
// =====================================

function getNextReviewDate(level) {

    const intervals = [

        0,
        1,
        3,
        7,
        14,
        30,
        60

    ];

    const days =
        intervals[
            Math.min(
                level,
                intervals.length - 1
            )
        ];

    const date =
        new Date();

    date.setDate(
        date.getDate() + days
    );

    return date.getTime();

}


// =====================================
// هل الكلمة مستحقة للمراجعة؟

function isDue(word) {

    const key =
        getWordKey(word);

    const data =
        reviewData[key];


    // كلمة جديدة
    if (!data) {
        return true;
    }


    // محتاجة مراجعة
    if (data.needsReview === true) {
        return true;
    }


    // موعدها لم يأتِ
    if (
        data.nextReview &&
        Date.now() < data.nextReview
    ) {

        return false;

    }


    return true;

}


// =====================================
// الكلمات الحالية
// =====================================

let reviewWords = [];

function getSelectedWords() {

    const selectedChapter =
        chapterSelect
            ? chapterSelect.value
            : "all";


    if (selectedChapter === "all") {

        return allWords.slice();

    }


    return allWords.filter(
        function(word) {

            return (
                String(word.chapter) ===
                String(selectedChapter)
            );

        }
    );

}


// =====================================
// تجهيز المراجعة
// =====================================

function prepareReviewWords() {

    const selectedWords =
        getSelectedWords();


    const dueWords =
        selectedWords.filter(
            function(word) {

                return isDue(word);

            }
        );


    if (dueWords.length > 0) {

        reviewWords =
            dueWords.slice();

    }

    else {

        reviewWords =
            selectedWords.slice();

    }


    // الكلمات الأضعف أولًا
    reviewWords.sort(
        function(a, b) {

            const aData =
                reviewData[
                    getWordKey(a)
                ];

            const bData =
                reviewData[
                    getWordKey(b)
                ];


            const aLevel =
                aData
                    ? (aData.level || 0)
                    : 0;

            const bLevel =
                bData
                    ? (bData.level || 0)
                    : 0;


            if (
                aLevel !==
                bLevel
            ) {

                return (
                    aLevel -
                    bLevel
                );

            }


            return (
                (a.order || 0) -
                (b.order || 0)
            );

        }
    );

}


// =====================================
// المتغيرات
// =====================================

let currentIndex = 0;

let knownCount = 0;

let reviewAgainCount = 0;

let questionAnswered = false;

let currentQuestionType = "";


// =====================================
// اختيار نوع السؤال
// =====================================

function getQuestionType() {

    const random =
        Math.random();


    if (random < 0.5) {

        return "writing";

    }


    return "choice";

}


// =====================================
// عرض الكلمة
// =====================================

function showCurrentWord() {

    if (
        currentIndex >=
        reviewWords.length
    ) {

        showFinishedScreen();

        return;

    }


    const word =
        reviewWords[currentIndex];


    questionAnswered =
        false;


    currentQuestionType =
        getQuestionType();


    // الكلمة
    germanWord.textContent =
        word.german.trim();


    // الأداة
    if (word.article) {

        articleWord.textContent =
            word.article;

    }

    else {

        articleWord.textContent =
            "";

    }


    // تحديث التقدم
    progressText.textContent =
        `كلمة ${currentIndex + 1} من ${reviewWords.length}`;


    // إخفاء الإجابة
    correctAnswer.style.display =
        "none";


    // إعادة خانة الكتابة
    answerInput.value =
        "";


    // إظهار أزرار التقييم
    againButton.style.display =
        "block";

    knownButton.style.display =
        "block";


    // السؤال الكتابي
    if (
        currentQuestionType ===
        "writing"
    ) {

        showWritingQuestion();

    }

    // الاختيار
    else {

        showChoiceQuestion();

    }

}


// =====================================
// سؤال الكتابة
// =====================================

function showWritingQuestion() {

    multipleChoiceArea.style.display =
        "none";


    answerInput.style.display =
        "block";


    showAnswerButton.style.display =
        "block";


    answerInput.placeholder =
        "اكتب المعنى بالعربي";


    answerInput.focus();

}


// =====================================
// سؤال الاختيار
// =====================================

function showChoiceQuestion() {

    answerInput.style.display =
        "none";


    showAnswerButton.style.display =
        "none";


    multipleChoiceArea.style.display =
        "block";


    createChoices();

}


// =====================================
// إنشاء الاختيارات
// =====================================

function createChoices() {

    choiceButtons.innerHTML =
        "";


    const correctWord =
        reviewWords[currentIndex];


    const selectedWords =
        getSelectedWords();


    let choices = [

        correctWord

    ];


    const otherWords =
        selectedWords.filter(
            function(word) {

                return (
                    getWordKey(word) !==
                    getWordKey(correctWord)
                );

            }
        );


    // خلط الكلمات
    otherWords.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

        }
    );


    // إضافة 3 اختيارات
    for (
        let i = 0;
        i < otherWords.length &&
        choices.length < 4;
        i++
    ) {

        const word =
            otherWords[i];


        const duplicate =
            choices.some(
                function(item) {

                    return (
                        item.arabic ===
                        word.arabic
                    );

                }
            );


        if (!duplicate) {

            choices.push(word);

        }

    }


    // خلط الاختيارات
    choices.sort(
        function() {

            return (
                Math.random() -
                0.5
            );

        }
    );


    choices.forEach(
        function(word) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                word.arabic || "—";


            button.className =
                "choice-button";


            button.addEventListener(
                "click",
                function() {

                    if (
                        questionAnswered
                    ) {

                        return;

                    }


                    questionAnswered =
                        true;


                    const isCorrect =
                        getWordKey(word) ===
                        getWordKey(correctWord);


                    if (isCorrect) {

                        button.classList.add(
                            "correct-choice"
                        );

                        markQuestionButtons();

                        saveWordResult(
                            correctWord,
                            true
                        );

                        knownCount++;


                        setTimeout(
                            function() {

                                nextWord();

                            },
                            700
                        );

                    }

                    else {

                        button.classList.add(
                            "wrong-choice"
                        );


                        // إظهار الإجابة الصحيحة
                        showCorrectChoice(
                            correctWord
                        );


                        markQuestionButtons();


                        saveWordResult(
                            correctWord,
                            false
                        );


                        reviewAgainCount++;


                        setTimeout(
                            function() {

                                nextWord();

                            },
                            1200
                        );

                    }

                }
            );


            choiceButtons.appendChild(
                button
            );

        }
    );

}


// =====================================
// إظهار الإجابة الصحيحة
// =====================================

function showCorrectChoice(
    correctWord
) {

    const buttons =
        choiceButtons
            .querySelectorAll(
                "button"
            );


    buttons.forEach(
        function(button) {

            if (
                button.textContent ===
                correctWord.arabic
            ) {

                button.classList.add(
                    "correct-choice"
                );

            }

        }
    );

}


// =====================================
// تعطيل الاختيارات
// =====================================

function markQuestionButtons() {

    const buttons =
        choiceButtons
            .querySelectorAll(
                "button"
            );


    buttons.forEach(
        function(button) {

            button.disabled =
                true;

        }
    );

}


// =====================================
// إظهار الإجابة في سؤال الكتابة
// =====================================

showAnswerButton.addEventListener(
    "click",
    function() {

        if (
            questionAnswered
        ) {

            return;

        }


        const word =
            reviewWords[currentIndex];


        arabicAnswer.textContent =
            word.arabic || "—";


        correctAnswer.style.display =
            "block";


        showAnswerButton.style.display =
            "none";


        questionAnswered =
            true;

    }
);


// =====================================
// حفظ نتيجة الكلمة
// =====================================

function saveWordResult(
    word,
    known
) {

    const key =
        getWordKey(word);


    const oldData =
        reviewData[key] || {

            level: 0

        };


    let level =
        oldData.level || 0;


    if (known) {

        level++;

        if (level > 6) {

            level = 6;

        }

    }

    else {

        level = 0;

    }


    reviewData[key] = {

        level:
            level,

        needsReview:
            !known,

        lastReviewed:
            Date.now(),

        nextReview:
            getNextReviewDate(level)

    };


    localStorage.setItem(
        "wortivaReviewData",
        JSON.stringify(reviewData)
    );

// =====================================
// XP + Streak
// =====================================

if (known) {
    registerActivity(5);
} else {
    registerActivity(1);
}
}


// =====================================
// زر محتاج مراجعة
// =====================================

againButton.addEventListener(
    "click",
    function() {

        if (
            currentQuestionType ===
            "choice" &&
            questionAnswered
        ) {

            return;

        }


        const word =
            reviewWords[currentIndex];


        saveWordResult(
            word,
            false
        );


        reviewAgainCount++;


        nextWord();

    }
);


// =====================================
// زر عرفتها
// =====================================

knownButton.addEventListener(
    "click",
    function() {

        if (
            currentQuestionType ===
            "choice" &&
            questionAnswered
        ) {

            return;

        }


        const word =
            reviewWords[currentIndex];


        saveWordResult(
            word,
            true
        );


        knownCount++;


        nextWord();

    }
);


// =====================================
// الكلمة التالية
// =====================================

function nextWord() {

    currentIndex++;


    if (
        currentIndex >=
        reviewWords.length
    ) {

        showFinishedScreen();

        return;

    }


    showCurrentWord();

}


// =====================================
// شاشة النهاية
// =====================================

function showFinishedScreen() {
// مكافأة إنهاء جلسة المراجعة

if (!window.reviewSessionBonusGiven) {

    addXP(20);

    window.reviewSessionBonusGiven = true;

}

    reviewArea.style.display =
        "none";


    finishedArea.style.display =
        "block";


    resultText.textContent =
        `راجعت ${reviewWords.length} كلمة — عرفت ${knownCount} كلمة، وتحتاج ${reviewAgainCount} كلمة إلى مراجعة إضافية.`;

}


// =====================================
// تغيير Kapitel
// =====================================

if (chapterSelect) {

    chapterSelect.addEventListener(
        "change",
        function() {

            currentIndex = 0;

            knownCount = 0;

            reviewAgainCount = 0;

            reviewArea.style.display =
                "block";

            finishedArea.style.display =
                "none";

            prepareReviewWords();

            showCurrentWord();

        }
    );

}


// =====================================
// تشغيل المراجعة
// =====================================

prepareReviewWords();

showCurrentWord();

