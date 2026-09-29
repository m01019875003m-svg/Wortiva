// =====================================
// البيانات المختارة
// =====================================

const selectedChapter =
    Number(
        localStorage.getItem("netzwerkKapitel") || 1
    );

const selectedCategory =
    localStorage.getItem("netzwerkCategory") || "";

const selectedCategoryTitle =
    localStorage.getItem("netzwerkCategoryTitle") || "";
const showAllChapterWords =
    localStorage.getItem(
        "netzwerkShowAllChapterWords"
    ) === "true";
const chapterTitle =
    localStorage.getItem("netzwerkKapitelTitle") || "";


// =====================================
// عناصر الصفحة
// =====================================

const chapterTitleElement =
    document.getElementById("chapterTitle");

const categoryTitleElement =
    document.getElementById("categoryTitle");

const wordsContainer =
    document.getElementById("wordsList");

const sortSelect =
    document.getElementById("sortSelect");


// أزرار التنقل

const prevCategoryButton =
    document.getElementById("prevCategory");

const nextCategoryButton =
    document.getElementById("nextCategory");

const categoryPosition =
    document.getElementById("categoryPosition");


// =====================================
// العناوين
// =====================================

chapterTitleElement.textContent =
    `Kapitel ${selectedChapter}: ${chapterTitle}`;

if (showAllChapterWords) {

    categoryTitleElement.textContent =
        "📚 جميع كلمات Kapitel";

} else {

    categoryTitleElement.textContent =
        selectedCategoryTitle;

}

// =====================================
// اختيار الكلمات
// =====================================

let filteredWords;


if (showAllChapterWords) {

    // =================================
    // كل كلمات الكابيتل
    // =================================

    filteredWords =
        netzwerkA1Words.filter(function (word) {

            return (
                word.chapter === selectedChapter
            );

        });

} else {

    // =================================
    // كلمات الفئة الحالية
    // =================================

    filteredWords =
        netzwerkA1Words.filter(function (word) {

            return (
                word.chapter === selectedChapter &&
                word.category === selectedCategory
            );

        });

}

// =====================================
// عرض الكلمات
// =====================================

function renderWords() {

    wordsContainer.innerHTML = "";

    if (filteredWords.length === 0) {

        wordsContainer.innerHTML = `
            <div class="hero">

                <h2>📚 لا توجد كلمات</h2>

                <p>
                    سيتم إضافة كلمات هذه الفئة
                    من ملف Netzwerk.
                </p>

            </div>
        `;

        return;
    }


    filteredWords.forEach(function (word) {

        const card =
            document.createElement("div");

        card.className = "word-card";


        card.innerHTML = `

            <div class="word-info">

                <div class="word-detail">

                    <span>
                        🇩🇪 الكلمة
                    </span>

                    <strong>

                        ${word.article
                            ? word.article + " "
                            : ""}

                        ${word.german}

                    </strong>

                </div>


                <div class="word-detail">

                    <span>
                        🇸🇦 المعنى
                    </span>

                    <strong>
                        ${word.arabic}
                    </strong>

                </div>


                ${
                    word.plural
                    ? `
                        <div class="word-detail">

                            <span>
                                📚 الجمع
                            </span>

                            <strong>
                                ${word.plural}
                            </strong>

                        </div>
                    `
                    : ""
                }


                <div class="word-detail">

                    <span>
                        📝 النوع
                    </span>

                    <strong>
                        ${word.type}
                    </strong>

                </div>

            </div>


            <button
                class="small-speak"
                onclick="speakWord('${word.german.replace(/'/g, "\\'")}')">

                🔊 اسمع

            </button>

        `;


        wordsContainer.appendChild(card);

    });

}


// =====================================
// الترتيب
// =====================================

sortSelect.addEventListener(
    "change",
    function () {

        const value =
            this.value;


        // ترتيب الكتاب

        if (value === "original") {

            filteredWords.sort(
                function (a, b) {

                    return a.order - b.order;

                }
            );

        }


        // الألمانية A → Z

        if (value === "german") {

            filteredWords.sort(
                function (a, b) {

                    return a.german.localeCompare(
                        b.german,
                        "de"
                    );

                }
            );

        }


        // العربية

        if (value === "arabic") {

            filteredWords.sort(
                function (a, b) {

                    return a.arabic.localeCompare(
                        b.arabic,
                        "ar"
                    );

                }
            );

        }


        // النوع

        if (value === "type") {

            filteredWords.sort(
                function (a, b) {

                    return a.type.localeCompare(
                        b.type
                    );

                }
            );

        }


        renderWords();

    }
);


// =====================================
// التنقل بين الفئات والكابيتل
// =====================================

const currentChapterCategories =
    categoriesA1[selectedChapter] || [];


let currentCategoryIndex =
    currentChapterCategories.findIndex(
        function (category) {

            return category.id === selectedCategory;

        }
    );


// =====================================
// تحديث حالة أزرار التنقل
// =====================================

