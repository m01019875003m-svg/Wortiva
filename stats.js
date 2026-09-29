
// =====================================
// Wortiva - الإحصائيات
// =====================================

const allWords = netzwerkA1Words || [];
// =====================================
// XP + Streak
// =====================================

const progress = getProgressData();
const levelProgress = getLevelProgress();

const statsXP =
    document.getElementById("statsXP");

const statsLevel =
    document.getElementById("statsLevel");

const statsStreak =
    document.getElementById("statsStreak");

const statsCurrentLevelXP =
    document.getElementById("statsCurrentLevelXP");

const statsRequiredXP =
    document.getElementById("statsRequiredXP");

const statsXPFill =
    document.getElementById("statsXPFill");

const statsXPPercent =
    document.getElementById("statsXPPercent");

const statsXPRemaining =
    document.getElementById("statsXPRemaining");

if (statsXP) {
    statsXP.textContent =
        progress.xp;
}

if (statsLevel) {
    statsLevel.textContent =
        progress.level;
}

if (statsStreak) {
    statsStreak.textContent =
        `${progress.streak} يوم`;
}

if (statsCurrentLevelXP) {
    statsCurrentLevelXP.textContent =
        levelProgress.xpInLevel;
}

if (statsRequiredXP) {
    statsRequiredXP.textContent =
        levelProgress.xpNeeded;
}

if (statsXPFill) {
    statsXPFill.style.width =
        levelProgress.percentage + "%";
}

if (statsXPPercent) {
    statsXPPercent.textContent =
        levelProgress.percentage + "%";
}

if (statsXPRemaining) {

    const remaining =
        levelProgress.xpNeeded -
        levelProgress.xpInLevel;

    statsXPRemaining.textContent =
        remaining > 0
            ? `${remaining} XP للمستوى التالي`
            : "🎉 وصلت للمستوى التالي!";
}

const reviewData = JSON.parse(
    localStorage.getItem("wortivaReviewData") || "{}"
);


// =====================================
// عناصر الصفحة
// =====================================

const totalWordsElement =
    document.getElementById("totalWords");

const reviewedWordsElement =
    document.getElementById("reviewedWords");

const masteredWordsElement =
    document.getElementById("masteredWords");

const needReviewWordsElement =
    document.getElementById("needReviewWords");

const progressPercentElement =
    document.getElementById("progressPercent");

const progressFillElement =
    document.getElementById("progressFill");

const progressTextElement =
    document.getElementById("progressText");

const chapterStatsElement =
    document.getElementById("chapterStats");

const userLevelElement =
    document.getElementById("userLevel");

const levelDescriptionElement =
    document.getElementById("levelDescription");


// =====================================
// حساب البيانات
// =====================================

const totalWords = allWords.length;

let reviewedWords = 0;
let masteredWords = 0;
let needReviewWords = 0;

let totalLevels = 0;


// =====================================
// تحليل كل الكلمات
// =====================================

allWords.forEach(function(word) {

    const key =
        word.chapter +
        "-" +
        word.category +
        "-" +
        word.order;

    const data = reviewData[key];

    if (!data) {
        return;
    }


    // الكلمة تمت مراجعتها
    reviewedWords++;


    const level = data.level || 0;

    totalLevels += level;


    // مستوى 4 أو أكثر = كلمة متقنة
    if (level >= 4) {
        masteredWords++;
    }


    // تحتاج مراجعة
    if (data.needsReview === true) {
        needReviewWords++;
    }

});


// =====================================
// نسبة التقدم العامة
// =====================================

let progressPercent = 0;

if (totalWords > 0) {

    progressPercent =
        Math.round(
            (masteredWords / totalWords) * 100
        );

}


// =====================================
// عرض الإحصائيات الرئيسية
// =====================================

totalWordsElement.textContent =
    totalWords;

reviewedWordsElement.textContent =
    reviewedWords;

masteredWordsElement.textContent =
    masteredWords;

needReviewWordsElement.textContent =
    needReviewWords;

progressPercentElement.textContent =
    progressPercent + "%";

progressFillElement.style.width =
    progressPercent + "%";


if (progressPercent === 0) {

    progressTextElement.textContent =
        "ابدأ بمراجعة الكلمات لتحسين تقدمك.";

} else if (progressPercent < 25) {

    progressTextElement.textContent =
        "بداية ممتازة! استمر في المراجعة.";

} else if (progressPercent < 50) {

    progressTextElement.textContent =
        "أنت تتقدم بشكل جيد! 💪";

} else if (progressPercent < 75) {

    progressTextElement.textContent =
        "تقدم رائع! استمر في التدريب. 🔥";

} else if (progressPercent < 100) {

    progressTextElement.textContent =
        "أنت قريب جدًا من إتقان الكلمات! 🚀";

} else {

    progressTextElement.textContent =
        "🎉 لقد أتقنت جميع الكلمات!";

}


