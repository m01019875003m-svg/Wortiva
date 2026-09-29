async function getCurrentUser() {
const { data, error } =
await supabaseClient.auth.getUser();


if (error) {
    console.error("User error:", error);
    return null;
}

return data.user;


}

// ==========================================
// تحميل تقدم المستخدم من Supabase
// ==========================================

async function loadUserProgress() {


const user = await getCurrentUser();

if (!user) {
    return null;
}

const { data, error } =
    await supabaseClient
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

if (error) {
    console.error("Load progress error:", error);
    return null;
}

return data;


}

// ==========================================
// حفظ تقدم المستخدم
// ==========================================

async function saveUserProgress(progress) {


const user = await getCurrentUser();

if (!user) {
    return false;
}

const { error } =
    await supabaseClient
        .from("user_progress")
        .upsert({
            user_id: user.id,
            xp: Number(progress.xp) || 0,
            level: Number(progress.level) || 1,
            streak: Number(progress.streak) || 0,
            last_activity: progress.lastActivity || null,
            updated_at: new Date().toISOString()
        });

if (error) {
    console.error("Save progress error:", error);
    return false;
}

return true;


}

// ==========================================
// تحميل كلمات المراجعة
// ==========================================

async function loadUserReviews() {


const user = await getCurrentUser();

if (!user) {
    return [];
}

const { data, error } =
    await supabaseClient
        .from("word_reviews")
        .select("*")
        .eq("user_id", user.id);

if (error) {
    console.error("Load reviews error:", error);
    return [];
}

return data || [];


}

// ==========================================
// حفظ كلمة مراجعة
// ==========================================

async function saveWordReview(wordKey, review) {


const user = await getCurrentUser();

if (!user) {
    return false;
}

const { error } =
    await supabaseClient
        .from("word_reviews")
        .upsert({
            user_id: user.id,

            word_key: wordKey,

            level: Number(review.level) || 0,

            needs_review: Boolean(review.needsReview),

            last_reviewed: review.lastReviewed || null,

            next_review: review.nextReview || null,

            updated_at: new Date().toISOString()
        });

if (error) {
    console.error("Save word review error:", error);
    return false;
}

return true;


}
