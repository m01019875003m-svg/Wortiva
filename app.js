const categoryButtons = document.querySelectorAll(".category-card");
const levelButtons = document.querySelectorAll(".level-card");

const categoryName = document.getElementById("categoryName");
const germanWord = document.getElementById("germanWord");
const arabicMeaning = document.getElementById("arabicMeaning");
const wordDetails = document.getElementById("wordDetails");
const wordType = document.getElementById("wordType");
const pronunciation = document.getElementById("pronunciation");
const wordImage = document.getElementById("wordImage");
const difficulty = document.getElementById("difficulty");
const example = document.getElementById("example");
const translation = document.getElementById("translation");

const nextWord = document.getElementById("nextWord");
const knownWord = document.getElementById("knownWord");
const unknownWord = document.getElementById("unknownWord");

const backButton = document.getElementById("backButton");
const speakButton = document.getElementById("speakButton");
const speakPlural = document.getElementById("speakPlural");

const favoriteButton =
document.getElementById("favoriteButton");

let currentWord = 0;
let filteredWords = [];

// =====================================================
// اختيار المستوى
// =====================================================

levelButtons.forEach(button => {

button.addEventListener("click", function () {

    const level = this.dataset.level;

    localStorage.setItem(
        "selectedLevel",
        level
    );

    window.location.href = "categories.html";

});


});

// =====================================================
// اختيار الفئة
// =====================================================

categoryButtons.forEach(button => {

button.addEventListener("click", function () {

    const category = this.dataset.category;

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href = "learn.html";

});


});

// =====================================================
// الحصول على الاختيارات
// =====================================================

const selectedCategory =
localStorage.getItem("selectedCategory");

const selectedLevel =
localStorage.getItem("selectedLevel");

// =====================================================
// تصفية الكلمات
// =====================================================

if (
typeof wordsList !== "undefined" &&
selectedCategory &&
selectedLevel
) {


filteredWords = wordsList.filter(function (word) {

    return (
        word.category === selectedCategory &&
        word.level === selectedLevel
    );

});


}

// =====================================================
// المفضلة ⭐
// =====================================================

function getWordKey(word) {


return (
    word.level +
    "|" +
    word.category +
    "|" +
    word.german
);


}

function getFavorites() {


return JSON.parse(
    localStorage.getItem("favoriteWords") || "[]"
);


}

function updateFavoriteButton() {


if (!favoriteButton) {
    return;
}

if (filteredWords.length === 0) {

    favoriteButton.textContent =
        "☆ أضف للمفضلة";

    return;
}

const word =
    filteredWords[currentWord];

const key =
    getWordKey(word);

const favorites =
    getFavorites();

if (favorites.includes(key)) {

    favoriteButton.textContent =
        "⭐ إزالة من المفضلة";

} else {

    favoriteButton.textContent =
        "☆ أضف للمفضلة";

}


}

// =====================================================
// زر المفضلة
// =====================================================

if (favoriteButton) {


favoriteButton.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        const word =
            filteredWords[currentWord];

        const key =
            getWordKey(word);

        let favorites =
            getFavorites();

        if (favorites.includes(key)) {

            favorites =
                favorites.filter(function (item) {

                    return item !== key;

                });

        } else {

            favorites.push(key);

        }

        localStorage.setItem(
            "favoriteWords",
            JSON.stringify(favorites)
        );

        updateFavoriteButton();

        updateQuickProfile();

    }
);


}

// =====================================================
// حالة إجابة الكلمة
// =====================================================

let currentWordResult = null;

// =====================================================
// إعادة ضبط أزرار الإجابة
// =====================================================

function resetWordAnswerButtons() {


currentWordResult = null;

if (knownWord) {

    knownWord.disabled = false;

}

if (unknownWord) {

    unknownWord.disabled = false;

}

if (nextWord) {

    nextWord.disabled = true;

}


}

// =====================================================
// اختيار "عرفتها"
// =====================================================

if (knownWord) {


knownWord.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        if (currentWordResult !== null) {
            return;
        }

        const word =
            filteredWords[currentWord];

        currentWordResult = "known";

        markWordAsLearned(word);

        if (knownWord) {
            knownWord.disabled = true;
        }

        if (unknownWord) {
            unknownWord.disabled = true;
        }

        if (nextWord) {
            nextWord.disabled = false;
        }

        console.log(
            "✅ المستخدم عرف الكلمة:",
            word.german
        );

    }
);


}

// =====================================================
// اختيار "لم أعرفها"
// =====================================================

if (unknownWord) {


unknownWord.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        if (currentWordResult !== null) {
            return;
        }

        const word =
            filteredWords[currentWord];

        currentWordResult = "unknown";

        markWordForReview(word);

        if (knownWord) {
            knownWord.disabled = true;
        }

        if (unknownWord) {
            unknownWord.disabled = true;
        }

        if (nextWord) {
            nextWord.disabled = false;
        }

        console.log(
            "❌ المستخدم لم يعرف الكلمة:",
            word.german
        );

    }
);


}

