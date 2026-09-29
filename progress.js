
// =====================================
// Wortiva - XP + Streak
// =====================================

// البيانات المحفوظة
let progressData = JSON.parse(
    localStorage.getItem("wortivaProgress") || "{}"
);


// =====================================
// القيم الافتراضية
// =====================================

if (typeof progressData.xp !== "number") {
    progressData.xp = 0;
}

if (typeof progressData.streak !== "number") {
    progressData.streak = 0;
}

if (!progressData.lastActivity) {
    progressData.lastActivity = null;
}

if (typeof progressData.level !== "number") {
    progressData.level = 1;
}


// =====================================
// حفظ البيانات
// =====================================

function saveProgress() {

    localStorage.setItem(
        "wortivaProgress",
        JSON.stringify(progressData)
    );

}


// =====================================
// حساب المستوى
// =====================================

function calculateLevel() {

    return Math.floor(
        progressData.xp / 100
    ) + 1;

}


// =====================================
// تحديث المستوى
// =====================================

function updateLevel() {

    progressData.level =
        calculateLevel();

}


// =====================================
// الحصول على تاريخ اليوم
// =====================================

function getToday() {

    const date = new Date();

    return date.toISOString()
        .split("T")[0];

}


// =====================================
// إضافة XP
// =====================================

function addXP(amount) {

    if (
        typeof amount !== "number" ||
        amount <= 0
    ) {
        return;
    }


    progressData.xp += amount;


    updateLevel();

    saveProgress();

}


// =====================================
// تحديث الـ Streak
// =====================================

function updateStreak() {

    const today =
        getToday();


    // لو استخدم التطبيق اليوم بالفعل
    if (
        progressData.lastActivity ===
        today
    ) {

        return;

    }


    if (
        progressData.lastActivity
    ) {

        const lastDate =
            new Date(
                progressData.lastActivity
            );

        const currentDate =
            new Date(today);


        const difference =
            Math.floor(
                (
                    currentDate -
                    lastDate
                ) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 1) {

            // يوم متتالي
            progressData.streak++;

        } else {

            // انقطاع
            progressData.streak = 1;

        }

    } else {

        // أول يوم
        progressData.streak = 1;

    }


    progressData.lastActivity =
        today;


    saveProgress();

}


// =====================================
// تسجيل نشاط
// =====================================

function registerActivity(xpAmount) {

    updateStreak();

    addXP(xpAmount);

}


// =====================================
// معلومات التقدم
// =====================================

function getProgressData() {

    return {
        xp: progressData.xp,
        level: progressData.level,
        streak: progressData.streak,
        lastActivity:
            progressData.lastActivity
    };

}

function getLevelProgress() {
    const currentLevel = progressData.level;

    const currentLevelXP =
        (currentLevel - 1) * 100;

    const nextLevelXP =
        currentLevel * 100;

    const xpInLevel =
        progressData.xp - currentLevelXP;

    const xpNeeded =
        nextLevelXP - currentLevelXP;

    const percentage =
        Math.min(
            100,
            Math.round(
                (xpInLevel / xpNeeded) * 100
            )
        );

    return {
        currentLevel: currentLevel,
        xpInLevel: xpInLevel,
        xpNeeded: xpNeeded,
        nextLevelXP: nextLevelXP,
        percentage: percentage
    };
}

// =====================================
// Wortiva - Achievement Notifications
// =====================================

function getUnlockedAchievements() {
    return JSON.parse(
        localStorage.getItem("wortivaAchievements") || "{}"
    );
}

function saveUnlockedAchievements(data) {
    localStorage.setItem(
        "wortivaAchievements",
        JSON.stringify(data)
    );
}

function showAchievementNotification(title, description) {

    let notification =
        document.getElementById("achievementNotification");

    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "achievementNotification";

        notification.innerHTML = `
            <div class="achievement-notification-icon">
                🏅
            </div>

            <div class="achievement-notification-content">
                <strong>إنجاز جديد!</strong>
                <span id="achievementNotificationTitle"></span>
                <small id="achievementNotificationDescription"></small>
            </div>
        `;

        document.body.appendChild(notification);
    }

    document.getElementById(
        "achievementNotificationTitle"
    ).textContent = title;

    document.getElementById(
        "achievementNotificationDescription"
    ).textContent = description;

    notification.classList.remove(
        "achievement-notification-show"
    );

    void notification.offsetWidth;

    notification.classList.add(
        "achievement-notification-show"
    );

    setTimeout(function() {
        notification.classList.remove(
            "achievement-notification-show"
        );
    }, 3500);
}

function checkAchievement(
    id,
    condition,
    title,
    description
) {

    const achievements =
        getUnlockedAchievements();

    if (condition && !achievements[id]) {

        achievements[id] = {
            unlockedAt: Date.now()
        };

        saveUnlockedAchievements(
            achievements
        );

        showAchievementNotification(
            title,
            description
        );

        return true;
    }

    return false;
}

function checkAllAchievements() {

    const reviewData =
        JSON.parse(
            localStorage.getItem(
                "wortivaReviewData"
            ) || "{}"
        );

    const reviewedCount =
        Object.keys(reviewData).length;

    let masteredCount = 0;

    Object.values(reviewData).forEach(
        function(data) {

            if (
                data &&
                typeof data.level === "number" &&
                data.level >= 4
            ) {
                masteredCount++;
            }
        }
    );

    const completedTests =
        Number(
            localStorage.getItem(
                "wortivaCompletedTests"
            ) || 0
        );

    checkAchievement(
        "firstTest",
        completedTests >= 1,
        "أول اختبار",
        "أكملت أول اختبار لك!"
    );

    checkAchievement(
        "words50",
        reviewedCount >= 50,
        "50 كلمة",
        "راجعت 50 كلمة!"
    );

    checkAchievement(
        "xp100",
        progressData.xp >= 100,
        "100 XP",
        "جمعت 100 نقطة XP!"
    );

    checkAchievement(
        "streak3",
        progressData.streak >= 3,
        "3 أيام متتالية",
        "حققت Streak لمدة 3 أيام!"
    );

    checkAchievement(
        "level5",
        progressData.level >= 5,
        "المستوى 5",
        "وصلت إلى المستوى الخامس!"
    );

    checkAchievement(
        "mastered",
        masteredCount >= 1,
        "أول كلمة متقنة",
        "أتقنت أول كلمة!"
    );
}

// =====================================
// تشغيل التهيئة
// =====================================

updateLevel();
saveProgress();

checkAllAchievements();
