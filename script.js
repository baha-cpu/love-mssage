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
// 1. عالم القلب الهارب
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
        document.getElementById('catchCount').innerText = "👏 Nhebk💋!";
        setTimeout(()=>nextWorldBtn.style.display='block',800);
      }
    };
    let interval = setInterval(moveHeart, 1100);
    nextWorldBtn.addEventListener("click", ()=>clearInterval(interval), {once:true});
  }
},

// 2. عالم بازل الصورة (720x907)
{
  name: "عالم الذكرى الجميلة",
  bg: "linear-gradient(120deg,#43cea2 40%,#185a9d 100%)",
  content: `
    <h2>🧩 عالم الذكرى الجميلة 🧩</h2>
    <p>اسحبي القطع لتجميع صورتك🫣.</p>
    <div style="overflow:auto; display:flex; justify-content:center;">
      <canvas id="puzzleCanvas" width="720" height="907" style="touch-action:none; background:#eee; border-radius:18px; max-width:98vw; max-height:72vh;"></canvas>
    </div>
    <div class="loveTapHint">اسحبي القطع بأصبعك!</div>
  `,
  onEnter: function() {
    const imgSrc = "puzzle.jpg";
    const canvas = document.getElementById("puzzleCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;

    const pw = 360, ph = 453.5;
    let pieces = [
      { x: 0,    y: 0,    ox: 40,   oy: 80 },
      { x: pw,   y: 0,    ox: 380,  oy: 35 },
      { x: 0,    y: ph,   ox: 70,   oy: 490 },
      { x: pw,   y: ph,   ox: 410,  oy: 570 }
    ];

    let dragging = -1, offsetX = 0, offsetY = 0;

    img.onload = draw;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 4; i++) {
        const p = pieces[i];
        ctx.drawImage(img, p.x, p.y, pw, ph, p.ox, p.oy, pw, ph);
        ctx.strokeStyle = "#ff3399";
        ctx.lineWidth = 4;
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
    canvas.addEventListener("touchmove", function(e) { e.preventDefault(); }, { passive: false });
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
      if (Math.abs(p.ox - p.x) < 25 && Math.abs(p.oy - p.y) < 25) {
        p.ox = p.x;
        p.oy = p.y;
      }
      dragging = -1;
      draw();
      const ok = pieces.every((p, i) => p.ox === p.x && p.oy === p.y);
      if (ok) {
        setTimeout(()=>nextWorldBtn.style.display='block',900);
      }
    };
  }
},

// 3. عالم الرسالة المشفرة
{
  name: "عالم الرسالة المشفرة",
  bg: "linear-gradient(120deg,#8360c3 40%,#2ebf91 100%)",
  content: `
    <h2>🔐 عالم الرسالة المشفرة 🔐</h2>
    <p>رتبي الحروف لتكتشفي الكلمة السرية!</p>
    <div style="margin:20px 0;">
      <span id="secretWordBox" style="display:inline-block; font-size:2em;"></span>
    </div>
    <div style="margin-bottom:18px;">
      <button id="shuffleBtn" style="padding:6px 16px; background:#ff3399; color:#fff; border:none; border-radius:15px;">إعادة خلط</button>
    </div>
    <input id="secretInput" type="text" placeholder="اكتبي الكلمة هنا" style="font-size:1.2em; padding:6px 12px; border-radius:10px; border:1px solid #ccc;">
    <div id="secretMsg" style="margin-top:14px; font-size:1.1em;"></div>
  `,
  onEnter: function() {
    const word = "DADDY"; // الكلمة السرية
    let shuffled = word.split('').sort(()=>Math.random()-0.5);
    const box = document.getElementById("secretWordBox");
    const btn = document.getElementById("shuffleBtn");
    const input = document.getElementById("secretInput");
    const msg = document.getElementById("secretMsg");
    function showWord() {
      box.innerText = shuffled.join(' ');
    }
    showWord();
    btn.onclick = function() {
      shuffled = word.split('').sort(()=>Math.random()-0.5);
      showWord();
    };
    input.oninput = function() {
      if(input.value.replace(/\s/g,'') === word){
        msg.innerHTML = "<span style='color:#1baf9e'>Bravooo hbyby!!! ♥</span>";
        setTimeout(()=>nextWorldBtn.style.display='block',900);
      } else {
        msg.innerHTML = "";
      }
    };
  }
},

