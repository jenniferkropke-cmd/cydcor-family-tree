
let DATA=[];
const q=document.getElementById('siteSearch');
const f=document.getElementById('typeFilter');
const out=document.getElementById('searchResults');
const count=document.getElementById('resultCount');

fetch('search-data.json').then(r=>r.json()).then(d=>{DATA=d; render();});

function render(){
  const term=(q.value||'').trim().toLowerCase();
  const type=f.value;
  const results=DATA.filter(x=>{
    const hay=[x.name,x.type,x.location,x.grade,x.keywords].join(' ').toLowerCase();
    return (!term || hay.includes(term)) && (!type || x.type===type);
  });
  count.textContent=`${results.length} result${results.length===1?'':'s'}`;
  out.innerHTML=results.map(x=>`
    <article class="result-card">
      <div class="result-top"><span class="badge identity">${escapeHtml(x.type)}</span><span class="result-grade">${escapeHtml(x.grade)}</span></div>
      <h3>${escapeHtml(x.name)}</h3>
      <p><strong>Location:</strong> ${escapeHtml(x.location)}</p>
      <p class="keywords">${escapeHtml(x.keywords)}</p>
    </article>`).join('') || '<div class="empty-state">No matching entry yet. Try a broader term.</div>';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
q.addEventListener('input',render); f.addEventListener('change',render);