// =====================================================
// عرض الكلمة
// =====================================================

function showWord() {


if (!germanWord) {
    return;
}

resetWordAnswerButtons();

if (filteredWords.length === 0) {

    germanWord.textContent =
        "لا توجد كلمات";

    if (arabicMeaning) {

        arabicMeaning.textContent =
            "";

    }

    if (wordImage) {

        wordImage.textContent =
            "📖";

    }

    updateFavoriteButton();

    return;
}


const word =
    filteredWords[currentWord];


// الكلمة الألمانية

germanWord.textContent =
    (word.article ? word.article + " " : "") +
    word.german;


// المعنى العربي

if (arabicMeaning) {

    arabicMeaning.textContent =
        word.arabic;

}


// اسم الفئة

if (categoryName) {

    categoryName.textContent =
        word.category;

}


// الجمع

if (wordDetails) {

    wordDetails.textContent =
        word.plural
            ? word.plural
            : "لا يوجد جمع مسجل";

}


// النوع

if (wordType) {

    wordType.textContent =
        word.type
            ? word.type
            : "";

}


// النطق

if (pronunciation) {

    pronunciation.textContent =
        word.pronunciation
            ? word.pronunciation
            : "";

}


// الصعوبة

if (difficulty) {

    const stars =
        "⭐".repeat(
            word.difficulty || 1
        );

    difficulty.textContent =
        stars;

}


// المثال

if (example) {

    example.textContent =
        "🇩🇪 " +
        (word.example || "");

}


// الترجمة

if (translation) {

    translation.textContent =
        "🇪🇬 " +
        (word.translation || "");

}


// الصورة

if (wordImage) {

    if (word.image) {

        wordImage.innerHTML =
            `<img src="${word.image}" alt="${word.german}">`;

    } else {

        wordImage.textContent =
            "📖";

    }

}


updateFavoriteButton();


}

// =====================================================
// الكلمة التالية
// =====================================================

if (nextWord) {


nextWord.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        // ممنوع الانتقال بدون اختيار
        if (currentWordResult === null) {

            return;

        }

        currentWord++;

        if (
            currentWord >=
            filteredWords.length
        ) {

            currentWord = 0;

        }

        showWord();

    }
);


}

// =====================================================
// نطق الكلمة 🔊
// =====================================================

if (speakButton) {


speakButton.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        const word =
            filteredWords[currentWord];

        const spokenWord =
            (word.article ? word.article + " " : "") +
            word.german;

        const speech =
            new SpeechSynthesisUtterance(
                spokenWord
            );

        speech.lang =
            "de-DE";

        speech.rate =
            0.8;

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(
            speech
        );

    }
);


}

// =====================================================
// نطق الجمع 🔊
// =====================================================

if (speakPlural) {


speakPlural.addEventListener(
    "click",
    function () {

        if (filteredWords.length === 0) {
            return;
        }

        const word =
            filteredWords[currentWord];

        if (!word.plural) {
            return;
        }

        const speech =
            new SpeechSynthesisUtterance(
                word.plural
            );

        speech.lang =
            "de-DE";

        speech.rate =
            0.8;

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(
            speech
        );

    }
);


}

// =====================================================
// زر الرجوع
// =====================================================

if (backButton) {


backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "categories.html";

    }
);


}

// =====================================================
// البحث
// =====================================================

const searchButton =
document.getElementById("searchButton");

if (searchButton) {


searchButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "search.html";

    }
);


}

// =====================================================
// المفضلة
// =====================================================

const favoritesButton =
document.getElementById("favoritesButton");

if (favoritesButton) {


favoritesButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "favorites.html";

    }
);


}

// =====================================================
// الاختبارات
// =====================================================

const quizButton =
document.getElementById("quizButton");

if (quizButton) {


quizButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "quiz-settings.html";

    }
);


}

// =====================================================
// الإحصائيات
// =====================================================

const statsButton =
document.getElementById("statsButton");

if (statsButton) {


statsButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "stats.html";

    }
);


}

// =====================================================
// التاريخ المحلي
// =====================================================

function getLocalDateKey() {


const date =
    new Date();

return (
    date.getFullYear() +
    "-" +
    String(
        date.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
        date.getDate()
    ).padStart(2, "0")
);


}

// =====================================================
// تسجيل كلمة متعلمة
// =====================================================

