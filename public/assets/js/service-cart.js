(() => {
  'use strict';
  const root = document.querySelector('[data-service-cart]');
  const priceSection = document.querySelector('#luxestreams-price-guide, #bemore-pricing');
  if (!root || !priceSection) return;
  const isLuxe = document.body.dataset.page === 'subsidiary-luxestreams' || location.pathname.includes('luxestreams');
  const fmt = value => new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN', maximumFractionDigits:0}).format(value || 0);
  // EDIT HERE: LuxeStreams credit service charges (percentage of the requested / approved credit amount).
  const CREDIT_RATES = {advisory:0.01, processing:0.02, disbursement:0.01};
  const CREDIT_MINS = {advisory:5000, processing:5000, disbursement:2500};
  const items = new Map();
  const cart = new Map();

  const catalogue = isLuxe ? [
    {card:'luxestreams-errands', key:'lux-errand-standard', label:'Standard Errand & Personal Assistance', price:10000, unit:'per task'},
    {card:'luxestreams-errands', key:'lux-errand-executive', label:'Executive / Multi-stop Errand', price:18000, unit:'per task'},
    {card:'luxestreams-dispatch', key:'lux-dispatch', label:'Pickup, Delivery & Dispatch Coordination', price:3500, unit:'per dispatch; rider fare separate'},
    {card:'luxestreams-procurement', key:'lux-procurement', label:'Shopping & Procurement Coordination', price:5000, unit:'minimum fee; 10% of purchase budget', rate:.10, min:5000, basisLabel:'Enter your planned purchase budget (₦)'},
    {card:'luxestreams-home-cleaning', key:'lux-home-1bed', label:'Standard Home Cleaning — 1 Bedroom', price:25000, unit:'starting rate · per visit'},
    {card:'luxestreams-home-cleaning', key:'lux-home-2bed', label:'Standard Home Cleaning — 2 Bedroom', price:35000, unit:'starting rate · per visit'},
    {card:'luxestreams-home-cleaning', key:'lux-home-3bed', label:'Standard Home Cleaning — 3 Bedroom', price:40000, unit:'starting rate · per visit'},
    {card:'luxestreams-home-cleaning', key:'lux-home-4bed', label:'Standard Home Cleaning — 4 Bedroom', price:45000, unit:'starting rate · per visit'},
    {card:'luxestreams-home-cleaning', key:'lux-home-duplex', label:'Standard Home Cleaning — Duplex', price:55000, unit:'starting rate · per visit'},
    {card:'luxestreams-deep-cleaning', key:'lux-deep-1bed', label:'Deep Cleaning — 1 Bedroom', price:30000, unit:'starting rate · per visit'},
    {card:'luxestreams-deep-cleaning', key:'lux-deep-2bed', label:'Deep Cleaning — 2 Bedroom', price:45000, unit:'starting rate · per visit'},
    {card:'luxestreams-deep-cleaning', key:'lux-deep-3bed', label:'Deep Cleaning — 3 Bedroom', price:55000, unit:'starting rate · per visit'},
    {card:'luxestreams-deep-cleaning', key:'lux-deep-duplex', label:'Deep Cleaning — Duplex', price:80000, unit:'starting rate · per visit'},
    {card:'luxestreams-office-logistics', key:'lux-office-logistics', label:'Office Cleaning & Recurring Logistics', price:85000, unit:'from · per service day'},
    {card:'luxestreams-flight-assistance', key:'lux-flight-domestic', label:'Domestic Flight Booking Assistance', price:5000, unit:'per ticket'},
    {card:'luxestreams-flight-assistance', key:'lux-flight-international', label:'International Flight Booking Assistance', price:10000, unit:'per ticket'},
    {card:'luxestreams-hotels-travel', key:'lux-hotel-coordination', label:'Hotel Booking Coordination', price:10000, unit:'minimum fee; 5% of booking value', rate:.05, min:10000, basisLabel:'Enter estimated hotel booking value (₦)'},
    {card:'luxestreams-hotels-travel', key:'lux-itinerary-domestic', label:'Domestic Itinerary Design', price:25000, unit:'per itinerary'},
    {card:'luxestreams-hotels-travel', key:'lux-itinerary-international', label:'International / Multi-city Itinerary Design', price:50000, unit:'per itinerary'},
    {card:'luxestreams-visa-airport', key:'lux-visa-admin', label:'Visa Administration Support', price:40000, unit:'from · per application'},
    {card:'luxestreams-visa-airport', key:'lux-airport-transfer', label:'Airport Transfer Coordination', price:5000, unit:'minimum coordination fee; 10% of provider fare', rate:.10, min:5000, basisLabel:'Enter provider transfer fare (₦)'},
    {card:'luxestreams-personal-concierge', key:'lux-personal-retainer', label:'Personal Concierge Retainer', price:75000, unit:'per month', recurring:true},
    {card:'luxestreams-corporate-concierge', key:'lux-corporate-retainer', label:'Corporate Concierge Retainer', price:250000, unit:'per month', recurring:true},
    {card:'luxestreams-credit-pricing', key:'lux-credit-consult', label:'Credit Consultation & Financing Pathway Discussion', price:0, unit:'initial enquiry · no charge'},
    {card:'luxestreams-credit-pricing', key:'lux-credit-advisory', label:'Credit Consultation & Application Preparation Fee', rate:CREDIT_RATES.advisory, min:CREDIT_MINS.advisory, unit:`${CREDIT_RATES.advisory*100}% of requested credit amount; ${fmt(CREDIT_MINS.advisory)} minimum`, basisLabel:'Enter requested loan / credit amount (₦)'},
    {card:'luxestreams-credit-pricing', key:'lux-credit-processing', label:'Credit Processing / Management Fee', rate:CREDIT_RATES.processing, min:CREDIT_MINS.processing, unit:`${CREDIT_RATES.processing*100}% of approved credit amount; ${fmt(CREDIT_MINS.processing)} minimum`, basisLabel:'Enter requested loan / credit amount (₦)'},
    {card:'luxestreams-credit-pricing', key:'lux-credit-disbursement', label:'Credit Disbursement Coordination Fee', rate:CREDIT_RATES.disbursement, min:CREDIT_MINS.disbursement, unit:`${CREDIT_RATES.disbursement*100}% of amount disbursed; ${fmt(CREDIT_MINS.disbursement)} minimum`, basisLabel:'Enter requested loan / credit amount (₦)'}
  ] : [
    {card:'bemore-personal-coaching', key:'bm-personal-session', label:'Personal & Career Coaching', price:50000, unit:'per 60-minute session'},
    {card:'bemore-personal-coaching', key:'bm-personal-package', label:'Personal & Career Coaching — Four-session Package', price:180000, unit:'per package'},
    {card:'bemore-executive-coaching', key:'bm-executive-session', label:'Executive & Leadership Coaching', price:100000, unit:'per 75-minute session'},
    {card:'bemore-executive-coaching', key:'bm-executive-package', label:'Executive & Leadership Coaching — Four-session Package', price:360000, unit:'per package'},
    {card:'bemore-career-mapping', key:'bm-career-mapping', label:'Career Mapping Series', price:15000, unit:'per month', recurring:true},
    {card:'bemore-bi-mastermind', key:'bm-bi-mastermind', label:'Business Intelligence Mastermind', price:15000, unit:'per month', recurring:true},
    {card:'bemore-career-cohort', key:'bm-career-cohort', label:'Career / Skills Group Cohort', price:75000, unit:'from · per participant / cohort'},
    {card:'bemore-aris-10x', key:'bm-aris-group', label:'THE ARIS 10X FRAMEWORK — Group Journey', price:350000, unit:'from · per participant / 12 months'},
    {card:'bemore-aris-10x', key:'bm-aris-private', label:'THE ARIS 10X FRAMEWORK — Private / Executive Track', price:900000, unit:'from · per engagement'},
    {card:'bemore-corporate-workshops', key:'bm-workshop-half', label:'Corporate Workshop — Half Day', price:750000, unit:'from · per session'},
    {card:'bemore-corporate-workshops', key:'bm-workshop-full', label:'Corporate Workshop — Full Day', price:1250000, unit:'from · per session'},
    {card:'bemore-corporate-retreats', key:'bm-corporate-retreat', label:'Corporate Retreat Facilitation', price:1500000, unit:'from · per facilitation day'},
    {card:'bemore-workforce-performance', key:'bm-workforce-performance', label:'Team & Workforce Performance Programme', price:1000000, unit:'from · per programme'}
  ];

  const SHORT = {
    'lux-errand-standard':'Standard errand','lux-errand-executive':'Executive multi-stop','lux-home-1bed':'1 bedroom','lux-home-2bed':'2 bedroom','lux-home-3bed':'3 bedroom','lux-home-4bed':'4 bedroom','lux-home-duplex':'Duplex',
    'lux-deep-1bed':'1 bedroom','lux-deep-2bed':'2 bedroom','lux-deep-3bed':'3 bedroom','lux-deep-duplex':'Duplex','lux-flight-domestic':'Domestic','lux-flight-international':'International',
    'lux-hotel-coordination':'Hotel booking','lux-itinerary-domestic':'Domestic itinerary','lux-itinerary-international':'International itinerary','lux-visa-admin':'Visa support','lux-airport-transfer':'Airport transfer',
    'lux-credit-consult':'Free consultation','lux-credit-advisory':'Consultation fee','lux-credit-processing':'Processing fee','lux-credit-disbursement':'Disbursement fee',
    'bm-personal-session':'Single session','bm-personal-package':'4-session package','bm-executive-session':'Single session','bm-executive-package':'4-session package',
    'bm-aris-group':'Group journey','bm-aris-private':'Private / Executive','bm-workshop-half':'Half day','bm-workshop-full':'Full day'
  };
  catalogue.forEach(item => items.set(item.key, item));
  const priceHint = i => i.quote ? 'Quote' : i.rate ? `${Math.round(i.rate*1000)/10}%` : i.price === 0 ? 'Free' : fmt(i.price) + (i.recurring ? '/mo' : '');
  const esc = v => String(v).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const byCard = {};
  catalogue.forEach(i => (byCard[i.card] = byCard[i.card] || []).push(i));
  Object.entries(byCard).forEach(([cardId, list]) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.add('gb-selectable');
    const wrap = document.createElement('div');
    wrap.className = 'gb-card-actions gb-opts';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Select an option');
    wrap.innerHTML = list.map(i => `<label class="gb-opt"><input type="checkbox" data-opt="${esc(i.key)}"><span class="gb-opt-box"><span class="gb-opt-main"><span class="gb-opt-name">${esc(list.length > 1 ? (SHORT[i.key] || i.label) : 'Select this service')}</span><span class="gb-opt-price">${esc(priceHint(i))}</span></span><span class="gb-opt-state" data-state>＋ Select</span></span></label>`).join('');
    card.appendChild(wrap);
    if (list.length === 1) card.addEventListener('click', e => {
      if (e.target.closest('a,button,input,label,select,textarea')) return;
      const cb = wrap.querySelector('input'); cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', {bubbles:true}));
    });
  });
  function syncSelections() {
    document.querySelectorAll('[data-opt]').forEach(cb => {
      const on = cart.has(cb.dataset.opt);
      cb.checked = on;
      const st = cb.parentElement.querySelector('[data-state]'); if (st) st.textContent = on ? '✓ Selected' : '＋ Select';
    });
    document.querySelectorAll('.gb-selectable').forEach(card => card.classList.toggle('is-selected', !!card.querySelector('[data-opt]:checked')));
  }

  root.innerHTML = `
    <h3>Your service basket</h3>
    <p class="gb-cart-intro">Select as many services as you need, review the estimate and submit one combined order request. The team will confirm availability, any variable charges and your secure payment instructions.</p>
    <div data-cart-lines><div class="gb-cart-empty">Your basket is empty. Choose a service above to begin.</div></div>
    <div class="gb-cart-totals"><div>One-off estimate: <span data-once-total>₦0</span></div><div>Monthly estimate: <span data-monthly-total>₦0</span></div></div>
    <p class="gb-cart-quote-note">Estimates use published starting rates. Third-party, route-based, lender, percentage-based and scope-dependent charges are confirmed before you commit. No payment is taken by this form.</p>
    <form class="gb-cart-form" data-cart-form>
      <div class="gb-cart-fields">
        <label>Full name *<input name="full_name" required autocomplete="name" maxlength="160"></label>
        <label>Email address *<input name="email" type="email" required autocomplete="email" maxlength="254"></label>
        <label>Phone / WhatsApp *<input name="phone" type="tel" required autocomplete="tel" maxlength="80"></label>
        <label>${isLuxe ? 'Service location / city' : 'Individual, team or organisation'}<input name="organization" maxlength="200" placeholder="${isLuxe ? 'e.g. Lekki, Lagos' : 'Optional'}"></label>
        <label class="full">Preferred start date / timeline<select name="timeline"><option>As soon as practical</option><option>Within 7 days</option><option>Within 30 days</option><option>Within 1–3 months</option><option>Flexible / to discuss</option></select></label>
        <label class="full">Order notes / special requirements<textarea name="message" rows="3" maxlength="3500" placeholder="Add service details, quantities, locations, preferred dates or participant numbers."></textarea></label>
        <label class="full"><span><input type="checkbox" name="consent" required> I agree that the relevant team may use these details to respond to this order request. *</span></label>
        <div class="full"><button class="gb-cart-submit" type="submit">Submit checkout request</button><p class="gb-cart-status" data-cart-status role="status" aria-live="polite"></p></div>
      </div>
    </form>`;

  function totals() {
    let once = 0, monthly = 0, quoteCount = 0, variableCount = 0;
    for (const line of cart.values()) {
      const q = line.qty || 1;
      if (line.quote) { quoteCount += q; continue; }
      if (line.rate) {
        const fee = line.basis > 0 ? Math.max(line.basis * line.rate, line.min) : line.min;
        variableCount += (!line.basis ? q : 0);
        if (line.recurring) monthly += fee*q; else once += fee*q;
      } else {
        const amount = line.price*q;
        if (line.recurring) monthly += amount; else once += amount;
      }
    }
    root.querySelector('[data-once-total]').textContent = fmt(once);
    root.querySelector('[data-monthly-total]').textContent = fmt(monthly);
    const note=root.querySelector('.gb-cart-quote-note');
    syncSelections();
    updateBar(once, monthly);
    note.textContent = `${quoteCount ? `${quoteCount} item(s) require a lender or custom quote. ` : ''}${variableCount ? `${variableCount} percentage-based item(s) currently show their minimum service fee; enter the transaction value for a better estimate. ` : ''}Starting rates and estimates are confirmed before you commit. Third-party, route-based, lender and scope-dependent charges may be additional. No payment is taken by this form.`;
  }
  function render() {
    const lines=root.querySelector('[data-cart-lines]');
    if (!cart.size) { lines.innerHTML='<div class="gb-cart-empty">Your basket is empty. Choose a service above to begin.</div>'; totals(); return; }
    lines.innerHTML=[...cart.values()].map(line=>{
      const q=line.qty||1;
      let priceText=line.quote?'Quote required':line.rate?(line.basis>0?fmt(Math.max(line.basis*line.rate,line.min)*q):`from ${fmt(line.min*q)}`):fmt(line.price*q);
      return `<div class="gb-cart-line" data-cart-row="${line.key}"><div><strong>${line.label}</strong><small>${line.unit}${line.recurring?' · recurring':''}</small>${line.quote?'<small>Charges are set out by the lender in its written offer.</small>':''}</div><label>Qty<input type="number" min="1" max="20" value="${q}" data-qty="${line.key}"></label><div class="gb-cart-unit-price">${priceText}</div><button type="button" class="gb-cart-remove" data-remove="${line.key}">Remove</button>${line.rate?`<label class="gb-cart-percent">${line.basisLabel}<input type="number" min="0" step="1000" value="${line.basis||''}" placeholder="Enter amount" data-basis="${line.key}"></label>`:''}</div>`;
    }).join('');
    totals();
  }
  // Selecting: tick an option (or click a single-option card) on any price card.
  document.addEventListener('change',event=>{
    const cb=event.target.closest('[data-opt]');if(!cb)return;
    const key=cb.dataset.opt;
    if(cb.checked){const item=items.get(key);const cur=cart.get(key);cart.set(key,{...item,...(cur||{}),qty:cur?.qty||1,basis:cur?.basis||0});}else cart.delete(key);
    render();
  });
  root.addEventListener('click',event=>{
    const remove=event.target.closest('[data-remove]');if(remove){cart.delete(remove.dataset.remove);render();}
  });
  root.addEventListener('change',event=>{
    const q=event.target.closest('[data-qty]');if(q){const line=cart.get(q.dataset.qty);if(line){line.qty=Math.max(1,Math.min(20,Number(q.value)||1));render();}return;}
    const basis=event.target.closest('[data-basis]');if(basis){const line=cart.get(basis.dataset.basis);if(line){line.basis=Math.max(0,Number(basis.value)||0);render();}}
  });
  root.querySelector('[data-cart-form]').addEventListener('submit',async event=>{
    event.preventDefault();
    if(!cart.size){root.querySelector('[data-cart-status]').textContent='Choose at least one service before submitting.';return;}
    const form=event.currentTarget;if(!form.reportValidity())return;
    const btn=form.querySelector('button[type="submit"]');const status=root.querySelector('[data-cart-status]');btn.disabled=true;status.textContent='Submitting your request…';
    const summary=[...cart.values()].map(line=>{
      const q=line.qty||1;
      if(line.quote)return `• ${line.label} × ${q}: quote required from lending partner.`;
      if(line.rate){const fee=line.basis>0?Math.max(line.basis*line.rate,line.min):line.min;return `• ${line.label} × ${q}: estimated coordination fee ${fmt(fee*q)}${line.basis>0?` based on ${fmt(line.basis)} value`:' (minimum; underlying value not supplied)'}.`}
      return `• ${line.label} × ${q}: ${fmt(line.price*q)}${line.recurring?' monthly':''}.`;
    }).join('\n');
    const recurring=[...cart.values()].filter(x=>x.recurring).map(x=>x.label).join(', ');
    const formData=new FormData(form);
    const message=[`Selected services:\n${summary}`,recurring?`Recurring services: ${recurring}.`:'',`Customer notes: ${formData.get('message')||'Not supplied'}`].filter(Boolean).join('\n\n');
    const payload={full_name:formData.get('full_name'),email:formData.get('email'),phone:formData.get('phone'),organization:formData.get('organization'),industry:isLuxe?'LuxeStreams Concierge':'BeMore Coaching Company',timeline:formData.get('timeline'),service:isLuxe?'LuxeStreams Multi-Service Checkout':'BeMore Multi-Service Checkout',enquiry_type:'Multi-service checkout request',message,consent:formData.get('consent')==='on',referral_code:window.gbReferralCode?window.gbReferralCode():''};
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json();if(!response.ok||!data.ok)throw new Error(data.error||'We could not submit your order request. Please try again or contact us.');
      status.textContent='Your checkout request has been received. The team will confirm availability, final charges and secure payment instructions. No payment has been taken.';
      cart.clear();form.reset();render();
    }catch(error){status.textContent=error.message;}finally{btn.disabled=false;}
  });
  // Bottom selection bar + checkout dialog (same pattern as the Nexora solutions page).
  const bar = document.createElement('div');
  bar.className = 'gb-selection-bar'; bar.setAttribute('aria-live', 'polite');
  bar.innerHTML = '<div class="gb-sel-inner"><div class="gb-sel-summary"><span class="gb-sel-count" data-sel-count>0 selected</span><div><span class="gb-sel-label">One-off</span><span class="gb-sel-num" data-sel-once>₦0</span></div><div><span class="gb-sel-label">Monthly</span><span class="gb-sel-num" data-sel-monthly>₦0</span></div></div><button type="button" class="gb-sel-go" data-bar-go>Proceed to checkout →</button></div>';
  document.body.appendChild(bar);
  const modal = document.createElement('div');
  modal.className = 'gb-modal';
  modal.innerHTML = '<div class="gb-modal-box" role="dialog" aria-modal="true" aria-label="Checkout request"><button type="button" class="gb-modal-close" aria-label="Close checkout">×</button><div data-modal-slot></div></div>';
  document.body.appendChild(modal);
  modal.querySelector('[data-modal-slot]').appendChild(root);
  const openModal = () => { modal.classList.add('open'); document.body.classList.add('gb-modal-open'); };
  const closeModal = () => { modal.classList.remove('open'); document.body.classList.remove('gb-modal-open'); };
  bar.querySelector('[data-bar-go]').addEventListener('click', openModal);
  modal.querySelector('.gb-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  function updateBar(once, monthly) {
    const count = [...cart.values()].reduce((n, l) => n + (l.qty || 1), 0);
    bar.classList.toggle('visible', count > 0);
    bar.querySelector('[data-sel-count]').textContent = `${count} selected`;
    bar.querySelector('[data-sel-once]').textContent = fmt(once);
    bar.querySelector('[data-sel-monthly]').textContent = fmt(monthly) + '/mo';
    if (!count) closeModal();
  }

  // LuxeStreams credit card: loan-amount calculator that adds the percentage-based fee lines in one click.
  const creditCard = isLuxe && document.getElementById('luxestreams-credit-pricing');
  if (creditCard) {
    const calc = document.createElement('div');
    calc.className = 'gb-credit-calc';
    calc.innerHTML = `<label>Credit amount you want to request (₦)<input type="number" min="0" step="10000" inputmode="numeric" placeholder="e.g. 500000" data-credit-amount></label>
      <div class="gb-credit-breakdown" data-credit-breakdown aria-live="polite">Enter an amount to see the estimated fees.</div>
      <button type="button" class="gb-add-service" data-credit-add>+ Add all credit fees to basket</button>`;
    const actions = creditCard.querySelector('.gb-card-actions');
    creditCard.insertBefore(calc, actions);
    const keys = [['lux-credit-advisory','Consultation'],['lux-credit-processing','Processing'],['lux-credit-disbursement','Disbursement']];
    const feeFor = (key, amount) => { const it = items.get(key); return Math.max(amount * it.rate, it.min); };
    const input = calc.querySelector('[data-credit-amount]');
    input.addEventListener('input', () => {
      const amount = Math.max(0, Number(input.value) || 0);
      const out = calc.querySelector('[data-credit-breakdown]');
      if (!amount) { out.textContent = 'Enter an amount to see the estimated fees.'; return; }
      const rows = keys.map(([k, name]) => `<div><span>${name} (${items.get(k).rate*100}%)</span><strong>${fmt(feeFor(k, amount))}</strong></div>`);
      const total = keys.reduce((n, [k]) => n + feeFor(k, amount), 0);
      out.innerHTML = rows.join('') + `<div class="gb-credit-total"><span>Estimated LuxeStreams fees</span><strong>${fmt(total)}</strong></div>`;
    });
    calc.querySelector('[data-credit-add]').addEventListener('click', () => {
      const amount = Math.max(0, Number(input.value) || 0);
      if (!amount) { input.focus(); return; }
      keys.forEach(([k]) => cart.set(k, {...items.get(k), qty: 1, basis: amount}));
      render();
    });
  }

  render();
})();
