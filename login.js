const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

loginButton.addEventListener("click", async () => {


const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value;

loginMessage.textContent = "";

if (!email || !password) {

    loginMessage.textContent =
        "⚠️ اكتب البريد الإلكتروني وكلمة المرور.";

    return;
}

loginButton.disabled = true;
loginButton.textContent = "جاري تسجيل الدخول...";

try {

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    console.log("Login data:", data);
    console.log("Login error:", error);

    if (error) {

        loginMessage.textContent =
            "❌ " + error.message;

        loginButton.disabled = false;
        loginButton.textContent = "تسجيل الدخول";

        return;
    }

    loginMessage.textContent =
        "✅ تم تسجيل الدخول بنجاح!";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);

} catch (error) {

    console.error("Login error:", error);

    loginMessage.textContent =
        "❌ حدث خطأ: " + error.message;

    loginButton.disabled = false;
    loginButton.textContent = "تسجيل الدخول";
}


});
