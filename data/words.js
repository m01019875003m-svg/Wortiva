const wordsList = [

    // 👋 التحيات
    {
        german: "Hallo",
        article: "",
        plural: "",
        arabic: "مرحبًا",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Hallo! Wie geht es dir?",
        translation: "مرحبًا! كيف حالك؟",
        pronunciation: "هالو",
        difficulty: 1
    },

    {
        german: "Guten Morgen",
        article: "",
        plural: "",
        arabic: "صباح الخير",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Guten Morgen!",
        translation: "صباح الخير!",
        pronunciation: "جوتِن مورجِن",
        difficulty: 1
    },


    // 👨‍👩‍👧 العائلة
    {
        german: "Mutter",
        article: "die",
        plural: "Mütter",
        arabic: "أم",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Meine Mutter ist zu Hause.",
        translation: "أمي في المنزل.",
        pronunciation: "موتَر",
        difficulty: 1
    },

    {
        german: "Vater",
        article: "der",
        plural: "Väter",
        arabic: "أب",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Mein Vater arbeitet.",
        translation: "أبي يعمل.",
        pronunciation: "فاتَر",
        difficulty: 1
    },


    // 🏠 المنزل
    {
    german: "Haus",
    article: "das",
    plural: "Häuser",
    arabic: "منزل",
    image: "images/haus.jpg",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Das Haus ist groß.",
        translation: "المنزل كبير.",
        pronunciation: "هاوس",
        difficulty: 1
    },

    {
        german: "Zimmer",
        article: "das",
        plural: "Zimmer",
        arabic: "غرفة",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Mein Zimmer ist klein.",
        translation: "غرفتي صغيرة.",
        pronunciation: "تسيمَر",
        difficulty: 1
    },


    // 🍎 الطعام
    {
        german: "Apfel",
        article: "der",
        plural: "Äpfel",
        arabic: "تفاحة",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich esse einen Apfel.",
        translation: "أنا آكل تفاحة.",
        pronunciation: "أبفِل",
        difficulty: 1
    },

    {
        german: "Wasser",
        article: "das",
        plural: "",
        arabic: "ماء",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich trinke Wasser.",
        translation: "أنا أشرب الماء.",
        pronunciation: "فاسَر",
        difficulty: 1
    },


    // 🏫 التعليم
    {
        german: "Schule",
        article: "die",
        plural: "Schulen",
        arabic: "مدرسة",
        category: "التعليم",
        level: "A1",
        type: "اسم",
        example: "Die Schule ist groß.",
        translation: "المدرسة كبيرة.",
        pronunciation: "شولَه",
        difficulty: 1
    },

    {
        german: "Buch",
        article: "das",
        plural: "Bücher",
        arabic: "كتاب",
        category: "التعليم",
        level: "A1",
        type: "اسم",
        example: "Das Buch ist interessant.",
        translation: "الكتاب ممتع.",
        pronunciation: "بووخ",
        difficulty: 1
    },


    // 🚗 المواصلات
    {
        german: "Auto",
        article: "das",
        plural: "Autos",
        arabic: "سيارة",
        category: "المواصلات",
        level: "A1",
        type: "اسم",
        example: "Das Auto ist neu.",
        translation: "السيارة جديدة.",
        pronunciation: "آوتو",
        difficulty: 1
    },

    {
        german: "Zug",
        article: "der",
        plural: "Züge",
        arabic: "قطار",
        category: "المواصلات",
        level: "A1",
        type: "اسم",
        example: "Der Zug kommt um acht Uhr.",
        translation: "القطار يأتي الساعة الثامنة.",
        pronunciation: "تسووك",
        difficulty: 1
    },
    // 👋 التحيات والتعارف

{
        german: "Tschüss",
        article: "",
        plural: "",
        arabic: "إلى اللقاء",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Tschüss! Bis morgen.",
        translation: "إلى اللقاء! أراك غدًا.",
        pronunciation: "تشوس",
        difficulty: 1
    },

    {
        german: "Danke",
        article: "",
        plural: "",
        arabic: "شكرًا",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Danke für deine Hilfe.",
        translation: "شكرًا على مساعدتك.",
        pronunciation: "دانكَه",
        difficulty: 1
    },

    {
        german: "Bitte",
        article: "",
        plural: "",
        arabic: "من فضلك / العفو",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Bitte, komm herein.",
        translation: "من فضلك، ادخل.",
        pronunciation: "بِتَّه",
        difficulty: 1
    },

    {
        german: "Guten Abend",
        article: "",
        plural: "",
        arabic: "مساء الخير",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Guten Abend, Frau Müller.",
        translation: "مساء الخير، السيدة مولر.",
        pronunciation: "جوتِن آبِنت",
        difficulty: 1
    },

    {
        german: "Gute Nacht",
        article: "",
        plural: "",
        arabic: "تصبح على خير",
        category: "التحيات",
        level: "A1",
        type: "عبارة",
        example: "Gute Nacht! Schlaf gut.",
        translation: "تصبح على خير! نم جيدًا.",
        pronunciation: "جوتَه ناخت",
        difficulty: 1
    },


    // 👨‍👩‍👧 العائلة

    {
        german: "Bruder",
        article: "der",
        plural: "Brüder",
        arabic: "أخ",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Mein Bruder ist 15 Jahre alt.",
        translation: "أخي عمره 15 سنة.",
        pronunciation: "برودر",
        difficulty: 1
    },

    {
        german: "Schwester",
        article: "die",
        plural: "Schwestern",
        arabic: "أخت",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Meine Schwester lernt Deutsch.",
        translation: "أختي تتعلم الألمانية.",
        pronunciation: "شفِستر",
        difficulty: 1
    },

    {
        german: "Eltern",
        article: "die",
        plural: "",
        arabic: "الوالدان",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Meine Eltern sind zu Hause.",
        translation: "والداي في المنزل.",
        pronunciation: "إِلتَرن",
        difficulty: 1
    },

    {
        german: "Familie",
        article: "die",
        plural: "Familien",
        arabic: "عائلة",
        category: "العائلة",
        level: "A1",
        type: "اسم",
        example: "Meine Familie ist groß.",
        translation: "عائلتي كبيرة.",
        pronunciation: "فاميليَه",
        difficulty: 1
    },


    // 🏠 المنزل

    {
        german: "Tür",
        article: "die",
        plural: "Türen",
        arabic: "باب",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Die Tür ist offen.",
        translation: "الباب مفتوح.",
        pronunciation: "تور",
        difficulty: 1
    },

    {
        german: "Fenster",
        article: "das",
        plural: "Fenster",
        arabic: "نافذة",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Das Fenster ist offen.",
        translation: "النافذة مفتوحة.",
        pronunciation: "فِنستَر",
        difficulty: 1
    },

    {
        german: "Tisch",
        article: "der",
        plural: "Tische",
        arabic: "طاولة",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Das Buch liegt auf dem Tisch.",
        translation: "الكتاب موجود على الطاولة.",
        pronunciation: "تِش",
        difficulty: 1
    },

    {
        german: "Stuhl",
        article: "der",
        plural: "Stühle",
        arabic: "كرسي",
        category: "المنزل",
        level: "A1",
        type: "اسم",
        example: "Der Stuhl ist neben dem Tisch.",
        translation: "الكرسي بجانب الطاولة.",
        pronunciation: "شتول",
        difficulty: 1
    },


    // 🍎 الطعام والشراب

    {
        german: "Brot",
        article: "das",
        plural: "Brote",
        arabic: "خبز",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich esse Brot.",
        translation: "أنا آكل الخبز.",
        pronunciation: "برووت",
        difficulty: 1
    },

    {
        german: "Milch",
        article: "die",
        plural: "",
        arabic: "حليب",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich trinke Milch.",
        translation: "أنا أشرب الحليب.",
        pronunciation: "ميلخ",
        difficulty: 1
    },

    {
        german: "Kaffee",
        article: "der",
        plural: "",
        arabic: "قهوة",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich trinke Kaffee.",
        translation: "أنا أشرب القهوة.",
        pronunciation: "كافيه",
        difficulty: 1
    },

    {
        german: "Tee",
        article: "der",
        plural: "",
        arabic: "شاي",
        category: "الطعام",
        level: "A1",
        type: "اسم",
        example: "Ich trinke Tee.",
        translation: "أنا أشرب الشاي.",
        pronunciation: "تي",
        difficulty: 1
    },


    // 🏫 التعليم

    {
        german: "Lehrer",
        article: "der",
        plural: "Lehrer",
        arabic: "معلّم",
        category: "التعليم",
        level: "A1",
        type: "اسم",
        example: "Der Lehrer erklärt die Aufgabe.",
        translation: "المعلّم يشرح المهمة.",
        pronunciation: "ليرَر",
        difficulty: 1
    },

    {
        german: "Schüler",
        article: "der",
        plural: "Schüler",
        arabic: "طالب",
        category: "التعليم",
        level: "A1",
        type: "اسم",
        example: "Der Schüler lernt Deutsch.",
        translation: "الطالب يتعلم الألمانية.",
        pronunciation: "شولَر",
        difficulty: 1
    },

    {
        german: "Heft",
        article: "das",
        plural: "Hefte",
        arabic: "كراسة / دفتر",
        category: "التعليم",
        level: "A1",
        type: "اسم",
        example: "Das Heft ist auf dem Tisch.",
        translation: "الدفتر على الطاولة.",
        pronunciation: "هِفت",
        difficulty: 1
    },


    // 🚗 المواصلات

    {
        german: "Bus",
        article: "der",
        plural: "Busse",
        arabic: "حافلة / أتوبيس",
        category: "المواصلات",
        level: "A1",
        type: "اسم",
        example: "Ich fahre mit dem Bus.",
        translation: "أنا أذهب بالحافلة.",
        pronunciation: "بوس",
        difficulty: 1
    },

    {
        german: "Bahnhof",
        article: "der",
        plural: "Bahnhöfe",
        arabic: "محطة قطار",
        category: "المواصلات",
        level: "A1",
        type: "اسم",
        example: "Der Bahnhof ist dort.",
        translation: "محطة القطار هناك.",
        pronunciation: "بانهووف",
        difficulty: 1
    },

    {
        german: "Fahrrad",
        article: "das",
        plural: "Fahrräder",
        arabic: "دراجة",
        category: "المواصلات",
        level: "A1",
        type: "اسم",
        example: "Ich fahre mit dem Fahrrad.",
        translation: "أنا أذهب بالدراجة.",
        pronunciation: "فارّات",
        difficulty: 1
    },
        // 🏃 الأفعال

    {
        german: "sein",
        article: "",
        plural: "",
        arabic: "يكون",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich bin müde.",
        translation: "أنا متعب.",
        pronunciation: "زاين",
        difficulty: 1
    },

    {
        german: "haben",
        article: "",
        plural: "",
        arabic: "يمتلك / لديه",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich habe ein Buch.",
        translation: "لدي كتاب.",
        pronunciation: "هابِن",
        difficulty: 1
    },

    {
        german: "machen",
        article: "",
        plural: "",
        arabic: "يفعل",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Was machst du?",
        translation: "ماذا تفعل؟",
        pronunciation: "ماخِن",
        difficulty: 1
    },

    {
        german: "gehen",
        article: "",
        plural: "",
        arabic: "يذهب",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich gehe zur Schule.",
        translation: "أنا أذهب إلى المدرسة.",
        pronunciation: "جيهِن",
        difficulty: 1
    },

    {
        german: "kommen",
        article: "",
        plural: "",
        arabic: "يأتي",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich komme aus Ägypten.",
        translation: "أنا آتي من مصر.",
        pronunciation: "كومِن",
        difficulty: 1
    },

    {
        german: "lernen",
        article: "",
        plural: "",
        arabic: "يتعلم",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich lerne Deutsch.",
        translation: "أنا أتعلم الألمانية.",
        pronunciation: "ليرنِن",
        difficulty: 1
    },

    {
        german: "sprechen",
        article: "",
        plural: "",
        arabic: "يتحدث",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich spreche Deutsch.",
        translation: "أنا أتحدث الألمانية.",
        pronunciation: "شبرِخِن",
        difficulty: 1
    },

    {
        german: "essen",
        article: "",
        plural: "",
        arabic: "يأكل",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich esse einen Apfel.",
        translation: "أنا آكل تفاحة.",
        pronunciation: "إِسِن",
        difficulty: 1
    },

    {
        german: "trinken",
        article: "",
        plural: "",
        arabic: "يشرب",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich trinke Wasser.",
        translation: "أنا أشرب الماء.",
        pronunciation: "ترينكِن",
        difficulty: 1
    },

    {
        german: "schlafen",
        article: "",
        plural: "",
        arabic: "ينام",
        category: "الأفعال",
        level: "A1",
        type: "فعل",
        example: "Ich schlafe um zehn Uhr.",
        translation: "أنام الساعة العاشرة.",
        pronunciation: "شلافِن",
        difficulty: 1
    },


    // 😊 الصفات

    {
        german: "gut",
        article: "",
        plural: "",
        arabic: "جيد",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Essen ist gut.",
        translation: "الطعام جيد.",
        pronunciation: "جوت",
        difficulty: 1
    },

    {
        german: "schlecht",
        article: "",
        plural: "",
        arabic: "سيئ",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Wetter ist schlecht.",
        translation: "الطقس سيئ.",
        pronunciation: "شليخت",
        difficulty: 1
    },

    {
        german: "groß",
        article: "",
        plural: "",
        arabic: "كبير",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Haus ist groß.",
        translation: "المنزل كبير.",
        pronunciation: "جرووس",
        difficulty: 1
    },

    {
        german: "klein",
        article: "",
        plural: "",
        arabic: "صغير",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Zimmer ist klein.",
        translation: "الغرفة صغيرة.",
        pronunciation: "كلاين",
        difficulty: 1
    },

    {
        german: "neu",
        article: "",
        plural: "",
        arabic: "جديد",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Auto ist neu.",
        translation: "السيارة جديدة.",
        pronunciation: "نوي",
        difficulty: 1
    },

    {
        german: "alt",
        article: "",
        plural: "",
        arabic: "قديم / كبير في السن",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Das Haus ist alt.",
        translation: "المنزل قديم.",
        pronunciation: "ألت",
        difficulty: 1
    },

    {
        german: "schön",
        article: "",
        plural: "",
        arabic: "جميل",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Die Stadt ist schön.",
        translation: "المدينة جميلة.",
        pronunciation: "شون",
        difficulty: 1
    },

    {
        german: "müde",
        article: "",
        plural: "",
        arabic: "متعب",
        category: "الصفات",
        level: "A1",
        type: "صفة",
        example: "Ich bin müde.",
        translation: "أنا متعب.",
        pronunciation: "موده",
        difficulty: 1
    },


    // 🔢 الأرقام

    {
        german: "eins",
        article: "",
        plural: "",
        arabic: "واحد",
        category: "الأرقام",
        level: "A1",
        type: "رقم",
        example: "Ich habe ein Buch.",
        translation: "لدي كتاب واحد.",
        pronunciation: "آينس",
        difficulty: 1
    },

    {
        german: "zwei",
        article: "",
        plural: "",
        arabic: "اثنان",
        category: "الأرقام",
        level: "A1",
        type: "رقم",
        example: "Ich habe zwei Brüder.",
        translation: "لدي أخوان.",
        pronunciation: "تسفاي",
        difficulty: 1
    },

    {
        german: "drei",
        article: "",
        plural: "",
        arabic: "ثلاثة",
        category: "الأرقام",
        level: "A1",
        type: "رقم",
        example: "Drei Kinder spielen.",
        translation: "ثلاثة أطفال يلعبون.",
        pronunciation: "دراي",
        difficulty: 1
    },

    {
        german: "vier",
        article: "",
        plural: "",
        arabic: "أربعة",
        category: "الأرقام",
        level: "A1",
        type: "رقم",
        example: "Vier Schüler lernen.",
        translation: "أربعة طلاب يتعلمون.",
        pronunciation: "فير",
        difficulty: 1
    },

    {
        german: "fünf",
        article: "",
        plural: "",
        arabic: "خمسة",
        category: "الأرقام",
        level: "A1",
        type: "رقم",
        example: "Fünf Kinder sind hier.",
        translation: "خمسة أطفال هنا.",
        pronunciation: "فونف",
        difficulty: 1
    },


    // 🎨 الألوان

    {
        german: "rot",
        article: "",
        plural: "",
        arabic: "أحمر",
        category: "الألوان",
        level: "A1",
        type: "صفة",
        example: "Das Auto ist rot.",
        translation: "السيارة حمراء.",
        pronunciation: "رووت",
        difficulty: 1
    },

    {
        german: "blau",
        article: "",
        plural: "",
        arabic: "أزرق",
        category: "الألوان",
        level: "A1",
        type: "صفة",
        example: "Das Auto ist blau.",
        translation: "السيارة زرقاء.",
        pronunciation: "بلاو",
        difficulty: 1
    },

    {
        german: "grün",
        article: "",
        plural: "",
        arabic: "أخضر",
        category: "الألوان",
        level: "A1",
        type: "صفة",
        example: "Das Gras ist grün.",
        translation: "العشب أخضر.",
        pronunciation: "جرون",
        difficulty: 1
    },

    {
        german: "gelb",
        article: "",
        plural: "",
        arabic: "أصفر",
        category: "الألوان",
        level: "A1",
        type: "صفة",
        example: "Die Blume ist gelb.",
        translation: "الزهرة صفراء.",
        pronunciation: "جِلب",
        difficulty: 1
    }
];