function markWordAsLearned(word) {


if (!word) {
    return;
}

const key =
    getWordKey(word);


// -----------------------------------------
// الكلمات المتعلمة
// -----------------------------------------

let learnedWords =
    JSON.parse(
        localStorage.getItem(
            "learnedWords"
        ) || "[]"
    );


if (!learnedWords.includes(key)) {

    learnedWords.push(key);

    localStorage.setItem(
        "learnedWords",
        JSON.stringify(learnedWords)
    );

    // XP جديد
    let xp =
        Number(
            localStorage.getItem(
                "xp"
            ) || 0
        );

    xp += 10;

    localStorage.setItem(
        "xp",
        xp
    );

}


// -----------------------------------------
// إزالة الكلمة من المراجعة
// -----------------------------------------

removeWordFromReview(key);


// -----------------------------------------
// التقدم اليومي
// -----------------------------------------

const today =
    getLocalDateKey();

const savedDate =
    localStorage.getItem(
        "learnedTodayDate"
    );

let learnedTodayWords =
    JSON.parse(
        localStorage.getItem(
            "learnedTodayWords"
        ) || "[]"
    );


if (savedDate !== today) {

    learnedTodayWords = [];

    localStorage.setItem(
        "learnedTodayDate",
        today
    );

}


if (
    !learnedTodayWords.includes(key)
) {

    learnedTodayWords.push(key);

}


localStorage.setItem(
    "learnedTodayWords",
    JSON.stringify(
        learnedTodayWords
    )
);


localStorage.setItem(
    "learnedToday",
    learnedTodayWords.length
);


// -----------------------------------------
// تحديث Streak
// -----------------------------------------

updateStreak();


// -----------------------------------------
// تحديث الإحصائيات
// -----------------------------------------

updateHomeStats();


// -----------------------------------------
// Supabase
// -----------------------------------------

saveProgressToSupabase();


console.log(
    "✅ تم تسجيل الكلمة كمتعلمة:",
    word.german
);


}

// =====================================================
// حفظ كلمة للمراجعة
// =====================================================

function markWordForReview(word) {


if (!word) {
    return;
}

const key =
    getWordKey(word);

let reviews =
    JSON.parse(
        localStorage.getItem(
            "wordReviews"
        ) || "{}"
    );


const now =
    Date.now();


reviews[key] = {

    level:
        Number(
            reviews[key]?.level || 0
        ),

    needsReview:
        true,

    lastReviewed:
        now,

    nextReview:
        now + (
            24 *
            60 *
            60 *
            1000
        )

};


localStorage.setItem(
    "wordReviews",
    JSON.stringify(reviews)
);


// Supabase
if (
    typeof saveWordReview ===
    "function"
) {

    saveWordReview(
        key,
        reviews[key]
    );

}


console.log(
    "🧠 أضيفت الكلمة للمراجعة:",
    word.german
);


}

// =====================================================
// إزالة كلمة من المراجعة
// =====================================================

function removeWordFromReview(key) {


let reviews =
    JSON.parse(
        localStorage.getItem(
            "wordReviews"
        ) || "{}"
    );


if (reviews[key]) {

    delete reviews[key];

    localStorage.setItem(
        "wordReviews",
        JSON.stringify(
            reviews
        )
    );

}


}

// =====================================================
// تحميل المراجعات من Supabase
// =====================================================

async function syncReviewsFromDatabase() {


if (
    typeof loadUserReviews !==
    "function"
) {

    return;

}


const reviews =
    await loadUserReviews();


if (
    !reviews ||
    reviews.length === 0
) {

    return;

}


let localReviews =
    JSON.parse(
        localStorage.getItem(
            "wordReviews"
        ) || "{}"
    );


reviews.forEach(review => {

    localReviews[
        review.word_key
    ] = {

        level:
            review.level || 0,

        needsReview:
            review.needs_review,

        lastReviewed:
            review.last_reviewed,

        nextReview:
            review.next_review

    };

});


localStorage.setItem(
    "wordReviews",
    JSON.stringify(
        localReviews
    )
);


console.log(
    "✅ تم تحميل كلمات المراجعة من Supabase"
);


}

// =====================================================
// حفظ التقدم في Supabase
// =====================================================

async function saveProgressToSupabase() {


if (
    typeof saveUserProgress !==
    "function"
) {

    return;

}


const progress = {

    xp:
        Number(
            localStorage.getItem(
                "xp"
            ) || 0
        ),

    level:
        Number(
            localStorage.getItem(
                "level"
            ) || 1
        ),

    streak:
        Number(
            localStorage.getItem(
                "streak"
            ) || 0
        ),

    lastActivity:
        localStorage.getItem(
            "lastStudyDate"
        ) || null

};


const saved =
    await saveUserProgress(
        progress
    );


if (saved) {

    console.log(
        "☁️ تم حفظ التقدم في Supabase"
    );

}


}

// =====================================================
// Streak 🔥
// =====================================================

