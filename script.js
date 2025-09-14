/* script.js
   - smooth scroll
   - mobile nav toggle
   - skill bar animation on scroll
   - project filter
   - lightbox for project images
   - simple form submit handling (Formspree)
*/

// Smooth scroll for links with data-scroll
document.querySelectorAll('a[data-scroll]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile nav if open
    document.getElementById('navLinks')?.classList.remove('show');
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// skill bars animation when visible
const skillBars = document.querySelectorAll('.skill-bar');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const bar = entry.target;
      const val = bar.dataset.value || 70;
      bar.querySelector('span').style.width = val + '%';
      observer.unobserve(bar);
    }
  });
},{threshold:0.45});
skillBars.forEach(b => observer.observe(b));

// project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectGrid = document.getElementById('projectGrid');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      const tags = card.dataset.tags.split(',');
      if(filter === 'all' || tags.includes(filter)) card.style.display = '';
      else card.style.display = 'none';
    });
  });
});

// lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbCaption = document.getElementById('lbCaption');

document.querySelectorAll('.open-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const src = btn.dataset.src;
    lbImg.src = src;
    lbCaption.textContent = btn.closest('.proj-meta').querySelector('h3').textContent;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
  });
});
lbClose.addEventListener('click', ()=> {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden','true');
});
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) { lightbox.style.display = 'none'; lightbox.setAttribute('aria-hidden','true'); }
});

// contact form handling (ajax to Formspree)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  status.textContent = 'Sending...';
  const data = new FormData(form);
  try {
    const resp = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if(resp.ok){
      status.textContent = 'Message sent — I will reply within 24 hours.';
      form.reset();
    } else {
      status.textContent = 'Error sending message. Please try again or contact via email.';
    }
  } catch (err){
    status.textContent = 'Network error. Please try again later.';
  }
});

// current year for footer
document.getElementById('year').textContent = new Date().getFullYear();