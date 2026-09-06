let DATA=[];
const q=document.getElementById('siteSearch');
const f=document.getElementById('typeFilter');
const out=document.getElementById('searchResults');
const count=document.getElementById('resultCount');
fetch('search-data.json').then(r=>r.json()).then(d=>{DATA=d; render();});
function render(){
 const term=(q.value||'').trim().toLowerCase(); const type=f.value;
 const results=DATA.filter(x=>{const hay=Object.values(x).join(' ').toLowerCase(); return (!term||hay.includes(term))&&(!type||x.recordType===type);});
 count.textContent=`${results.length} result${results.length===1?'':'s'} across ${DATA.length} indexed research records`;
 out.innerHTML=results.map(x=>`<article class="result-card"><div class="result-top"><span class="badge identity">${esc(x.recordType)}</span><span class="result-grade">${esc(x.grade||'')}</span></div><h3>${esc(x.name)}</h3><p><strong>Category:</strong> ${esc(x.category||'')}</p>${x.person?`<p><strong>Person:</strong> ${esc(x.person)}</p>`:''}${x.location?`<p><strong>Location:</strong> ${esc(x.location)}</p>`:''}${x.parent?`<p><strong>Parent / prior:</strong> ${esc(x.parent)}</p>`:''}<p class="keywords">${esc(x.status||'')}</p></article>`).join('') || '<div class="empty-state">No matching record yet. Try a broader term.</div>';
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
q.addEventListener('input',render); f.addEventListener('change',render);