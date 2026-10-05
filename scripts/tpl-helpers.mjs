// Helpers for templates/*.mjs (kept separate from generate.mjs to avoid a circular import)
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const each = (list = [], fn) => list.map(fn).join('');
