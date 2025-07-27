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

// ✅ تأكيد جاهزية العناصر عند تحميل الصفحة
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

// بدء لعبة "تعرفني؟"
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

  questionText.innerText = `${questions[i]}\n✅ ${score}/${questions.length}`;
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

  resultText.innerText = `نتيجتك: ${p}% → ${msg}`;
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
// متغيرات اللعبة
const worlds = [
  // 1. عالم الإمساك بالقلب الهارب
  {
    name: "عالم القلب الهارب",
    bg: "linear-gradient(120deg,#f5576c 40%,#f093fb 100%)",
    content: `
      <h2>🌟 عالم القلب الهارب 🌟</h2>
      <p>هناك قلب صغير يهرب منك! اضغطي عليه ثلاث مرات للإمساك به.</p>
      <div id="runawayHeart" style="position:relative; height:180px; margin-top:25px;">
        <span id="heartSprite" style="font-size:3.5em; position:absolute; left:50px; top:50px; transition:.2s;"></span>
      </div>
      <div class="loveTapHint">إلمسي القلب بسرعة!</div>
      <div id="catchCount" style="margin-top:16px; font-size:1.2em;"></div>
    `,
    onEnter: function() {
      let heart = document.getElementById('heartSprite');
      let count = 0;
      heart.innerText = "💗";
      function moveHeart() {
        if (!heart) return;
        let parent = document.getElementById('runawayHeart');
        let w = parent.offsetWidth-60, h = parent.offsetHeight-60;
        heart.style.left = (Math.random()*w)+"px";
        heart.style.top = (Math.random()*h)+"px";
      }
      moveHeart();
      heart.ontouchstart = function(e) {
        e.preventDefault();
        count++;
        document.getElementById('catchCount').innerText = `عدد مرات الإمساك: ${count}/3`;
        moveHeart();
        if(count>=3){
          document.getElementById('catchCount').innerText = "👏 برافو! أمسكتِ القلب!";
          setTimeout(()=>nextWorldBtn.style.display='block',800);
        }
      };
      // لمزيد من المرح: القلب يتحرك كل ثانية ليهرب!
      let interval = setInterval(moveHeart, 1100);
      nextWorldBtn.addEventListener("click", ()=>clearInterval(interval), {once:true});
    }
  },
// 2. عالم تركيب الصورة (معدّل لصور 720x907)
{
  name: "عالم الذكرى الجميلة",
  bg: "linear-gradient(120deg,#43cea2 40%,#185a9d 100%)",
  content: `
    <h2>🧩 عالم الذكرى الجميلة 🧩</h2>
    <p>اسحبي القطع لتجميع الصورة الرومانسية.</p>
    <canvas id="puzzleCanvas" width="720" height="907" style="touch-action:none; background:#eee; border-radius:18px;"></canvas>
    <div class="loveTapHint">اسحبي القطع بأصبعك!</div>
    <button id="nextWorldBtn" style="display:none;">التالي</button>
  `,
  onEnter: function() {
    const imgSrc = "puzzle.jpg"; // تأكد من وجود الصورة بهذا الاسم
    const canvas = document.getElementById("puzzleCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;

    const pw = 360, ph = 454; // نصف عرض وارتفاع الصورة الأصلية 720x907

    const pieces = [
      { x: 0,   y: 0,    ox: 50,  oy: 50 },           // أعلى يسار
      { x: pw, y: 0,    ox: 420, oy: 60 },           // أعلى يمين
      { x: 0,   y: ph,  ox: 60,  oy: ph + 100 },     // أسفل يسار
      { x: pw, y: ph,  ox: 430, oy: ph + 100 }       // أسفل يمين
    ];

    let dragging = -1, offsetX = 0, offsetY = 0;

    img.onload = draw;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 4; i++) {
        const p = pieces[i];
        ctx.drawImage(img, p.x, p.y, pw, ph, p.ox, p.oy, pw, ph);
        ctx.strokeStyle = "#ff3399";
        ctx.lineWidth = 3;
        ctx.strokeRect(p.ox, p.oy, pw, ph);
      }
    }

    function getPieceAt(x, y) {
      for (let i = 3; i >= 0; i--) {
        const p = pieces[i];
        if (x > p.ox && x < p.ox + pw && y > p.oy && y < p.oy + ph) {
          return i;
        }
      }
      return -1;
    }

    canvas.ontouchstart = function(e) {
      const r = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - r.left;
      const y = e.touches[0].clientY - r.top;
      const idx = getPieceAt(x, y);
      if (idx > -1) {
        dragging = idx;
        offsetX = x - pieces[idx].ox;
        offsetY = y - pieces[idx].oy;
      }
    };

    canvas.ontouchmove = function(e) {
      if (dragging === -1) return;
      const r = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - r.left;
      const y = e.touches[0].clientY - r.top;
      pieces[dragging].ox = x - offsetX;
      pieces[dragging].oy = y - offsetY;
      draw();
    };

    canvas.ontouchend = function() {
      if (dragging === -1) return;
      const p = pieces[dragging];
      if (Math.abs(p.ox - p.x) < 20 && Math.abs(p.oy - p.y) < 20) {
        p.ox = p.x;
        p.oy = p.y;
      }
      dragging = -1;
      draw();

      const ok = pieces.every(p => p.ox === p.x && p.oy === p.y);
      if (ok) {
        const btn = document.getElementById("nextWorldBtn");
        if (btn) btn.style.display = "block";
      }
    };
  }
},

  // 3. شاشة النهاية (يمكنك تغيير النص والصورة)
  {
    name: "نهاية الرحلة",
    bg: "linear-gradient(120deg,#f7971e 40%,#ffd200 100%)",
    content: `
      <h2>🎉 النهاية 🎉</h2>
      <p>لقد أنقذتِ قصة حبنا!<br>انظري للمفاجأة:</p>
      <img src="surprise.jpg" style="max-width:220px; border-radius:16px;">
      <div style="margin-top:25px; color:#ff3399; font-size:1.3em;">
        أنتِ حبي الأبدي ♥<br>أحبك بلا نهاية!
      </div>
      <div class="loveTapHint">يمكنك الخروج من اللعبة الآن</div>
    `,
    onEnter: function() {}
  }
];

