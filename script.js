const yesBtn = document.getElementById('yesBtn');
const moreBtn = document.getElementById('moreBtn');
const lore = document.getElementById('lore');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const acceptBtn = document.getElementById('acceptBtn');

yesBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
acceptBtn.addEventListener('click', () => {
  acceptBtn.textContent = 'HELL YES CONFIRMED 🤘';
  confettiLine('See you in the pit, Valentine.');
});

moreBtn.addEventListener('click', () => lore.classList.toggle('hidden'));

function confettiLine(message) {
  const line = document.createElement('p');
  line.textContent = message;
  line.style.color = '#ffd166';
  line.style.fontWeight = '700';
  document.querySelector('.modal-box').appendChild(line);
}

// yellow-heart rain on double click
window.addEventListener('dblclick', (e) => {
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '💛';
    h.style.left = `${e.clientX + (Math.random() * 160 - 80)}px`;
    h.style.top = `${e.clientY - 20}px`;
    h.style.fontSize = `${12 + Math.random() * 20}px`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
});

// Konami easter egg
const pattern = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let buffer = [];
let typed = '';
window.addEventListener('keydown', (e) => {
  buffer.push(e.key);
  if (buffer.length > pattern.length) buffer.shift();

  if (buffer.join('|').toLowerCase() === pattern.join('|').toLowerCase()) {
    flashMessage('🔓 Secret unlocked: "Even in long distance, you are my home."');
  }

  if (/^[a-zA-Z]$/.test(e.key)) {
    typed += e.key.toLowerCase();
    if (typed.length > 24) typed = typed.slice(-24);
    if (typed.includes('dreamyguy')) {
      flashMessage('You typed dreamyguy. Accurate.');
      typed = '';
    }
  }
});

function flashMessage(text) {
  const note = document.createElement('div');
  note.textContent = text;
  Object.assign(note.style, {
    position: 'fixed',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)',
    background: '#111',
    color: '#ffd166',
    border: '1px solid #ffd16655',
    padding: '0.7rem 1rem',
    borderRadius: '999px',
    zIndex: '9999',
    fontWeight: '700'
  });
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2600);
}

// lightweight animated lightning background
const canvas = document.getElementById('lightning');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

function bolt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let x = Math.random() * canvas.width;
  let y = 0;
  ctx.beginPath();
  ctx.moveTo(x, y);
  while (y < canvas.height) {
    x += Math.random() * 30 - 15;
    y += Math.random() * 30 + 8;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 120);
}

setInterval(() => {
  if (Math.random() > 0.68) bolt();
}, 900);
