document.addEventListener('DOMContentLoaded', () => {
  // ================= SABİTLER START =================
  // Fiziksel harf yüksekliği için hazır ölçüler
  const HEIGHT_OPTIONS = [15, 20, 25, 30, 35, 40, 45, 50, 55];

  //Fiyat Hesaplamasında Kullanılan Değerler;
  const PRICE_VALUES = {
    'backlitAluminum': {c1: 26.9600, c2: 54.1924},
    'backlitChromeBronze': {c1: 32.3867, c2: 60.5634},
    'backlitChromeGold': {c1: 30.0736, c2: 59.2190},
    'backlitChromeSilver': {c1: 28.9948, c2: 55.6251},
    'backlitChromeBlack': {c1: 32.3867, c2: 60.5634},
    'otherlitAluminum': {c1: 24.3455, c2: 47.6363},
    'otherlitChromeBronze': {c1: 45.3338, c2: 84.8556},
    'otherlitChromeGold': {c1: 44.1459, c2: 80.4959},
    'otherlitChromeSilver': {c1: 39.1523, c2: 75.4303},
    'otherlitChromeBlack': {c1: 45.3338, c2: 84.8556},
    'otherlitPlexiglass': {c1: 28.5121, c2: 47.0179},
    'nolightAluminum': {c1: 28.4603, c2: 50.5738},
    'nolightChromeBronze': {c1: 32.2067, c2: 57.1660},
    'nolightChromeGold': {c1: 30.1888, c2: 53.7137},
    'nolightChromeSilver': {c1: 28.5121, c2: 47.0179},
    'nolightChromeBlack': {c1: 32.2067, c2: 57.1660},
    'nolightPlexiglass': {c1: 1.0000, c2: 1.0000},
    'nolightFoam': {c1: 1.0000, c2: 1.0000}



  };

  // Önizlemede kullanılabilen yazı tipleri
  const FONT_OPTIONS = [
    { id: 'tilt', name: 'Tilt Neon', family: "'Tilt Neon', cursive" },
    { id: 'montserrat', name: 'Montserrat Bold', family: "'Montserrat', sans-serif" },
    { id: 'righteous', name: 'Righteous 80s', family: "'Righteous', cursive" },
    { id: 'cinzel', name: 'Cinzel Serif', family: "'Cinzel', serif" }
  ];

  // Işık ve yazı rengi için hazır renkler
  const COLOR_PRESETS = [
    { name: 'Gece', hex: '#0b0f19' },
    { name: 'Beyaz', hex: '#f8fafc' },
    { name: 'Buz Mavisi', hex: '#38bdf8' },
    { name: 'Alev Kırmızı', hex: '#ef4444' },
    { name: 'Zümrüt Yeşil', hex: '#10b981' },
    { name: 'Elektrik Mor', hex: '#a855f7' }
  ];

  // Önizleme sahnesinin arka plan renkleri
  const SCENE_COLOR_PRESETS = [
    { name: 'Arduvaz', hex: '#1e293b' },
    { name: 'Kemik', hex: '#f4ede4' },
    { name: 'Gece Mavisi', hex: '#172554' },
    { name: 'Vişne Çürüğü', hex: '#381228' },
    { name: 'Orman Yeşili', hex: '#14532d' },
    { name: 'Gece Moru', hex: '#241847' },
    { name: 'Espresso', hex: '#291814' }
  ];

  // Işıklı tabela modelleri
  const PRODUCT_TYPES = {
    lighted: [
      { id: 'backlit', name: 'Arkadan Zemine Işıklı' },
      { id: 'front-lit', name: 'Sadece Önden Işıklı' },
      { id: 'front-side-lit', name: 'Önden ve Yandan Işıklı' },
      { id: 'side-lit', name: 'Sadece Yandan Işıklı' }
    ]
  };
  const MATERIALS = [
    { id: 'aluminum', name: 'Alüminyum' },
    { id: 'chrome', name: 'Krom' },
    { id: 'plexiglass', name: 'Pleksi' },
    { id: 'foam', name: 'Strafor' }
  ];
  const CHROME_FINISHES = [
    { id: 'bronze', name: 'Bronz', color: '#cd7f32' },
    { id: 'gold', name: 'Gold', color: '#d4af37' },
    { id: 'silver', name: 'Gümüş', color: '#d1d5db' },
    { id: 'black', name: 'Siyah', color: '#1f2937' }
  ];
  // ================= SABİTLER END =================

  // ================= TASARIM DURUMU START =================
  const state = {
    // Tabela metni ve fiziksel ölçüler
    text: 'FAALİYET',
    heightCm: 30,
    isCustomHeightInputOpen: false,
    facadeHeightCm: '',
    facadeWidthCm: '',
    // Aydınlatma ve tabela modeli seçimi
    isLightOn: true,
    isProductTypeOptionsOpen: false,
    isMaterialOptionsOpen: false,
    isChromeFinishOptionsOpen: false,
    productTypeId: 'front-lit',
    materialId: 'aluminum',
    chromeFinishId: 'silver',
    // Önizleme görünüm tercihleri
    fontIndex: 0,
    lightColor: '#38bdf8',
    textColor: '#f8fafc',
    sideColor: '#a855f7',
    sceneColor: '#1e293b'
  };
  // ================= TASARIM DURUMU END =================

  // ================= DOM ELEMANLARI START =================
  // Harf yüksekliği kontrolleri
  const selectedHeightBadge = document.getElementById('selectedHeightBadge');
  const heightButtonsContainer = document.getElementById('heightButtonsContainer');
  const customHeightInput = document.getElementById('customHeightInput');
  const customHeightInputWrapper = document.getElementById('customHeightInputWrapper');
  // Tabela metni ve canlı önizleme alanları
  const signText = document.getElementById('signText');
  const liveSignboard = document.getElementById('liveSignboard');
  const ambientBackdrop = document.getElementById('ambientBackdrop');
  const charCountLabel = document.getElementById('charCountLabel');
  const facadeHeightInput = document.getElementById('facadeHeightInput');
  const facadeWidthInput = document.getElementById('facadeWidthInput');


  //Fiyatlandırma alanları
  const signPrice = document.getElementById('signPrice');
  const facadePrice = document.getElementById('facadePrice');
  const totalPrice = document.getElementById('totalPrice');

  // Aydınlatma ve ürün türü kontrolleri
  const lightOnBtn = document.getElementById('lightOnBtn');
  const lightOffBtn = document.getElementById('lightOffBtn');
  const productTypeOptions = document.getElementById('productTypeOptions');
  const productTypeLabel = document.getElementById('productTypeLabel');
  const productTypeControl = document.getElementById('productTypeControl');
  const materialOptions = document.getElementById('materialOptions');
  const materialLabel = document.getElementById('materialLabel');
  const chromeFinishControl = document.getElementById('chromeFinishControl');
  const chromeFinishOptions = document.getElementById('chromeFinishOptions');
  const chromeFinishLabel = document.getElementById('chromeFinishLabel');
  const lightColorRow = document.getElementById('lightColorRow');
  const lightColorControl = document.getElementById('lightColorControl');
  const textColorControl = document.getElementById('textColorControl');
  const sideColorControl = document.getElementById('sideColorControl');
  const sideColorInput = document.getElementById('sideColorInput');
  const sideColorSwatches = document.getElementById('sideColorSwatches');
  const sideColorHexText = document.getElementById('sideColorHexText');

  // Yazı tipi kontrolleri
  const fontContainer = document.getElementById('fontContainer');
  const currentFontName = document.getElementById('currentFontName');

  // Işık ve yazı rengi kontrolleri
  const colorSwatches = document.getElementById('colorSwatches');
  const customColorInput = document.getElementById('customColorInput');
  const colorHexText = document.getElementById('colorHexText');
  const textColorSwatches = document.getElementById('textColorSwatches');
  const customTextColorInput = document.getElementById('customTextColorInput');
  const textColorHexText = document.getElementById('textColorHexText');

  // Teknik özet, teklif formu ve sahne rengi kontrolleri
  const specEstWidth = document.getElementById('specEstWidth');
  const specLetterCount = document.getElementById('specLetterCount');
  const specFacadeHeight = document.getElementById('specFacadeHeight');
  const specLightType = document.getElementById('specLightType');
  const specMaterial = document.getElementById('specMaterial');
  const specFacadeWidth = document.getElementById('specFacadeWidth');
  const quoteMessage = document.getElementById('quoteMessage');
  const copySignSummary = document.getElementById('copySignSummary');
  const quoteForm = document.getElementById('quoteForm');
  const sceneColorToggle = document.getElementById('sceneColorToggle');
  const sceneColorPicker = document.getElementById('sceneColorPicker');
  const closeSceneColorPicker = document.getElementById('closeSceneColorPicker');
  const sceneColorSwatches = document.getElementById('sceneColorSwatches');
  const sceneColorPreview = document.getElementById('sceneColorPreview');
  const sceneContainer = document.querySelector('.bg-studio-grid');
  let customSceneColorInput;
  // ================= DOM ELEMANLARI END =================


  if (!signText || !liveSignboard) return; // Designer yoksa çalıştırma

  // ================= TABELA MODELİ SEÇENEKLERİ START =================
  function renderProductTypeOptions() {
    const options = PRODUCT_TYPES.lighted;
    if (!options.some(option => option.id === state.productTypeId)) {
      state.productTypeId = options[0].id;
    }

    // Seçili ürünü ve açılır listenin görünümünü güncelle
    const selectedOption = options.find(option => option.id === state.productTypeId);
    productTypeLabel.innerHTML = `<span><i class="fa-solid fa-layer-group text-amber-400 mr-1"></i> ${selectedOption.name}</span><i class="fa-solid fa-chevron-down text-[10px] text-amber-400 transition-transform ${state.isProductTypeOptionsOpen ? 'rotate-180' : ''}"></i>`;
    productTypeOptions.classList.toggle('hidden', !state.isProductTypeOptionsOpen);
    productTypeOptions.classList.toggle('grid', state.isProductTypeOptionsOpen);
    productTypeLabel.setAttribute('aria-expanded', String(state.isProductTypeOptionsOpen));
    productTypeOptions.innerHTML = '';

    // Ürün türü seçim butonlarını oluştur
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
        state.isProductTypeOptionsOpen = false;
        render();
      });
      productTypeOptions.appendChild(button);
    });

    return options.find(option => option.id === state.productTypeId);
  }

  function renderMaterialOptions() {
    const selectedMaterial = MATERIALS.find(material => material.id === state.materialId);
    materialLabel.innerHTML = `<span><i class="fa-solid fa-cubes-stacked text-amber-400 mr-1"></i> ${selectedMaterial.name}</span><i class="fa-solid fa-chevron-down text-[10px] text-amber-400 transition-transform ${state.isMaterialOptionsOpen ? 'rotate-180' : ''}"></i>`;
    materialOptions.classList.toggle('hidden', !state.isMaterialOptionsOpen);
    materialOptions.classList.toggle('grid', state.isMaterialOptionsOpen);
    materialLabel.setAttribute('aria-expanded', String(state.isMaterialOptionsOpen));
    materialOptions.innerHTML = '';

    MATERIALS.forEach(material => {
      const isSelected = state.materialId === material.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(isSelected));
      button.className = `w-full text-left px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
        isSelected
          ? 'border-amber-400 bg-amber-950/40 text-white ring-1 ring-amber-400'
          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }`;
      button.textContent = material.name;
      button.addEventListener('click', () => {
        state.materialId = material.id;
        state.isMaterialOptionsOpen = false;
        state.isChromeFinishOptionsOpen = false;
        render();
      });
      materialOptions.appendChild(button);
    });

    chromeFinishControl.classList.toggle('hidden', state.materialId !== 'chrome');
    const selectedFinish = CHROME_FINISHES.find(finish => finish.id === state.chromeFinishId);
    chromeFinishLabel.innerHTML = `<span>${selectedFinish.name}</span><i class="fa-solid fa-chevron-down text-[10px] text-amber-400 transition-transform ${state.isChromeFinishOptionsOpen ? 'rotate-180' : ''}"></i>`;
    chromeFinishOptions.classList.toggle('hidden', !state.isChromeFinishOptionsOpen);
    chromeFinishOptions.classList.toggle('grid', state.isChromeFinishOptionsOpen);
    chromeFinishLabel.setAttribute('aria-expanded', String(state.isChromeFinishOptionsOpen));
    chromeFinishOptions.innerHTML = '';

    CHROME_FINISHES.forEach(finish => {
      const isSelected = state.chromeFinishId === finish.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(isSelected));
      button.className = `w-full text-left px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
        isSelected
          ? 'border-amber-400 bg-amber-950/40 text-white ring-1 ring-amber-400'
          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }`;
      button.textContent = finish.name;
      button.addEventListener('click', () => {
        state.chromeFinishId = finish.id;
        state.isChromeFinishOptionsOpen = false;
        render();
      });
      chromeFinishOptions.appendChild(button);
    });

    return { material: selectedMaterial, finish: selectedFinish };
  }
  // ================= TABELA MODELİ SEÇENEKLERİ END =================

  // ================= YÜKSEKLİK SEÇENEKLERİ START =================
  function renderHeightButtons() {
    heightButtonsContainer.innerHTML = '';

    // Hazır ve özel ölçü düğmeleri için ortak görünüm oluşturucu
    const renderOptionButton = (label, isSelected, onClick, title) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(isSelected));
      if (isSelected) {
        btn.className = 'w-full py-2.5 px-1 rounded-xl text-xs font-black transition-all bg-amber-400 text-slate-950 border-2 border-white shadow-lg shadow-amber-500/40 flex items-center justify-center gap-1';
        btn.innerHTML = `<i class="fa-solid fa-check text-[10px]"></i> ${label}`;
      } else {
        btn.className = 'w-full py-2.5 px-1 rounded-xl text-xs font-semibold transition-all bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center';
        btn.innerText = label;
      }
      btn.title = title;
      btn.addEventListener('click', onClick);
      heightButtonsContainer.appendChild(btn);
      return btn;
    };

    // Hazır ölçü butonları
    HEIGHT_OPTIONS.forEach(val => {
      const button = renderOptionButton(`${val}`, state.heightCm === val, () => {
        state.heightCm = val;
        state.isCustomHeightInputOpen = false;
        render();
      }, `${val} cm harf yüksekliği`);
      button.dataset.height = String(val);
    });

    // Özel ölçü butonu ve giriş alanı
    const isCustomHeight = state.heightCm !== '' && !HEIGHT_OPTIONS.includes(state.heightCm);
    const customHeightButton = renderOptionButton('Diğer', isCustomHeight, () => {
      state.isCustomHeightInputOpen = true;
      customHeightInputWrapper.classList.remove('hidden');
      customHeightInput.focus();
    }, 'İstediğiniz harf yüksekliğini girin');
    customHeightButton.setAttribute('aria-label', isCustomHeight ? `Özel yükseklik: ${state.heightCm} cm` : 'Özel yükseklik gir');
    customHeightInput.value = isCustomHeight ? state.heightCm : '';
    customHeightInputWrapper.classList.toggle('hidden', !state.isCustomHeightInputOpen);
    selectedHeightBadge.innerText = state.heightCm ? `Seçili: ${state.heightCm} cm` : 'Yükseklik girin';
  }
  // ================= YÜKSEKLİK SEÇENEKLERİ END =================

  // ================= FONT SEÇENEKLERİ START =================
  function buildFonts() {
    fontContainer.innerHTML = '';

    // Her yazı tipi için örnek önizleme butonu üret
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
  // ================= FONT SEÇENEKLERİ END =================

  // ================= RENK PALETLERİ START =================
  function buildColorPalette(container, input, hexLabel, stateKey, description) {
    container.innerHTML = '';

    // Hazır renkleri oluştur ve seçilen rengi state'e uygula
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

    // Güncel rengi hex etiketiyle göster
    hexLabel.innerText = state[stateKey].toUpperCase();
  }

  function buildSceneColorPalette() {
    // Sahne renk butonlarını ilk çizimde oluştur
    if (!customSceneColorInput) {
      SCENE_COLOR_PRESETS.forEach(color => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.sceneColor = color.hex;
        button.className = 'w-8 h-8 rounded-lg border border-white/20 transition-transform';
        button.title = color.name;
        button.setAttribute('aria-label', `${color.name} sahne rengini seç`);
        button.addEventListener('click', () => {
          state.sceneColor = color.hex;
          setSceneColorPickerOpen(false);
          render();
        });
        sceneColorSwatches.appendChild(button);
      });

      const customColorLabel = document.createElement('label');
      customColorLabel.className = 'relative w-8 h-8 rounded-lg border border-white/20 bg-slate-800 hover:scale-105 transition-transform overflow-hidden cursor-pointer inline-flex items-center justify-center';
      customColorLabel.title = 'Özel renk belirle';
      customColorLabel.setAttribute('aria-label', 'Özel sahne rengi belirle');
      customColorLabel.innerHTML = '<i class="fa-solid fa-eye-dropper text-xs text-white pointer-events-none"></i>';

      customSceneColorInput = document.createElement('input');
      customSceneColorInput.type = 'color';
      customSceneColorInput.className = 'absolute inset-0 w-full h-full opacity-0 cursor-pointer';
      customSceneColorInput.setAttribute('aria-label', 'Özel sahne rengi');
      customSceneColorInput.addEventListener('input', () => {
        state.sceneColor = customSceneColorInput.value;
        render();
      });
      customSceneColorInput.addEventListener('change', () => {
        state.sceneColor = customSceneColorInput.value;
        setSceneColorPickerOpen(false);
        render();
      });
      customColorLabel.appendChild(customSceneColorInput);
      sceneColorSwatches.appendChild(customColorLabel);
    }

    // Seçili hazır veya özel sahne rengini görsel olarak belirt
    sceneColorSwatches.querySelectorAll('[data-scene-color]').forEach(button => {
      const isSelected = state.sceneColor.toLowerCase() === button.dataset.sceneColor;
      button.style.backgroundColor = button.dataset.sceneColor;
      button.classList.toggle('ring-2', isSelected);
      button.classList.toggle('ring-white', isSelected);
      button.classList.toggle('scale-110', isSelected);
      button.classList.toggle('hover:scale-105', !isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    const isCustomColor = !SCENE_COLOR_PRESETS.some(color => color.hex === state.sceneColor.toLowerCase());
    customSceneColorInput.value = state.sceneColor;
    customSceneColorInput.parentElement.style.backgroundColor = isCustomColor ? state.sceneColor : '';
    customSceneColorInput.parentElement.classList.toggle('ring-2', isCustomColor);
    customSceneColorInput.parentElement.classList.toggle('ring-white', isCustomColor);
  }
  // ================= RENK PALETLERİ END =================

  // ================= SAHNE RENK SEÇİCİSİ START =================
  function setSceneColorPickerOpen(isOpen) {
    sceneColorPicker.classList.toggle('hidden', !isOpen);
    sceneColorToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) sceneColorToggle.focus();
  }
  // ================= SAHNE RENK SEÇİCİSİ END =================

  // ================= CANLI ÖNİZLEME VE TASARIMI GÜNCELLEME START =================
  function render() {
    // Sahne arka plan rengini ve sahne paletini güncelle
    sceneContainer.style.setProperty('--scene-background', state.sceneColor);
    sceneColorPreview.style.backgroundColor = state.sceneColor;
    buildSceneColorPalette();

    // Tabela metnini, karakter sayısını ve yazı tipini güncelle
    const textToDisplay = state.text.trim().length > 0 ? state.text : 'TABELA';
    liveSignboard.innerText = textToDisplay;
    
    const charCount = state.text.length;
    charCountLabel.innerText = `${charCount} Harf`;
    specLetterCount.innerText = `${charCount} Harf`;

    const font = FONT_OPTIONS[state.fontIndex];
    liveSignboard.style.fontFamily = font.family;
    const signBounds = liveSignboard.getBoundingClientRect();
    buildFonts();

    // Renk paletlerini ve ışık efektlerinde kullanılacak renk değerlerini güncelle
    buildColorPalette(colorSwatches, customColorInput, colorHexText, 'lightColor', 'ışık');
    buildColorPalette(textColorSwatches, customTextColorInput, textColorHexText, 'textColor', 'yazı');
    buildColorPalette(sideColorSwatches, sideColorInput, sideColorHexText, 'sideColor', 'yan ışık');
    const rgb = hexToRgb(state.lightColor);
    const rgba = (a) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
    const sideRgb = hexToRgb(state.sideColor);
    const sideRgba = (a) => `rgba(${sideRgb.r}, ${sideRgb.g}, ${sideRgb.b}, ${a})`;
    const productType = state.isLightOn ? renderProductTypeOptions() : null;
    const materialSelection = renderMaterialOptions();
    const isBacklit = state.isLightOn && productType.id === 'backlit';
    const hasSideLighting = state.isLightOn && productType.id === 'front-side-lit';
    const isChrome = materialSelection.material.id === 'chrome';

    // Seçilen model ve malzemeye göre kontrollerin görünürlüğünü ayarla
    productTypeControl.classList.toggle('hidden', !state.isLightOn);
    ambientBackdrop.style.width = `${signBounds.width + (isBacklit ? 70 : 40)}px`;
    ambientBackdrop.style.height = `${signBounds.height + 20}px`;
    ambientBackdrop.style.filter = isBacklit ? 'blur(34px)' : '';
    lightColorRow.classList.toggle('hidden', !state.isLightOn);
    lightColorControl.classList.toggle('col-span-2', !hasSideLighting);
    textColorControl.classList.toggle('hidden', isChrome);
    sideColorControl.classList.toggle('hidden', !hasSideLighting);

    // Işıklı modelin renk ve ışık efektlerini uygula
    if (state.isLightOn) {
      liveSignboard.style.color = isChrome ? materialSelection.finish.color : state.textColor;

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
        liveSignboard.style.textShadow = `3px 0 4px ${rgba(1)}, 7px 0 9px ${rgba(0.8)}, 9px 0 14px ${rgba(0.45)}`;
        ambientBackdrop.style.opacity = '0';
      }

      liveSignboard.classList.add('neon-pulse-active');
      ambientBackdrop.style.backgroundColor = state.lightColor;

      lightOnBtn.className = 'py-2.5 px-3 rounded-lg border border-amber-400 flex items-center justify-center gap-2 text-xs font-bold transition-all bg-amber-500 text-slate-950 shadow-md';
      lightOffBtn.className = 'py-2.5 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:border-slate-500 hover:text-white transition-all';
      specLightType.className = 'text-sm font-bold text-amber-300';
    } else {
      // Işıksız malzemeye uygun yazı gölgesi ve mod görünümünü uygula
      if (materialSelection.material.id === 'chrome') {
        liveSignboard.style.color = materialSelection.finish.color;
        liveSignboard.style.textShadow = '1px 1px 0 rgba(255,255,255,0.75), 2px 3px 2px rgba(0,0,0,0.9), 0 0 12px rgba(203,213,225,0.35)';
      } else if (materialSelection.material.id === 'aluminum') {
        liveSignboard.style.color = '#cbd5e1';
        liveSignboard.style.textShadow = '1px 1px 0 #ffffff, 2px 3px 2px rgba(0,0,0,0.9), 0 0 12px rgba(203,213,225,0.3)';
      } else if (materialSelection.material.id === 'foam') {
        liveSignboard.style.color = state.textColor;
        liveSignboard.style.textShadow = '1px 1px 0 rgba(255,255,255,0.3), 3px 4px 0 rgba(15,23,42,0.9), 5px 7px 8px rgba(0,0,0,0.65)';
      } else {
        liveSignboard.style.color = state.textColor;
        liveSignboard.style.textShadow = '1px 1px 0 rgba(255,255,255,0.55), 2px 3px 2px rgba(0,0,0,0.85), 0 0 10px rgba(248,250,252,0.25)';
      }
      liveSignboard.classList.remove('neon-pulse-active');
      ambientBackdrop.style.opacity = '0.04';

      lightOffBtn.className = 'py-2.5 px-3 rounded-lg border border-slate-600 flex items-center justify-center gap-2 text-xs font-bold transition-all bg-slate-800 text-white shadow-md';
      lightOnBtn.className = 'py-2.5 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:border-slate-500 hover:text-white transition-all';
      specLightType.className = 'text-sm font-bold text-slate-400';
    }
    specLightType.innerText = state.isLightOn
      ? (hasSideLighting ? `${productType.name} / Yan ${state.sideColor.toUpperCase()}` : productType.name)
      : 'Işıksız (Kutu Harf)';
    const materialName = isChrome ? `Krom - ${materialSelection.finish.name}` : materialSelection.material.name;
    specMaterial.innerText = materialName;

    // Harf yüksekliği seçeneklerini ve seçili değeri güncelle
    renderHeightButtons();

    // Cephe ölçülerini teknik özete ve teklif mesajına aktar
    const facadeHeight = state.facadeHeightCm ? `${state.facadeHeightCm} cm` : 'Belirtilmedi';
    const facadeWidth = state.facadeWidthCm ? `${state.facadeWidthCm} cm` : 'Belirtilmedi';
    if (specFacadeHeight) specFacadeHeight.innerText = facadeHeight;
    specFacadeWidth.innerText = facadeWidth;

    // Ürün türüne göre teklifte gösterilecek renk detaylarını hazırla
    const colorDetails = [];
    if (!isChrome) colorDetails.push(`• Yazı Rengi: ${state.textColor.toUpperCase()}`);
    if (state.isLightOn) colorDetails.push(`• Işık Rengi: ${state.lightColor.toUpperCase()}`);
    if (hasSideLighting) colorDetails.push(`• Yan Işık Rengi: ${state.sideColor.toUpperCase()}`);
    colorDetails.push(`• Tabela Malzemesi: ${materialName}`);
    const colorDetailsText = colorDetails.length ? `\n${colorDetails.join('\n')}` : '';
        
    
    const liveSignboardProp = liveSignboard.getBoundingClientRect();
    const LSBHeight = liveSignboardProp.height;
    const LSBWidth = Math.max(liveSignboard.scrollWidth, liveSignboardProp.width);
    const estWidth = Math.round((state.heightCm/LSBHeight)*LSBWidth);
    specEstWidth.innerText = `~${estWidth} cm`;

    // ===== BOŞLUKSUZ TAHMİNİ EN HESABI START =====
    const measurementSign = liveSignboard.cloneNode(false);
    measurementSign.innerText = textToDisplay.replace(/\s/g, '');
    measurementSign.style.position = 'absolute';
    measurementSign.style.visibility = 'hidden';
    measurementSign.style.width = 'max-content';
    measurementSign.style.maxWidth = 'none';
    measurementSign.style.transition = 'none';
    liveSignboard.parentElement.appendChild(measurementSign);
    const measurementBounds = measurementSign.getBoundingClientRect();
    const measurementWidth = Math.max(measurementSign.scrollWidth, measurementBounds.width);
    const estWidth2 = Math.round((state.heightCm/measurementBounds.height)*measurementWidth);
    measurementSign.remove();
    // ===== BOŞLUKSUZ TAHMİNİ EN HESABI END =====

    if(signPrice) {
    if (state.isLightOn) {
      if (state.productTypeId === 'backlit') {
        if(state.materialId == 'aluminum') {
        c1 = PRICE_VALUES.backlitAluminum.c1;
        c2 = PRICE_VALUES.backlitAluminum.c2;
        }
        if(state.materialId == 'chrome') {
          if(state.chromeFinishId == 'bronze') {
            c1 = PRICE_VALUES.backlitChromeBronze.c1;
            c2 = PRICE_VALUES.backlitChromeBronze.c2;
          }
          if(state.chromeFinishId == 'gold') {
            c1 = PRICE_VALUES.backlitChromeGold.c1;
            c2 = PRICE_VALUES.backlitChromeGold.c2;
          }
          if(state.chromeFinishId == 'silver') {
            c1 = PRICE_VALUES.backlitChromeSilver.c1;
            c2 = PRICE_VALUES.backlitChromeSilver.c2;
          }
          if(state.chromeFinishId == 'black') {
            c1 = PRICE_VALUES.backlitChromeBlack.c1;
            c2 = PRICE_VALUES.backlitChromeBlack.c2;
          }
        }
        if(state.materialId == 'plexiglass') {
        c1 = PRICE_VALUES.backlitPlexiglass.c1;
        c2 = PRICE_VALUES.backlitPlexiglass.c2;
        }
        if(state.materialId == 'foam') {
        c1 = PRICE_VALUES.backlitFoam.c1;
        c2 = PRICE_VALUES.backlitFoam.c2;
        }
       
      }
      if (state.productTypeId !== 'backlit') {
        if(state.materialId == 'aluminum') {
        c1 = PRICE_VALUES.otherlitAluminum.c1;
        c2 = PRICE_VALUES.otherlitAluminum.c2;
        }
        if(state.materialId == 'chrome') {
          if(state.chromeFinishId == 'bronze') {
            c1 = PRICE_VALUES.otherlitChromeBronze.c1;
            c2 = PRICE_VALUES.otherlitChromeBronze.c2;
          }
          if(state.chromeFinishId == 'gold') {
            c1 = PRICE_VALUES.otherlitChromeGold.c1;
            c2 = PRICE_VALUES.otherlitChromeGold.c2;
          }
          if(state.chromeFinishId == 'silver') {
            c1 = PRICE_VALUES.otherlitChromeSilver.c1;
            c2 = PRICE_VALUES.otherlitChromeSilver.c2;
          }
          if(state.chromeFinishId == 'black') {
            c1 = PRICE_VALUES.otherlitChromeBlack.c1;
            c2 = PRICE_VALUES.otherlitChromeBlack.c2;
          }
        }
        if(state.materialId == 'plexiglass') {
        c1 = PRICE_VALUES.otherlitPlexiglass.c1;
        c2 = PRICE_VALUES.otherlitPlexiglass.c2;
        }
        if(state.materialId == 'foam') {
        c1 = PRICE_VALUES.otherlitFoam.c1;
        c2 = PRICE_VALUES.otherlitFoam.c2;
        }

      }
      
    }
    else {
      if(state.materialId == 'aluminum') {
        c1 = PRICE_VALUES.unlitAluminum.c1;
        c2 = PRICE_VALUES.unlitAluminum.c2;
      }
      if(state.materialId == 'chrome') {
        if(state.chromeFinishId == 'bronze') {
          c1 = PRICE_VALUES.unlitChromeBronze.c1;
          c2 = PRICE_VALUES.unlitChromeBronze.c2;
        }
        if(state.chromeFinishId == 'gold') {
          c1 = PRICE_VALUES.unlitChromeGold.c1;
          c2 = PRICE_VALUES.unlitChromeGold.c2;
        }
        if(state.chromeFinishId == 'silver') {
          c1 = PRICE_VALUES.unlitChromeSilver.c1;
          c2 = PRICE_VALUES.unlitChromeSilver.c2;
        }
        if(state.chromeFinishId == 'black') {
          c1 = PRICE_VALUES.unlitChromeBlack.c1;
          c2 = PRICE_VALUES.unlitChromeBlack.c2;
        }
      }
      if(state.materialId == 'plexiglass') {
      c1 = PRICE_VALUES.unlitPlexiglass.c1;
      c2 = PRICE_VALUES.unlitPlexiglass.c2;
      }
      if(state.materialId == 'foam') {
      c1 = PRICE_VALUES.unlitFoam.c1;
      c2 = PRICE_VALUES.unlitFoam.c2;
     }


    }
    formula = (c1*state.heightCm*state.text.replace(/\s/g, '').length) + c2*estWidth; 
    signPrice.innerText = `${Math.round(formula)} TL`;
  }

    if (quoteMessage) {
      const modelDetail = state.isLightOn ? `\n• Tabela Modeli: ${productType.name}` : '';
      quoteMessage.value = `Merhaba, siteden yapılandırdığım tabela için teklif almak istiyorum:\n• Yazı: "${state.text}"\n• Aydınlatma: ${state.isLightOn ? 'Işıklı' : 'Işıksız'}${modelDetail}\n• Cephe Yüksekliği: ${facadeHeight}\n• Cephe Genişliği: ${facadeWidth}${colorDetailsText}`;
    }
  }
  // ================= CANLI ÖNİZLEME VE TASARIMI GÜNCELLEME END =================

  // ================= TASARIM ÖZETİNİ PANOYA KOPYALAMA START =================
  function copySummaryText() {
    const liveSignboardProp = liveSignboard.getBoundingClientRect();
    const LSBHeight = liveSignboardProp.height;
    const LSBWidth = Math.max(liveSignboard.scrollWidth, liveSignboardProp.width);
    const estWidth = Math.round((state.heightCm/LSBHeight)*LSBWidth);



    const facadeHeight = state.facadeHeightCm ? `${state.facadeHeightCm} cm` : 'Belirtilmedi';
    const facadeWidth = state.facadeWidthCm ? `${state.facadeWidthCm} cm` : 'Belirtilmedi';
    const productType = state.isLightOn
      ? PRODUCT_TYPES.lighted.find(option => option.id === state.productTypeId)
      : null;
    const material = MATERIALS.find(option => option.id === state.materialId);
    const chromeFinish = CHROME_FINISHES.find(option => option.id === state.chromeFinishId);
    const materialName = state.materialId === 'chrome' ? `Krom - ${chromeFinish.name}` : material.name;
    const colorDetails = [];
    if (state.materialId !== 'chrome') colorDetails.push(`Yazı Rengi: ${state.textColor.toUpperCase()}`);
    if (state.isLightOn) colorDetails.push(`Işık Rengi: ${state.lightColor.toUpperCase()}`);
    if (state.isLightOn && productType.id === 'front-side-lit') colorDetails.push(`Yan Işık Rengi: ${state.sideColor.toUpperCase()}`);
    const text = `--- FAALİYET TABELA SİPARİŞ ÖZETİ ---
Yazı: "${state.text}"
Harf Sayısı: ${state.text.length}
Cephe Yüksekliği: ${facadeHeight}
Cephe Genişliği: ${facadeWidth}
Aydınlatma: ${state.isLightOn ? 'Işıklı (Neon / LED)' : 'Işıksız (Kutu Harf)'}
${state.isLightOn ? `Tabela Modeli: ${productType.name}\n` : ''}Tabela Malzemesi: ${materialName}
${colorDetails.join('\n')}
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
  // ================= TASARIM ÖZETİNİ PANOYA KOPYALAMA END =================

  // ================= OLAY DİNLEYİCİLERİ START =================
  // Tabela metni ve cephe ölçüsü değişiklikleri
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

  // Özel harf yüksekliği girildiğinde hazır ve özel seçimlerin durumunu yenile
  customHeightInput.addEventListener('input', () => {
    const height = Number(customHeightInput.value);
    if (height > 500) customHeightInput.value = '500';
    state.heightCm = customHeightInput.value && Number.isFinite(height) && height > 0 ? Math.min(height, 500) : '';
    heightButtonsContainer.querySelectorAll('button[data-height]').forEach(button => {
      const isSelected = Number(button.dataset.height) === state.heightCm;
      button.setAttribute('aria-pressed', String(isSelected));
      button.className = isSelected
        ? 'w-full py-2.5 px-1 rounded-xl text-xs font-black transition-all bg-amber-400 text-slate-950 border-2 border-white shadow-lg shadow-amber-500/40 flex items-center justify-center gap-1'
        : 'w-full py-2.5 px-1 rounded-xl text-xs font-semibold transition-all bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center';
      button.innerHTML = isSelected ? `<i class="fa-solid fa-check text-[10px]"></i> ${button.dataset.height}` : button.dataset.height;
    });
    const customHeightButton = heightButtonsContainer.lastElementChild;
    const isCustomHeight = state.heightCm !== '' && !HEIGHT_OPTIONS.includes(state.heightCm);
    customHeightButton.setAttribute('aria-pressed', String(isCustomHeight));
    customHeightButton.setAttribute('aria-label', isCustomHeight ? `Özel yükseklik: ${state.heightCm} cm` : 'Özel yükseklik gir');
    customHeightButton.className = isCustomHeight
      ? 'w-full py-2.5 px-1 rounded-xl text-xs font-black transition-all bg-amber-400 text-slate-950 border-2 border-white shadow-lg shadow-amber-500/40 flex items-center justify-center gap-1'
      : 'w-full py-2.5 px-1 rounded-xl text-xs font-semibold transition-all bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center';
    customHeightButton.innerHTML = isCustomHeight ? '<i class="fa-solid fa-check text-[10px]"></i> Diğer' : 'Diğer';
    selectedHeightBadge.innerText = state.heightCm ? `Seçili: ${state.heightCm} cm` : 'Yükseklik girin';
  });

  // Aydınlatma modu ve tabela türü seçimi
  lightOnBtn.addEventListener('click', () => {
    state.isLightOn = true;
    state.isProductTypeOptionsOpen = false;
    state.isMaterialOptionsOpen = false;
    state.isChromeFinishOptionsOpen = false;
    render();
  });

  lightOffBtn.addEventListener('click', () => {
    state.isLightOn = false;
    state.isProductTypeOptionsOpen = false;
    state.isMaterialOptionsOpen = false;
    state.isChromeFinishOptionsOpen = false;
    render();
  });

  productTypeLabel.addEventListener('click', () => {
    state.isProductTypeOptionsOpen = !state.isProductTypeOptionsOpen;
    state.isMaterialOptionsOpen = false;
    state.isChromeFinishOptionsOpen = false;
    render();
  });

  materialLabel.addEventListener('click', () => {
    state.isMaterialOptionsOpen = !state.isMaterialOptionsOpen;
    state.isProductTypeOptionsOpen = false;
    state.isChromeFinishOptionsOpen = false;
    render();
  });

  chromeFinishLabel.addEventListener('click', () => {
    state.isChromeFinishOptionsOpen = !state.isChromeFinishOptionsOpen;
    state.isProductTypeOptionsOpen = false;
    state.isMaterialOptionsOpen = false;
    render();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && (
      state.isProductTypeOptionsOpen ||
      state.isMaterialOptionsOpen ||
      state.isChromeFinishOptionsOpen
    )) {
      state.isProductTypeOptionsOpen = false;
      state.isMaterialOptionsOpen = false;
      state.isChromeFinishOptionsOpen = false;
      render();
    }
  });

  // Işık, yazı ve yan ışık için özel renk girişleri
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

  // Sahne renk seçicisini açma, kapama ve Escape ile kapatma
  sceneColorToggle.addEventListener('click', () => {
    setSceneColorPickerOpen(sceneColorPicker.classList.contains('hidden'));
  });

  closeSceneColorPicker.addEventListener('click', () => {
    setSceneColorPickerOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !sceneColorPicker.classList.contains('hidden')) {
      setSceneColorPickerOpen(false);
    }
  });

  // Teklif formunu gönder ve sonucu kullanıcıya bildir
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

  // ================= OLAY DİNLEYİCİLERİ END =================

  // ================= İLK BAŞLATMA START =================
  render();
  document.fonts.ready.then(render);
  // ================= İLK BAŞLATMA END =================
});