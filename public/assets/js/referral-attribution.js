(function(){
  'use strict';
  const KEY='gb_referral_code'; const DAYS=30;
  function valid(v){return /^[A-Z0-9]{6,18}$/.test(String(v||'').toUpperCase());}
  function setCookie(code){try{document.cookie=KEY+'='+encodeURIComponent(code)+'; Max-Age='+(DAYS*86400)+'; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');}catch(e){}}
  function readCookie(){const m=document.cookie.match(new RegExp('(?:^|; )'+KEY+'=([^;]*)'));return m?decodeURIComponent(m[1]):'';}
  const params=new URLSearchParams(location.search); const incoming=(params.get('ref')||'').toUpperCase();
  let code=''; if(valid(incoming)){code=incoming;try{localStorage.setItem(KEY,JSON.stringify({code,expires:Date.now()+DAYS*86400000}));}catch(e){}setCookie(code);}
  if(!code){const cookie=readCookie().toUpperCase();if(valid(cookie))code=cookie;}
  if(!code){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&valid(saved.code)&&saved.expires>Date.now())code=saved.code.toUpperCase();}catch(e){}}
  window.gbReferralCode=()=>code;
  document.addEventListener('DOMContentLoaded',()=>{
    if(!code)return;
    document.querySelectorAll('form').forEach(form=>{
      let input=form.querySelector('input[name="referral_code"]');
      if(!input){input=document.createElement('input');input.type='hidden';input.name='referral_code';form.appendChild(input);}input.value=code;
    });
  });
})();