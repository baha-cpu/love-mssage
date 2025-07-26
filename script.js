// حالة التطبيق
const appState = {
  audio: {
    main: document.getElementById('myAudio'),
    love: document.getElementById('loveMusic'),
    quiz: document.getElementById('quizMusic')
  },
  game: {
    questions: [
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
    ],
    usedIndices: [],
    score: 0
  }
};

// تهيئة الصفحة
document.addEventListener("DOMContentLoaded", () => {
  initPasswordProtection();
  createFloatingHearts();
  setupEventListeners();
});

// حماية بكلمة السر
function initPasswordProtection() {
  const validPasswords = ["chfeyfi", "chfyfi", "chfeyfy", "chefty", "chfeifi", "chfyfy"];
  const passwordOverlay = document.getElementById('passwordOverlay');
  const passwordInput = document.getElementById('passwordInput');
  const submitPassword = document.getElementById('submitPassword');
  const passwordError = document.getElementById('passwordError');

  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });

  submitPassword.addEventListener('click', checkPassword);

  function checkPassword() {
    const value = passwordInput.value.trim().toLowerCase();
    if (validPasswords.includes(value)) {
      passwordOverlay.style.display = "none";
      document.body.style.overflow = '';
    } else {
      passwordError.style.display = "block";
      passwordInput.focus();
    }
  }
}

// إنشاء القلوب المتحركة
function createFloatingHearts() {
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${3 + Math.random() * 4}s`;
    fragment.appendChild(heart);
  }
  
  document.body.appendChild(fragment);
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
  // الموسيقى الرئيسية
  document.getElementById('musicBtn').addEventListener('click', toggleMainMusic);

  // الرسالة السرية
  document.getElementById('secretBtn').addEventListener('click', () => {
    document.getElementById('secretMessage').style.display = 'block';
  });

  // إعداد الألعاب
  setupLoveGame();
  setupQuizGame();
}

// تشغيل/إيقاف الموسيقى الرئيسية
function toggleMainMusic() {
  const btn = document.getElementById('musicBtn');
  if (appState.audio.main.paused) {
    appState.audio.main.play()
      .then(() => btn.textContent = "🔊 إيقاف الموسيقى")
      .catch(e => console.error('Error playing audio:', e));
  } else {
    appState.audio.main.pause();
    btn.textContent = "🎵 تشغيل الموسيقى";
  }
}

// لعبة الحب
function setupLoveGame() {
  const loveGame = document.getElementById('loveGame');
  const startBtn = document.getElementById('startGameBtn');
  const closeBtn = document.getElementById('closeGameBtn');
  
  startBtn.addEventListener('click', () => {
    loveGame.style.display = "flex";
    appState.audio.main.pause();
    appState.audio.love.play().catch(() => {});
  });
  
  closeBtn.addEventListener('click', () => {
    loveGame.style.display = "none";
    appState.audio.love.pause();
    document.getElementById("loveResponse").style.display = "none";
  });
  
  document.querySelectorAll('.loveAnswerBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const response = document.getElementById("loveResponse");
      response.style.display = "block";
    });
  });
}

// لعبة الأسئلة
function setupQuizGame() {
  const quizOverlay = document.getElementById('quizOverlay');
  const startBtn = document.getElementById('startQuizBtn');
  const closeBtn = document.getElementById('closeQuizBtn');
  
  startBtn.addEventListener('click', startQuiz);
  closeBtn.addEventListener('click', resetQuiz);
  
  function startQuiz() {
    appState.game.usedIndices = [];
    appState.game.score = 0;
    quizOverlay.style.display = 'flex';
    generateHeartGrid();
    appState.audio.main.pause();
  }
  
  function generateHeartGrid() {
    const grid = document.getElementById('heartGrid');
    grid.innerHTML = '';
    
    appState.game.questions.forEach((_, i) => {
      const btn = document.createElement('div');
      btn.className = 'heart-btn';
      btn.textContent = '💌';
      btn.addEventListener('click', () => showQuestion(i));
      grid.appendChild(btn);
    });
  }
  
  function showQuestion(index) {
    if (appState.game.usedIndices.includes(index)) return;
    
    appState.game.usedIndices.push(index);
    document.getElementById('questionText').textContent = appState.game.questions[index];
    document.getElementById('questionBox').style.display = 'block';
    appState.audio.quiz.play().catch(() => {});
  }
  
  document.querySelectorAll('.answerBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const knows = btn.dataset.answer === 'true';
      if (knows) appState.game.score++;
      
      document.getElementById('questionBox').style.display = 'none';
      
      if (appState.game.usedIndices.length === appState.game.questions.length) {
        showResult();
      }
    });
  });
  
  function showResult() {
    const percentage = Math.round((appState.game.score / appState.game.questions.length) * 100);
    let message, color;
    
    if (percentage < 50) {
      message = 'bh 🖕🏿🖕🏿🖕🏿';
      color = '#ff4444';
    } else if (percentage <= 75) {
      message = 'bh 👍👍👍';
      color = '#ffc107';
    } else {
      message = 'nhbk 💋';
      color = '#28a745';
    }
    
    document.getElementById('resultText').innerHTML = `نتيجتك: ${percentage}% → ${message}`;
    document.getElementById('resultText').style.color = color;
    document.getElementById('resultBox').style.display = 'block';
  }
  
  function resetQuiz() {
    quizOverlay.style.display = 'none';
    appState.audio.quiz.pause();
    appState.audio.main.play().catch(() => {});
  }
}