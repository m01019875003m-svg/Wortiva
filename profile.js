
// =====================================
// Wortiva - Profile
// =====================================

const profileProgress =
    getProgressData();

const profileLevelProgress =
    getLevelProgress();

const profileAllWords =
    netzwerkA1Words || [];


// =====================================
// بيانات المراجعة
// =====================================

const profileReviewData =
    JSON.parse(
        localStorage.getItem(
            "wortivaReviewData"
        ) || "{}"
    );

const profileReviewedCount =
    Object.keys(
        profileReviewData
    ).length;

let profileMasteredCount = 0;

Object.values(
    profileReviewData
).forEach(function(data) {

    if (
        data &&
        typeof data.level === "number" &&
        data.level >= 4
    ) {
        profileMasteredCount++;
    }

});


// =====================================
// الإنجازات
// =====================================

const profileAchievementData =
    JSON.parse(
        localStorage.getItem(
            "wortivaAchievements"
        ) || "{}"
    );

const profileAchievementCount =
    Object.keys(
        profileAchievementData
    ).length;


// =====================================
// تحديث البيانات
// =====================================

document.getElementById(
    "profileLevel"
).textContent =
    profileProgress.level;


document.getElementById(
    "profileXP"
).textContent =
    profileProgress.xp;


document.getElementById(
    "profileStreak"
).textContent =
    profileProgress.streak;


document.getElementById(
    "profileReviewed"
).textContent =
    profileReviewedCount;


document.getElementById(
    "profileMastered"
).textContent =
    profileMasteredCount;


document.getElementById(
    "profileAchievements"
).textContent =
    profileAchievementCount;


// =====================================
// XP Progress
// =====================================

document.getElementById(
    "profileXPPercent"
).textContent =
    profileLevelProgress.percentage + "%";


document.getElementById(
    "profileXPFill"
).style.width =
    profileLevelProgress.percentage + "%";


document.getElementById(
    "profileCurrentXP"
).textContent =
    `${profileLevelProgress.xpInLevel} XP`;


const profileRemaining =
    profileLevelProgress.xpNeeded -
    profileLevelProgress.xpInLevel;


document.getElementById(
    "profileRemainingXP"
).textContent =
    profileRemaining > 0
        ? `${profileRemaining} XP للمستوى التالي`
        : "🎉 وصلت للمستوى التالي!";


// =====================================
// A1 Progress
// =====================================

const profileA1Percent =
    profileAllWords.length > 0
        ? Math.round(
            (
                profileMasteredCount /
                profileAllWords.length
            ) * 100
        )
        : 0;


document.getElementById(
    "profileA1Percent"
).textContent =
    profileA1Percent + "%";


document.getElementById(
    "profileA1Fill"
).style.width =
    profileA1Percent + "%";


if (profileA1Percent === 0) {

    document.getElementById(
        "profileA1Text"
    ).textContent =
        "ابدأ بمراجعة الكلمات لتتبع تقدمك.";

} else {

    document.getElementById(
        "profileA1Text"
    ).textContent =
        `أتقنت ${profileMasteredCount} من ${profileAllWords.length} كلمة.`;

}

// =====================================
// Kapitel Progress
// =====================================

const profileChapterProgress =
    document.getElementById(
        "profileChapterProgress"
    );

if (profileChapterProgress) {

    profileChapterProgress.innerHTML = "";

    for (let chapter = 1; chapter <= 12; chapter++) {

        const chapterWords =
            profileAllWords.filter(function(word) {
                return Number(word.chapter) === chapter;
            });

        const chapterMastered =
            chapterWords.filter(function(word) {

                const key =
                    word.chapter +
                    "-" +
                    word.category +
                    "-" +
                    word.order;

                const data =
                    profileReviewData[key];

                return (
                    data &&
                    typeof data.level === "number" &&
                    data.level >= 4
                );
            }).length;

        const chapterPercent =
            chapterWords.length > 0
                ? Math.round(
                    (
                        chapterMastered /
                        chapterWords.length
                    ) * 100
                )
                : 0;

        const chapterItem =
            document.createElement("div");

        chapterItem.className =
            "profile-chapter-item";

        chapterItem.innerHTML = `
            <div class="profile-chapter-header">

                <strong>
                    Kapitel ${chapter}
                </strong>

                <span>
                    ${chapterMastered} /
                    ${chapterWords.length}
                    كلمة
                </span>

            </div>

            <div class="profile-chapter-bar">

                <div
                    class="profile-chapter-fill"
                    style="width: ${chapterPercent}%">
                </div>

            </div>

            <div class="profile-chapter-footer">

                <span>
                    ${chapterPercent}%
                </span>

                <span>
                    ${chapterPercent === 100
                        ? "🎉 مكتمل"
                        : "قيد التعلم"}
                </span>

            </div>
        `;

        profileChapterProgress.appendChild(
            chapterItem
        );
    }
}
