/* GoldBuilders shared "select -> floating checkout -> WhatsApp or form" module.
   Used on pages that show prices but have no built-in cart. EDIT PRICES in CONFIG below. */
(function () {
  'use strict';
  var WHATSAPP = '2348022848749';
  var NGN = function (n) { return '₦' + Math.round(n).toLocaleString('en-NG'); };
  var USD = function (n) { return '$' + n.toLocaleString('en-US'); };
  var money = function (n, c) { return c === 'USD' ? USD(n) : NGN(n); };

  var SETUP = [
    { id: 'nx-starter', label: 'Nexora Starter Infrastructure', price: 1000000, note: 'one-off setup' },
    { id: 'nx-growth', label: 'Nexora Growth & Visibility', price: 2500000, note: 'one-off setup' },
    { id: 'nx-enterprise', label: 'Nexora Enterprise Stack', price: 6000000, note: 'one-off setup' }
  ];
  // heading text -> options. price:null = quote; from:true = "starting from" (price is the lower bound).
  var CONFIG = {
    'services.html': { brand: 'GoldBuilders Co. Services', cards: {
      'Talent Recruitment & Selection': [{ id: 'hr-recruit', label: 'Talent Recruitment & Selection', price: null, priceLabel: '10% of annual gross salary', note: 'minimum ₦200,000 per successful hire' }],
      'Background Checks': [
        { id: 'hr-bg-essential', label: 'Background Check · Essential', price: 25000, note: 'per candidate', qty: true },
        { id: 'hr-bg-standard', label: 'Background Check · Standard', price: 55000, note: 'per candidate', qty: true },
        { id: 'hr-bg-comprehensive', label: 'Background Check · Comprehensive', price: 95000, note: 'per candidate', qty: true }],
      'Staff Verification': [
        { id: 'hr-sv-core', label: 'Staff Verification · Core', price: 15000, note: 'per employee', qty: true },
        { id: 'hr-sv-enhanced', label: 'Staff Verification · Enhanced', price: 35000, note: 'per employee', qty: true }],
      'One suite. Flexible engagement.': [{ id: 'hr-core-desk', label: 'HR Outsourcing · Core HR Desk', price: 350000, monthly: true, from: true, note: 'per month · up to 20 employees' }],
      'Setup packages': SETUP } },
    'index.html': { brand: 'GoldBuilders Co. Nexora', cards: { 'Three setup pathways': SETUP } },
    'ecosystem/gei-trust.html': { brand: 'GEI Trust · LeaderSHIFT Tour', cards: {
      'SHIFT Access Pass': [{ id: 'gei-access', label: 'SHIFT Access Pass', price: 20000, from: true, priceLabel: '₦20,000 – ₦25,000', note: 'entry-level pass' }],
      'SHIFT Growth Pass': [{ id: 'gei-growth', label: 'SHIFT Growth Pass', price: 50000, from: true, priceLabel: '₦50,000 – ₦75,000', note: 'transformation + network' }],
      'SHIFT Legacy Circle': [{ id: 'gei-legacy', label: 'SHIFT Legacy Circle', price: 150000, from: true, priceLabel: '₦150,000 – ₦250,000', note: 'VIP leadership & missions' }],
      'SHIFT Nation Partner': [{ id: 'gei-nation', label: 'SHIFT Nation Partner', price: 500000, from: true, priceLabel: '₦500,000 – ₦5M+', note: 'corporate & institutional partnership' }] } },
    'program-bemore-coaching.html': { brand: 'BeMore Coaching Company', cards: {
      'Career Mapping Series Coaching': [{ id: 'bm-career-usd', label: 'Career Mapping Series Coaching', price: 10, cur: 'USD', monthly: true, note: 'per month' }],
      'Business Intelligence Mastermind Coaching': [{ id: 'bm-bi-usd', label: 'Business Intelligence Mastermind Coaching', price: 10, cur: 'USD', monthly: true, note: 'per month' }] } },
    'nexora.html': { brand: 'Nexora', cards: {
      'Starter Infrastructure': [SETUP[0]], 'Growth & Visibility': [SETUP[1]], 'Enterprise Stack': [SETUP[2]],
      'Custom Implementation': [{ id: 'nx-custom', label: 'Nexora Custom Implementation', price: null, priceLabel: 'Custom quote', note: 'scoped after discovery' }] } }
  };

  var path = location.pathname.replace(/\/+$/, '');
  var key = Object.keys(CONFIG).filter(function (k) { return path === '/' + k || path.slice(-k.length - 1) === '/' + k || (k === 'index.html' && (path === '' || /\/$/.test(location.pathname))); })
    .sort(function (a, b) { return b.length - a.length; })[0];
  if (!key) return;
  var cfg = CONFIG[key];
  var items = {}, chosen = {};

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function priceText(o) { return o.priceLabel || (o.price == null ? 'Quote' : (o.from ? 'from ' : '') + money(o.price, o.cur)); }

  function init() {
    var made = 0;
    Object.keys(cfg.cards).forEach(function (title) {
      var h = Array.prototype.filter.call(document.querySelectorAll('h2,h3'), function (n) { return n.textContent.replace(/\s+/g, ' ').trim() === title; })[0];
      if (!h) return;
      var card = h.closest('.card, article, .gei-card, .bemore-pathway-card, .panel, .p-8') || h.parentElement;
      var opts = cfg.cards[title];
      var box = document.createElement('div'); box.className = 'gbs-opts';
      box.innerHTML = opts.map(function (o) {
        items[o.id] = o;
        return '<label class="gbs-opt' + (opts.length === 1 ? ' single' : '') + '"><input type="checkbox" data-gbs="' + esc(o.id) + '"><span class="gbs-tick" aria-hidden="true"></span><span class="gbs-lab">' + esc(opts.length > 1 ? o.label.replace(/^.*· /, '') : 'Select this') + '<small>' + esc(o.note || '') + '</small></span><b>' + esc(priceText(o)) + '</b></label>';
      }).join('');
      card.appendChild(box); card.classList.add('gbs-card'); card.dataset.gbsCard = '1';
      if (opts.length === 1) card.addEventListener('click', function (e) { if (e.target.closest('a,button,input,label,select,textarea')) return; var cb = box.querySelector('input'); cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', { bubbles: true })); });
      made++;
    });
    if (!made) return;
    document.addEventListener('change', function (e) {
      var cb = e.target.closest && e.target.closest('[data-gbs]'); if (!cb) return;
      var id = cb.dataset.gbs;
      if (cb.checked) chosen[id] = chosen[id] || 1; else delete chosen[id];
      cb.closest('.gbs-opt').classList.toggle('on', cb.checked);
      var card = cb.closest('.gbs-card'); card.classList.toggle('gbs-selected', !!card.querySelector('[data-gbs]:checked'));
      refresh();
    });
    buildUI();
  }

  function totals() {
    var t = { once: { NGN: 0, USD: 0 }, monthly: { NGN: 0, USD: 0 }, quotes: 0, from: false };
    Object.keys(chosen).forEach(function (id) {
      var o = items[id], q = chosen[id];
      if (o.price == null) { t.quotes += q; return; }
      var c = o.cur || 'NGN'; (o.monthly ? t.monthly : t.once)[c] += o.price * q; if (o.from) t.from = true;
    });
    return t;
  }
  function fmtTotal(bucket, from) {
    var parts = [];
    if (bucket.NGN) parts.push(NGN(bucket.NGN)); if (bucket.USD) parts.push(USD(bucket.USD));
    return parts.length ? (from ? 'from ' : '') + parts.join(' + ') : (from === 'dash' ? '—' : '₦0');
  }

  var bar, modal;
  function buildUI() {
    bar = document.createElement('div'); bar.className = 'gbs-bar'; bar.setAttribute('aria-live', 'polite');
    bar.innerHTML = '<div class="gbs-bar-in"><div class="gbs-sum"><strong data-c>0 selected</strong><span>One-off <b data-once>₦0</b></span><span>Monthly <b data-mo>₦0</b></span></div><div class="gbs-act"><button type="button" class="gbs-wa" data-wa>WhatsApp checkout</button><button type="button" class="gbs-go" data-open>Review &amp; checkout →</button></div></div>';
    document.body.appendChild(bar);
    modal = document.createElement('div'); modal.className = 'gbs-modal';
    modal.innerHTML = '<div class="gbs-box" role="dialog" aria-modal="true" aria-label="Checkout"><button type="button" class="gbs-x" aria-label="Close">×</button><h3>Your selection</h3><div data-lines></div><div class="gbs-tot" data-tot></div>' +
      '<p class="gbs-note">Prices shown are published starting rates. Final charges, scope and payment steps are confirmed in writing before you pay. No payment is taken here.</p>' +
      '<form data-form class="gbs-form"><label>Full name *<input name="full_name" required autocomplete="name" maxlength="160"></label><label>Phone / WhatsApp *<input name="phone" type="tel" required autocomplete="tel" maxlength="80"></label><label class="gbs-full">Email address *<input name="email" type="email" required autocomplete="email" maxlength="254"></label><label class="gbs-full">Organisation (optional)<input name="organization" maxlength="200"></label><label class="gbs-full">Notes<textarea name="message" rows="3" maxlength="3000" placeholder="Quantities, dates, locations or anything we should know."></textarea></label>' +
      '<div class="gbs-full gbs-btns"><button type="button" class="gbs-wa" data-wa-form>Checkout on WhatsApp</button><span class="gbs-or">or</span><button type="submit" class="gbs-sub">Submit request by form</button></div><p class="gbs-status" data-status role="status"></p></form></div>';
    document.body.appendChild(modal);
    bar.querySelector('[data-open]').addEventListener('click', openM);
    bar.querySelector('[data-wa]').addEventListener('click', function () { wa(false); });
    modal.querySelector('[data-wa-form]').addEventListener('click', function () { wa(true); });
    modal.querySelector('.gbs-x').addEventListener('click', closeM);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeM(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeM(); });
    modal.addEventListener('click', function (e) { var r = e.target.closest('[data-rm]'); if (r) uncheck(r.dataset.rm); });
    modal.addEventListener('change', function (e) { var q = e.target.closest('[data-q]'); if (q) { chosen[q.dataset.q] = Math.max(1, Math.min(500, Number(q.value) || 1)); refresh(); } });
    modal.querySelector('[data-form]').addEventListener('submit', submit);
  }
  function uncheck(id) { var cb = document.querySelector('[data-gbs="' + id + '"]'); if (cb) { cb.checked = false; cb.dispatchEvent(new Event('change', { bubbles: true })); } }
  function openM() { renderLines(); modal.classList.add('open'); document.body.classList.add('gbs-lock'); }
  function closeM() { modal.classList.remove('open'); document.body.classList.remove('gbs-lock'); }
  function count() { return Object.keys(chosen).reduce(function (n, k) { return n + chosen[k]; }, 0); }
  function renderLines() {
    var ids = Object.keys(chosen);
    modal.querySelector('[data-lines]').innerHTML = ids.length ? ids.map(function (id) {
      var o = items[id], q = chosen[id];
      return '<div class="gbs-line"><div><strong>' + esc(o.label) + '</strong><small>' + esc(o.note || '') + (o.monthly ? ' · recurring' : '') + '</small></div>' +
        (o.qty ? '<input type="number" min="1" max="500" value="' + q + '" data-q="' + esc(id) + '" aria-label="Quantity">' : '<span></span>') +
        '<b>' + esc(o.price == null ? (o.priceLabel || 'Quote') : money(o.price * q, o.cur)) + '</b><button type="button" data-rm="' + esc(id) + '" aria-label="Remove">×</button></div>';
    }).join('') : '<p class="gbs-empty">Nothing selected yet.</p>';
    var t = totals();
    modal.querySelector('[data-tot]').innerHTML = '<div><span>One-off</span><b>' + fmtTotal(t.once, t.from) + '</b></div><div><span>Monthly</span><b>' + fmtTotal(t.monthly, false) + '</b></div>' + (t.quotes ? '<div><span>Quote required</span><b>' + t.quotes + ' item(s)</b></div>' : '');
  }
  function refresh() {
    var t = totals(), n = count();
    bar.classList.toggle('visible', n > 0); document.body.classList.toggle('gbs-has-bar', n > 0);
    bar.querySelector('[data-c]').textContent = n + ' selected';
    bar.querySelector('[data-once]').textContent = fmtTotal(t.once, t.from);
    bar.querySelector('[data-mo]').textContent = fmtTotal(t.monthly, false);
    if (modal.classList.contains('open')) { if (!n) closeM(); else renderLines(); }
  }
  function lines() {
    return Object.keys(chosen).map(function (id) {
      var o = items[id], q = chosen[id];
      var p = o.price == null ? (o.priceLabel || 'quote') + (o.note ? ' (' + o.note + ')' : '') : (o.from ? 'from ' : '') + money(o.price * q, o.cur) + (o.monthly ? ' / month' : '');
      return '• ' + o.label + (q > 1 ? ' × ' + q : '') + ': ' + p;
    });
  }
  function ref() { return (window.gbReferralCode && window.gbReferralCode()) || ''; }
  function wa(useForm) {
    if (!count()) return;
    var t = totals(), fd = useForm ? new FormData(modal.querySelector('[data-form]')) : null;
    var who = fd ? [fd.get('full_name') && 'Name: ' + fd.get('full_name'), fd.get('phone') && 'Phone: ' + fd.get('phone'), fd.get('email') && 'Email: ' + fd.get('email'), fd.get('organization') && 'Organisation: ' + fd.get('organization'), fd.get('message') && 'Notes: ' + fd.get('message')].filter(Boolean) : [];
    var text = ['Hello GoldBuilders Co., I would like to order / enquire about the following (' + cfg.brand + '):', ''].concat(lines(), ['', 'Estimated one-off: ' + fmtTotal(t.once, t.from), 'Estimated monthly: ' + fmtTotal(t.monthly, false)], who.length ? [''].concat(who) : [], ref() ? ['', 'Referral code: ' + ref()] : [], ['', 'Please confirm availability, final charges and payment steps.']).join('\n');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
  }
  function submit(e) {
    e.preventDefault(); var form = e.currentTarget, status = modal.querySelector('[data-status]');
    if (!count()) { status.textContent = 'Choose at least one item first.'; return; }
    var fd = new FormData(form), btn = form.querySelector('.gbs-sub'); btn.disabled = true; status.textContent = 'Submitting your request…';
    var t = totals();
    var payload = { full_name: fd.get('full_name'), email: fd.get('email'), phone: fd.get('phone'), organization: fd.get('organization'), industry: cfg.brand, timeline: 'As soon as practical', service: cfg.brand + ' · selection checkout', enquiry_type: 'Multi-service checkout request',
      message: 'Selected:\n' + lines().join('\n') + '\n\nEstimated one-off: ' + fmtTotal(t.once, t.from) + '\nEstimated monthly: ' + fmtTotal(t.monthly, false) + '\n\nNotes: ' + (fd.get('message') || 'None'), consent: true, referral_code: ref() };
    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (d) { if (!r.ok || !d.ok) throw new Error(d.error || 'Could not submit. Please try WhatsApp checkout instead.'); }); })
      .then(function () { status.textContent = 'Request received. The team will confirm availability, final charges and payment steps. No payment has been taken.'; Object.keys(chosen).slice().forEach(uncheck); form.reset(); })
      .catch(function (err) { status.textContent = err.message; })
      .then(function () { btn.disabled = false; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