const startLoveJourneyBtn = document.getElementById("startLoveJourneyBtn");
const loveJourneyOverlay = document.getElementById("loveJourneyOverlay");
const loveWorld = document.getElementById("loveWorld");
const nextWorldBtn = document.getElementById("nextWorldBtn");
const loveJourneyMusic = document.getElementById("loveJourneyMusic");

let worldIndex = 0;

startLoveJourneyBtn.onclick = function(){
  loveJourneyOverlay.style.display = "flex";
  worldIndex = 0;
  showWorld(worldIndex);
  loveJourneyMusic.play().catch(()=>{});
  document.body.style.overflow = "hidden";
};
nextWorldBtn.onclick = function(){
  worldIndex++;
  if(worldIndex < worlds.length){
    showWorld(worldIndex);
  }
};
function showWorld(idx){
  let w = worlds[idx];
  loveWorld.innerHTML = w.content;
  loveJourneyOverlay.style.background = w.bg;
  nextWorldBtn.style.display = "none";
  setTimeout(()=>w.onEnter&&w.onEnter(),120);
  // زر العودة عند النهاية
  if(idx===worlds.length-1){
    nextWorldBtn.style.display = "none";
    loveJourneyMusic.pause();
    setTimeout(()=>loveJourneyOverlay.onclick = ()=>{ 
      loveJourneyOverlay.style.display = "none"; 
      document.body.style.overflow = "";
    }, 800);
  }else{
    loveJourneyOverlay.onclick = null;
  }
}