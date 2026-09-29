const favoritesResults =
    document.getElementById("favoritesResults");


// ================================
// إنشاء مفتاح للكلمة
// ================================

function getWordKey(word) {

    return (
        word.level +
        "|" +
        word.category +
        "|" +
        word.german
    );

}


// ================================
// الحصول على المفضلة
// ================================

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favoriteWords") || "[]"
    );

}


// ================================
// عرض المفضلة
// ================================

function showFavorites() {

    favoritesResults.innerHTML = "";

    const favorites =
        getFavorites();


    const favoriteWords =
        wordsList.filter(function (word) {

            return favorites.includes(
                getWordKey(word)
            );

        });


    // لو مفيش كلمات
    if (favoriteWords.length === 0) {

        favoritesResults.innerHTML = `
            <div class="search-card no-results">
                <h2>⭐ لا توجد كلمات مفضلة</h2>
                <p>
                    اذهب إلى التعلم واضغط على
                    "أضف للمفضلة".
                </p>
            </div>
        `;

        return;
    }


    // عرض الكلمات
    favoriteWords.forEach(function (word) {

        const card =
            document.createElement("div");

        card.className =
            "search-card";


        const title =
            document.createElement("h2");

        title.textContent =
            `${word.article ? word.article + " " : ""}${word.german}`;


        const meaning =
            document.createElement("p");

        meaning.textContent =
            "🇪🇬 " + word.arabic;


        const details =
            document.createElement("p");

        details.textContent =
            `📚 ${word.category} | 🎓 ${word.level}`;


        const example =
            document.createElement("p");

        example.textContent =
            "🇩🇪 " + word.example;


        const removeButton =
            document.createElement("button");

        removeButton.className =
            "favorite-button";

        removeButton.textContent =
            "⭐ إزالة من المفضلة";


        removeButton.addEventListener(
            "click",
            function () {

                let currentFavorites =
                    getFavorites();


                currentFavorites =
                    currentFavorites.filter(
                        function (item) {

                            return item !==
                                getWordKey(word);

                        }
                    );


                localStorage.setItem(
                    "favoriteWords",
                    JSON.stringify(currentFavorites)
                );


                showFavorites();

            }
        );


        card.appendChild(title);
        card.appendChild(meaning);
        card.appendChild(details);
        card.appendChild(example);
        card.appendChild(removeButton);


        favoritesResults.appendChild(card);

    });

}


// ================================
// تشغيل الصفحة
// ================================

showFavorites();