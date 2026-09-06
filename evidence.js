
let DATA=[];
const q=document.getElementById('evidenceSearch');
const section=document.getElementById('sectionFilter');
const type=document.getElementById('typeFilter');
const out=document.getElementById('evidenceResults');
const count=document.getElementById('evidenceCount');

fetch('evidence-data.json').then(r=>r.json()).then(d=>{
  DATA=d;
  [...new Set(DATA.map(x=>x.section))].forEach(s=>{
    const o=document.createElement('option');o.value=s;o.textContent=s;section.appendChild(o);
  });
  [...new Set(DATA.flatMap(x=>x.types))].sort().forEach(s=>{
    const o=document.createElement('option');o.value=s;o.textContent=s;type.appendChild(o);
  });
  render();
});

function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
  const term=(q.value||'').trim().toLowerCase(), sf=section.value, tf=type.value;
  const results=DATA.filter(x=>{
    const hay=[x.title,x.section,x.status,x.keywords,...x.types].join(' ').toLowerCase();
    return (!term||hay.includes(term))&&(!sf||x.section===sf)&&(!tf||x.types.includes(tf));
  });
  count.textContent=`${results.length} evidence packet${results.length===1?'':'s'} shown`;
  out.innerHTML=results.map(x=>`
    <article class="result-card evidence-card">
      <div class="result-top"><span class="badge identity">${esc(x.section)}</span><span class="result-grade">${esc(x.status)}</span></div>
      <h3>${esc(x.title)}</h3>
      <p><strong>Binder pages:</strong> ${esc(x.pages)}</p>
      <p><strong>Evidence inside:</strong> ${x.types.map(t=>`<span class="evidence-pill">${esc(t)}</span>`).join(' ')}</p>
      <div class="actions compact">
        <a class="btn primary" href="Cydcor_Final_Investigation_Binder_2026-09-06.pdf#page=${x.start}" target="_blank" rel="noopener">Open evidence packet</a>
      </div>
    </article>`).join('') || '<div class="empty-state">No evidence packet matches those filters.</div>';
}
[q,section,type].forEach(el=>el.addEventListener(el===q?'input':'change',render));