function updateCategoryNavigation() {

    const total =
        currentChapterCategories.length;


    // لو الفئة غير موجودة

    if (currentCategoryIndex === -1) {

        categoryPosition.textContent =
            "الفئة";

        prevCategoryButton.disabled =
            true;

        nextCategoryButton.disabled =
            true;

        return;

    }


    // رقم الفئة

    categoryPosition.textContent =
        `الفئة ${currentCategoryIndex + 1} من ${total}`;


    // =================================
    // زر السابقة
    // =================================

    if (currentCategoryIndex > 0) {

        prevCategoryButton.disabled =
            false;

    } else {

        // أول فئة في الكابيتل

        // نشوف هل يوجد Kapitel قبله

        if (selectedChapter > 1) {

            prevCategoryButton.disabled =
                false;

        } else {

            prevCategoryButton.disabled =
                true;

        }

    }


    // =================================
    // زر التالية
    // =================================

    if (
        currentCategoryIndex <
        total - 1
    ) {

        nextCategoryButton.disabled =
            false;

    } else {

        // آخر فئة في الكابيتل

        // نشوف هل يوجد Kapitel بعده

        const nextChapter =
            selectedChapter + 1;


        if (categoriesA1[nextChapter]) {

            nextCategoryButton.disabled =
                false;

        } else {

            nextCategoryButton.disabled =
                true;

        }

    }

}


// =====================================
// فتح فئة معينة
// =====================================

function openCategory(
    chapter,
    index
) {

    const categories =
        categoriesA1[chapter] || [];


    if (
        index < 0 ||
        index >= categories.length
    ) {

        return;

    }


    const category =
        categories[index];


    // حفظ الكابيتل الجديد

    localStorage.setItem(
        "netzwerkKapitel",
        chapter
    );


    // حفظ اسم الكابيتل

    // نحتفظ بالعنوان الموجود لو كان نفس الكابيتل

    if (chapter !== selectedChapter) {

        localStorage.setItem(
            "netzwerkKapitelTitle",
            `Kapitel ${chapter}`
        );

    }


    // حفظ الفئة

    localStorage.setItem(
        "netzwerkCategory",
        category.id
    );


    localStorage.setItem(
        "netzwerkCategoryTitle",
        category.german
    );


    // فتح صفحة الكلمات من جديد

    window.location.href =
        "netzwerk-words.html";

}


// =====================================
// زر السابقة
// =====================================

prevCategoryButton.addEventListener(
    "click",
    function () {

        // =================================
        // لو فيه فئة سابقة داخل نفس الكابيتل
        // =================================

        if (currentCategoryIndex > 0) {

            openCategory(
                selectedChapter,
                currentCategoryIndex - 1
            );

            return;

        }


        // =================================
        // لو دي أول فئة في الكابيتل
        // نرجع لآخر فئة في الكابيتل السابق
        // =================================

        const previousChapter =
            selectedChapter - 1;


        if (!categoriesA1[previousChapter]) {

            return;

        }


        const previousChapterCategories =
            categoriesA1[previousChapter];


        const lastCategoryIndex =
            previousChapterCategories.length - 1;


        openCategory(
            previousChapter,
            lastCategoryIndex
        );

    }
);


// =====================================
// زر التالية
// =====================================

nextCategoryButton.addEventListener(
    "click",
    function () {

        // =================================
        // لو فيه فئة تالية داخل نفس الكابيتل
        // =================================

        if (
            currentCategoryIndex <
            currentChapterCategories.length - 1
        ) {

            openCategory(
                selectedChapter,
                currentCategoryIndex + 1
            );

            return;

        }


        // =================================
        // لو دي آخر فئة في الكابيتل
        // ننتقل لأول فئة في الكابيتل التالي
        // =================================

        const nextChapter =
            selectedChapter + 1;


        if (!categoriesA1[nextChapter]) {

            return;

        }


        const nextChapterCategories =
            categoriesA1[nextChapter];


        if (
            nextChapterCategories.length === 0
        ) {

            return;

        }


        openCategory(
            nextChapter,
            0
        );

    }
);


// =====================================
// النطق
// =====================================

function speakWord(word) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    const speech =
        new SpeechSynthesisUtterance(word);


    speech.lang =
        "de-DE";


    speech.rate =
        0.85;


    window.speechSynthesis.speak(
        speech
    );

}


// =====================================
// تحديث أزرار التنقل
// =====================================

if (showAllChapterWords) {

    categoryPosition.textContent =
        "جميع كلمات Kapitel";

    prevCategoryButton.disabled =
        true;

    nextCategoryButton.disabled =
        true;

} else {

    updateCategoryNavigation();

}


// =====================================
// أول عرض للكلمات
// =====================================

renderWords();
function backToCategories() {

    localStorage.removeItem(
        "netzwerkShowAllChapterWords"
    );

    window.location.href =
        "netzwerk-categories.html";

}