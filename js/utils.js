/**
 * Hex renk kodunu RGB nesnesine dönüştürür.
 */
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Ekrana geçici toast bildirimi çıkartır.
 */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  const toastIcon = toast.querySelector('i');
  const variants = {
    success: { icon: 'fa-circle-check', color: 'text-amber-400', border: 'border-amber-500/40' },
    error: { icon: 'fa-circle-exclamation', color: 'text-rose-400', border: 'border-rose-500/40' },
    warning: { icon: 'fa-triangle-exclamation', color: 'text-amber-400', border: 'border-amber-500/40' },
    info: { icon: 'fa-circle-info', color: 'text-cyan-400', border: 'border-cyan-500/40' }
  };
  const variant = variants[type] || variants.success;

  if (toastIcon) toastIcon.className = `fa-solid ${variant.icon} ${variant.color} text-base`;
  toast.classList.remove('border-amber-500/40', 'border-rose-500/40', 'border-cyan-500/40');
  toast.classList.add(variant.border);

  toastText.innerText = msg;
  toast.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
  }, 2500);
}
