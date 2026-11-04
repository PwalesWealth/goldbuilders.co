(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const overlay = $('lc-overlay'), content = $('lc-form-content');
  let step = 1, data = {}, preferredType = '';
  const serviceLabels = {Credit:'Credit services',Travel:'Travel concierge',Logistics:'Logistics & errands'};
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  $('lc-year').textContent = new Date().getFullYear();
  function open(){
    step=1; data={};
    if(preferredType) data.member_type=preferredType;
    overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden'; render();
    const first = content.querySelector('input[name="full_name"]'); if(first) first.focus();
  }
  function close(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  function readCurrent(){
    const fields = content.querySelectorAll('[name]'); const found = {};
    fields.forEach(el=>{
      if(el.type==='checkbox' && el.name==='services') return;
      if(el.type==='checkbox') return;
      found[el.name]=el.value.trim();
    });
    const checks=[...content.querySelectorAll('input[name="services"]:checked')].map(x=>x.value);
    if(content.querySelector('input[name="services"]')) found.services=checks;
    data={...data,...found};
  }
  function field(name,label,placeholder,type='text',full=false,required=true){
    return `<div class="lc-field ${full?'full':''}"><label for="lc-${name}">${label}${required?' *':''}</label><input id="lc-${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${required?'required':''} value="${esc(data[name]||'')}"></div>`;
  }
  function select(name,label,options,full=false){
    return `<div class="lc-field ${full?'full':''}"><label for="lc-${name}">${label} *</label><select id="lc-${name}" name="${name}" required><option value="">Choose an option</option>${options.map(o=>`<option value="${esc(o[0])}" ${data[name]===o[0]?'selected':''}>${esc(o[1])}</option>`).join('')}</select></div>`;
  }
  function render(){
    $('lc-progress-bar').style.width=(step*33.333)+'%';
    $('lc-dialog-title').textContent=step===3?'Review your concierge profile':'Join LuxeStreams Concierge Club';
    $('lc-dialog-subtitle').textContent=step===1?'First, tell us how to contact you.':step===2?'Choose the support you would like to discuss.':'Check your request before submitting.';
    if(step===1){
      content.innerHTML=`<p class="lc-hint">STEP 1 OF 3 · CONTACT DETAILS</p><div class="lc-grid">${field('full_name','Full name','e.g. Ada Okafor')}${field('email','Email address','you@example.com','email')}${field('phone','Phone / WhatsApp','+234…','tel')}${field('city','City / location','e.g. Lagos','text',false,false)}<div class="lc-honeypot" aria-hidden="true"><label for="lc-website">Leave this field empty</label><input id="lc-website" name="website" tabindex="-1" autocomplete="off"></div></div><div class="lc-actions"><button class="lc-btn" type="button" data-club-action="next">CONTINUE →</button></div>`;
    }else if(step===2){
      const services=data.services||[];
      const options=[['Personal','Personal Concierge'],['Family & Lifestyle','Family & Lifestyle Concierge'],['Corporate','Corporate Concierge']];
      content.innerHTML=`<p class="lc-hint">STEP 2 OF 3 · YOUR SERVICE NEEDS</p><div class="lc-grid">${select('member_type','Membership preference',options,false)}${select('timeline','When do you need support?',[['As soon as practical','As soon as practical'],['Within 30 days','Within 30 days'],['In 1–3 months','In 1–3 months'],['Exploring for later','Exploring for later']],false)}<div class="lc-field full"><label>Which service pathways interest you? *</label><div class="lc-service-options">${[['Credit','Credit information'],['Travel','Flights & hotels'],['Logistics','Logistics & errands']].map(([v,l])=>`<label class="lc-service-option"><input type="checkbox" name="services" value="${v}" ${services.includes(v)?'checked':''}> <span>${l}</span></label>`).join('')}</div></div><div class="lc-field full"><label for="lc-details">What would you like help coordinating? (optional)</label><textarea id="lc-details" name="details" maxlength="1200" placeholder="Share a brief description. Do not include financial account details or passwords.">${esc(data.details||'')}</textarea></div></div><p class="lc-hint">Credit services are subject to eligibility and assessment. Travel and logistics services depend on availability and agreed terms.</p><div class="lc-actions"><button class="lc-back" type="button" data-club-action="back">← BACK</button><button class="lc-btn" type="button" data-club-action="next">CONTINUE →</button></div>`;
    }else{
      const services=(data.services||[]).map(x=>serviceLabels[x]||x).join(', ');
      content.innerHTML=`<p class="lc-hint">STEP 3 OF 3 · REVIEW AND CONSENT</p><div style="background:#f7fbfd;border:1px solid #e1edf2;border-radius:12px;padding:15px"><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Name</span><strong>${esc(data.full_name)}</strong></div><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Email</span><strong>${esc(data.email)}</strong></div><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Phone</span><strong>${esc(data.phone)}</strong></div><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Membership</span><strong>${esc(data.member_type)}</strong></div><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Service pathways</span><strong>${esc(services)}</strong></div><div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px solid #edf3f6"><span>Timeline</span><strong>${esc(data.timeline)}</strong></div>${data.city?`<div style="display:flex;justify-content:space-between;gap:14px;padding:8px 0"><span>Location</span><strong>${esc(data.city)}</strong></div>`:''}</div>${data.details?`<p class="lc-hint"><strong>Service note:</strong> ${esc(data.details)}</p>`:''}<label class="lc-checkrow"><input id="lc-consent" type="checkbox"> I consent to LuxeStreams using these details to respond to my membership enquiry. *</label><label class="lc-checkrow"><input id="lc-marketing" type="checkbox"> I would also like to receive optional service updates and relevant offers.</label><div class="lc-notice">Submitting this form requests contact only. It does not constitute credit approval, a confirmed booking, or a service contract. Terms and any applicable charges will be shared before commitment.</div><div id="lc-submit-error" role="alert"></div><div class="lc-actions"><button class="lc-back" type="button" data-club-action="back">← BACK</button><button class="lc-btn" type="button" data-club-action="submit">SUBMIT ENQUIRY →</button></div>`;
    }
  }
  function validateStep(){
    const fields=[...content.querySelectorAll('[required]')];
    for(const el of fields){if(!el.value.trim()){el.focus();el.reportValidity();return false;}}
    if(step===2&&!content.querySelector('input[name="services"]:checked')){alert('Please choose at least one service pathway.');return false;}
    return true;
  }
  function next(){readCurrent();if(!validateStep())return;readCurrent();step++;render();}
  function back(){readCurrent();step=Math.max(1,step-1);render();}
  async function submit(){
    const consent=$('lc-consent'),marketing=$('lc-marketing'),error=$('lc-submit-error');
    if(!consent||!consent.checked){error.innerHTML='<p class="lc-error">Please consent to the use of your details for this enquiry.</p>';return;}
    readCurrent();
    const btn=content.querySelector('[data-club-action="submit"]');if(btn){btn.disabled=true;btn.textContent='SENDING…';}
    error.innerHTML='';
    const payload={full_name:data.full_name,email:data.email,phone:data.phone,city:data.city||'',member_type:data.member_type,services:data.services||[],timeline:data.timeline,details:data.details||'',consent:true,marketing_consent:!!(marketing&&marketing.checked),website:data.website||'',referral_code:window.gbReferralCode?.()||''};
    try{
      const resp=await fetch('/api/luxestreams-club',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'same-origin'});
      let result={};try{result=await resp.json();}catch(e){}
      if(!resp.ok||!result.ok){throw new Error(result.error||'We could not submit the request right now.');}
      $('lc-progress-bar').style.width='100%';$('lc-dialog-title').textContent='Your request has been received';$('lc-dialog-subtitle').textContent='The LuxeStreams team can follow up about the next steps.';
      content.innerHTML=`<div class="lc-success"><div class="lc-icon" style="background:#e8f8ef;color:#13834a;display:grid;place-items:center;font-size:30px">✓</div><h2>Thank you, ${esc(data.full_name.split(/\s+/)[0])}.</h2><p style="color:var(--lc-muted)">Your LuxeStreams Concierge Club enquiry has been submitted. This is a request for contact, not a confirmed booking or credit decision.</p><div class="lc-notice">Please keep an eye on the contact channel you provided. If your request is urgent, contact the team directly on WhatsApp.</div><a class="lc-btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/2348022848749?text=Hello%20LuxeStreams%2C%20I%20submitted%20a%20Concierge%20Club%20enquiry">Contact LuxeStreams on WhatsApp</a><div style="margin-top:12px"><button class="lc-back" type="button" data-club-action="close">DONE</button></div></div>`;
    }catch(err){
      error.innerHTML=`<p class="lc-error">${esc(err.message||'Submission failed.')} Please try again or <a href="https://wa.me/2348022848749?text=Hello%20LuxeStreams%2C%20I%27d%20like%20to%20join%20the%20Concierge%20Club" target="_blank" rel="noopener noreferrer">message LuxeStreams on WhatsApp</a>.</p>`;
      if(btn){btn.disabled=false;btn.textContent='SUBMIT ENQUIRY →';}
    }
  }
  document.addEventListener('click', e=>{
    const target=e.target.closest('[data-club-action]');if(!target)return;
    const action=target.getAttribute('data-club-action');
    if(action==='open'){if(target.tagName==='A')e.preventDefault();preferredType=target.getAttribute('data-member-type')||'';open();}
    if(action==='close')close();
    if(action==='next')next();
    if(action==='back')back();
    if(action==='submit')submit();
  });
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();});
})();
