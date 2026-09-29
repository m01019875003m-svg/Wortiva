const signupButton = document.getElementById("signupButton");
const signupMessage = document.getElementById("signupMessage");

signupButton.addEventListener("click", async () => {

const name = document.getElementById("signupName").value.trim();
const phone = document.getElementById("signupPhone").value.trim();
const email = document.getElementById("signupEmail").value.trim();
const password = document.getElementById("signupPassword").value;

signupMessage.textContent = "";

if (!name) {
    signupMessage.textContent = "⚠️ اكتب اسم المستخدم.";
    return;
}

if (!phone) {
    signupMessage.textContent = "⚠️ اكتب رقم الهاتف.";
    return;
}

if (!email || !password) {
    signupMessage.textContent =
        "⚠️ اكتب البريد الإلكتروني وكلمة المرور.";
    return;
}

if (password.length < 6) {
    signupMessage.textContent =
        "⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
    return;
}

signupButton.disabled = true;
signupButton.textContent = "جاري إنشاء الحساب...";

try {

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password,

            options: {
                data: {
                    name: name,
                    phone: phone
                }
            }
        });

    console.log("Signup data:", data);
    console.log("Signup error:", error);

    if (error) {

        signupMessage.textContent =
            "❌ " + error.message;

        signupButton.disabled = false;
        signupButton.textContent = "إنشاء الحساب";

        return;
    }

    if (data && data.user) {

        if (data.session) {

            signupMessage.textContent =
                "✅ تم إنشاء الحساب بنجاح!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {

            signupMessage.textContent =
                "✅ تم إنشاء الحساب بنجاح! يرجى تأكيد بريدك الإلكتروني.";

            signupButton.disabled = false;
            signupButton.textContent = "إنشاء الحساب";
        }

    } else {

        signupMessage.textContent =
            "⚠️ لم يتم إنشاء الحساب. حاول مرة أخرى.";

        signupButton.disabled = false;
        signupButton.textContent = "إنشاء الحساب";
    }

} catch (error) {

    console.error("Signup exception:", error);

    signupMessage.textContent =
        "❌ حدث خطأ: " + error.message;

    signupButton.disabled = false;
    signupButton.textContent = "إنشاء الحساب";
}


});
