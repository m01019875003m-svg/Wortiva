
// =====================================
// Wortiva - نظام الاختبارات
// =====================================

const allWords = netzwerkA1Words || [];


// =====================================
// عناصر الصفحة
// =====================================

const testChapterSelect =
    document.getElementById("testChapterSelect");

const testArea =
    document.getElementById("testArea");

const testFinished =
    document.getElementById("testFinished");

const testGermanWord =
    document.getElementById("testGermanWord");

const testArticle =
    document.getElementById("testArticle");

const testChoices =
    document.getElementById("testChoices");

const questionProgress =
    document.getElementById("questionProgress");

const testResult =
    document.getElementById("testResult");

const restartTestButton =
    document.getElementById("restartTestButton");


// =====================================
// إعدادات الاختبار
// =====================================

const QUESTIONS_PER_TEST = 10;
// =====================================
//  // XP الاختبار 
// // ===================================== 
const XP_CORRECT_ANSWER = 5;
 const XP_WRONG_ANSWER = 1;
  const XP_FINISH_TEST = 20;

  let testFinishBonusGiven = false;
let testWords = [];

let currentQuestion = 0;

let score = 0;

let questionAnswered = false;


// =====================================
// الحصول على الكلمات المختارة
// =====================================

function getSelectedWords() {

    const selectedChapter =
        testChapterSelect.value;

    if (selectedChapter === "all") {

        return allWords.slice();

    }

    return allWords.filter(function(word) {

        return String(word.chapter) ===
            String(selectedChapter);

    });

}


// =====================================
// خلط الكلمات
// =====================================

function shuffle(array) {

    const copy = array.slice();

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] =
            [copy[j], copy[i]];

    }

    return copy;
}


// =====================================
// بدء اختبار جديد
// =====================================

function startTest() {

    const selectedWords =
        getSelectedWords();


    if (selectedWords.length === 0) {

        return;

    }


    testWords =
        shuffle(selectedWords)
        .slice(
            0,
            Math.min(
                QUESTIONS_PER_TEST,
                selectedWords.length
            )
        );


    currentQuestion = 0;

   score = 0;
    questionAnswered = false;

    testFinishBonusGiven = false;

    testArea.style.display = "block";

    testFinished.style.display = "none";


    showQuestion();

}


// =====================================
// عرض السؤال
// =====================================

function showQuestion() {

    if (
        currentQuestion >=
        testWords.length
    ) {

        finishTest();

        return;

    }


    const word =
        testWords[currentQuestion];


    questionAnswered = false;


    // الكلمة الألمانية

    testGermanWord.textContent =
        word.german.trim();


    // أداة التعريف

    if (word.article) {

        testArticle.textContent =
            word.article;

    } else {

        testArticle.textContent =
            "";

    }


    // رقم السؤال

    questionProgress.textContent =
        `سؤال ${currentQuestion + 1} من ${testWords.length}`;


    // إنشاء الاختيارات

    createChoices(word);

}


// =====================================
// إنشاء الاختيارات
// =====================================

function createChoices(correctWord) {

    testChoices.innerHTML = "";


    let choices = [
        correctWord
    ];


    const otherWords =
        allWords.filter(function(word) {

            return word !== correctWord &&
                   word.arabic &&
                   word.arabic !== correctWord.arabic;

        });


    const shuffledOthers =
        shuffle(otherWords);


    for (
        let i = 0;
        i < shuffledOthers.length &&
        choices.length < 4;
        i++
    ) {

        choices.push(
            shuffledOthers[i]
        );

    }


    choices =
        shuffle(choices);


    choices.forEach(function(word) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "test-choice";


        button.textContent =
            word.arabic || "—";


        button.addEventListener(
            "click",
            function() {

                answerQuestion(
                    button,
                    word,
                    correctWord
                );

            }
        );


        testChoices.appendChild(
            button
        );

    });

}


// =====================================
// الإجابة على السؤال
// =====================================

function answerQuestion(
    selectedButton,
    selectedWord,
    correctWord
) {

    if (questionAnswered) {

        return;

    }


    questionAnswered = true;


    const buttons =
        testChoices.querySelectorAll(
            "button"
        );


    buttons.forEach(function(button) {

        button.disabled = true;

    });


    const isCorrect =
        selectedWord === correctWord;


   if (isCorrect) { 
    selectedButton.classList.add( "correct" );
     score++;
      // إجابة صحيحة 
       registerActivity(XP_CORRECT_ANSWER);
     } else { 
        selectedButton.classList.add( "wrong" );
         // إجابة خاطئة 
         registerActivity(XP_WRONG_ANSWER);
          buttons.forEach(function(button) {
             if ( 
                button.textContent ===
                 correctWord.arabic
                 ) {
                     button.classList.add( "correct" );
                     }
                     });
     

        selectedButton.classList.add(
            "wrong"
        );


        buttons.forEach(function(button) {

            if (
                button.textContent ===
                correctWord.arabic
            ) {

                button.classList.add(
                    "correct"
                );

            }

        });

    }


    // الانتقال للسؤال التالي

    setTimeout(function() {

        currentQuestion++;

        showQuestion();

    }, isCorrect ? 700 : 1200);

}


// =====================================
// إنهاء الاختبار
// =====================================

function finishTest() {
    
const oldCompletedTests =
    Number(
        localStorage.getItem(
            "wortivaCompletedTests"
        ) || 0
    );

localStorage.setItem(
    "wortivaCompletedTests",
    String(oldCompletedTests + 1)
);


if (!testFinishBonusGiven)
     { addXP(XP_FINISH_TEST);
     testFinishBonusGiven = true; }

    testArea.style.display =
        "none";


    testFinished.style.display =
        "block";


    const total =
        testWords.length;


    const percentage =
        total > 0
            ? Math.round(
                (score / total) * 100
              )
            : 0;


    let message = "";


    if (percentage === 100) {

        message =
            "🏆 ممتاز! أجبت على كل الأسئلة بشكل صحيح.";

    } else if (percentage >= 80) {

        message =
            "🔥 نتيجة رائعة! استمر على هذا المستوى.";

    } else if (percentage >= 60) {

        message =
            "💪 نتيجة جيدة، ومع مزيد من المراجعة ستتحسن.";

    } else if (percentage >= 40) {

        message =
            "📚 راجع الكلمات مرة أخرى وحاول مجددًا.";

    } else {

        message =
            "🔄 لا مشكلة، المراجعة ثم المحاولة مرة أخرى ستساعدك.";

    }


    testResult.textContent =
        `حصلت على ${score} من ${total} (${percentage}%). ${message}`;

}


// =====================================
// تغيير Kapitel
// =====================================

testChapterSelect.addEventListener(
    "change",
    function() {

        startTest();

    }
);


// =====================================
// إعادة الاختبار
// =====================================

restartTestButton.addEventListener(
    "click",
    function() {

        startTest();

    }
);


// =====================================
// تشغيل أول اختبار
// =====================================

startTest();
