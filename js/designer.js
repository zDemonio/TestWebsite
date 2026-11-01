document.addEventListener('DOMContentLoaded', () => {
  // Sabitler
  const FONT_OPTIONS = [
    { id: 'tilt', name: 'Tilt Neon', family: "'Tilt Neon', cursive" },
    { id: 'montserrat', name: 'Montserrat Bold', family: "'Montserrat', sans-serif" },
    { id: 'righteous', name: 'Righteous 80s', family: "'Righteous', cursive" },
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

  const PRODUCT_TYPES = {
    lighted: [
      { id: 'backlit', name: 'Arkadan Zemine Işıklı' },
      { id: 'front-lit', name: 'Sadece Önden Işıklı' },
      { id: 'front-side-lit', name: 'Önden ve Yandan Işıklı' },
      { id: 'side-lit', name: 'Sadece Yandan Işıklı' }
    ],
    unlighted: [
      { id: 'foam', name: 'Strafor' },
      { id: 'stainless', name: 'Paslanmaz Krom' },
      { id: 'painted', name: 'Boyalı Harf' }
    ]
  };

  // Tasarım Durumu (State)
  const state = {
    text: 'FAALİYET',
    facadeHeightCm: '',
    facadeWidthCm: '',
    isLightOn: true,
    productTypeId: 'front-lit',
    fontIndex: 0,
    lightColor: '#f59e0b',
    textColor: '#f8fafc',
    sideColor: '#38bdf8'
  };

  // DOM Elemanları
  const signText = document.getElementById('signText');
  const liveSignboard = document.getElementById('liveSignboard');
  const ambientBackdrop = document.getElementById('ambientBackdrop');
  const charCountLabel = document.getElementById('charCountLabel');
  const facadeHeightInput = document.getElementById('facadeHeightInput');
  const facadeWidthInput = document.getElementById('facadeWidthInput');

  const lightOnBtn = document.getElementById('lightOnBtn');
  const lightOffBtn = document.getElementById('lightOffBtn');
  const productTypeOptions = document.getElementById('productTypeOptions');
  const productTypeLabel = document.getElementById('productTypeLabel');
  const lightColorRow = document.getElementById('lightColorRow');
  const lightColorControl = document.getElementById('lightColorControl');
  const textColorControl = document.getElementById('textColorControl');
  const sideColorControl = document.getElementById('sideColorControl');
  const sideColorInput = document.getElementById('sideColorInput');
  const sideColorSwatches = document.getElementById('sideColorSwatches');
  const sideColorHexText = document.getElementById('sideColorHexText');

  const fontContainer = document.getElementById('fontContainer');
  const currentFontName = document.getElementById('currentFontName');

  const colorSwatches = document.getElementById('colorSwatches');
  const customColorInput = document.getElementById('customColorInput');
  const colorHexText = document.getElementById('colorHexText');
  const textColorSwatches = document.getElementById('textColorSwatches');
  const customTextColorInput = document.getElementById('customTextColorInput');
  const textColorHexText = document.getElementById('textColorHexText');

  const specLetterCount = document.getElementById('specLetterCount');
  const specFacadeHeight = document.getElementById('specFacadeHeight');
  const specLightType = document.getElementById('specLightType');
  const specFacadeWidth = document.getElementById('specFacadeWidth');
  const quoteMessage = document.getElementById('quoteMessage');
  const copySignSummary = document.getElementById('copySignSummary');
  const quoteForm = document.getElementById('quoteForm');


  if (!signText || !liveSignboard) return; // Designer yoksa çalıştırma

  function renderProductTypeOptions() {
    const options = state.isLightOn ? PRODUCT_TYPES.lighted : PRODUCT_TYPES.unlighted;
    if (!options.some(option => option.id === state.productTypeId)) {
      state.productTypeId = options[0].id;
    }

    productTypeLabel.innerHTML = `<i class="fa-solid fa-layer-group text-amber-400"></i> ${state.isLightOn ? 'Işıklı Model' : 'Harf Malzemesi'}`;
    productTypeOptions.innerHTML = '';

    options.forEach(option => {
      const isSelected = state.productTypeId === option.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(isSelected));
      button.className = `w-full text-left px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
        isSelected
          ? 'border-amber-400 bg-amber-950/40 text-white ring-1 ring-amber-400'
          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }`;
      button.textContent = option.name;
      button.addEventListener('click', () => {
        state.productTypeId = option.id;
        render();
      });
      productTypeOptions.appendChild(button);
    });

    return options.find(option => option.id === state.productTypeId);
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

  function buildColorPalette(container, input, hexLabel, stateKey, description) {
    container.innerHTML = '';
    COLOR_PRESETS.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isSelected = state[stateKey].toLowerCase() === c.hex.toLowerCase();
      btn.className = `w-7 h-7 rounded-lg transition-transform ${
        isSelected ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-85 hover:scale-105'
      }`;
      btn.style.backgroundColor = c.hex;
      btn.title = `${c.name} ${description}`;
      btn.setAttribute('aria-label', `${c.name} ${description} rengini seç`);
      btn.addEventListener('click', () => {
        state[stateKey] = c.hex;
        input.value = c.hex;
        render();
      });
      container.appendChild(btn);
    });
    hexLabel.innerText = state[stateKey].toUpperCase();
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
    const signBounds = liveSignboard.getBoundingClientRect();
    buildFonts();

    buildColorPalette(colorSwatches, customColorInput, colorHexText, 'lightColor', 'ışık');
    buildColorPalette(textColorSwatches, customTextColorInput, textColorHexText, 'textColor', 'yazı');
    buildColorPalette(sideColorSwatches, sideColorInput, sideColorHexText, 'sideColor', 'yan ışık');
    const rgb = hexToRgb(state.lightColor);
    const rgba = (a) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
    const sideRgb = hexToRgb(state.sideColor);
    const sideRgba = (a) => `rgba(${sideRgb.r}, ${sideRgb.g}, ${sideRgb.b}, ${a})`;
    const productType = renderProductTypeOptions();
    const isBacklit = state.isLightOn && productType.id === 'backlit';
    const hasSideLighting = state.isLightOn && productType.id === 'front-side-lit';
    const isChrome = !state.isLightOn && productType.id === 'stainless';
    ambientBackdrop.style.width = `${signBounds.width + (isBacklit ? 70 : 40)}px`;
    ambientBackdrop.style.height = `${signBounds.height + 20}px`;
    ambientBackdrop.style.filter = isBacklit ? 'blur(34px)' : '';
    lightColorRow.classList.toggle('hidden', !state.isLightOn);
    lightColorControl.classList.toggle('col-span-2', !hasSideLighting);
    textColorControl.classList.toggle('hidden', isChrome);
    sideColorControl.classList.toggle('hidden', !hasSideLighting);

    if (state.isLightOn) {
      liveSignboard.style.color = state.textColor;

      if (isBacklit) {
        liveSignboard.style.textShadow = `0 0 2px ${rgba(0.85)}, 0 0 8px ${rgba(0.7)}, 0 0 16px ${rgba(0.45)}`;
        ambientBackdrop.style.opacity = '0.18';
      } else if (productType.id === 'front-lit') {
        liveSignboard.style.textShadow = `0 0 5px #ffffff, 0 0 8px ${rgba(1)}, 0 0 20px ${rgba(0.95)}, 0 0 32px ${rgba(0.7)}`;
        ambientBackdrop.style.opacity = '0';
      } else if (productType.id === 'front-side-lit') {
        liveSignboard.style.textShadow = `0 0 3px #ffffff, 0 0 8px ${rgba(1)}, 0 0 18px ${rgba(0.95)}, 0 0 26px ${rgba(0.7)}, 5px 0 7px ${sideRgba(1)}, 10px 0 13px ${sideRgba(0.8)}, 13px 0 19px ${sideRgba(0.45)}`;
        ambientBackdrop.style.opacity = '0';
      } else {
        liveSignboard.style.textShadow = `3px 0 4px ${sideRgba(1)}, 7px 0 9px ${sideRgba(0.8)}, 9px 0 14px ${sideRgba(0.45)}`;
        ambientBackdrop.style.opacity = '0';
      }

      liveSignboard.classList.add('neon-pulse-active');
      ambientBackdrop.style.backgroundColor = state.lightColor;

      lightOnBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all bg-amber-500 text-slate-950 shadow-md';
      lightOffBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all';
      specLightType.className = 'text-sm font-bold text-amber-300';
    } else {
      if (productType.id === 'stainless') {
        liveSignboard.style.color = '#d1d5db';
        liveSignboard.style.textShadow = '1px 1px 0 #ffffff, 2px 3px 2px rgba(0,0,0,0.9), 0 0 12px rgba(203,213,225,0.35)';
      } else if (productType.id === 'foam' || productType.id === 'painted') {
        liveSignboard.style.color = state.textColor;
        liveSignboard.style.textShadow = '1px 1px 0 rgba(255,255,255,0.3), 3px 4px 0 rgba(15,23,42,0.9), 5px 7px 8px rgba(0,0,0,0.65)';
      } else {
        liveSignboard.style.color = state.textColor;
        liveSignboard.style.textShadow = '1px 1px 0 rgba(0,0,0,0.85), 3px 4px 7px rgba(0,0,0,0.65)';
      }
      liveSignboard.classList.remove('neon-pulse-active');
      ambientBackdrop.style.opacity = '0.04';

      lightOffBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all bg-slate-800 text-white shadow-md';
      lightOnBtn.className = 'py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all';
      specLightType.className = 'text-sm font-bold text-slate-400';
    }
    specLightType.innerText = hasSideLighting ? `${productType.name} / Yan ${state.sideColor.toUpperCase()}` : productType.name;

    const facadeHeight = state.facadeHeightCm ? `${state.facadeHeightCm} cm` : 'Belirtilmedi';
    const facadeWidth = state.facadeWidthCm ? `${state.facadeWidthCm} cm` : 'Belirtilmedi';
    specFacadeHeight.innerText = facadeHeight;
    specFacadeWidth.innerText = facadeWidth;

    const colorDetails = [];
    if (!isChrome) colorDetails.push(`• Yazı Rengi: ${state.textColor.toUpperCase()}`);
    if (state.isLightOn) colorDetails.push(`• Işık Rengi: ${state.lightColor.toUpperCase()}`);
    if (hasSideLighting) colorDetails.push(`• Yan Işık Rengi: ${state.sideColor.toUpperCase()}`);
    const colorDetailsText = colorDetails.length ? `\n${colorDetails.join('\n')}` : '';

    if (quoteMessage) {
      quoteMessage.value = `Merhaba, siteden yapılandırdığım tabela için teklif almak istiyorum:\n• Yazı: "${state.text}"\n• Cephe Yüksekliği: ${facadeHeight}\n• Cephe Genişliği: ${facadeWidth}\n• Model: ${productType.name}${colorDetailsText}`;
    }
  }

  // Özeti Panoya Kopyalama
  function copySummaryText() {
    const facadeHeight = state.facadeHeightCm ? `${state.facadeHeightCm} cm` : 'Belirtilmedi';
    const facadeWidth = state.facadeWidthCm ? `${state.facadeWidthCm} cm` : 'Belirtilmedi';
    const text = `--- FAALİYET TABELA SİPARİŞ ÖZETİ ---
Yazı: "${state.text}"
Harf Sayısı: ${state.text.length}
Cephe Yüksekliği: ${facadeHeight}
Cephe Genişliği: ${facadeWidth}
Aydınlatma: ${state.isLightOn ? 'Işıklı (Neon / LED)' : 'Işıksız (Kutu Harf)'}
Model: ${PRODUCT_TYPES[state.isLightOn ? 'lighted' : 'unlighted'].find(option => option.id === state.productTypeId).name}
${colorDetails.map(detail => detail.replace(/^• /, '')).join('\n')}
Font: ${FONT_OPTIONS[state.fontIndex].name}
-------------------------------------`;

    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      showToast('Tasarım parametreleri panoya kopyalandı!', 'success');
    } catch (e) {
      showToast('Kopyalama başarısız oldu.', 'error');
    }
    document.body.removeChild(el);
  }

  // Event Tanımlamaları
  signText.addEventListener('input', (e) => {
    state.text = e.target.value;
    render();
  });

  facadeHeightInput.addEventListener('input', (e) => {
    state.facadeHeightCm = e.target.value;
    render();
  });

  facadeWidthInput.addEventListener('input', (e) => {
    state.facadeWidthCm = e.target.value;
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
    state.lightColor = e.target.value;
    render();
  });

  customTextColorInput.addEventListener('input', (e) => {
    state.textColor = e.target.value;
    render();
  });

  sideColorInput.addEventListener('input', (e) => {
    state.sideColor = e.target.value;
    render();
  });

  if (copySignSummary) {
    copySignSummary.addEventListener('click', copySummaryText);
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = quoteForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerText;
      const endpoint = new URL(quoteForm.action);
      endpoint.pathname = `/ajax${endpoint.pathname}`;
      const formSubject = quoteForm.querySelector('[name="_subject"]');
      const currentDateTime = new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date());
      formSubject.value = `Yeni İletişim Formu Talebi! - ${currentDateTime}`;
      submitButton.disabled = true;
      submitButton.innerText = 'Gönderiliyor...';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(Object.fromEntries(new FormData(quoteForm)))
        });
        const result = await response.json();

        if (!response.ok || result.success !== 'true') {
          throw new Error('Mail gönderimi başarısız oldu.');
        }

        showToast('Teklif talebiniz atölyemize iletildi!', 'success');
        quoteForm.reset();
        render();
      } catch (error) {
        showToast('Form Gönderilirken bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyin.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.innerText = originalButtonText;
      }
    });
  }

  // İlk başlatma
  render();
  document.fonts.ready.then(render);
});
