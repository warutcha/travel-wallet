'use strict';
(function () {
  // ===================== currencies =====================
  var METALS = {
    gold: { face: '#E6CB76', edge: '#B8963A', fg: '#4A3806', bw: '3px', chip: '#F3E4B4' },
    silver: { face: '#DADCE0', edge: '#A2A6AD', fg: '#33363B', bw: '3px', chip: '#E9EAED' },
    copper: { face: '#DDA27A', edge: '#A8653A', fg: '#4A2410', bw: '3px', chip: '#F0D2BD' },
    alu: { face: '#EEF0F3', edge: '#C3C7CD', fg: '#3A3D42', bw: '3px', chip: '#F2F3F5' },
    goldring: { face: '#DADCE0', edge: '#C9A43F', fg: '#33363B', bw: '6px', chip: '#E9EAED' },
    silverring: { face: '#E6CB76', edge: '#A2A6AD', fg: '#4A3806', bw: '6px', chip: '#F3E4B4' }
  };
  var CURS = {
    JPY: { country: 'Japan', name: 'Japanese yen', flag: '🇯🇵', pre: '¥', post: '', dec: 0, minor: 1, round: 1, rate: 0.23, unit: '¥1', main: '#7B5BA6', den: [
      { v: 10000, label: '¥10,000', kind: 'note', c: '#8B5A3C' }, { v: 5000, label: '¥5,000', kind: 'note', c: '#7B5BA6' }, { v: 1000, label: '¥1,000', kind: 'note', c: '#3D6FB0' },
      { v: 500, label: '¥500', short: '500', kind: 'coin', m: 'goldring' }, { v: 100, label: '¥100', short: '100', kind: 'coin', m: 'silver' }, { v: 50, label: '¥50', short: '50', kind: 'coin', m: 'silver' },
      { v: 10, label: '¥10', short: '10', kind: 'coin', m: 'copper' }, { v: 5, label: '¥5', short: '5', kind: 'coin', m: 'gold' }, { v: 1, label: '¥1', short: '1', kind: 'coin', m: 'alu' }] },
    KRW: { country: 'South Korea', name: 'Korean won', flag: '🇰🇷', pre: '₩', post: '', dec: 0, minor: 1, round: 1, rate: 0.025, unit: '₩1', main: '#4C9A5B', den: [
      { v: 50000, label: '₩50,000', kind: 'note', c: '#D9A520' }, { v: 10000, label: '₩10,000', kind: 'note', c: '#4C9A5B' }, { v: 5000, label: '₩5,000', kind: 'note', c: '#E07A35' }, { v: 1000, label: '₩1,000', kind: 'note', c: '#3F74B8' },
      { v: 500, label: '₩500', short: '500', kind: 'coin', m: 'silver' }, { v: 100, label: '₩100', short: '100', kind: 'coin', m: 'silver' }, { v: 50, label: '₩50', short: '50', kind: 'coin', m: 'silver' }, { v: 10, label: '₩10', short: '10', kind: 'coin', m: 'copper' }] },
    TWD: { country: 'Taiwan', name: 'New Taiwan dollar', flag: '🇹🇼', pre: 'NT$', post: '', dec: 0, minor: 1, round: 1, rate: 1.07, unit: 'NT$1', main: '#C2413F', den: [
      { v: 1000, label: 'NT$1,000', kind: 'note', c: '#3F6FB3' }, { v: 500, label: 'NT$500', kind: 'note', c: '#9A6040' }, { v: 100, label: 'NT$100', kind: 'note', c: '#C2413F' },
      { v: 50, label: 'NT$50', short: '50', kind: 'coin', m: 'gold' }, { v: 10, label: 'NT$10', short: '10', kind: 'coin', m: 'silver' }, { v: 5, label: 'NT$5', short: '5', kind: 'coin', m: 'silver' }, { v: 1, label: 'NT$1', short: '1', kind: 'coin', m: 'copper' }] },
    HKD: { country: 'Hong Kong', name: 'Hong Kong dollar', flag: '🇭🇰', pre: 'HK$', post: '', dec: 2, minor: 100, round: 1, rate: 4.4, unit: 'HK$1', main: '#C2423E', den: [
      { v: 100000, label: '$1,000', kind: 'note', c: '#C9A13A' }, { v: 50000, label: '$500', kind: 'note', c: '#8A5A3B' }, { v: 10000, label: '$100', kind: 'note', c: '#C2423E' }, { v: 5000, label: '$50', kind: 'note', c: '#4E965A' }, { v: 2000, label: '$20', kind: 'note', c: '#3A6FB4' }, { v: 1000, label: '$10', kind: 'note', c: '#7A55A3' },
      { v: 1000, label: '$10 coin', short: '$10', kind: 'coin', m: 'silverring', id: 'c1000' }, { v: 500, label: '$5', short: '$5', kind: 'coin', m: 'silver' }, { v: 200, label: '$2', short: '$2', kind: 'coin', m: 'silver' }, { v: 100, label: '$1', short: '$1', kind: 'coin', m: 'silver' },
      { v: 50, label: '50¢', short: '50¢', kind: 'coin', m: 'gold' }, { v: 20, label: '20¢', short: '20¢', kind: 'coin', m: 'gold' }, { v: 10, label: '10¢', short: '10¢', kind: 'coin', m: 'gold' }] },
    MOP: { country: 'Macau', name: 'Macanese pataca', flag: '🇲🇴', pre: 'MOP$', post: '', dec: 2, minor: 100, round: 1, rate: 4.3, unit: 'MOP$1', main: '#C0433F', den: [
      { v: 100000, label: '$1,000', kind: 'note', c: '#E0873A' }, { v: 50000, label: '$500', kind: 'note', c: '#4E965A' }, { v: 10000, label: '$100', kind: 'note', c: '#2F5A9E' }, { v: 5000, label: '$50', kind: 'note', c: '#7A5236' }, { v: 2000, label: '$20', kind: 'note', c: '#6D55A8' }, { v: 1000, label: '$10', kind: 'note', c: '#C0433F' },
      { v: 1000, label: '$10 coin', short: '$10', kind: 'coin', m: 'goldring', id: 'c1000' }, { v: 500, label: '$5', short: '$5', kind: 'coin', m: 'silver' }, { v: 200, label: '$2', short: '$2', kind: 'coin', m: 'silver' }, { v: 100, label: '$1', short: '$1', kind: 'coin', m: 'silver' },
      { v: 50, label: '50 avos', short: '50', kind: 'coin', m: 'gold' }, { v: 20, label: '20 avos', short: '20', kind: 'coin', m: 'gold' }, { v: 10, label: '10 avos', short: '10', kind: 'coin', m: 'gold' }] },
    SGD: { country: 'Singapore', name: 'Singapore dollar', flag: '🇸🇬', pre: 'S$', post: '', dec: 2, minor: 100, round: 1, rate: 25, unit: 'S$1', main: '#3B6EB5', den: [
      { v: 10000, label: '$100', kind: 'note', c: '#E08C2E' }, { v: 5000, label: '$50', kind: 'note', c: '#3B6EB5' }, { v: 1000, label: '$10', kind: 'note', c: '#C7453F' }, { v: 500, label: '$5', kind: 'note', c: '#4E9A4A' }, { v: 200, label: '$2', kind: 'note', c: '#7C559E' },
      { v: 100, label: '$1', short: '$1', kind: 'coin', m: 'goldring' }, { v: 50, label: '50¢', short: '50¢', kind: 'coin', m: 'silver' }, { v: 20, label: '20¢', short: '20¢', kind: 'coin', m: 'silver' }, { v: 10, label: '10¢', short: '10¢', kind: 'coin', m: 'silver' }, { v: 5, label: '5¢', short: '5¢', kind: 'coin', m: 'gold' }] },
    MYR: { country: 'Malaysia', name: 'Malaysian ringgit', flag: '🇲🇾', pre: 'RM ', post: '', dec: 2, minor: 100, round: 5, rate: 7.8, unit: 'RM1', main: '#7A5AAE', den: [
      { v: 10000, label: 'RM100', kind: 'note', c: '#7A5AAE' }, { v: 5000, label: 'RM50', kind: 'note', c: '#2F8F86' }, { v: 2000, label: 'RM20', kind: 'note', c: '#E0873A' }, { v: 1000, label: 'RM10', kind: 'note', c: '#C8433D' }, { v: 500, label: 'RM5', kind: 'note', c: '#5C9E3E' }, { v: 100, label: 'RM1', kind: 'note', c: '#3E78C2' },
      { v: 50, label: '50 sen', short: '50', kind: 'coin', m: 'gold' }, { v: 20, label: '20 sen', short: '20', kind: 'coin', m: 'gold' }, { v: 10, label: '10 sen', short: '10', kind: 'coin', m: 'silver' }, { v: 5, label: '5 sen', short: '5', kind: 'coin', m: 'silver' }] },
    VND: { country: 'Vietnam', name: 'Vietnamese dong', flag: '🇻🇳', pre: '', post: '₫', dec: 0, minor: 1, round: 1, rate: 0.0013, unit: '1₫', main: '#4F9A57', den: [
      { v: 500000, label: '500k', kind: 'note', c: '#2E7FA6' }, { v: 200000, label: '200k', kind: 'note', c: '#B5523A' }, { v: 100000, label: '100k', kind: 'note', c: '#4F9A57' }, { v: 50000, label: '50k', kind: 'note', c: '#C2558D' }, { v: 20000, label: '20k', kind: 'note', c: '#3E6FB8' }, { v: 10000, label: '10k', kind: 'note', c: '#C79A2E' }] }
  };
  var ORDER = ['JPY', 'KRW', 'TWD', 'HKD', 'MOP', 'SGD', 'MYR', 'VND'];
  function mix(hex, to, amt) { var a = parseInt(hex.slice(1), 16), b = parseInt(to.slice(1), 16); function ch(s) { return Math.round(((a >> s) & 255) * (1 - amt) + ((b >> s) & 255) * amt); } return '#' + ((1 << 24) + (ch(16) << 16) + (ch(8) << 8) + ch(0)).toString(16).slice(1); }
  ORDER.forEach(function (code) {
    var C = CURS[code]; C.code = code;
    C.den.forEach(function (d) {
      d.id = d.id || (d.kind + d.v);
      if (d.kind === 'note') { d.bg = mix(d.c, '#ffffff', 0.7); d.fg = mix(d.c, '#000000', 0.55); d.edge = d.c; d.chip = d.bg; d.bw = '2px'; d.r = '6px'; d.short = d.short || d.label; }
      else { var m = METALS[d.m]; d.bg = m.face; d.fg = m.fg; d.edge = m.edge; d.bw = m.bw; d.chip = m.chip; d.r = '999px'; }
    });
    C.notes = C.den.filter(function (d) { return d.kind === 'note'; });
    C.coins = C.den.filter(function (d) { return d.kind === 'coin'; });
    C.badgeBg = mix(C.main, '#ffffff', 0.75); C.badgeFg = mix(C.main, '#000000', 0.5);
  });

  // ===================== money helpers =====================
  function denOf(C, id) { for (var i = 0; i < C.den.length; i++) if (C.den[i].id === id) return C.den[i]; return null; }
  function money(a, C) { var v = Math.abs(a) / C.minor; return (a < 0 ? '-' : '') + C.pre + v.toLocaleString('en-US', { minimumFractionDigits: C.dec, maximumFractionDigits: C.dec }) + C.post; }
  function total(c, C) { var t = 0; C.den.forEach(function (d) { t += d.v * ((c && c[d.id]) || 0); }); return t; }
  function greedy(a, C) { var r = {}; C.den.slice().sort(function (x, y) { return y.v - x.v || (x.kind === 'note' ? -1 : 1); }).forEach(function (d) { var n = Math.floor(a / d.v); if (n > 0) { r[d.id] = n; a -= n * d.v; } }); return r; }
  function coinsOf(c, C) { var n = 0; C.coins.forEach(function (d) { n += (c[d.id] || 0); }); return n; }
  function coinValue(c, C) { var t = 0; C.coins.forEach(function (d) { t += d.v * (c[d.id] || 0); }); return t; }
  function noteCount(c, C) { var n = 0; C.notes.forEach(function (d) { n += (c[d.id] || 0); }); return n; }
  function describe(c, C) { var p = []; C.den.forEach(function (d) { var n = c && c[d.id]; if (n) p.push((n > 1 ? n + '×' : '') + d.label); }); return p.length ? p.join(' + ') : 'nothing'; }
  function merge(a, b, sign, C) { var r = {}; C.den.forEach(function (d) { var n = ((a && a[d.id]) || 0) + sign * ((b && b[d.id]) || 0); if (n) r[d.id] = n; }); return r; }
  function bump(c, id, delta, max) { var r = Object.assign({}, c); var n = (r[id] || 0) + delta; if (n < 0) n = 0; if (max != null && n > max) n = max; if (n) r[id] = n; else delete r[id]; return r; }
  function cashy(m) { return m === 'cash' || m === 'topup' || m === 'lost' || m === 'adjust'; }
  function applyE(w, card, e, sign, C) { var w2 = w, c2 = card; if (cashy(e.method)) w2 = merge(merge(w, e.given, -sign, C), e.got, sign, C); if (e.method === 'card') c2 = card - sign * e.amount; if (e.method === 'cardin') c2 = card + sign * e.amount; return { w: w2, c: c2 }; }
  function okW(w, c, C) { return c >= 0 && !C.den.some(function (x) { return (w[x.id] || 0) < 0; }); }
  function parseAmount(str, C) { var n = parseFloat(String(str || '').replace(/[, ]/g, '')); return isFinite(n) && n > 0 ? Math.round(n * C.minor) : 0; }

  // ===================== dates =====================
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function ymdOf(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function parseYmd(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2], 12); }
  function addDays(s, n) { var d = parseYmd(s); d.setDate(d.getDate() + n); return ymdOf(d); }
  function dateText(s) { var d = parseYmd(s); return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  function daysBetween(a, b) { return Math.round((parseYmd(b) - parseYmd(a)) / 86400000); }
  function today() { return ymdOf(new Date()); }
  function nowMins() { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  function nightKey() { var d = new Date(); if (d.getHours() < 4) d.setDate(d.getDate() - 1); return ymdOf(d); }
  function hhmm(m) { return pad2(Math.floor(m / 60) % 24) + ':' + pad2(m % 60); }
  function whenText(ts) { var d = new Date(ts); return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' · ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }

  var CATS = [
    { id: 'Food', bg: '#F6D9BE', fg: '#6E3307', bar: '#D98A45' },
    { id: 'Transport', bg: '#CFE0F4', fg: '#143E6E', bar: '#5E8FCB' },
    { id: 'Shopping', bg: '#F3D3DF', fg: '#7A1F45', bar: '#C9668F' },
    { id: 'Tickets', bg: '#E0D6F3', fg: '#3A2366', bar: '#8E74C9' },
    { id: 'Other', bg: '#E5DED3', fg: '#4A4038', bar: '#A39684' }
  ];
  function catOf(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return CATS[4]; }
  var METHOD_TEXT = { cash: 'Cash', card: 'Travel card', credit: 'Credit card', topup: 'Cash in', cardin: 'Card top-up', lost: 'Lost', adjust: 'Wallet recount' };
  var SRC_NAME = { ATM: 'ATM withdrawal', Exchange: 'Money exchange', Other: 'Other cash' };

  // ===================== storage =====================
  var KEY = 'travel-wallet-v1';
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  var DB0 = { v: 1, stage: 'welcome', trips: [], activeId: null, stash: {}, remind: { on: false, mins: 1260 }, pushOn: false, deviceId: null };
  function load() { try { var raw = localStorage.getItem(KEY); if (raw) return Object.assign(clone(DB0), JSON.parse(raw)); } catch (e) { } return clone(DB0); }
  function uuid() { return (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); })); }
  var db = load();
  if (!db.deviceId) { db.deviceId = uuid(); persist(); }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { toast("Couldn't save. Your phone may be out of space."); } }
  function save() { persist(); writeSummary(); schedulePushSync(); }
  function activeTrip() { for (var i = 0; i < db.trips.length; i++) if (db.trips[i].id === db.activeId) return db.trips[i]; return null; }

  // ===================== UI state =====================
  var DRAFT0 = { method: 'cash', digits: '', cat: 'Food', name: '', given: {}, got: null, err: '', editId: null, back: 'home' };
  var NT0 = { step: 'country', cur: null, name: '', start: null, days: 3, useStash: true, counts: {}, card: '', err: '' };
  var AC0 = { src: 'Exchange', counts: {}, err: '', back: 'home', editId: null };
  var SA0 = { step: 'country', cur: null, counts: {}, err: '', back: 'stash', fromOb: false, editing: false };
  var CT0 = { amount: '', err: '', editId: null };
  var RC0 = { counts: {}, step: 'count', reason: null, back: 'home', quick: false, err: '' };
  var S = {
    view: db.stage === 'app' ? (activeTrip() ? 'home' : 'trips') : 'welcome', obStep: 1,
    draft: clone(DRAFT0), nt: clone(NT0), ac: clone(AC0), sa: clone(SA0), ct: clone(CT0), rc: clone(RC0), te: null,
    open: null, confirmDel: null, stashOpen: null, stashDel: null, confirmEnd: false,
    coinSheet: null, csMode: 'menu', csQty: 1, settings: false, confirmReset: false, toast: '', pushMsg: '', pushBusy: false
  };
  function set(o) { Object.assign(S, o); render(); }
  var toastTimer;
  function toast(msg) { S.toast = msg; render(); clearTimeout(toastTimer); toastTimer = setTimeout(function () { S.toast = ''; render(); }, 2600); }
  function go(v) { return function () { set({ view: v, open: null, confirmDel: null, stashOpen: null, stashDel: null, confirmEnd: false, coinSheet: null, settings: false }); }; }

  // ===================== render plumbing =====================
  var root = document.getElementById('app');
  var H = [], IN = {};
  function h(fn) { H.push(fn); return H.length - 1; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function A(fn) { return ' data-h="' + h(fn) + '"'; }
  function inp(key, fn) { IN[key] = fn; return ' data-in="' + key + '"'; }
  var lastKey = '';
  function render() {
    var sc = root.querySelector('.scroll');
    var key = S.view + '|' + (S.nt.step || '') + '|' + (S.sa.step || '') + '|' + (S.rc.step || '');
    var keep = sc && key === lastKey ? sc.scrollTop : 0;
    var active = document.activeElement, activeIn = active && active.dataset ? active.dataset.in : null, selStart = activeIn ? active.selectionStart : null;
    H = []; IN = {};
    root.innerHTML = screen() + overlays();
    var sc2 = root.querySelector('.scroll'); if (sc2) sc2.scrollTop = keep;
    if (activeIn) { var el = root.querySelector('[data-in="' + activeIn + '"]'); if (el) { el.focus(); try { el.setSelectionRange(selStart, selStart); } catch (e) { } } }
    lastKey = key;
  }
  root.addEventListener('click', function (e) { var el = e.target.closest('[data-h]'); if (!el || !root.contains(el)) return; var fn = H[+el.getAttribute('data-h')]; if (fn) { e.preventDefault(); fn(e); } });
  root.addEventListener('input', function (e) { var el = e.target.closest('[data-in]'); if (el && IN[el.getAttribute('data-in')]) IN[el.getAttribute('data-in')](el.value, el); });
  root.addEventListener('change', function (e) { var el = e.target.closest('[data-file]'); if (el && el.files && el.files[0]) restoreBackup(el.files[0]); });

  // ===================== icons & small parts =====================
  var APP_VERSION = '1.1.0', APP_UPDATED = '29 Oct 2026';
  function LOGO(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 96 96" role="img" aria-label="Travel Wallet logo"><rect width="96" height="96" rx="22" fill="#1F6B52"/>' +
      '<circle cx="48" cy="48" r="28" fill="#E6CB76" stroke="#B8963A" stroke-width="4"/><circle cx="48" cy="48" r="21" fill="none" stroke="#B8963A" stroke-width="1.6" stroke-dasharray="2 3"/>' +
      '<path d="M34 50 L62 38 L54 62 L48 52 Z" fill="#FFFDF9" stroke="#3F322B" stroke-width="2.4" stroke-linejoin="round"/><path d="M48 52 L62 38" stroke="#3F322B" stroke-width="2.4" stroke-linecap="round"/></svg>';
  }
  var I = {
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chev: '<svg style="flex:none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    right: '<svg style="flex:none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    minus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F6B52" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    tick: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F6B52" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#F2D27A" stroke="#F2D27A" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    sliders: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    plus: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    wallet: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2z"/><path d="M4 8l11-4v4"/><path d="M16 14h1.5"/></svg>',
    list: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/></svg>',
    chart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V11M11 20V5M17 20v-6M3 20h18"/></svg>',
    box: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>',
    plane: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 15l-3 6M14 15l3 6M3 9l18-6-6 18-3-8z"/></svg>',
    arrow: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  function backBtn(fn, label) { return '<button class="icon-btn" aria-label="' + (label || 'Back') + '"' + A(fn) + '>' + I.back + '</button>'; }
  function flagBadge(C, size, fs) { return '<span class="badge flag" style="width:' + size + 'px;height:' + size + 'px;background:' + C.badgeBg + ';font-size:' + fs + 'px">' + C.flag + '</span>'; }
  function chipsHtml(c, C) { return C.den.filter(function (d) { return c[d.id]; }).map(function (d) { return '<span class="denchip" style="background:' + d.chip + ';color:' + d.fg + ';border-color:' + d.edge + ';border-radius:' + d.r + '">×' + c[d.id] + ' ' + esc(d.label) + '</span>'; }).join(''); }
  function sw(on) { return '<span class="switch" style="background:' + (on ? '#1F6B52' : '#9C8E80') + '"><span style="left:' + (on ? '25px' : '3px') + '"></span></span>'; }
  function errBox(msg) { return msg ? '<div class="note-box note-bad" role="alert">' + esc(msg) + '</div>' : ''; }

  // ===================== screens =====================
  function screen() {
    var T = activeTrip();
    if (S.view === 'welcome') return welcome();
    if (S.view === 'ob') return S.obStep === 2 ? ob2() : ob1();
    if (S.view === 'trips') return trips(T);
    if (S.view === 'newtrip') { if (S.nt.step === 'country') return picker('newtrip'); if (S.nt.step === 'details') return details(); return countScreen('newtrip'); }
    if (S.view === 'stashAdd') { if (S.sa.step === 'country') return picker('stash'); return countScreen('stash'); }
    if (S.view === 'stash') return stash(T);
    if (!T) { S.view = 'trips'; return trips(null); }
    if (S.view === 'addcash') return countScreen('addcash');
    if (S.view === 'pay') return pay(T);
    if (S.view === 'check') return checkScreen(T);
    if (S.view === 'recount') return recount(T);
    if (S.view === 'cardtop') return cardTop(T);
    if (S.view === 'history') return historyScreen(T);
    if (S.view === 'summary') return summary(T);
    if (S.view === 'tripedit') return tripEdit(T);
    return home(T);
  }

  function welcome() {
    return '<div class="welcome">' +
      '<div class="col gap14" style="align-items:flex-start;padding-top:24px">' + LOGO(112) + '<span style="font-size:15px;font-weight:600;color:#E6CB76;letter-spacing:0.3px">Travel Wallet</span></div>' +
      '<div class="col gap12"><h1 style="font-size:34px;line-height:1.1">Know every note and coin in your wallet</h1><p style="color:#D8C9B6;line-height:1.5">Log what you spend abroad, see exactly what\'s left, and keep leftover cash ready for your next trip.</p></div>' +
      '<div class="grow"></div>' +
      '<button class="btn" style="background:#F4EAD9;color:#3F322B"' + A(function () { set({ view: 'ob', obStep: 1 }); }) + '>Get started</button></div>';
  }
  function obHeader(step) {
    return '<div class="row gap12">' + backBtn(function () { if (S.obStep === 2) set({ obStep: 1 }); else set({ view: 'welcome' }); }) +
      '<div class="progress"><div class="on"></div><div class="' + (step === 2 ? 'on' : '') + '"></div></div></div>';
  }
  function ob1() {
    return '<div class="scroll">' + obHeader(1) +
      '<div class="col gap8"><span class="kicker">Step 1 of 2</span><h1>What\'s your home currency?</h1><p class="muted" style="line-height:1.5">Trip totals are also shown in this currency, so you know what you really spent.</p></div>' +
      '<div class="option on"><span class="badge" style="width:44px;height:44px;background:#CDEBDD;color:#134733;font-size:20px;font-weight:700">฿</span><span class="col grow"><span style="font-size:17px;font-weight:600">Thai baht</span><span class="small muted">THB</span></span>' + I.check + '</div>' +
      '<div class="grow"></div><button class="btn btn-primary"' + A(function () { set({ obStep: 2 }); }) + '>Continue</button></div>';
  }
  function ob2() {
    return '<div class="scroll">' + obHeader(2) +
      '<div class="col gap8"><span class="kicker">Step 2 of 2</span><h1>Got cash left from an earlier trip?</h1><p class="muted" style="line-height:1.5">Leftover yen or ringgit at home? Add it now. It waits in your stash and loads into your next trip to that country.</p></div>' +
      '<button class="option on"' + A(function () { db.stage = 'app'; persist(); set({ view: 'stashAdd', sa: Object.assign(clone(SA0), { fromOb: true }) }); }) + '><span class="badge" style="width:44px;height:44px;border-radius:14px;background:#CDEBDD;color:#134733">' + I.box + '</span><span class="col grow gap4"><span style="font-size:17px;font-weight:600">Yes, add leftover cash</span><span class="small muted">Count the notes and coins you have</span></span></button>' +
      '<button class="option"' + A(function () { db.stage = 'app'; persist(); set({ view: 'trips' }); }) + '><span class="badge" style="width:44px;height:44px;border-radius:14px;background:#EDE4D8;color:#4A4038">' + I.arrow + '</span><span class="col grow gap4"><span style="font-size:17px;font-weight:600">No, start fresh</span><span class="small muted">You can add leftovers any time from Stash</span></span></button></div>';
  }

  function stashRowsHtml(full) {
    var codes = ORDER.filter(function (c) { return db.stash[c]; });
    if (!codes.length) return full ? '<div class="card small muted" style="line-height:1.5">Nothing here yet. Add leftover cash from an earlier trip, or end a trip to save what\'s left.</div>' : '<span class="small muted">Nothing saved yet. Cash left at the end of a trip lands here.</span>';
    return codes.map(function (code) {
      var St = db.stash[code], C = CURS[code], cash = total(St.counts, C);
      if (!full) return '<div class="card row gap12" style="padding:12px 14px;border-radius:18px">' + flagBadge(C, 40, 22) + '<span class="col grow"><span class="bold">' + C.country + '</span><span class="xs muted">' + noteCount(St.counts, C) + ' notes · ' + coinsOf(St.counts, C) + ' coins' + (St.card ? ' · card ' + money(St.card, C) : '') + '</span></span><span class="bolder">' + money(cash, C) + '</span></div>';
      var open = S.stashOpen === code, conf = S.stashDel === code;
      return '<div class="card col gap12" style="border-radius:22px"><button class="entry-top"' + A(function () { set({ stashOpen: open ? null : code, stashDel: null }); }) + '>' + flagBadge(C, 44, 24) +
        '<span class="col grow"><span style="font-size:17px;font-weight:600">' + C.country + '</span><span class="xs muted">' + C.name + '</span></span><span style="font-size:18px;font-weight:700">' + money(cash, C) + '</span></button>' +
        '<div class="wrap">' + chipsHtml(St.counts, C) + '</div>' + (St.card ? '<span class="small muted">Plus ' + money(St.card, C) + ' on the travel card</span>' : '') +
        (open ? '<div class="entry-more" style="flex-direction:row;align-items:center;gap:8px">' + (conf ?
          '<span class="grow small bold">Remove this from your stash?</span><button class="btn-soft"' + A(function () { set({ stashDel: null }); }) + '>Keep</button><button class="btn-danger"' + A(function () { delete db.stash[code]; save(); set({ stashOpen: null, stashDel: null }); toast(C.country + ' removed from your stash'); }) + '>Remove</button>' :
          '<button class="btn-soft"' + A(function () { set({ view: 'stashAdd', sa: Object.assign(clone(SA0), { step: 'count', cur: code, counts: clone(St.counts), back: 'stash', editing: true }) }); }) + '>Recount</button><button class="btn-danger-soft"' + A(function () { set({ stashDel: code }); }) + '>Remove</button>') + '</div>' : '') + '</div>';
    }).join('');
  }

  function trips(T) {
    var past = db.trips.filter(function (t) { return t.ended; });
    var out = '<div class="scroll with-nav"><div class="between" style="align-items:center"><div class="col"><span class="small muted">Travel wallet</span><span style="font-size:30px;font-weight:700">Trips</span></div><button class="icon-btn sm" aria-label="Settings"' + A(function () { set({ settings: true }); }) + '>' + I.sliders + '</button></div>';
    if (T) {
      var C = CURS[T.cur];
      out += '<button class="dark col gap6" style="border-radius:24px;padding:18px;text-align:left;background:#3F322B;color:#F4EAD9"' + A(go('home')) + '><span class="small" style="color:#C9B8A5">Current trip</span><span style="font-size:22px;font-weight:700">' + esc(T.name) + '</span><span style="font-size:14px;color:#D8C9B6">' + C.flag.replace(/^/, '<span class="flag">') + '</span> ' + C.country + ' · ' + dateText(T.start) + ' – ' + dateText(addDays(T.start, T.days - 1)) + '</span><span class="bold" style="margin-top:4px">Open wallet · ' + money(total(T.wallet, C), C) + '</span></button>' +
        '<button class="btn-soft" style="align-self:flex-start;margin-top:-6px;border:1.5px solid #CDBFAE;background:#FFFDF9;font-size:14px;min-height:42px"' + A(openTripEdit) + '>Edit trip details</button>';
    } else {
      out += '<div class="card col gap10" style="border-radius:24px;padding:22px 18px;align-items:flex-start"><span style="font-size:22px;font-weight:700">Where to next?</span><span class="muted" style="line-height:1.5">Create a trip and pick the country. We\'ll load its notes and coins so you can track every one.</span><button class="btn btn-primary" style="padding:13px 20px;min-height:50px;font-size:16px"' + A(newTrip) + '>New trip</button></div>';
    }
    out += '<div class="col gap10"><div class="between"><h2 style="font-size:18px">Leftover stash</h2><button class="link"' + A(addLeftover) + '>Add leftovers</button></div>' + stashRowsHtml(false) + '</div>';
    if (past.length) out += '<div class="col gap10"><h2 style="font-size:18px">Past trips</h2>' + past.map(function (t) { var C = CURS[t.cur], s = 0; t.expenses.forEach(function (e) { if (e.method === 'cash' || e.method === 'card' || e.method === 'credit') s += e.amount; }); return '<div class="card row gap12" style="padding:12px 14px;border-radius:18px">' + flagBadge(C, 40, 22) + '<span class="col grow"><span class="bold">' + esc(t.name) + '</span><span class="xs muted">' + dateText(t.start) + ' – ' + dateText(addDays(t.start, t.days - 1)) + '</span></span><span class="col" style="align-items:flex-end"><span class="bolder" style="font-size:14px">' + money(s, C) + '</span><span class="xs muted">spent</span></span></div>'; }).join('') + '</div>';
    return out + '</div>';
  }
  function newTrip() { set({ view: 'newtrip', nt: Object.assign(clone(NT0), { start: today() }) }); }
  function addLeftover() { set({ view: 'stashAdd', sa: Object.assign(clone(SA0), { back: S.view === 'trips' ? 'trips' : 'stash' }) }); }

  function picker(mode) {
    var ctx = mode === 'newtrip' ?
      { kicker: 'New trip · step 1 of 3', title: 'Where are you going?', sub: "Pick the country and we'll load its real notes and coins.", pick: function (code) { set({ nt: Object.assign(clone(NT0), { step: 'details', cur: code, name: CURS[code].country + ' trip', start: S.nt.start || today() }) }); }, back: function () { set({ view: activeTrip() ? 'home' : 'trips', nt: clone(NT0) }); } } :
      { kicker: 'Leftover cash', title: 'Which currency is it?', sub: 'Pick the country your leftover cash is from.', pick: function (code) { set({ sa: Object.assign({}, S.sa, { step: 'count', cur: code, counts: clone((db.stash[code] || {}).counts || {}) }) }); }, back: function () { if (S.sa.fromOb) { db.stage = 'setup'; persist(); set({ view: 'ob', obStep: 2, sa: clone(SA0) }); } else set({ view: S.sa.back, sa: clone(SA0) }); } };
    return '<div class="scroll"><div class="row gap12">' + backBtn(ctx.back) + '<span class="kicker">' + ctx.kicker + '</span></div>' +
      '<div class="col gap6"><h1 style="font-size:28px">' + ctx.title + '</h1><p class="muted" style="line-height:1.5">' + ctx.sub + '</p></div><div class="col gap8">' +
      ORDER.map(function (code) {
        var C = CURS[code], St = db.stash[code];
        return '<button class="card row gap12" style="padding:12px 14px;border-radius:18px;text-align:left;min-height:64px"' + A(function () { ctx.pick(code); }) + '>' + flagBadge(C, 44, 24) +
          '<span class="col grow gap4"><span style="font-size:16px;font-weight:600">' + C.country + '</span><span class="row" style="gap:3px">' + C.notes.slice(0, 6).map(function (d) { return '<span style="width:16px;height:10px;border-radius:3px;background:' + d.c + ';border:1px solid ' + d.fg + '"></span>'; }).join('') + '<span class="xs muted" style="margin-left:4px">' + C.name + ' · ' + code + '</span></span></span>' +
          (St ? '<span style="background:#CDEBDD;color:#134733;border-radius:999px;padding:4px 10px;font-size:12px;font-weight:600;flex:none">' + money(total(St.counts, C), C) + ' saved</span>' : '') + '</button>';
      }).join('') + '</div></div>';
  }

  function dateFields(o, setter) {
    return '<div class="card col gap12" style="border-radius:18px;padding:14px">' +
      '<div class="row"><span class="col grow"><span class="small muted">Starts</span><span style="font-size:17px;font-weight:600">' + dateText(o.start) + '</span></span><button class="step-btn" aria-label="Earlier"' + A(function () { setter({ start: addDays(o.start, -1) }); }) + '>‹</button><button class="step-btn" aria-label="Later"' + A(function () { setter({ start: addDays(o.start, 1) }); }) + '>›</button></div>' +
      '<div style="height:1px;background:#EDE4D8"></div>' +
      '<div class="row"><span class="col grow"><span class="small muted">Length</span><span style="font-size:17px;font-weight:600">' + o.days + (o.days === 1 ? ' day' : ' days') + '</span></span><button class="step-btn" aria-label="Fewer days"' + A(function () { setter({ days: Math.max(1, o.days - 1) }); }) + '>−</button><button class="step-btn" aria-label="More days"' + A(function () { setter({ days: Math.min(90, o.days + 1) }); }) + '>+</button></div>' +
      '<span class="small muted">Ends ' + dateText(addDays(o.start, o.days - 1)) + '</span></div>';
  }
  function details() {
    var nt = S.nt, C = CURS[nt.cur];
    function setNt(o) { set({ nt: Object.assign({}, S.nt, o) }); }
    return '<div class="scroll"><div class="row gap12">' + backBtn(function () { setNt({ step: 'country' }); }) + '<span class="kicker">New trip · step 2 of 3</span></div>' +
      '<div class="row gap12">' + flagBadge(C, 52, 28) + '<div class="col"><span style="font-size:26px;font-weight:700">' + C.country + '</span><span class="small muted">' + C.name + ' · ' + C.code + '</span></div></div>' +
      '<label class="field">Trip name<input value="' + esc(nt.name) + '"' + inp('ntName', function (v) { S.nt.name = v; }) + '></label>' +
      dateFields(nt, setNt) + '<div class="grow"></div>' +
      '<button class="btn btn-primary"' + A(function () { if (!String(S.nt.name).trim()) { S.nt.name = C.country + ' trip'; } setNt({ step: 'money' }); }) + '>Next: money for the trip</button></div>';
  }
  function openTripEdit() { var T = activeTrip(); if (!T) return; set({ view: 'tripedit', te: { name: T.name, start: T.start, days: T.days, rate: String(T.rate), err: '', back: S.view === 'tripedit' ? 'home' : S.view }, settings: false }); }
  function tripEdit(T) {
    var C = CURS[T.cur], te = S.te;
    function setTe(o) { set({ te: Object.assign({}, S.te, { err: '' }, o) }); }
    return '<div class="scroll"><div class="row gap12">' + backBtn(function () { set({ view: te.back || 'home' }); }) + '<span style="font-size:20px;font-weight:700">Edit trip details</span></div>' +
      '<div class="row gap12">' + flagBadge(C, 52, 28) + '<div class="col grow"><span style="font-size:22px;font-weight:700">' + C.country + '</span><span class="small muted">The country stays fixed, since your notes and coins belong to it.</span></div></div>' +
      '<label class="field">Trip name<input value="' + esc(te.name) + '"' + inp('teName', function (v) { S.te.name = v; }) + '></label>' +
      dateFields(te, setTe) +
      '<label class="field">Exchange rate for baht totals (฿ per ' + C.unit + ')<input inputmode="decimal" value="' + esc(te.rate) + '"' + inp('teRate', function (v) { S.te.rate = v; }) + '></label>' +
      errBox(te.err) + '<div class="grow"></div>' +
      '<button class="btn btn-primary"' + A(function () {
        var nm = String(S.te.name || '').trim(); if (!nm) { setTe({ err: 'Give the trip a name.' }); return; }
        var rate = parseFloat(String(S.te.rate).replace(/,/g, '')); if (!(rate > 0)) { setTe({ err: 'Enter an exchange rate above 0.' }); return; }
        T.name = nm; T.start = S.te.start; T.days = S.te.days; T.rate = rate; save(); set({ view: S.te.back || 'home' }); toast('Trip details saved');
      }) + '>Save changes</button></div>';
  }

  function countScreen(mode) {
    var T = activeTrip(), C, counts, setCounts, title, sub, kicker, panelLabel, totalLabel, btn, err, back, saveFn, extra = 0, acEdit = null;
    if (mode === 'addcash') {
      C = CURS[T.cur]; counts = S.ac.counts; err = S.ac.err;
      if (S.ac.editId) T.expenses.forEach(function (e) { if (e.id === S.ac.editId) acEdit = e; });
      setCounts = function (c) { set({ ac: Object.assign({}, S.ac, { counts: c, err: '' }) }); };
      kicker = esc(T.name); title = acEdit ? 'Edit cash in' : 'Add cash';
      sub = acEdit ? 'Fix the notes and coins you received. Your wallet updates to match.' : 'Use this whenever cash goes into your wallet: a money exchange, an ATM withdrawal, or cash a friend pays back. Tap each note and coin you received.';
      panelLabel = 'What you received'; totalLabel = 'Received'; btn = acEdit ? 'Save changes' : 'Put it in my wallet';
      back = function () { set({ view: S.ac.back || 'home', ac: clone(AC0) }); };
      saveFn = function () {
        var amt = total(counts, C); if (!amt) { set({ ac: Object.assign({}, S.ac, { err: 'Tap at least one note or coin.' }) }); return; }
        var base = acEdit ? applyE(T.wallet, T.card, acEdit, -1, C) : { w: T.wallet, c: T.card };
        var e = { id: acEdit ? acEdit.id : Date.now(), ts: acEdit ? acEdit.ts : Date.now(), name: SRC_NAME[S.ac.src], cat: 'Other', method: 'topup', amount: amt, given: {}, got: counts };
        var r = applyE(base.w, base.c, e, 1, C);
        if (!okW(r.w, r.c, C)) { set({ ac: Object.assign({}, S.ac, { err: 'Some of that cash is already spent. Fix the later entries first.' }) }); return; }
        T.wallet = r.w; T.card = r.c; T.expenses = acEdit ? T.expenses.map(function (x) { return x.id === acEdit.id ? e : x; }) : [e].concat(T.expenses);
        save(); set({ view: S.ac.back || 'home', ac: clone(AC0), open: null }); toast(acEdit ? 'Updated. Wallet fixed' : money(amt, C) + ' added to your wallet');
      };
    } else if (mode === 'stash') {
      C = CURS[S.sa.cur]; counts = S.sa.counts; err = S.sa.err;
      setCounts = function (c) { set({ sa: Object.assign({}, S.sa, { counts: c, err: '' }) }); };
      kicker = 'Leftover cash · ' + C.country; title = 'Count your leftover ' + C.name.split(' ').slice(-1)[0];
      sub = 'Tap each note and coin you still have. It stays in your stash until your next trip to ' + C.country + '.';
      panelLabel = C.name; totalLabel = 'Leftover cash'; btn = 'Save to stash';
      back = function () { if (S.sa.editing) set({ view: 'stash', sa: clone(SA0) }); else set({ sa: Object.assign({}, S.sa, { step: 'country', err: '' }) }); };
      saveFn = function () {
        var amt = total(counts, C); if (!amt) { set({ sa: Object.assign({}, S.sa, { err: 'Tap at least one note or coin.' }) }); return; }
        db.stash[C.code] = { counts: counts, card: (db.stash[C.code] || {}).card || 0 }; save();
        var fromOb = S.sa.fromOb; set({ view: fromOb ? 'trips' : (S.sa.back || 'stash'), sa: clone(SA0) });
        toast(money(amt, C) + ' saved to your ' + C.country + ' stash');
      };
    } else {
      C = CURS[S.nt.cur]; counts = S.nt.counts; err = S.nt.err;
      var rec = db.stash[C.code];
      if (rec && S.nt.useStash) extra = total(rec.counts, C);
      setCounts = function (c) { set({ nt: Object.assign({}, S.nt, { counts: c, err: '' }) }); };
      kicker = 'New trip · step 3 of 3'; title = 'Money for this trip';
      sub = "Tap the notes and coins you exchanged before leaving. Skip it if you haven't yet. You can add cash any time.";
      panelLabel = 'Cash you exchanged'; totalLabel = 'Cash for this trip'; btn = 'Start trip';
      back = function () { set({ nt: Object.assign({}, S.nt, { step: 'details' }) }); };
      saveFn = function () { startTrip(); };
    }
    var sizes = [50, 46, 43, 40, 38, 36, 34];
    var notesHtml = C.notes.map(function (d) {
      var n = counts[d.id] || 0;
      return '<div class="rel"><button class="tap-note" style="border-color:' + d.edge + ';background:' + d.bg + ';color:' + d.fg + '" aria-label="Add ' + esc(d.label) + '"' + A(function () { setCounts(bump(counts, d.id, 1)); }) + '><span style="font-size:17px;font-weight:700">' + esc(d.label) + '</span><span style="width:22px;height:22px;border-radius:50%;border:2px solid ' + d.edge + '"></span></button>' +
        '<span class="count-badge" style="opacity:' + (n ? 1 : 0.55) + '">' + n + '</span>' +
        (n ? '<button class="minus-badge" aria-label="Remove one ' + esc(d.label) + '"' + A(function () { setCounts(bump(counts, d.id, -1)); }) + '>' + I.minus + '</button>' : '') + '</div>';
    }).join('');
    var coinsHtml = C.coins.map(function (d, i) {
      var n = counts[d.id] || 0, s = (sizes[i] || 34) + 'px';
      return '<div class="rel"><button style="width:' + s + ';height:' + s + ';border-radius:50%;border:' + d.bw + ' solid ' + d.edge + ';background:' + d.bg + ';color:' + d.fg + ';font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center" aria-label="Add ' + esc(d.label) + '"' + A(function () { setCounts(bump(counts, d.id, 1)); }) + '>' + esc(d.short) + '</button>' +
        '<span class="count-badge" style="top:-8px;right:-8px;font-size:11px;padding:1px 6px;opacity:' + (n ? 1 : 0.55) + '">' + n + '</span>' +
        (n ? '<button class="minus-badge" style="width:26px;height:26px;left:-10px;border-color:#2E241F" aria-label="Remove one ' + esc(d.label) + '"' + A(function () { setCounts(bump(counts, d.id, -1)); }) + '>' + I.minus + '</button>' : '') + '</div>';
    }).join('');
    var out = '<div class="scroll"><div class="row gap12">' + backBtn(back) + '<span class="kicker ellipsis">' + kicker + '</span></div>' +
      '<div class="col gap6"><h1>' + title + '</h1><p class="small muted" style="font-size:14px;line-height:1.5">' + sub + '</p></div>';
    if (mode === 'addcash') out += '<div class="seg">' + ['Exchange', 'ATM', 'Other'].map(function (s) { return '<button class="' + (S.ac.src === s ? 'on' : '') + '"' + A(function () { set({ ac: Object.assign({}, S.ac, { src: s }) }); }) + '>' + s + '</button>'; }).join('') + '</div>';
    if (mode === 'newtrip' && db.stash[C.code]) {
      var r2 = db.stash[C.code], on = S.nt.useStash;
      out += '<div class="row gap12" style="background:#CDEBDD;color:#134733;border-radius:18px;padding:14px"><span class="col grow gap4"><span class="bold">Bring ' + money(total(r2.counts, C), C) + ' from your stash</span><span class="small">' + esc(describe(r2.counts, C)) + (r2.card ? ' · plus ' + money(r2.card, C) + ' on the card' : '') + '</span></span><button aria-label="Bring stash into this trip" aria-pressed="' + on + '"' + A(function () { set({ nt: Object.assign({}, S.nt, { useStash: !on }) }); }) + '>' + sw(on) + '</button></div>';
    }
    out += '<div class="panel"><div class="between" style="color:#E9DCCB;font-size:13px;font-weight:500"><span>' + esc(panelLabel) + '</span><span>Tap to add · minus to remove</span></div>' +
      '<div class="grid2" style="gap:12px 10px">' + notesHtml + '</div>' +
      (C.coins.length ? '<div class="panel-coins">' + coinsHtml + '</div>' : '<span style="color:#C9B8A5;font-size:12px">Coins aren\'t used day to day here, so we only list notes.</span>') + '</div>' +
      '<div class="card between" style="align-items:center;padding:12px 14px;border-radius:16px"><span class="col"><span class="small muted">' + totalLabel + '</span><span style="font-size:20px;font-weight:700">' + money(total(counts, C) + extra, C) + '</span></span>' + (total(counts, C) ? '<button class="btn-soft"' + A(function () { setCounts({}); }) + '>Start over</button>' : '') + '</div>';
    if (mode === 'newtrip') out += '<label class="field">Travel card balance in ' + C.code + ' (optional)<input inputmode="decimal" placeholder="0" value="' + esc(S.nt.card) + '"' + inp('ntCard', function (v) { S.nt.card = v; }) + '></label>';
    return out + errBox(err) + '<button class="btn btn-primary"' + A(saveFn) + '>' + btn + '</button></div>';
  }

  function startTrip() {
    var nt = S.nt, C = CURS[nt.cur], rec = db.stash[C.code], useS = nt.useStash && rec;
    var wallet = merge(useS ? rec.counts : {}, nt.counts, 1, C);
    var card = parseAmount(nt.card, C) + (useS ? (rec.card || 0) : 0);
    var ts = Date.now(), exps = [];
    if (total(nt.counts, C)) exps.push({ id: ts + 1, ts: ts, name: 'Money exchange', cat: 'Other', method: 'topup', amount: total(nt.counts, C), given: {}, got: nt.counts });
    if (useS && total(rec.counts, C)) exps.push({ id: ts + 2, ts: ts, name: 'From your stash', cat: 'Other', method: 'topup', amount: total(rec.counts, C), given: {}, got: rec.counts });
    if (useS) delete db.stash[C.code];
    var t = { id: ts, name: String(nt.name || '').trim() || C.country + ' trip', cur: C.code, start: nt.start || today(), days: nt.days, rate: C.rate, wallet: wallet, card: card, expenses: exps, ended: false, checkedDate: '' };
    db.trips.unshift(t); db.activeId = t.id; save();
    set({ view: 'home', nt: clone(NT0) });
    toast('Trip started. Have a great time in ' + C.country);
  }

  // ---------- trip screens ----------
  function nightState(T) {
    var mins = nowMins(), hr = new Date().getHours();
    var nightNow = db.remind.on && (mins >= db.remind.mins || hr < 4) && today() >= T.start;
    return { nightNow: nightNow, checked: T.checkedDate === nightKey() };
  }
  function markChecked(T) { T.checkedDate = nightKey(); save(); }
  function dayLabel(T) {
    var d = daysBetween(T.start, today());
    if (d < 0) return 'Starts ' + dateText(T.start);
    if (d >= T.days) return 'Ended ' + dateText(addDays(T.start, T.days - 1));
    return 'Day ' + (d + 1) + ' of ' + T.days;
  }
  function openRecount(quick) { var T = activeTrip(); set({ view: 'recount', rc: Object.assign(clone(RC0), { counts: clone(T.wallet), back: (S.view === 'recount' || S.view === 'check') ? 'home' : (S.view || 'home'), quick: !!quick }), coinSheet: null, settings: false }); }
  function openPay() { set({ view: 'pay', draft: Object.assign(clone(DRAFT0), { back: S.view === 'pay' ? 'home' : S.view }), open: null, confirmDel: null }); }
  function openAddCash() { set({ view: 'addcash', ac: Object.assign(clone(AC0), { back: S.view }), coinSheet: null }); }

  function entryRows(T, list) {
    var C = CURS[T.cur], w = T.wallet;
    return list.map(function (e) {
      var cat = catOf(e.cat), cash = e.method === 'cash';
      var net = e.method === 'adjust' ? total(e.got, C) - total(e.given, C) : 0;
      var plus = e.method === 'topup' || e.method === 'cardin' || (e.method === 'adjust' && net > 0);
      var initial = plus ? '+' : (e.method === 'lost' ? '!' : (e.method === 'adjust' ? '=' : e.cat.charAt(0)));
      var detail;
      if (cash) detail = 'Gave ' + describe(e.given, C) + '. Got back ' + (total(e.got, C) ? describe(e.got, C) : 'nothing') + '.';
      else if (e.method === 'topup') detail = 'Received ' + describe(e.got, C) + '.';
      else if (e.method === 'cardin') detail = 'Added to your travel card.';
      else if (e.method === 'lost') detail = 'Missing: ' + describe(e.given, C) + (total(e.got, C) ? ' (and found ' + describe(e.got, C) + ')' : '') + '. Not counted as spending. Delete it if this was a mistake.';
      else if (e.method === 'adjust') detail = 'Recount fix. ' + (total(e.given, C) ? 'Removed ' + describe(e.given, C) + '. ' : '') + (total(e.got, C) ? 'Added ' + describe(e.got, C) + '. ' : '') + 'Delete it and recount if this was a mistake.';
      else detail = 'Paid by ' + METHOD_TEXT[e.method].toLowerCase() + '. No cash moved.';
      var bg = plus ? '#CDEBDD' : (e.method === 'lost' ? '#F8DEDC' : (e.method === 'adjust' ? '#E5DED3' : cat.bg));
      var fg = plus ? '#134733' : (e.method === 'lost' ? '#7A1F1B' : (e.method === 'adjust' ? '#4A4038' : cat.fg));
      var amt = e.method === 'adjust' ? Math.abs(net) : e.amount;
      var amountText = (e.method === 'adjust' && net === 0) ? money(0, C) : (plus ? '+' : '-') + money(amt, C);
      var open = S.open === e.id, conf = S.confirmDel === e.id, canEdit = e.method !== 'adjust' && e.method !== 'lost';
      var more = '';
      if (open) {
        more = '<div class="entry-more"><span class="small" style="color:#4A4038;line-height:1.5">' + esc(detail) + '</span>' + (conf ?
          '<div class="row gap8"><span class="grow small bold">Delete this? Your wallet goes back to how it was.</span><button class="btn-soft"' + A(function () { set({ confirmDel: null }); }) + '>Keep</button><button class="btn-danger"' + A(function () {
            var r = applyE(T.wallet, T.card, e, -1, C);
            if (!okW(r.w, r.c, C)) { set({ confirmDel: null }); toast("Can't delete. Some of that money is already spent"); return; }
            T.wallet = r.w; T.card = r.c; T.expenses = T.expenses.filter(function (x) { return x.id !== e.id; }); save(); set({ open: null, confirmDel: null }); toast('Deleted. Wallet put back');
          }) + '>Delete</button></div>' :
          '<div class="row gap8">' + (canEdit ? '<button class="btn-soft"' + A(function () { openEdit(T, e); }) + '>Edit</button>' : '') + '<button class="btn-danger-soft"' + A(function () { set({ confirmDel: e.id }); }) + '>Delete</button></div>') + '</div>';
      }
      return '<div class="entry"><button class="entry-top"' + A(function () { set({ open: open ? null : e.id, confirmDel: null }); }) + '><span class="entry-ic" style="background:' + bg + ';color:' + fg + '">' + initial + '</span>' +
        '<span class="col grow"><span class="bold ellipsis">' + esc(e.name) + '</span><span class="xs muted">' + METHOD_TEXT[e.method] + ' · ' + whenText(e.ts) + '</span></span><span class="bolder" style="color:' + (plus ? '#1F6B52' : (e.method === 'lost' ? '#7A1F1B' : '#2B211C')) + ';flex:none">' + amountText + '</span></button>' + more + '</div>';
    }).join('');
  }
  function openEdit(T, e) {
    var C = CURS[T.cur];
    if (e.method === 'cash' || e.method === 'card' || e.method === 'credit') set({ view: 'pay', draft: Object.assign(clone(DRAFT0), { method: e.method, digits: String(e.amount), cat: e.cat, name: e.name === e.cat ? '' : e.name, given: clone(e.given), got: e.method === 'cash' ? clone(e.got) : null, editId: e.id, back: S.view }), open: null });
    else if (e.method === 'topup') { var src = 'Other'; Object.keys(SRC_NAME).forEach(function (k) { if (SRC_NAME[k] === e.name) src = k; }); set({ view: 'addcash', ac: Object.assign(clone(AC0), { src: src, counts: clone(e.got), editId: e.id, back: S.view }), open: null }); }
    else if (e.method === 'cardin') set({ view: 'cardtop', ct: Object.assign(clone(CT0), { amount: String(e.amount / C.minor), editId: e.id }), open: null });
  }

  function home(T) {
    var C = CURS[T.cur], w = T.wallet, cashSum = total(w, C), cc = coinsOf(w, C), ns = nightState(T);
    var notes = C.notes.map(function (n) {
      var c = w[n.id] || 0;
      return '<button style="display:flex;justify-content:space-between;align-items:center;border-radius:14px;padding:13px 14px;background:' + (c ? n.bg : 'transparent') + ';color:' + (c ? n.fg : '#75675C') + ';border:' + (c ? '1.5px solid ' + n.c : '1.5px dashed #CDBFAE') + ';font-weight:700;font-size:16px;min-height:50px" aria-label="' + esc(n.label) + ' options"' + A(function () { set({ coinSheet: n.id, csMode: 'menu', csQty: 1 }); }) + '>' +
        '<span class="row" style="gap:8px"><span style="width:6px;height:22px;border-radius:3px;background:' + (c ? n.c : '#CDBFAE') + '"></span>' + esc(n.label) + '</span><span style="font-size:15px">' + (c ? '×' + c : '0') + '</span></button>';
    }).join('');
    var coins = C.coins.map(function (n) {
      var c = w[n.id] || 0;
      return '<button style="position:relative;width:54px;height:54px;border-radius:50%;background:' + n.bg + ';border:' + n.bw + ' solid ' + n.edge + ';color:' + n.fg + ';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;opacity:' + (c ? 1 : 0.4) + '" aria-label="' + esc(n.label) + ' options"' + A(function () { set({ coinSheet: n.id, csMode: 'menu', csQty: 1 }); }) + '>' + esc(n.short) +
        '<span style="position:absolute;top:-6px;right:-8px;background:#2B211C;color:#fff;border-radius:999px;font-size:12px;font-weight:700;padding:1px 7px">' + c + '</span></button>';
    }).join('');
    var showCheck = ns.nightNow && !ns.checked;
    var rcBtn = showCheck ?
      '<button class="rel" aria-label="Tonight\'s wallet check" style="border:1.5px solid #2E3A5C;background:#2E3A5C;color:#E8EDFB;border-radius:14px;padding:10px 4px;font-size:14px;font-weight:600;min-height:48px;display:flex;align-items:center;justify-content:center;gap:5px"' + A(function () { set({ view: 'check' }); }) + '>' + I.moon + '<span>Check</span><span class="dot-red"></span></button>' :
      '<button aria-label="Recount wallet" style="border:1.5px solid #CDBFAE;background:#FFFDF9;border-radius:14px;padding:10px 4px;font-size:14px;font-weight:600;min-height:48px;display:flex;align-items:center;justify-content:center;gap:5px"' + A(function () { openRecount(false); }) + '><span>Recount</span>' + (ns.nightNow && ns.checked ? I.tick : '') + '</button>';
    var recent = T.expenses.slice(0, 3);
    return '<div class="scroll with-nav">' +
      '<div class="row" style="justify-content:space-between;gap:10px"><button class="col grow" style="align-items:flex-start;gap:2px;text-align:left"' + A(go('trips')) + '><span class="small muted ellipsis" style="max-width:100%">' + C.country + ' · ' + dayLabel(T) + '</span><span class="row" style="font-size:24px;font-weight:700;gap:6px;max-width:100%;min-width:0"><span class="ellipsis">' + esc(T.name) + '</span>' + I.chev + '</span></button>' +
      '<div class="row gap8" style="flex:none"><button class="icon-btn sm" aria-label="Settings"' + A(function () { set({ settings: true }); }) + '>' + I.sliders + '</button>' +
      '<span aria-label="Currency ' + C.code + '" style="width:40px;height:40px;background:' + C.badgeBg + ';color:' + C.badgeFg + ';border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex:none"><span class="flag" style="font-size:16px">' + C.flag + '</span><span style="font-size:10px;font-weight:700;line-height:1">' + C.code + '</span></span></div></div>' +
      '<div class="dark col gap12" style="border-radius:26px;padding:20px"><span style="font-size:14px;color:#C9B8A5;font-weight:500">Cash in your wallet</span><span style="font-size:40px;font-weight:700;line-height:1;letter-spacing:-0.5px">' + money(cashSum, C) + '</span>' +
      '<div class="wrap" style="gap:8px"><span style="background:#57473E;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600">Travel card ' + money(T.card, C) + '</span>' + (C.coins.length ? '<span style="background:#E6CB76;color:#4A3806;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600">' + cc + ' coins · ' + money(coinValue(w, C), C) + '</span>' : '') + '</div></div>' +
      (cashSum === 0 ? '<div class="card col gap10" style="align-items:flex-start"><span class="bold">No cash recorded yet</span><span class="muted" style="font-size:14px;line-height:1.5">Exchanged money or took some out of an ATM? Add it so the app knows exactly which notes and coins you have.</span><button class="btn btn-primary" style="padding:11px 16px;min-height:46px;font-size:15px"' + A(openAddCash) + '>Add cash</button></div>' : '') +
      '<div class="col gap10"><div class="between"><h2>Notes</h2><span class="small muted">' + noteCount(w, C) + ' notes · ' + money(cashSum - coinValue(w, C), C) + '</span></div><div class="grid2">' + notes + '</div></div>' +
      (C.coins.length ? '<div class="col gap12"><div class="between"><h2>Coins</h2><span class="small muted">' + money(coinValue(w, C), C) + '</span></div><div class="wrap" style="gap:16px 14px;padding:4px 4px 0">' + coins + '</div></div>' : '') +
      '<span class="xs muted" style="margin-top:-8px">Tap a note or coin if you lost one, gave one away, or found an extra.</span>' +
      (cc > 0 ? '<div class="note-box note-warn">Coins can\'t be changed back to baht. Try paying small things with them first.</div>' : '') +
      '<div class="grid3"><button class="btn-secondary" style="border-radius:14px;padding:10px 4px;font-size:14px;font-weight:600;min-height:48px"' + A(openAddCash) + '>Add cash</button><button class="btn-secondary" style="border-radius:14px;padding:10px 4px;font-size:14px;font-weight:600;min-height:48px"' + A(function () { set({ view: 'cardtop', ct: clone(CT0) }); }) + '>Top up card</button>' + rcBtn + '</div>' +
      (recent.length ? '<div class="col gap10"><div class="between"><h2>Recent</h2><button class="link"' + A(go('history')) + '>See all</button></div>' + entryRows(T, recent) + '</div>' : '') +
      '</div>';
  }

  function checkScreen(T) {
    var C = CURS[T.cur], w = T.wallet;
    return '<div class="scroll"><div class="row gap12">' + backBtn(go('home')) + '<span class="kicker ellipsis">' + esc(T.name) + '</span></div>' +
      '<div class="col gap6" style="background:#2E3A5C;color:#E8EDFB;border-radius:24px;padding:20px"><span class="row bold" style="gap:8px">' + I.moon + 'Tonight\'s check</span><span style="font-size:14px;color:#C7D0EA">Your wallet should have</span><span style="font-size:38px;font-weight:700;line-height:1.1">' + money(total(w, C), C) + '</span><span style="font-size:14px;color:#C7D0EA">' + noteCount(w, C) + ' notes and ' + coinsOf(w, C) + ' coins</span></div>' +
      '<div class="card col gap10"><span class="bold" style="font-size:14px">Count these in your wallet</span><div class="wrap">' + (chipsHtml(w, C) || '<span class="small muted">Your wallet should be empty.</span>') + '</div></div>' +
      '<button class="btn btn-primary"' + A(function () { markChecked(T); set({ view: 'home' }); toast('Checked. See you tomorrow night'); }) + '>Yes, it matches</button>' +
      '<button class="btn btn-secondary"' + A(function () { openRecount(true); }) + '>Something\'s different</button>' +
      '<button class="link" style="align-self:center;font-size:13px"' + A(function () { set({ settings: true }); }) + '>' + (db.remind.on ? 'Reminder at ' + hhmm(db.remind.mins) : 'Reminder off') + ' · Change</button></div>';
  }

  function pay(T) {
    var C = CURS[T.cur], d = S.draft, editE = null;
    if (d.editId) T.expenses.forEach(function (e) { if (e.id === d.editId) editE = e; });
    var base = editE ? applyE(T.wallet, T.card, editE, -1, C) : { w: T.wallet, c: T.card }, bw = base.w;
    var price = parseInt(d.digits || '0', 10), isCash = d.method === 'cash';
    var due = isCash && C.round > 1 ? Math.round(price / C.round) * C.round : price;
    var givenSum = total(d.given, C), changeDue = isCash ? Math.max(0, givenSum - due) : 0;
    var got = d.got || greedy(changeDue, C), gotSum = total(got, C);
    function setDraft(o) { set({ draft: Object.assign({}, S.draft, { err: '' }, o) }); }
    function saveIt() {
      if (!price) { setDraft({ err: 'Enter an amount first.' }); return; }
      if (isCash && givenSum < due) { setDraft({ err: 'Tap the notes or coins you handed over. You need at least ' + money(due, C) + '.' }); return; }
      if (d.method === 'card' && price > base.c) { setDraft({ err: 'Your travel card only has ' + money(base.c, C) + '. Top it up or pay another way.' }); return; }
      var e = { id: editE ? editE.id : Date.now(), ts: editE ? editE.ts : Date.now(), name: String(S.draft.name || '').trim() || d.cat, cat: d.cat, method: d.method, amount: due, given: isCash ? d.given : {}, got: isCash ? got : {} };
      var r = applyE(bw, base.c, e, 1, C);
      if (!okW(r.w, r.c, C)) { setDraft({ err: "That doesn't fit what's in your wallet. Check the notes and coins." }); return; }
      T.wallet = r.w; T.card = r.c; T.expenses = editE ? T.expenses.map(function (x) { return x.id === editE.id ? e : x; }) : [e].concat(T.expenses);
      save(); set({ view: d.back || 'home', draft: clone(DRAFT0), open: null });
      toast(editE ? 'Updated. Your wallet is fixed' : (isCash ? 'Saved. Your wallet is updated' : 'Saved'));
    }
    var out = '<div class="scroll"><div class="row gap12"><button class="icon-btn" aria-label="Close"' + A(function () { set({ view: d.back || 'home', draft: clone(DRAFT0) }); }) + '>' + I.close + '</button><span style="font-size:20px;font-weight:700">' + (editE ? 'Edit entry' : 'New expense') + '</span></div>' +
      '<div class="seg">' + [['cash', 'Cash'], ['card', 'Travel card'], ['credit', 'Credit card']].map(function (m) { return '<button class="' + (d.method === m[0] ? 'on' : '') + '"' + A(function () { setDraft({ method: m[0], got: null }); }) + '>' + m[1] + '</button>'; }).join('') + '</div>' +
      '<div class="card col gap12" style="border-radius:22px"><div class="row" style="justify-content:center;align-items:baseline;gap:8px"><span style="font-size:20px;font-weight:600;color:#75675C">' + esc((C.pre || C.post).trim()) + '</span><span style="font-size:42px;font-weight:700">' + (price / C.minor).toLocaleString('en-US', { minimumFractionDigits: C.dec, maximumFractionDigits: C.dec }) + '</span></div>' +
      (isCash && C.round > 1 && price % C.round !== 0 ? '<span class="small bold" style="text-align:center;color:#5E4306">Cash total rounds to ' + money(due, C) + '</span>' : '') +
      '<div class="keypad">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '⌫'].map(function (k) { return '<button aria-label="' + (k === '⌫' ? 'Delete' : k) + '"' + A(function () { var s = S.draft.digits; if (k === '⌫') s = s.slice(0, -1); else if (s.length < 10) s = (s + k).replace(/^0+/, ''); setDraft({ digits: s, got: null }); }) + '>' + k + '</button>'; }).join('') + '</div></div>' +
      '<div class="col gap10"><span class="bold">What was it?</span><div class="wrap">' + CATS.map(function (c) { var on = d.cat === c.id; return '<button class="pill" style="border-color:' + (on ? c.fg : '#DDD0BF') + ';background:' + (on ? c.bg : '#FFFDF9') + ';color:' + (on ? c.fg : '#4A4038') + '"' + A(function () { setDraft({ cat: c.id }); }) + '>' + c.id + '</button>'; }).join('') + '</div>' +
      '<label class="field" style="font-size:13px">Name (optional)<input placeholder="Ramen" value="' + esc(d.name) + '"' + inp('payName', function (v) { S.draft.name = v; }) + '></label></div>';
    if (isCash) {
      var avail = C.den.filter(function (x) { return (bw[x.id] || 0) > 0 || d.given[x.id]; });
      out += '<div class="col gap10"><div class="between"><span class="bold">What did you hand over?</span><span class="bolder" style="font-size:14px;color:#1F6B52">' + (givenSum ? money(givenSum, C) : '') + '</span></div>' +
        (total(bw, C) === 0 && !givenSum ? '<div class="row gap10" style="background:#FBEFD2;color:#5E4306;border-radius:16px;padding:12px 14px"><span class="grow" style="font-size:14px">There\'s no cash in your wallet yet.</span><button class="btn-soft" style="background:#5E4306;color:#fff"' + A(openAddCash) + '>Add cash</button></div>' : '') +
        '<div class="grid3">' + avail.map(function (x) {
          var have = bw[x.id] || 0, gave = d.given[x.id] || 0;
          return '<div class="rel"><button style="width:100%;border:2px solid ' + (gave ? x.edge : '#E5D9CA') + ';background:' + (gave ? x.bg : '#FFFDF9') + ';color:' + (gave ? x.fg : '#2B211C') + ';border-radius:14px;padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:62px"' + A(function () { if (gave < have) setDraft({ given: bump(S.draft.given, x.id, 1, have), got: null }); }) + '><span style="font-size:16px;font-weight:700">' + esc(x.label) + '</span><span class="xs" style="font-weight:500">' + (gave ? 'giving ' + gave + ' of ' + have : 'have ' + have) + '</span></button>' +
            (gave ? '<button aria-label="Take one back" style="position:absolute;top:-8px;left:-6px;width:28px;height:28px;border-radius:50%;border:2px solid #F1EADF;background:#2B211C;color:#fff;display:flex;align-items:center;justify-content:center"' + A(function () { setDraft({ given: bump(S.draft.given, x.id, -1), got: null }); }) + '>' + I.minus + '</button>' : '') + '</div>';
        }).join('') + '</div>';
      if (changeDue > 0) {
        out += '<div class="card col gap12"><div class="between"><span class="bold">Change you got back</span><span style="font-size:18px;font-weight:700">' + money(changeDue, C) + '</span></div><span class="small muted">We filled in the usual change. Fix it if the shop gave you something different.</span>' +
          C.den.filter(function (x) { return x.v <= changeDue || got[x.id]; }).map(function (x) {
            return '<div class="row"><span class="row grow bold" style="gap:8px"><span style="width:14px;height:14px;border-radius:' + (x.kind === 'coin' ? '50%' : '3px') + ';background:' + x.bg + ';border:1.5px solid ' + x.edge + '"></span>' + esc(x.label) + '</span><button class="step-btn sm" aria-label="One less"' + A(function () { setDraft({ got: bump(got, x.id, -1) }); }) + '>−</button><span style="width:24px;text-align:center;font-weight:700">' + (got[x.id] || 0) + '</span><button class="step-btn sm" aria-label="One more"' + A(function () { setDraft({ got: bump(got, x.id, 1) }); }) + '>+</button></div>';
          }).join('') +
          (gotSum === changeDue ? '<div class="note-box note-ok small bold">Adds up to ' + money(changeDue, C) + '. All good.</div>' : '<div class="note-box note-warn small bold">That adds up to ' + money(gotSum, C) + ', not ' + money(changeDue, C) + '. You can still save it.</div>') + '</div>';
      } else if (price > 0 && givenSum > 0 && givenSum === due) out += '<div class="note-box note-ok bold">Exact amount. No change coming back.</div>';
      out += '</div>';
    }
    return out + errBox(d.err) + '<button class="btn btn-primary"' + A(saveIt) + '>' + (editE ? 'Save changes' : 'Save expense') + '</button></div>';
  }

  function recount(T) {
    var C = CURS[T.cur], w = T.wallet, rc = S.rc, missing = {}, extra = {};
    C.den.forEach(function (x) { var dd = (rc.counts[x.id] || 0) - (w[x.id] || 0); if (dd < 0) missing[x.id] = -dd; if (dd > 0) extra[x.id] = dd; });
    var hasDiff = total(missing, C) > 0 || total(extra, C) > 0 || Object.keys(missing).length > 0 || Object.keys(extra).length > 0;
    var net = total(extra, C) - total(missing, C);
    var status = !hasDiff ? ['Matches your wallet', 'note-ok'] : (net < 0 ? [money(-net, C) + ' is missing', 'note-bad'] : (net > 0 ? [money(net, C) + ' extra', 'note-ok'] : ['Same total, different notes or coins', 'note-warn']));
    function setRc(o) { set({ rc: Object.assign({}, S.rc, o) }); }
    var back = function () { if (rc.step === 'reason') setRc({ step: 'count' }); else set({ view: rc.back || 'home', rc: clone(RC0) }); };
    var out = '<div class="scroll"><div class="row gap12">' + backBtn(back) + '<span class="kicker ellipsis">' + (rc.quick ? 'Tonight\'s check' : esc(T.name)) + '</span></div>';
    if (rc.step === 'count') {
      out += '<div class="col gap6"><h1>Recount your wallet</h1><p class="muted" style="font-size:14px;line-height:1.5">Empty your wallet and count what\'s really there. Change any number that\'s different.</p></div>' +
        '<div class="note-box ' + status[1] + '" style="font-size:15px;font-weight:600">' + status[0] + '</div>' +
        '<div class="card col" style="padding:6px 14px">' + C.den.map(function (x) {
          var was = w[x.id] || 0, now = rc.counts[x.id] || 0, dd = now - was, coin = x.kind === 'coin';
          return '<div class="row" style="padding:8px 0;border-bottom:1px solid #EDE4D8"><span style="width:' + (coin ? 24 : 32) + 'px;height:' + (coin ? 24 : 20) + 'px;border-radius:' + (coin ? '50%' : '4px') + ';background:' + x.bg + ';border:2px solid ' + x.edge + ';flex:none"></span>' +
            '<span class="col grow"><span class="bold">' + esc(x.label) + '</span><span class="xs" style="color:' + (dd < 0 ? '#7A1F1B' : (dd > 0 ? '#134733' : '#75675C')) + ';font-weight:' + (dd ? 600 : 400) + '">App says ' + was + (dd ? (dd < 0 ? ' · ' + (-dd) + ' missing' : ' · ' + dd + ' extra') : '') + '</span></span>' +
            '<button class="step-btn sm" aria-label="One less"' + A(function () { setRc({ counts: bump(S.rc.counts, x.id, -1) }); }) + '>−</button><span style="width:28px;text-align:center;font-size:17px;font-weight:700;color:' + (dd < 0 ? '#A8322C' : (dd > 0 ? '#1F6B52' : '#2B211C')) + '">' + now + '</span><button class="step-btn sm" aria-label="One more"' + A(function () { setRc({ counts: bump(S.rc.counts, x.id, 1) }); }) + '>+</button></div>';
        }).join('') + '</div>' +
        '<button class="btn btn-primary"' + A(function () { if (hasDiff) setRc({ step: 'reason', reason: null, err: '' }); else { markChecked(T); set({ view: rc.back || 'home', rc: clone(RC0) }); toast('Wallet matches. Checked for tonight'); } }) + '>' + (hasDiff ? 'Next: what happened?' : 'It matches') + '</button></div>';
      return out;
    }
    var reasons = net < 0 ? [['lost', 'Lost or dropped', 'Kept apart from spending'], ['spend', 'Forgot to log a spend', 'Saved as a spend you can edit later'], ['gift', 'Gave it away or tipped', 'Counted as spending'], ['unsure', 'Not sure', 'Just fix the wallet']] :
      (net > 0 ? [['found', 'Found money', 'Kept apart from spending'], ['cashin', 'Forgot to log cash in', 'Saved as cash in'], ['unsure', 'Not sure', 'Just fix the wallet']] :
        [['mixup', 'Got different change than I logged', 'Fix the notes and coins'], ['unsure', 'Not sure', 'Just fix the wallet']]);
    var diffText = (total(missing, C) || Object.keys(missing).length ? 'Missing ' + describe(missing, C) : '') + ((Object.keys(missing).length && Object.keys(extra).length) ? ' · ' : '') + (Object.keys(extra).length ? 'Extra ' + describe(extra, C) : '');
    out += '<div class="col gap6"><h1>' + status[0] + '</h1><p class="muted" style="font-size:14px;line-height:1.5">' + esc(diffText) + '. What happened?</p></div>' +
      reasons.map(function (o) { var sel = rc.reason === o[0]; return '<button class="option' + (sel ? ' on' : '') + '" style="min-height:64px;padding:14px"' + A(function () { setRc({ reason: o[0], err: '' }); }) + '><span class="radio' + (sel ? ' on' : '') + '"><span></span></span><span class="col gap4"><span style="font-size:16px;font-weight:600">' + o[1] + '</span><span class="small muted">' + o[2] + '</span></span></button>'; }).join('') +
      errBox(rc.err) +
      '<button class="btn btn-primary"' + A(function () {
        if (!rc.reason) { setRc({ err: 'Pick what happened.' }); return; }
        var amt = Math.abs(net), r0 = rc.reason, e = { id: Date.now(), ts: Date.now(), cat: 'Other', given: missing, got: extra };
        if (r0 === 'lost') Object.assign(e, { name: 'Lost cash', method: 'lost', amount: amt });
        else if (r0 === 'spend') Object.assign(e, { name: 'Unlogged spend', method: 'cash', amount: amt });
        else if (r0 === 'gift') Object.assign(e, { name: 'Gift or tip', method: 'cash', amount: amt });
        else if (r0 === 'cashin') Object.assign(e, { name: 'Cash in (unlogged)', method: 'topup', amount: amt });
        else if (r0 === 'found') Object.assign(e, { name: 'Found money', method: 'adjust', amount: amt });
        else if (r0 === 'mixup') Object.assign(e, { name: 'Change mix-up', method: 'adjust', amount: 0 });
        else Object.assign(e, { name: 'Wallet fix', method: 'adjust', amount: amt });
        T.wallet = clone(rc.counts); T.expenses = [e].concat(T.expenses); T.checkedDate = nightKey(); save();
        set({ view: rc.back || 'home', rc: clone(RC0) });
        toast(r0 === 'spend' ? 'Saved as a spend. Edit it in History to add details' : 'Wallet fixed and checked for tonight');
      }) + '>Save and fix my wallet</button></div>';
    return out;
  }

  function cardTop(T) {
    var C = CURS[T.cur], ct = S.ct, old = null;
    if (ct.editId) T.expenses.forEach(function (x) { if (x.id === ct.editId) old = x; });
    return '<div class="scroll"><div class="row gap12">' + backBtn(function () { set({ view: old ? 'history' : 'home', ct: clone(CT0) }); }) + '<span class="kicker ellipsis">' + esc(T.name) + '</span></div>' +
      '<div class="col gap6"><h1>' + (old ? 'Edit card top-up' : 'Top up travel card') + '</h1><p class="muted" style="font-size:14px;line-height:1.5">Loaded more money onto your travel card? Add the amount so the balance stays right. Now ' + money(T.card, C) + '.</p></div>' +
      '<label class="field">Amount in ' + C.code + '<input inputmode="decimal" placeholder="0" style="font-size:22px" value="' + esc(ct.amount) + '"' + inp('ctAmt', function (v) { S.ct.amount = v; }) + '></label>' +
      errBox(ct.err) +
      '<button class="btn btn-primary"' + A(function () {
        var amt = parseAmount(S.ct.amount, C);
        if (!amt) { set({ ct: Object.assign({}, S.ct, { err: 'Enter the amount you loaded.' }) }); return; }
        var b = old ? applyE(T.wallet, T.card, old, -1, C) : { w: T.wallet, c: T.card };
        var e = { id: old ? old.id : Date.now(), ts: old ? old.ts : Date.now(), name: 'Card top-up', cat: 'Other', method: 'cardin', amount: amt, given: {}, got: {} };
        var r = applyE(b.w, b.c, e, 1, C);
        if (!okW(r.w, r.c, C)) { set({ ct: Object.assign({}, S.ct, { err: 'Some of that card money is already spent.' }) }); return; }
        T.card = r.c; T.expenses = old ? T.expenses.map(function (x) { return x.id === old.id ? e : x; }) : [e].concat(T.expenses);
        save(); set({ view: old ? 'history' : 'home', ct: clone(CT0), open: null }); toast(old ? 'Updated' : money(amt, C) + ' added to your travel card');
      }) + '>' + (old ? 'Save changes' : 'Add to travel card') + '</button></div>';
  }

  function historyScreen(T) {
    return '<div class="scroll with-nav" style="gap:10px"><div class="between" style="align-items:center"><span style="font-size:28px;font-weight:700">History</span><button class="btn-secondary" style="border-radius:12px;padding:8px 12px;font-size:14px;font-weight:600;min-height:40px"' + A(openAddCash) + '>Add cash</button></div>' +
      '<span class="small muted" style="margin-bottom:6px">Tap an entry to see the notes and coins, or to edit it</span>' +
      (T.expenses.length ? entryRows(T, T.expenses) : '<span class="muted" style="font-size:14px">Nothing logged yet. Tap + to add your first expense.</span>') + '</div>';
  }

  function summary(T) {
    var C = CURS[T.cur], w = T.wallet, tot = 0, byM = { cash: 0, card: 0, credit: 0 }, byC = {}, lostT = 0, foundT = 0;
    T.expenses.forEach(function (e) {
      if (e.method === 'cash' || e.method === 'card' || e.method === 'credit') { tot += e.amount; byM[e.method] += e.amount; byC[e.cat] = (byC[e.cat] || 0) + e.amount; }
      if (e.method === 'lost') lostT += e.amount;
      if (e.method === 'adjust') { var n = total(e.got, C) - total(e.given, C); if (n < 0) lostT += -n; else foundT += n; }
    });
    var maxC = 1; Object.keys(byC).forEach(function (k) { if (byC[k] > maxC) maxC = byC[k]; });
    var cc = coinsOf(w, C), cash = money(total(w, C), C), card = money(T.card, C);
    var rateText = '฿' + (T.rate < 0.01 ? T.rate.toFixed(4) : T.rate) + ' per ' + C.unit;
    return '<div class="scroll with-nav"><div class="col"><span class="small muted">' + C.country + ' · ' + dateText(T.start) + ' – ' + dateText(addDays(T.start, T.days - 1)) + '</span><span style="font-size:28px;font-weight:700">Trip summary</span></div>' +
      '<div class="dark col gap6" style="border-radius:24px;padding:20px"><span style="font-size:14px;color:#C9B8A5">You spent</span><span style="font-size:38px;font-weight:700;line-height:1.05">' + money(tot, C) + '</span><span style="font-size:14px;color:#D8C9B6">About ฿' + Math.round(tot / C.minor * T.rate).toLocaleString('en-US') + ' at ' + rateText + '</span><button class="link" style="align-self:flex-start;color:#F2D27A;font-size:13px"' + A(openTripEdit) + '>Change rate</button></div>' +
      '<div class="grid3">' + [['Cash', byM.cash], ['Travel card', byM.card], ['Credit card', byM.credit]].map(function (x) { return '<div class="card col gap4" style="padding:12px;border-radius:16px"><span class="xs muted">' + x[0] + '</span><span class="bolder" style="font-size:15px">' + money(x[1], C) + '</span></div>'; }).join('') + '</div>' +
      (lostT || foundT ? '<div class="card col gap8"><span class="bold">Not counted as spending</span>' + (lostT ? '<div class="between" style="font-size:14px"><span>Lost or missing</span><span class="bolder" style="color:#7A1F1B">' + money(lostT, C) + '</span></div>' : '') + (foundT ? '<div class="between" style="font-size:14px"><span>Found</span><span class="bolder" style="color:#1F6B52">' + money(foundT, C) + '</span></div>' : '') + '</div>' : '') +
      (Object.keys(byC).length ? '<div class="card col gap12"><span class="bold">By category</span>' + CATS.filter(function (c) { return byC[c.id]; }).map(function (c) { return '<div class="col gap6"><div class="between" style="font-size:14px"><span>' + c.id + '</span><span class="bold">' + money(byC[c.id], C) + '</span></div><div class="bar-bg"><div class="bar" style="width:' + Math.round(byC[c.id] / maxC * 100) + '%;background:' + c.bar + '"></div></div></div>'; }).join('') + '</div>' : '') +
      '<div class="card col gap10"><div class="between"><span class="bold">What\'s left</span><span class="bolder">' + cash + '</span></div><div class="wrap">' + chipsHtml(w, C) + '</div><span class="small muted">Plus ' + card + ' on the travel card</span></div>' +
      (cc ? '<div class="note-box note-warn">' + cc + ' coins (' + money(coinValue(w, C), C) + ') can\'t be changed back. They\'ll wait in your stash for your next trip to ' + C.country + '.</div>' : '') +
      (S.confirmEnd ? '<div class="card col gap12" style="border:2px solid #1F6B52"><span class="bold">End this trip?</span><span class="muted" style="font-size:14px;line-height:1.5">' + cash + ' in cash and ' + card + ' on the card move to your stash. They\'ll load into your next trip to ' + C.country + '.</span><div class="row gap8"><button class="btn btn-soft grow" style="min-height:48px;font-size:15px"' + A(function () { set({ confirmEnd: false }); }) + '>Not yet</button><button class="btn btn-primary grow" style="min-height:48px;font-size:15px;padding:12px"' + A(function () {
        var prev = db.stash[T.cur] || { counts: {}, card: 0 };
        var rec = { counts: merge(prev.counts, w, 1, C), card: (prev.card || 0) + T.card };
        if (total(rec.counts, C) || rec.card) db.stash[T.cur] = rec;
        T.ended = true; db.activeId = null; save(); set({ view: 'trips', confirmEnd: false }); toast('Trip ended. Leftovers saved to your ' + C.country + ' stash');
      }) + '>End and save</button></div></div>' : '<button class="btn btn-primary"' + A(function () { set({ confirmEnd: true }); }) + '>End trip</button>') + '</div>';
  }

  function stash(T) {
    return '<div class="scroll with-nav" style="gap:14px"><div class="between" style="align-items:center"><span style="font-size:28px;font-weight:700">Stash</span><button class="btn-primary" style="border-radius:12px;padding:9px 14px;font-size:14px;font-weight:600;min-height:42px"' + A(addLeftover) + '>Add leftovers</button></div>' +
      '<span class="small muted" style="line-height:1.5">Money waiting for your next trip. When you start a trip to one of these countries, you can bring it along.</span>' + stashRowsHtml(true) + '</div>';
  }

  // ===================== overlays =====================
  function overlays() {
    var T = activeTrip(), out = '';
    var navViews = ['home', 'history', 'summary', 'stash', 'trips'];
    if (db.stage === 'app' && !S.coinSheet && !S.settings && navViews.indexOf(S.view) >= 0) {
      if (T) out += '<nav class="nav nav5" aria-label="Main">' +
        '<button class="nav-item' + (S.view === 'home' ? ' on' : '') + '"' + A(go('home')) + '>' + I.wallet + 'Wallet</button>' +
        '<button class="nav-item' + (S.view === 'history' ? ' on' : '') + '"' + A(go('history')) + '>' + I.list + 'History</button>' +
        '<div><button class="fab" aria-label="New expense"' + A(openPay) + '>' + I.plus + '</button></div>' +
        '<button class="nav-item' + (S.view === 'summary' ? ' on' : '') + '"' + A(go('summary')) + '>' + I.chart + 'Summary</button>' +
        '<button class="nav-item' + (S.view === 'stash' ? ' on' : '') + '"' + A(go('stash')) + '>' + I.box + 'Stash</button></nav>';
      else if (S.view === 'trips' || S.view === 'stash') out += '<nav class="nav nav3" aria-label="Main">' +
        '<button class="nav-item' + (S.view === 'trips' ? ' on' : '') + '"' + A(go('trips')) + '>' + I.plane + 'Trips</button>' +
        '<div><button class="fab" aria-label="New trip"' + A(newTrip) + '>' + I.plus + '</button></div>' +
        '<button class="nav-item' + (S.view === 'stash' ? ' on' : '') + '"' + A(go('stash')) + '>' + I.box + 'Stash</button></nav>';
    }
    if (S.coinSheet && T) out += coinSheet(T);
    if (S.settings) out += settingsSheet(T);
    if (S.toast) out += '<div class="toast" role="status">' + esc(S.toast) + '</div>';
    return out;
  }

  function coinSheet(T) {
    var C = CURS[T.cur], d = denOf(C, S.coinSheet), w = T.wallet;
    if (!d) return '';
    var have = w[d.id] || 0, note = d.kind === 'note', word = note ? 'note' : 'coin', qty = Math.max(1, Math.min(S.csQty || 1, have || 1));
    var one = {}; one[d.id] = 1;
    function close() { set({ coinSheet: null, csMode: 'menu', csQty: 1 }); }
    function none() { toast('You have no ' + d.label + ' ' + word + 's right now'); }
    var head = '<div class="row gap12" style="margin-bottom:4px"><span style="width:' + (note ? '64px' : '48px') + ';height:' + (note ? '36px' : '48px') + ';border-radius:' + (note ? '6px' : '50%') + ';background:' + d.bg + ';border:' + d.bw + ' solid ' + d.edge + ';color:' + d.fg + ';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex:none">' + esc(d.short) + '</span><span class="col"><span style="font-size:18px;font-weight:700">' + esc(d.label) + '</span><span class="small muted">You have ' + have + ' ' + word + (have === 1 ? '' : 's') + '</span></span></div>';
    var body;
    if (S.csMode === 'lost') {
      body = '<span class="bold">How many did you lose?</span><div class="row" style="justify-content:center;gap:18px"><button class="step-btn" style="width:52px;height:52px;border-radius:16px;font-size:24px" aria-label="One less"' + A(function () { set({ csQty: Math.max(1, qty - 1) }); }) + '>−</button><span class="col" style="align-items:center;min-width:90px"><span style="font-size:34px;font-weight:700;line-height:1">' + qty + '</span><span class="small muted">of ' + have + '</span></span><button class="step-btn" style="width:52px;height:52px;border-radius:16px;font-size:24px" aria-label="One more"' + A(function () { set({ csQty: Math.min(have, qty + 1) }); }) + '>+</button></div>' +
        '<div class="note-box note-bad" style="text-align:center">Lost ' + qty + ' × ' + esc(d.label) + ' = ' + money(qty * d.v, C) + ' · kept apart from spending</div>' +
        '<div class="row gap8"><button class="btn btn-soft grow" style="min-height:50px;font-size:15px"' + A(function () { set({ csMode: 'menu', csQty: 1 }); }) + '>Back</button><button class="btn grow" style="flex:2;background:#A8322C;color:#fff;min-height:50px;font-size:15px"' + A(function () {
          var g = {}; g[d.id] = qty;
          T.wallet = merge(w, g, -1, C); T.expenses = [{ id: Date.now(), ts: Date.now(), name: 'Lost cash', cat: 'Other', method: 'lost', amount: qty * d.v, given: g, got: {} }].concat(T.expenses); save();
          close(); toast(qty + ' × ' + d.label + ' recorded as lost');
        }) + '>Record as lost</button></div>';
    } else {
      body = [
        ['Lost', have ? 'Choose how many. Kept apart from spending' : 'You have none right now', function () { if (have) set({ csMode: 'lost', csQty: 1 }); else none(); }],
        ['Gave one away or tipped', have ? 'Counted as spending' : 'You have none right now', function () { if (!have) { none(); return; } T.wallet = merge(w, one, -1, C); T.expenses = [{ id: Date.now(), ts: Date.now(), name: 'Gift or tip', cat: 'Other', method: 'cash', amount: d.v, given: one, got: {} }].concat(T.expenses); save(); close(); toast('Saved as a gift or tip'); }],
        ['Found an extra one', 'Adds it to your wallet', function () { T.wallet = merge(w, one, 1, C); T.expenses = [{ id: Date.now(), ts: Date.now(), name: 'Found money', cat: 'Other', method: 'adjust', amount: d.v, given: {}, got: one }].concat(T.expenses); save(); close(); toast(d.label + ' added'); }],
        ['Recount the whole wallet', 'When more than one thing is off', function () { S.coinSheet = null; openRecount(false); }]
      ].map(function (a) { return '<button class="sheet-act"' + A(a[2]) + '><span style="font-size:16px;font-weight:600">' + a[0] + '</span><span class="small muted">' + a[1] + '</span></button>'; }).join('');
    }
    return '<div class="overlay"><button class="overlay-hit" aria-label="Close"' + A(close) + '></button><div class="sheet" role="dialog" aria-label="' + esc(d.label) + '"><div class="grabber"></div>' + head + body + '</div></div>';
  }

  function settingsSheet(T) {
    var on = db.remind.on;
    var pushLine = S.pushMsg ? '<div class="note-box ' + (/on for this phone|sent/i.test(S.pushMsg) ? 'note-ok' : 'note-warn') + '" style="font-size:13px">' + esc(S.pushMsg) + '</div>' : '';
    return '<div class="overlay"><button class="overlay-hit" aria-label="Close"' + A(function () { set({ settings: false, confirmReset: false }); }) + '></button><div class="sheet" role="dialog" aria-label="Settings"><div class="grabber"></div><span style="font-size:20px;font-weight:700">Settings</span>' +
      '<div class="col gap12" style="background:#F4EEE5;border-radius:18px;padding:14px">' +
      '<div class="row"><span class="col grow gap4"><span style="font-size:16px;font-weight:600">Nightly wallet check</span><span class="small muted">A notification every night of a trip</span></span><button aria-label="Nightly wallet check" aria-pressed="' + on + '"' + A(toggleReminder) + '>' + sw(on) + '</button></div>' +
      (on ? '<div class="row" style="border-top:1px solid #E5D9CA;padding-top:12px"><span class="grow">Notify me at</span><button class="step-btn sm" style="background:#FFFDF9" aria-label="15 minutes earlier"' + A(function () { db.remind.mins = (db.remind.mins + 1440 - 15) % 1440; save(); render(); }) + '>−</button><span style="font-size:20px;font-weight:700;min-width:64px;text-align:center">' + hhmm(db.remind.mins) + '</span><button class="step-btn sm" style="background:#FFFDF9" aria-label="15 minutes later"' + A(function () { db.remind.mins = (db.remind.mins + 15) % 1440; save(); render(); }) + '>+</button></div>' +
        '<span class="xs muted">Set it to when you\'re usually back at the hotel. The time follows your phone\'s time zone, so it stays right abroad. At that time the Recount button also turns into Check.</span>' +
        (db.pushOn ? '<button class="link" style="align-self:flex-start"' + A(sendTest) + '>' + (S.pushBusy ? 'Sending…' : 'Send a test notification') + '</button>' : '<button class="link" style="align-self:flex-start"' + A(function () { enablePush(); }) + '>Turn on notifications for this phone</button>') : '') +
      pushLine + '</div>' +
      (T ? '<button class="sheet-act row" style="flex-direction:row;align-items:center"' + A(openTripEdit) + '><span class="col grow gap4"><span style="font-size:16px;font-weight:600">Trip details</span><span class="small muted">Name, dates, length and exchange rate</span></span>' + I.right + '</button>' : '') +
      '<div class="col gap8" style="background:#F4EEE5;border-radius:18px;padding:14px"><span style="font-size:16px;font-weight:600">Your data</span><span class="xs muted">Everything is saved on this phone only. Keep a backup before you delete the app.</span>' +
      '<div class="row gap8"><button class="btn-soft" style="background:#FFFDF9"' + A(downloadBackup) + '>Save a backup</button><label class="btn-soft" style="background:#FFFDF9;display:inline-flex;align-items:center;cursor:pointer">Restore<input type="file" accept="application/json,.json" data-file="1" style="display:none"></label>' +
      (S.confirmReset ? '' : '<button class="btn-danger-soft" style="margin-left:auto"' + A(function () { set({ confirmReset: true }); }) + '>Erase all</button>') + '</div>' +
      (S.confirmReset ? '<div class="row gap8"><span class="grow small bold">Erase every trip and your stash?</span><button class="btn-soft" style="background:#FFFDF9"' + A(function () { set({ confirmReset: false }); }) + '>Keep</button><button class="btn-danger"' + A(function () { var keep = { deviceId: db.deviceId, pushOn: db.pushOn, remind: db.remind }; db = Object.assign(clone(DB0), keep); save(); set({ settings: false, confirmReset: false, view: 'welcome' }); }) + '>Erase</button></div>' : '') + '</div>' +
      '<button class="btn btn-primary"' + A(function () { set({ settings: false, confirmReset: false }); }) + '>Done</button>' +
      '<div class="row" style="justify-content:center;gap:8px;padding-top:4px">' + LOGO(22) + '<span class="xs muted" style="line-height:1.4">Travel Wallet · Version ' + APP_VERSION + '<br>Updated ' + APP_UPDATED + '</span></div></div></div>';
  }

  // ===================== backup =====================
  function downloadBackup() {
    var blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'travel-wallet-backup-' + today() + '.json';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function restoreBackup(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var data = JSON.parse(r.result);
        if (!data || !Array.isArray(data.trips) || typeof data.stash !== 'object') throw new Error('bad');
        var keepId = db.deviceId; db = Object.assign(clone(DB0), data, { deviceId: keepId, stage: 'app' }); save();
        set({ settings: false, view: activeTrip() ? 'home' : 'trips' }); toast('Backup restored');
      } catch (e) { toast("That file isn't a Travel Wallet backup"); }
    };
    r.readAsText(file);
  }

  // ===================== notifications =====================
  var WORKER = String((window.TW_CONFIG && window.TW_CONFIG.WORKER_URL) || '').trim().replace(/\/+$/, '');
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function standalone() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  function b64uToBytes(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); var bin = atob(s + '==='.slice((s.length + 3) % 4)); var out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  function bytesToB64u(buf) { var b = new Uint8Array(buf), s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function toggleReminder() {
    if (db.remind.on) { db.remind.on = false; save(); S.pushMsg = 'Nightly check is off.'; render(); return; }
    db.remind.on = true; save(); render(); enablePush();
  }
  function pushProblem(msg) { S.pushMsg = msg; S.pushBusy = false; render(); return false; }
  function swReady(ms) {
    return Promise.race([
      navigator.serviceWorker.register('sw.js').then(function () { return navigator.serviceWorker.ready; }),
      new Promise(function (_, rej) { setTimeout(function () { rej(new Error('sw-timeout')); }, ms || 10000); })
    ]);
  }
  function enablePush() {
    if (!WORKER) return pushProblem('The Check button works, but notifications are not connected yet. Finish step 4 of the setup guide.');
    if (isIOS() && !standalone()) return pushProblem('Open Travel Wallet from its Home Screen icon to turn on notifications.');
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return pushProblem('This browser cannot receive notifications. On iPhone you need iOS 16.4 or later.');
    S.pushMsg = 'Asking for permission…'; render();
    var step = 'permission';
    return Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') return pushProblem('Notifications are blocked. Allow them in iPhone Settings › Notifications › Wallet.');
      step = 'helper'; S.pushMsg = 'Permission granted. Starting the app helper…'; render();
      return swReady(10000).then(function (reg) {
        step = 'keys'; S.pushMsg = 'Getting the notification key from your Worker…'; render();
        return fetch(WORKER + '/api/vapid').then(function (r) { if (!r.ok) throw new Error('Worker answered ' + r.status); return r.json(); }).then(function (j) {
          step = 'subscribe'; S.pushMsg = 'Signing this phone up…'; render();
          return reg.pushManager.getSubscription().then(function (sub) {
            if (sub && sub.options && sub.options.applicationServerKey && bytesToB64u(sub.options.applicationServerKey) !== j.publicKey) return sub.unsubscribe().then(function () { return null; });
            return sub;
          }).then(function (sub) { return sub || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(j.publicKey) }); });
        }).then(function () { step = 'save'; S.pushMsg = 'Saving your reminder time…'; render(); db.pushOn = true; persist(); return syncPush(); }).then(function (ok) {
          S.pushMsg = ok ? 'Notifications are on for this phone.' : (S.pushMsg || 'Couldn\'t save the reminder on the Worker.'); render(); return ok;
        });
      });
    }).catch(function (e) {
      var m = String(e && e.message || e);
      if (step === 'helper' || m === 'sw-timeout') return pushProblem('The app helper didn\'t start. Check that sw.js and the icons folder are in your GitHub repo, then close the app fully and open it again.');
      if (step === 'keys') return pushProblem("Couldn't reach your Worker. Check WORKER_URL in config.js. (" + m + ')');
      return pushProblem('Something went wrong at the "' + step + '" step: ' + m);
    });
  }
  function pushState() {
    var T = activeTrip();
    return { id: db.deviceId, enabled: !!db.remind.on, time: hhmm(db.remind.mins), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, tripActive: !!T, tripName: T ? T.name : '', checkedDate: T ? (T.checkedDate || '') : '' };
  }
  function syncPush() {
    if (!WORKER || !db.pushOn || !('serviceWorker' in navigator)) return Promise.resolve(false);
    return swReady(8000).then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (sub) {
      if (!sub) { db.pushOn = false; persist(); return false; }
      var body = Object.assign(pushState(), { subscription: sub.toJSON() });
      return fetch(WORKER + '/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) {
        if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { S.pushMsg = 'The notification service said: ' + (j.error || r.status); return false; });
        return true;
      });
    }).catch(function () { return false; });
  }
  var syncTimer;
  function schedulePushSync() { clearTimeout(syncTimer); syncTimer = setTimeout(syncPush, 800); }
  function sendTest() {
    if (!WORKER) return pushProblem('Notifications are not connected yet. Finish step 4 of the setup guide.');
    S.pushBusy = true; render();
    syncPush().then(function () {
      return fetch(WORKER + '/api/test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: db.deviceId }) });
    }).then(function (r) { return r.json().then(function (j) { S.pushBusy = false; S.pushMsg = r.ok ? 'Test sent. It should arrive in a few seconds.' : ('Test failed: ' + (j.error || j.detail || r.status)); render(); }); })
      .catch(function (e) { pushProblem('Test failed: ' + (e && e.message || e)); });
  }

  // summary for the service worker to show in the notification
  function writeSummary() {
    if (!('caches' in window)) return;
    var T = activeTrip(), text = '';
    if (T) { var C = CURS[T.cur]; text = 'You should have ' + money(total(T.wallet, C), C) + ': ' + noteCount(T.wallet, C) + ' notes and ' + coinsOf(T.wallet, C) + ' coins.'; }
    var url = new URL('./tw-summary', location.href).href;
    caches.open('tw-meta').then(function (c) { return c.put(url, new Response(JSON.stringify({ text: text }), { headers: { 'Content-Type': 'application/json' } })); }).catch(function () { });
  }

  // ===================== start =====================
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () { });
    navigator.serviceWorker.addEventListener('message', function (e) { if (e.data && e.data.type === 'open-check' && activeTrip()) set({ view: 'check', settings: false, coinSheet: null }); });
  }
  if (/[?&]check=1/.test(location.search)) { if (activeTrip()) S.view = 'check'; history.replaceState(null, '', location.pathname); }
  if (db.stage !== 'app' && S.view !== 'welcome') S.view = 'welcome';
  render();
  writeSummary();
  syncPush();
  setInterval(function () { if (S.view === 'home') render(); }, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) { if (S.view === 'home') render(); syncPush(); } });
})();
