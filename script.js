// ✅ كلمات السر المسموح بها
const validPasswords = [
"chfeyfi",
"chfyfi",
"chfeyfy",
"chefty",
"chfeifi",
"chfyfy"
];

// ✅ منع التمرير في البداية
document.body.style.overflow = 'hidden';

// ✅ تأكيد جاهزية العناصر
document.addEventListener("DOMContentLoaded", () => {
const passwordOverlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const submitPassword = document.getElementById("submitPassword");
const passwordError = document.getElementById("passwordError");

submitPassword.onclick = function () {
const value = passwordInput.value.trim().toLowerCase();

if (validPasswords.includes(value)) {
passwordOverlay.style.display = "none";
document.body.style.overflow = ''; // تفعيل التمرير
} else {
passwordError.style.display = "block";
}

};
});

// ❤️ توليد القلوب المتحركة
for (let i = 0; i < 20; i++) {
let heart = document.createElement("div");
heart.className = "heart";
heart.innerHTML = "❤️";
heart.style.left = Math.random() * 100 + "vw";
heart.style.animationDuration = 3 + Math.random() * 4 + "s";
document.body.appendChild(heart);
}

// 🎵 زر تشغيل/إيقاف الموسيقى
const musicBtn = document.getElementById('musicBtn');
const mainAudio = document.getElementById('myAudio');

musicBtn.onclick = () => {
if (mainAudio.paused) {
mainAudio.play();
musicBtn.innerText = "🔊 إيقاف الموسيقى";
} else {
mainAudio.pause();
musicBtn.innerText = "🎵 تشغيل الموسيقى";
}
};

// 🎁 عرض الرسالة السرية
document.getElementById('secretBtn').onclick = () => {
document.getElementById('secretMessage').style.display = 'block';
};

// 💍 اللعبة السحرية (الخاتم)
document.getElementById('startGameBtn').onclick = () => {
document.getElementById("loveGame").style.display = "flex";
mainAudio.pause();

const loveMusic = document.getElementById("loveMusic");
if (loveMusic.paused) {
loveMusic.play().catch(() => {});
}
};

document.getElementById('closeGameBtn').onclick = () => {
document.getElementById("loveGame").style.display = "none";
const loveMusic = document.getElementById("loveMusic");
loveMusic.pause();
loveMusic.currentTime = 0;

const response = document.getElementById("loveResponse");
response.style.display = "none";
response.querySelector(".ring-emoji").classList.remove("grow-ring");
};

document.querySelectorAll('.loveAnswerBtn').forEach(btn => {
btn.onclick = () => {
const response = document.getElementById("loveResponse");
response.style.display = "block";
const ring = response.querySelector(".ring-emoji");
ring.classList.add("grow-ring");
};
});

// 🎮 لعبة "تعرفني؟"
const questions = [
"Akther equipe nhebha?⚽",
"Akthr équipe nhebha fi touns?⚽🇹🇳",
"Akthr karhba nhbhaa?🚗",
"Akthr joueur nhbou🐐",
"Chnya section eli na9ra fiha🧠",
"Chnya akthr matière nhbha📚",
"Chnya nhb nwli fi lmosta9l👷",
"Chnya no9tet dho3fi🫣",
"Kelma dima nawedha🔁",
"Akthr loun nhbu❓",
"Win nhb n3ich 🇦🇬",
"Akthr heja t8achechni🤬",
"Nhb nes taarfni ka chnw💭",
"Akthr rapeur nhbu🎤",
"Akthr 8neya nhbha🎧",
"nhb lhayawent?w chnya akthr hayawen nhbu🐕",
"Chnya lheja eli tkrzni ki t9ulha?🖕🏿",
"Heja modmen aaliha w nhb na7iha🍾",
"Heja t3jbni fik👀",
"Akthr sport nhbu 🏃🏻‍♂️"
];

let used = [], current = 0, score = 0, wasMusicPlaying = false;

const quizOverlay = document.getElementById('quizOverlay');
const questionText = document.getElementById('questionText');
const questionBox = document.getElementById('questionBox');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const quizMusic = document.getElementById('quizMusic');

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// ابدأ اللعبة
document.getElementById('startQuizBtn').onclick = () => {
wasMusicPlaying = !mainAudio.paused;
quizOverlay.style.display = 'flex';
generateHearts();
if (!mainAudio.paused) mainAudio.pause();
};

function generateHearts() {
const grid = document.getElementById('heartGrid');
grid.innerHTML = '';
for (let i = 0; i < questions.length; i++) {
const btn = document.createElement('div');
btn.className = 'heart-btn';
btn.innerText = '💌';
btn.onclick = () => showQuestion(i, btn);
grid.appendChild(btn);
}
}

function showQuestion(i, btn) {
if (used.includes(i)) return;
used.push(i);
current++;
btn.innerText = '📧';
btn.style.pointerEvents = 'none';
btn.style.opacity = 0.6;

questionText.innerText = ${questions[i]}\n✅ ${score}/${questions.length};
questionBox.style.display = 'block';

if (quizMusic.paused) quizMusic.play().catch(() => {});
}

document.querySelectorAll('.answerBtn').forEach(btn => {
btn.onclick = () => {
const knows = btn.getAttribute('data-answer') === 'true';
questionBox.style.display = 'none';
if (knows) {
score++;
correctSound.play();
} else {
wrongSound.play();
}
if (current === questions.length) showResult();
};
});

function showResult() {
const p = Math.round((score / questions.length) * 100);
let msg = '', color = '';
if (p < 50) {
msg = 'bh 🖕🏿🖕🏿🖕🏿';
color = '#ff4444';
} else if (p <= 75) {
msg = 'bh 👍👍👍';
color = '#ffc107';
} else {
msg = 'nhbk 💋';
color = '#28a745';
}

resultText.innerText = نتيجتك: ${p}% → ${msg};
resultText.style.color = color;
resultText.style.fontSize = '2.5em';
resultText.style.fontWeight = 'bold';
resultBox.style.display = 'block';

resultBox.querySelectorAll("button").forEach(el => el.remove());
const retryBtn = document.createElement("button");
retryBtn.innerText = "🔁 أعد المحاولة";
retryBtn.onclick = resetGame;
retryBtn.style.marginTop = "20px";
resultBox.appendChild(retryBtn);
}

function resetGame() {
used = [];
current = 0;
score = 0;
resultBox.style.display = 'none';
questionBox.style.display = 'none';
quizOverlay.style.display = 'none';
resultText.innerText = '';
quizMusic.pause();
quizMusic.currentTime = 0;

if (wasMusicPlaying) {
mainAudio.play().catch(() => {});
}
}

document.getElementById('closeQuizBtn').onclick = resetGame;


