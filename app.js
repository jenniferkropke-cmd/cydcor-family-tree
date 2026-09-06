
document.querySelectorAll('.filter button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.branch-card').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.grade===f)?'block':'none';
    });
  });
});
