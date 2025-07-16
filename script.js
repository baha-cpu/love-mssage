// 💖 القلب الدرامي في البداية
window.addEventListener("load", () => {
  const introHeart = document.getElementById("introHeart");
  setTimeout(() => {
    introHeart.style.display = "none";
    // ثم قلوب متحركة
    for (let i = 0; i < 20; i++) {
      let heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 4 + "s";
      document.body.appendChild(heart);
    }
  }, 3000);
});

// 🎵 زر تشغيل الموسيقى
document.getElementById("musicBtn").onclick = () => {
  document.getElementById("myAudio").play();
};

// 🔐 عرض الرسالة السرية
document.getElementById("secretBtn").onclick = () => {
  document.getElementById("secretMessage").style.display = "block";
};

// 💍 اللعبة السحرية
document.getElementById("startGameBtn").onclick = () => {
  document.getElementById("loveGame").style.display = "flex";
  document.getElementById("loveMusic").play();
};

document.getElementById("closeGameBtn").onclick = () => {
  document.getElementById("loveGame").style.display = "none";
  const music = document.getElementById("loveMusic");
  music.pause();
  music.currentTime = 0;
  const response = document.getElementById("loveResponse");
  response.style.display = "none";
  response.querySelector(".ring-emoji").classList.remove("grow-ring");
};

document.querySelectorAll(".loveAnswerBtn").forEach(btn => {
  btn.onclick = () => {
    const response = document.getElementById("loveResponse");
    response.style.display = "block";
    response.querySelector(".ring-emoji").classList.add("grow-ring");
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

let used = [], current = 0, score = 0, timer;

document.getElementById("startQuizBtn").onclick = () => {
  document.getElementById('quizOverlay').style.display = 'flex';
  generateHearts();
};

document.getElementById("closeQuizBtn").onclick = closeQuiz;
document.getElementById("closeQuizBtn2").onclick = closeQuiz;

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
  document.getElementById("questionText").innerText = questions[i];
  document.getElementById("questionBox").style.display = "block";
  startTimer();
  const music = document.getElementById("quizMusic");
  if (music.paused) music.play();
}

function startTimer() {
  let time = 30;
  const timerBox = document.getElementById("timer");
  timerBox.innerText = `⏱️ ${time}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timerBox.innerText = `⏱️ ${time}s`;
    if (time === 0) {
      clearInterval(timer);
      answer(false);
    }
  }, 1000);
}

document.querySelectorAll(".answerBtn").forEach(btn => {
  btn.onclick = () => {
    const knows = btn.getAttribute("data-answer") === "true";
    answer(knows);
  };
});

function answer(knows) {
  clearInterval(timer);
  document.getElementById("questionBox").style.display = 'none';
  if (knows) score++;
  if (current === questions.length) showResult();
}

function showResult() {
  const p = Math.round(score / questions.length * 100);
  let msg = '', color = '';
  if (p < 50) {
    msg = 'bh 🖕🏿🖕🏿🖕🏿'; color = '#ff4444';
  } else if (p <= 75) {
    msg = 'bh 👍👍👍'; color = '#ffc107';
  } else {
    msg = 'nhbk 💋'; color = '#28a745';
  }
  const resultText = document.getElementById("resultText");
  resultText.innerText = `نتيجتك: ${p}% → ${msg}`;
  resultText.style.color = color;
  document.getElementById("resultBox").style.display = 'block';
}

function closeQuiz() {
  document.getElementById("quizOverlay").style.display = 'none';
  document.getElementById("questionBox").style.display = 'none';
  document.getElementById("resultBox").style.display = 'none';
  document.getElementById("quizMusic").pause();
  document.getElementById("quizMusic").currentTime = 0;
  used = []; current = 0; score = 0;
  clearInterval(timer);
}