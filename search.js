const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// ==========================================
// إنشاء بطاقة الكلمة
// ==========================================
function createWordResult(word) {

    const card = document.createElement("div");
    card.className = "search-card";

    const title = document.createElement("h2");

    title.textContent =
        `${word.article ? word.article + " " : ""}${word.german.trim()}`;

    const meaning = document.createElement("p");
    meaning.textContent = word.arabic || "";

    const details = document.createElement("p");

    let detailsText = "";

    if (word.plural) {
        detailsText += `الجمع: ${word.plural}`;
    }

    if (word.type) {
        if (detailsText) detailsText += " | ";
        detailsText += `النوع: ${word.type}`;
    }

    if (word.level) {
        if (detailsText) detailsText += " | ";
        detailsText += `المستوى: ${word.level}`;
    }

    if (word.chapter) {
        if (detailsText) detailsText += " | ";
        detailsText += `Kapitel ${word.chapter}`;
    }

    details.textContent = detailsText;

    card.appendChild(title);
    card.appendChild(meaning);
    card.appendChild(details);

    searchResults.appendChild(card);
}


// ==========================================
// عرض كل الكلمات
// ==========================================
function showAllWords() {

    searchResults.innerHTML = "";

    netzwerkA1Words.forEach(function (word) {
        createWordResult(word);
    });
}


// ==========================================
// البحث
// ==========================================
searchInput.addEventListener("input", function () {

    const search = searchInput.value
        .trim()
        .toLowerCase();

    searchResults.innerHTML = "";

    // لو مربع البحث فاضي
    if (search === "") {
        showAllWords();
        return;
    }

    const results = netzwerkA1Words.filter(function (word) {

        const german = (word.german || "").toLowerCase();
        const arabic = (word.arabic || "").toLowerCase();
        const category = (word.category || "").toLowerCase();
        const type = (word.type || "").toLowerCase();
        const plural = (word.plural || "").toLowerCase();
        const level = (word.level || "").toLowerCase();

        return (
            german.includes(search) ||
            arabic.includes(search) ||
            category.includes(search) ||
            type.includes(search) ||
            plural.includes(search) ||
            level.includes(search)
        );

    });


    // لا توجد نتائج
    if (results.length === 0) {

        searchResults.innerHTML =
            "<p class='no-results'>لم يتم العثور على الكلمة.</p>";

        return;
    }


    // عرض النتائج
    results.forEach(function (word) {
        createWordResult(word);
    });

});


// ==========================================
// عرض الكلمات عند فتح الصفحة
// ==========================================
showAllWords();