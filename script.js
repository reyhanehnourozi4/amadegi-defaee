const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress').style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
});

document.querySelectorAll('.value-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.value-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('valueTitle').textContent = card.dataset.title;
    document.getElementById('valueText').textContent = card.dataset.text;
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('show');
  });
});
function closeLightbox(){ lightbox.classList.remove('show'); }
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

const questions = [
  {q:'مهم‌ترین پیام اجتماعی درس روایت فتح چیست؟', a:['رقابت با دیگران','همدلی و ایستادگی در کنار یکدیگر','بی‌توجهی به جامعه','فراموش کردن گذشته'], correct:1, why:'همدلی و همراهی مردم از پیام‌های مهم این درس است.'},
  {q:'چرا خاطرات و روایت‌های تاریخی ثبت می‌شوند؟', a:['برای سرگرمی صرف','برای فراموش کردن گذشته','برای انتقال تجربه‌ها به نسل‌های بعد','برای طولانی کردن کتاب‌ها'], correct:2, why:'ثبت روایت‌ها باعث انتقال تجربه و حفظ حافظه تاریخی می‌شود.'},
  {q:'کدام گزینه نمونه‌ای از مسئولیت‌پذیری است؟', a:['بی‌تفاوتی نسبت به دیگران','انجام وظایف و کمک به دیگران','نادیده گرفتن مشکلات','سرزنش دیگران'], correct:1, why:'انجام وظایف و کمک مسئولانه، نمونه‌ای از مسئولیت‌پذیری است.'},
  {q:'کدام ارزش به همکاری افراد برای رسیدن به هدف مشترک اشاره دارد؟', a:['اتحاد','بی‌تفاوتی','خودخواهی','ناامیدی'], correct:0, why:'اتحاد یعنی همکاری و همراهی برای رسیدن به هدف مشترک.'}
];
let current = 0, score = 0, answered = false;
const qText = document.getElementById('questionText');
const answers = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const next = document.getElementById('nextQuestion');
function renderQuestion(){
  answered = false;
  const q = questions[current];
  document.getElementById('questionNumber').textContent = `پرسش ${current+1} از ${questions.length}`;
  document.getElementById('quizProgress').style.width = `${(current+1)/questions.length*100}%`;
  qText.textContent = q.q;
  answers.innerHTML = '';
  feedback.textContent = '';
  next.disabled = true;
  next.textContent = current === questions.length-1 ? 'دیدن نتیجه' : 'پرسش بعدی ←';
  q.a.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = answer;
    btn.addEventListener('click', () => chooseAnswer(index, btn));
    answers.appendChild(btn);
  });
}
function chooseAnswer(index, btn){
  if(answered) return;
  answered = true;
  const q = questions[current];
  const all = [...answers.querySelectorAll('button')];
  all.forEach((b,i) => { b.disabled = true; if(i === q.correct) b.classList.add('correct'); });
  if(index === q.correct){ score++; feedback.textContent = 'آفرین! پاسخ درست است. ' + q.why; }
  else { btn.classList.add('wrong'); feedback.textContent = 'این پاسخ درست نیست. ' + q.why; }
  next.disabled = false;
}
next.addEventListener('click', () => {
  if(!answered) return;
  if(current < questions.length-1){ current++; renderQuestion(); }
  else {
    qText.textContent = `نتیجه شما: ${score} از ${questions.length}`;
    answers.innerHTML = `<p class="result-message">${score === 4 ? 'عالی بود! همه پرسش‌ها را درست پاسخ دادی.' : 'آفرین به تلاشت! بخش‌های درس را یک بار دیگر مرور کن.'}</p>`;
    feedback.textContent = 'برای مرور دوباره صفحه را به بالا برگردان.';
    next.textContent = 'شروع دوباره';
    next.disabled = false;
    next.onclick = () => { current = 0; score = 0; next.onclick = null; renderQuestion(); };
  }
});
renderQuestion();