// =====================================
// إحصائيات Kapitel
// =====================================

function createChapterStats() {

    chapterStatsElement.innerHTML = "";


    // Kapitel 1 → 12
    for (let chapter = 1; chapter <= 12; chapter++) {

        const chapterWords =
            allWords.filter(function(word) {

                return Number(word.chapter) === chapter;

            });


        const chapterTotal =
            chapterWords.length;


        let chapterMastered = 0;


        chapterWords.forEach(function(word) {

            const key =
                word.chapter +
                "-" +
                word.category +
                "-" +
                word.order;

            const data = reviewData[key];


            if (data && (data.level || 0) >= 4) {

                chapterMastered++;

            }

        });


        let chapterPercent = 0;


        if (chapterTotal > 0) {

            chapterPercent =
                Math.round(
                    (chapterMastered / chapterTotal) * 100
                );

        }


        // إنشاء العنصر
        const chapterElement =
            document.createElement("div");

        chapterElement.className =
            "chapter-stat";


        chapterElement.innerHTML = `

            <div class="chapter-header">

                <span class="chapter-name">
                    Kapitel ${chapter}
                </span>

                <span class="chapter-percent">
                    ${chapterPercent}%
                </span>

            </div>


            <div class="chapter-bar">

                <div
                    class="chapter-fill"
                    style="width: ${chapterPercent}%">
                </div>

            </div>


            <div class="chapter-details">

                ${chapterMastered} من ${chapterTotal} كلمة متقنة

            </div>

        `;


        chapterStatsElement.appendChild(
            chapterElement
        );

    }

}


// =====================================
// مستوى المستخدم
// =====================================

function updateUserLevel() {

    let level = "مبتدئ";

    let description =
        "ابدأ بمراجعة الكلمات للحصول على تقدم أكبر.";

    if (progressPercent >= 20) {

        level = "متعلم جديد";

        description =
            "بدأت تبني أساسًا جيدًا في الكلمات الألمانية.";

    }

    if (progressPercent >= 40) {

        level = "متعلم نشيط";

        description =
            "تقدمك واضح، واستمرارك في المراجعة سيزيد ثبات الكلمات.";

    }

    if (progressPercent >= 60) {

        level = "متعلم متقدم";

        description =
            "أصبحت لديك قاعدة قوية من الكلمات.";

    }

    if (progressPercent >= 80) {

        level = "متقن الكلمات";

        description =
            "أنت قريب جدًا من إتقان مجموعة كلمات A1.";

    }

    if (progressPercent === 100) {

        level = "🏆 بطل A1";

        description =
            "أتقنت جميع كلمات A1 الموجودة في Wortiva.";

    }


    userLevelElement.textContent =
        level;

    levelDescriptionElement.textContent =
        description;

}
// =====================================
// Wortiva - الإنجازات
// =====================================

function unlockAchievement(id, unlocked) {

    const achievement =
        document.getElementById(id);

    if (!achievement) {
        return;
    }

    const status =
        achievement.querySelector(
            ".achievement-status"
        );

    if (unlocked) {
        achievement.classList.add(
            "achievement-unlocked"
        );

        if (status) {
            status.textContent = "✅";
        }
    } else {
        achievement.classList.remove(
            "achievement-unlocked"
        );

        if (status) {
            status.textContent = "🔒";
        }
    }
}


// -------------------------------------
// بيانات المراجعة
// -------------------------------------

const achievementReviewData =
    JSON.parse(
        localStorage.getItem(
            "wortivaReviewData"
        ) || "{}"
    );

const achievementReviewedCount =
    Object.keys(
        achievementReviewData
    ).length;

let achievementMasteredCount = 0;

Object.values(
    achievementReviewData
).forEach(function(data) {

    if (
        data &&
        typeof data.level === "number" &&
        data.level >= 4
    ) {
        achievementMasteredCount++;
    }
});


// -------------------------------------
// عدد الاختبارات المكتملة
// -------------------------------------

const completedTests =
    Number(
        localStorage.getItem(
            "wortivaCompletedTests"
        ) || 0
    );


// -------------------------------------
// فتح الإنجازات
// -------------------------------------

unlockAchievement(
    "achievementFirstTest",
    completedTests >= 1
);

unlockAchievement(
    "achievement50Words",
    achievementReviewedCount >= 50
);

unlockAchievement(
    "achievement100XP",
    progress.xp >= 100
);

unlockAchievement(
    "achievementStreak3",
    progress.streak >= 3
);

unlockAchievement(
    "achievementLevel5",
    progress.level >= 5
);

unlockAchievement(
    "achievementMastered",
    achievementMasteredCount >= 1
);


// =====================================
// تشغيل الإحصائيات
// =====================================

createChapterStats();

updateUserLevel();

