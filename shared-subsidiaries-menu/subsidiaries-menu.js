(function(){
  const mount=document.querySelector('[data-gb-subsidiaries]');
  if(!mount)return;
  const rawBase=mount.getAttribute('data-base')||'/';
  const base=rawBase.endsWith('/')?rawBase:rawBase+'/';
  const href=path=>base+path;
  const groups=[
    {id:'goldbuilders',label:'GoldBuilders Co.',items:[['GoldBuilders Co. Overview','index.html'],['BeMore Coaching Company','subsidiaries/bemore.html'],['BeMore Coaching Program','program-bemore-coaching.html']]},
    {id:'luxestreams',label:'LuxeStreams',items:[['LuxeStreams Concierge','subsidiaries/luxestreams.html'],['LuxeStreams Concierge Club','subsidiaries/luxestreams-club.html']]},
    {id:'kohen',label:'Kohen',items:[['Kohen Overview','ecosystem/kohen.html'],['DiRent Africa','ecosystem/dirent-africa.html'],['SkeelUp Africa','ecosystem/skeelup-africa.html'],['ClinBox / OctaCare','ecosystem/clinbox.html'],['Vendare','ecosystem/vendare.html'],['Integrius','ecosystem/integrius.html'],['gEnie','ecosystem/genie.html'],['ManaJAR','ecosystem/manajar.html']]},
    {id:'yield',label:'YIELD Global Impact',items:[['YIELD Global Impact Overview','ecosystem/yield-global-impact.html'],['YIELD Global Fellowship','ecosystem/yield-global-fellowship.html'],['School of Impact','ecosystem/school-of-impact.html'],['Inspire Generation NEXT / NEXT Community','ecosystem/next-community.html'],['The Driven Life / 10X Community','ecosystem/the-driven-life.html'],['WeCare Foundation','ecosystem/wecare-foundation.html'],['Marketplace Ministry / NEXT Missions','ecosystem/next-missions.html'],['LeaderSHIFT Activation','ecosystem/yield-global-impact.html#leadershift']]}
  ];
  const makeGroup=group=>`<section class="gb-subsidiary-accordion" data-gb-family><button type="button" aria-expanded="false" aria-controls="gb-family-${group.id}" data-gb-family-toggle>${group.label}<span aria-hidden="true">▾</span></button><div class="gb-subsidiary-children" id="gb-family-${group.id}">${group.items.map(([label,path])=>`<a href="${href(path)}">${label}</a>`).join('')}</div></section>`;
  mount.innerHTML=`<div class="gb-subsidiaries"><button class="gb-subsidiaries-toggle" type="button" aria-expanded="false">Subsidiaries ▾</button><div class="gb-subsidiaries-menu" role="group" aria-label="Subsidiaries and initiatives">${groups.map(makeGroup).join('')}</div></div>`;
  const wrap=mount.firstElementChild,outer=wrap.querySelector('.gb-subsidiaries-toggle');
  const reset=()=>wrap.querySelectorAll('[data-gb-family]').forEach(group=>{group.classList.remove('open');group.querySelector('button').setAttribute('aria-expanded','false')});
  outer.addEventListener('click',()=>{const open=wrap.classList.toggle('open');outer.setAttribute('aria-expanded',String(open));if(!open)reset()});
  wrap.querySelectorAll('[data-gb-family-toggle]').forEach(button=>button.addEventListener('click',()=>{const family=button.closest('[data-gb-family]'),isOpen=family.classList.contains('open');reset();if(!isOpen){family.classList.add('open');button.setAttribute('aria-expanded','true')}}));
  document.addEventListener('click',event=>{if(!wrap.contains(event.target)){wrap.classList.remove('open');outer.setAttribute('aria-expanded','false');reset()}});
})();
