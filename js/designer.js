document.addEventListener('DOMContentLoaded', () => {
  // Sabitler
  const HEIGHT_OPTIONS = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const FONT_OPTIONS = [
    { id: 'tilt', name: 'Tilt Neon', family: "'Tilt Neon', cursive" },
    { id: 'montserrat', name: 'Montserrat Bold', family: "'Montserrat', sans-serif" },
    { id: 'righteous', name: 'Righteous 80s', family: "'Righteous', cursive" },
    { id: 'orbitron', name: 'Orbitron Modern', family: "'Orbitron', sans-serif" },
    { id: 'vibes', name: 'Great Vibes Script', family: "'Great Vibes', cursive" },
    { id: 'cinzel', name: 'Cinzel Serif', family: "'Cinzel', serif" }
  ];

  const COLOR_PRESETS = [
    { name: 'Sıcak Amber', hex: '#f59e0b' },
    { name: 'Neon Pembe', hex: '#ec4899' },
    { name: 'Buz Mavisi', hex: '#38bdf8' },
    { name: 'Alev Kırmızı', hex: '#ef4444' },
    { name: 'Zümrüt Yeşil', hex: '#10b981' },
    { name: 'Saf Beyaz', hex: '#f8fafc' },
    { name: 'Elektrik Mor', hex: '#a855f7' }
  ];

  // Tasarım Durumu (State)
  const state = {
    text: 'NEONART',
    heightCm: 30,
    isLightOn: true,
    fontIndex: 0,
    color: '#f59e0b'
  };

  // DOM Elemanları
  const signText = document.getElementById('signText');
  const liveSignboard = document.getElementById('liveSignboard');
  const ambientBackdrop = document.getElementById('ambientBackdrop');
  const charCountLabel = document.getElementById('charCountLabel');
  const heightButtonsContainer = document.getElementById('heightButtonsContainer');
  const selectedHeightBadge = document.getElementById('selectedHeightBadge');

  const lightOnBtn = document.getElementById('lightOnBtn');
  const lightOffBtn = document.getElementById('lightOffBtn');

  const fontContainer = document.getElementById('fontContainer');
  const currentFontName = document.getElementById('currentFontName');

  const colorSwatches = document.getElementById('colorSwatches');
  const customColorInput = document.getElementById('customColorInput');
  const colorHexText = document.getElementById('colorHexText');

  const specLetterCount = document.getElementById('specLetterCount');
  const specHeight = document.getElementById('specHeight');
  const specLightType = document.getElementById('specLightType');
  const specEstWidth = document.getElementById('specEstWidth');
  const quoteMessage = document.getElementById('quoteMessage');
  const copySignSummary = document.getElementById('copySignSummary');
  const quoteForm = document.getElementById('quoteForm');

  if (!signText || !liveSignboard) return; // Designer yoksa çalıştırma

  // Yükseklik butonlarını çiz
  function renderHeightButtons() {
    heightButtonsContainer.innerHTML = '';
    HEIGHT_OPTIONS.forEach(val => {
      const isSelected = (state.heightCm === val);
      const btn = document.createElement('button');
      btn.type = 'button';
      
      if (isSelected) {
        btn.className = 'py-2.5 px-1 rounded-xl text-xs font-black transition-all transform scale-105 bg-amber-400 text-slate-950 border-2 border-white shadow-lg shadow-amber-500/40 flex items-center justify-center gap-1';
        btn.innerHTML = `<i class="fa-solid fa-check text-[10px]"></i> ${val}`;
      } else {
        btn.className = 'py-2.5 px-1 rounded-xl text-xs font-semibold transition-all bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center';
        btn.innerText = `${val}`;
      }

      btn.title = `${val} cm harf yüksekliği`;
      btn.addEventListener('click', () => {
        state.heightCm = val;
        render();
      });

      heightButtonsContainer.appendChild(btn);
    });

    selectedHeightBadge.innerText = `Seçili: ${state.heightCm} cm`;
  }

  // Font seçim butonlarını çiz
  function buildFonts() {
    fontContainer.innerHTML = '';
    FONT_OPTIONS.forEach((f, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `p-2.5 rounded-xl border text-left transition flex flex-col justify-between h-14 ${
        state.fontIndex === idx
          ? 'border-amber-400 bg-amber-950/40 text-white ring-1 ring-amber-400'
          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }`;
      btn.innerHTML = `
        <span class="text-sm truncate leading-none" style="font-family: ${f.family};">Tabela Yazı</span>
        <span class="text-[10px] font-medium text-slate-400 mt-1">${f.name}</span>
      `;
      btn.addEventListener('click', () => {
        state.fontIndex = idx;
        render();
      });
      fontContainer.appendChild(btn);
    });
    currentFontName.innerText = FONT_OPTIONS[state.fontIndex].name;
  }

  // Renk paletini çiz
  function buildColors() {
    colorSwatches.innerHTML = '';
    COLOR_PRESETS.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isSelected = (state.color.toLowerCase() === c.hex.toLowerCase());
      btn.className = `w-7 h-7 rounded-lg transition-transform ${
        isSelected ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-85 hover:scale-105'
      }`;
      btn.style.backgroundColor = c.hex;
      btn.title = c.name;
      btn.addEventListener('click', () => {
        state.color = c.hex;
        customColorInput.value = c.hex;
        render();
      });
      colorSwatches.appendChild(btn);
    });
    colorHexText.innerText = state.color.toUpperCase();
  }

  // Canlı Simülasyonu Güncelleme Fonksiyonu
  function render() {
    const textToDisplay = state.text.trim().length > 0 ? state.text : 'TABELA';
    liveSignboard.innerText = textToDisplay;
    
    const charCount = state.text.length;
    charCountLabel.innerText = `${charCount} Harf`;
    specLetterCount.innerText = `${charCount} Harf`;

    const font = FONT_OPTIONS[state.fontIndex];
    liveSignboard.style.fontFamily = font.family;
    buildFonts();

    buildColors();
    const rgb = hexToRgb(state.color);
    const rgba = (a) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;

    if (state.isLightOn) {
      liveSignboard.style.color = '#ffffff';
      liveSignboard.style.textShadow = `
        0 0 5px #ffffff,
        0 0 12px ${rgba(0.95)},
        0 0 24px ${rgba(0.85)},
        0 0 45px ${rgba(0.7)},
        0 0 75px ${rgba(0.5)}
      `;
      liveSignboard.classList.add('neon-pulse-active');
      ambientBackdrop.style.backgroundColor = state.color;
      ambientBackdrop.style.opacity = '0.35';

      lightOnBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all bg-amber-500 text-slate-950 shadow-md';
      lightOffBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all';
      specLightType.innerText = 'LED Neon Işıklı';
      specLightType.className = 'text-sm font-bold text-amber-300';
    } else {
      liveSignboard.style.color = state.color;
      liveSignboard.style.textShadow = `
        1px 1px 0px rgba(0,0,0,0.9),
        2px 2px 2px rgba(0,0,0,0.8),
        4px 4px 10px rgba(0,0,0,0.9)
      `;
      liveSignboard.classList.remove('neon-pulse-active');
      ambientBackdrop.style.opacity = '0.04';

      lightOffBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all bg-slate-800 text-white shadow-md';
      lightOnBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all';
      specLightType.innerText = 'Işıksız (Kutu Harf)';
      specLightType.className = 'text-sm font-bold text-slate-400';
    }

    renderHeightButtons();
    specHeight.innerText = `${state.heightCm} cm`;

    const len = Math.max(state.text.length, 1);
    const estWidth = Math.round(len * (state.heightCm * 0.72));
    specEstWidth.innerText = `~${estWidth} cm`;

    if (quoteMessage) {
      quoteMessage.value = `Merhaba, siteden yapılandırdığım tabela için teklif almak istiyorum:\n• Yazı: "${state.text}"\n• Harf Yüksekliği: ${state.heightCm} cm\n• Tahmini Genişlik: ~${estWidth} cm\n• Model: ${state.isLightOn ? 'Işıklı Neon LED' : 'Işıksız Kutu Harf'}\n• Renk Kodu: ${state.color.toUpperCase()}`;
    }
  }

  // Özeti Panoya Kopyalama
  function copySummaryText() {
    const len = Math.max(state.text.length, 1);
    const estWidth = Math.round(len * (state.heightCm * 0.72));
    const text = `--- NEONART TABELA SİPARİŞ ÖZETİ ---
Yazı: "${state.text}"
Harf Sayısı: ${state.text.length}
Seçilen Harf Yüksekliği: ${state.heightCm} cm
Tahmini Cephe Genişliği: ~${estWidth} cm
Aydınlatma: ${state.isLightOn ? 'Işıklı (Neon / LED)' : 'Işıksız (Kutu Harf)'}
Renk Kodu: ${state.color.toUpperCase()}
Font: ${FONT_OPTIONS[state.fontIndex].name}
-------------------------------------`;

    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      showToast('Tasarım parametreleri panoya kopyalandı!');
    } catch (e) {
      showToast('Kopyalama başarısız oldu.');
    }
    document.body.removeChild(el);
  }

  // Event Tanımlamaları
  signText.addEventListener('input', (e) => {
    state.text = e.target.value;
    render();
  });

  lightOnBtn.addEventListener('click', () => {
    state.isLightOn = true;
    render();
  });

  lightOffBtn.addEventListener('click', () => {
    state.isLightOn = false;
    render();
  });

  customColorInput.addEventListener('input', (e) => {
    state.color = e.target.value;
    render();
  });

  if (copySignSummary) {
    copySignSummary.addEventListener('click', copySummaryText);
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.target.submit();
      showToast('Teklif talebiniz atölyemize iletildi!');
      e.target.reset();
      render();
    });
  }

  // İlk başlatma
  render();
});
