// Returns '#000000' or '#FFFFFF' (or your custom dark/light) for best contrast
function readableTextColor(bgHex, { light = '#FFFFFF', dark = '#000000', target = 4.5 } = {}) {
  const bg = hexToRgb(bgHex);
  const lumBg = relLuminance(bg);

  const lightLum = relLuminance(hexToRgb(light));
  const darkLum  = relLuminance(hexToRgb(dark));

  const cLight = contrast(lumBg, lightLum);
  const cDark  = contrast(lumBg, darkLum);

  // Prefer the one that meets target; otherwise pick the higher contrast
  const lightOk = cLight >= target, darkOk = cDark >= target;
  if (lightOk && !darkOk) return light;
  if (darkOk && !lightOk) return dark;
  return cLight >= cDark ? light : dark;
}

function hexToRgb(hex) {
  let h = hex.replace('#','').trim();
  if (h.length === 3) h = h.split('').map(ch => ch + ch).join('');
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function relLuminance({ r, g, b }) {
  // sRGB to linear
  const toLin = v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLin(r), G = toLin(g), B = toLin(b);
  // Relative luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(l1, l2) {
  const [L1, L2] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (L1 + 0.05) / (L2 + 0.05);
}

export {
    readableTextColor
}