// 4. عالم الذاكرة (اختبار)
{
  name: "عالم اختبار الذكرى",
  bg: "linear-gradient(120deg,#f7971e 40%,#ffd200 100%)",
  content: `
    <h2>🧠 عالم اختبار الذكرى 🧠</h2>
    <p>أي تاريخ هو تاريخ بداية قصتنا؟</p>
    <div style="margin:20px 0;">
      <button class="memoryBtn" style="margin:6px 8px; padding:8px 18px; border-radius:13px;">12-02-2025</button>
      <button class="memoryBtn" style="margin:6px 8px; padding:8px 18px; border-radius:13px;">25-01-2025</button>
      <button class="memoryBtn" style="margin:6px 8px; padding:8px 18px; border-radius:13px;">27-01-2025</button>
    </div>
    <div id="memoryMsg" style="margin-top:12px; font-size:1.1em;"></div>
  `,
  onEnter: function() {
    const buttons = document.querySelectorAll(".memoryBtn");
    const msg = document.getElementById("memoryMsg");
    buttons.forEach(btn=>{
      btn.onclick = function() {
        if(btn.innerText==="27-01-2025"){
          btn.style.background="#43cea2";
          msg.innerHTML = "love uu princess ♥";
          setTimeout(()=>nextWorldBtn.style.display='block',900);
        } else {
          btn.style.background="#f5576c";
          msg.innerHTML = "leeee ghalet aawed🖕🏿";
        }
      };
    });
  }
},

// 5. عالم رسم القلب (رومانسي تفاعلي)
{
  name: "عالم رسم القلب",
  bg: "linear-gradient(120deg,#fc466b 40%,#3f5efb 100%)",
  content: `
    <h2>🎨 عالم رسم القلب 🎨</h2>
    <p>Draw a heart with your finger inside the frame❤️!</p>
    <canvas id="drawCanvas" width="320" height="320" style="background:#fff; border-radius:18px; box-shadow:0 0 10px #ff339970; margin:10px 0;"></canvas>
    <div class="loveTapHint">Write or draw anything you like!✨</div>
  `,
  onEnter: function() {
    const canvas = document.getElementById("drawCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;
    canvas.ontouchstart = function(e) {
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };
    canvas.ontouchmove = function(e) {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#f50057";
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    canvas.ontouchend = function() {
      drawing = false;
      setTimeout(()=>nextWorldBtn.style.display='block',900);
    };
  }
},

// 6. عالم اختيار الباب الصحيح (مفاجأة)
{
  name: "عالم الباب السحري",
  bg: "linear-gradient(120deg,#00b09b 40%,#96c93d 100%)",
  content: `
    <h2>🚪 عالم الباب السحري 🚪</h2>
    <p>a5taar beeb/jarb 7adhek🙌🏼!</p>
    <div style="display:flex; justify-content:center; gap:18px; margin:18px 0;">
      <div class="magicDoor" data-win="0" style="width:60px; height:90px; background:#fff; border-radius:12px; box-shadow:0 0 8px #ccc; display:flex; align-items:center; justify-content:center; font-size:2.5em;">🚪</div>
      <div class="magicDoor" data-win="1" style="width:60px; height:90px; background:#fff; border-radius:12px; box-shadow:0 0 8px #ccc; display:flex; align-items:center; justify-content:center; font-size:2.5em;">🚪</div>
      <div class="magicDoor" data-win="0" style="width:60px; height:90px; background:#fff; border-radius:12px; box-shadow:0 0 8px #ccc; display:flex; align-items:center; justify-content:center; font-size:2.5em;">🚪</div>
    </div>
    <div id="doorMsg" style="margin-top:10px; font-size:1.1em;"></div>
  `,
  onEnter: function() {
    const doors = document.querySelectorAll(".magicDoor");
    const msg = document.getElementById("doorMsg");
    doors.forEach(door=>{
      door.onclick = function() {
        if(door.dataset.win==="1"){
          door.style.background="#43cea2";
          msg.innerHTML = "وجدتِ الباب السحري! مستعدة للمفاجأة؟";
          setTimeout(()=>nextWorldBtn.style.display='block',900);
        } else {
          door.style.background="#f5576c";
          msg.innerHTML = "هذا الباب خاطئ، جربي بابًا آخر!";
        }
      };
    });
  }
},

// 7. النهاية الكبرى (المفاجأة)
{
  name: "النهاية السعيدة",
  bg: "linear-gradient(120deg,#f7971e 40%,#ffd200 100%)",
  content: `
    <h2>🎉 النهاية 🎉</h2>
    <p>لقد أنقذتِ قصة حبنا!<br>انظري للمفاجأة:</p>
    <img src="surprise.jpg" style="max-width:220px; border-radius:16px;">
    <div style="margin-top:25px; color:#ff3399; font-size:1.3em;">
      Nhebk barchaa ♥<br>Zoomi bch ta9raa che3r!
    </div>
    <div class="loveTapHint">يمكنك الخروج من اللعبة الآن</div>
  `,
  onEnter: function() {}
},
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