function updateStreak() {


const today =
    getLocalDateKey();

const lastDate =
    localStorage.getItem(
        "lastStudyDate"
    );


let streak =
    Number(
        localStorage.getItem(
            "streak"
        ) || 0
    );


if (lastDate !== today) {

    if (!lastDate) {

        streak = 1;

    } else {

        const last =
            new Date(
                lastDate
            );

        const current =
            new Date(
                today
            );


        const difference =
            Math.floor(
                (
                    current -
                    last
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (difference === 1) {

            streak++;

        } else if (
            difference > 1
        ) {

            streak = 1;

        }

    }


    localStorage.setItem(
        "streak",
        streak
    );


    localStorage.setItem(
        "lastStudyDate",
        today
    );

}


const streakElement =
    document.getElementById(
        "streak"
    );


if (streakElement) {

    streakElement.textContent =
        streak;

}


}

// =====================================================
// الهدف اليومي 🎯
// =====================================================

function updateDailyProgress() {


const progressBar =
    document.getElementById(
        "progressBar"
    );

const progressText =
    document.getElementById(
        "progressText"
    );


if (
    !progressBar ||
    !progressText
) {

    return;

}


const learnedToday =
    Number(
        localStorage.getItem(
            "learnedToday"
        ) || 0
    );


const dailyGoal = 10;


const percentage =
    Math.min(
        (
            learnedToday /
            dailyGoal
        ) * 100,
        100
    );


progressBar.style.width =
    percentage + "%";


progressText.textContent =
    `${learnedToday} / ${dailyGoal} كلمات`;


}

// =====================================================
// تحديث إحصائيات الصفحة الرئيسية
// =====================================================

function updateHomeStats() {


const xpElement =
    document.getElementById(
        "xp"
    );

const wordsElement =
    document.getElementById(
        "words"
    );

const streakElement =
    document.getElementById(
        "streak"
    );


// XP

const xp =
    Number(
        localStorage.getItem(
            "xp"
        ) || 0
    );


if (xpElement) {

    xpElement.textContent =
        xp;

}


// الكلمات المتعلمة

const learnedWords =
    JSON.parse(
        localStorage.getItem(
            "learnedWords"
        ) || "[]"
    );


if (wordsElement) {

    wordsElement.textContent =
        learnedWords.length;

}


// Streak

if (streakElement) {

    const streak =
        Number(
            localStorage.getItem(
                "streak"
            ) || 0
        );

    streakElement.textContent =
        streak;

}


// الهدف اليومي

updateDailyProgress();


}

// =====================================================
// المزامنة من Supabase
// =====================================================

async function syncProgressFromDatabase() {


if (
    typeof loadUserProgress !==
    "function"
) {

    return;

}


const progress =
    await loadUserProgress();


if (!progress) {

    return;

}


// XP

localStorage.setItem(
    "xp",
    progress.xp || 0
);


// المستوى

localStorage.setItem(
    "level",
    progress.level || 1
);


// Streak

localStorage.setItem(
    "streak",
    progress.streak || 0
);


if (
    progress.last_activity
) {

    localStorage.setItem(
        "lastStudyDate",
        progress.last_activity
    );

}


updateHomeStats();


console.log(
    "☁️ تم تحميل تقدم المستخدم من Supabase"
);


}

// =====================================================
// الملف الشخصي السريع
// =====================================================

function updateQuickProfile() {


const currentLevel =
    document.getElementById(
        "currentLevel"
    );

const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );


const level =
    localStorage.getItem(
        "selectedLevel"
    ) || "A1";


const favorites =
    JSON.parse(
        localStorage.getItem(
            "favoriteWords"
        ) || "[]"
    );


if (currentLevel) {

    currentLevel.textContent =
        level;

}


if (favoriteCount) {

    favoriteCount.textContent =
        favorites.length;

}


}

// =====================================================
// تشغيل الصفحة
// =====================================================

showWord();

updateHomeStats();

updateQuickProfile();

// تحميل البيانات من Supabase إذا كان المستخدم مسجلًا

syncProgressFromDatabase();

syncReviewsFromDatabase();

// =====================================================
// عدد كلمات الفئة حسب المستوى
// =====================================================

const categoryCards =
document.querySelectorAll(
".category-card"
);

categoryCards.forEach(
function (card) {


    const category =
        card.dataset.category;


    const level =
        localStorage.getItem(
            "selectedLevel"
        ) || "A1";


    const count =
        typeof wordsList !== "undefined"

            ? wordsList.filter(
                function (word) {

                    return (
                        word.category ===
                        category &&

                        word.level ===
                        level
                    );

                }
            ).length

            : 0;


    const countElement =
        card.querySelector(
            ".category-count"
        );


    if (countElement) {

        countElement.textContent =
            `${count} كلمة`;

    }

}


);

// =====================================================
// Netzwerk
// =====================================================

const netzwerkButton =
document.getElementById(
"netzwerkButton"
);

if (netzwerkButton) {


netzwerkButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "netzwerk.html";

    }
);


}
