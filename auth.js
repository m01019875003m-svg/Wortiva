const authArea = document.getElementById("authArea");

async function updateAuthUI() {


if (!authArea) return;

const { data, error } =
    await supabaseClient.auth.getSession();

if (error) {
    console.error("Session error:", error);
    return;
}

const session = data.session;


// =========================
// المستخدم مسجل الدخول
// =========================

if (session) {

    const name =
        session.user.user_metadata?.name ||
        "مستخدم Wortiva";

    authArea.innerHTML = `
        <div class="user-profile">

            <div class="user-avatar">
                👤
            </div>

            <div class="user-info">
                <span class="user-greeting">
                    مرحبًا
                </span>

                <span class="user-name">
                    ${name}
                </span>
            </div>

        </div>

        <button
            id="logoutButton"
            class="logout-button"
        >
            تسجيل الخروج
        </button>
    `;


    document
        .getElementById("logoutButton")
        .addEventListener("click", logoutUser);


} else {

    // =========================
    // المستخدم غير مسجل
    // =========================

    authArea.innerHTML = `

        <div class="auth-buttons">

            <button
                class="login-button"
                onclick="window.location.href='login.html'"
            >
                🔐 تسجيل الدخول
            </button>

            <button
                class="signup-button"
                onclick="window.location.href='signup.html'"
            >
                📝 إنشاء حساب
            </button>

        </div>

    `;
}


}

// =========================
// تسجيل الخروج
// =========================

async function logoutUser() {


const { error } =
    await supabaseClient.auth.signOut();

if (error) {

    console.error("Logout error:", error);

    alert("حدث خطأ أثناء تسجيل الخروج.");

    return;
}

window.location.reload();

}

// تشغيل النظام

updateAuthUI();
