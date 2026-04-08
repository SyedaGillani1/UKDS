// ============================================================
//  UK DEFENCE SERVICES — script.js
//
//  TABLE OF CONTENTS:
//  1.  Mobile Nav Toggle
//  2.  Hero Carousel (auto-advance + dot navigation)
//  3.  Gallery Tabs + Modal
//  4.  FAQ Accordion
//  5.  Scroll Reveal (IntersectionObserver)
//  6.  Custom Cursor (instant dot, smooth ring via RAF lerp)
//  7.  AI Chat Widget (knowledge-base powered)
//  8.  Services Video Player
//  9.  FAQ Tab Switcher (openTab function)
//  10. Review / Testimonial Carousel
//  11. Avatar Colour Assignment (Google-style)
//  12. Apply Modal (Vacancies page)
//  13. Services Page Tabs
//  14. Gallery Page
// ============================================================


// ── 1. MOBILE NAV TOGGLE ──────────────────────────────────
// MOBILE MENU SYSTEM (FINAL)
// =========================

// Get elements
const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
const mobileNav  = document.getElementById('mobileNav')  || document.querySelector('.mobile-nav');

// Toggle menu
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent outside click conflict
    mobileNav.classList.toggle('active');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    mobileNav &&
    menuToggle &&
    mobileNav.classList.contains('active') &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileNav.classList.remove('active');
  }
});

// Reset menu on resize (fix desktop issue)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNav) {
    mobileNav.classList.remove('active');
  }
});


// ── 2. HERO CAROUSEL (SAFE VERSION) ─────────────────────
(function () {

  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dots button');

  if (!slides.length || !dots.length) return; // ✅ CRITICAL FIX

  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      if (s) s.classList.toggle('active', i === idx);
    });

    dots.forEach((d, i) => {
      if (d) d.classList.toggle('active', i === idx);
    });

    current = idx;
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 6000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slide));
      startTimer();
    });
  });

  startTimer();

})();


// ── 3. GALLERY TABS + MODAL ──────────────────────────────
// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const target = this.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.gallery-grid').forEach(grid => grid.classList.remove('active'));
    const el = document.getElementById(target);
    if (el) el.classList.add('active');
  });
});

// Gallery lightbox modal
const galleryModal  = document.getElementById('galleryModal');
const modalContent  = galleryModal ? galleryModal.querySelector('.modal-content') : null;

if (galleryModal && modalContent) {
  // Open on card click
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', function () {
      galleryModal.classList.add('active');
      modalContent.innerHTML = '';
      if (this.classList.contains('video-card')) {
        const src = this.querySelector('video').getAttribute('src');
        modalContent.innerHTML = `<video src="${src}" controls autoplay></video>`;
      } else {
        const src = this.querySelector('img').getAttribute('src');
        modalContent.innerHTML = `<img src="${src}">`;
      }
    });
  });

  // Close button
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      galleryModal.classList.remove('active');
      modalContent.innerHTML = '';
    });
  }

  // Close on background click
  galleryModal.addEventListener('click', e => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
      modalContent.innerHTML = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      galleryModal.classList.remove('active');
      modalContent.innerHTML = '';
    }
  });
}


// ── 4. FAQ ACCORDION ─────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;

    // Close all other open items
    document.querySelectorAll('.faq-answer').forEach(a => {
      if (a !== answer) a.style.maxHeight = null;
    });
    document.querySelectorAll('.faq-question').forEach(q => {
      if (q !== btn) q.classList.remove('active');
    });

    // Toggle current item
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      btn.classList.remove('active');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.classList.add('active');
    }
  });
});
function openTab(tabId, el) {
  // hide all panels
  document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('active'));
  // deactivate all tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  // show selected panel and activate tab
  document.getElementById(tabId).classList.add('active');
  el.classList.add('active');
  // close all open accordions when switching tabs
  document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
  document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
}


// ── 5. SCROLL REVEAL (IntersectionObserver) ───────────────
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.classList.add('active');
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-up').forEach(el => observer.observe(el));
})();


// ── 6. CUSTOM CURSOR ─────────────────────────────────────
(function () {
  if (window.innerWidth <= 820) return; // Skip on touch devices

  const ring = document.querySelector('.cursor-ring');
  const dot  = document.querySelector('.cursor-dot');
  if (!ring || !dot) return;

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;

  // 0.22 = snappy but smooth. Range: 0.12 (dreamy) → 0.35 (near-instant)
  const RING_LERP = 0.22;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function tick() {
    ringX += (mouseX - ringX) * RING_LERP;
    ringY += (mouseY - ringY) * RING_LERP;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    dot.style.left  = ringX + 'px';
    dot.style.top   = ringY + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Cursor state changes based on hovered element
  function setCursorState(el) {
    ring.classList.remove('on-link', 'on-btn', 'on-input', 'on-img');
    if (!el) return;
    const tag = el.tagName;
    if      (tag === 'A' || el.closest('a'))                                       ring.classList.add('on-link');
    else if (tag === 'BUTTON' || el.classList.contains('btn') || el.closest('.btn')) ring.classList.add('on-btn');
    else if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')             ring.classList.add('on-input');
    else if (tag === 'IMG' || el.classList.contains('feature-tile') || el.classList.contains('gallery-block')) ring.classList.add('on-img');
  }

  document.addEventListener('mouseover', e => setCursorState(e.target), { passive: true });
  document.addEventListener('mouseout',  ()  => ring.classList.remove('on-link', 'on-btn', 'on-input', 'on-img'), { passive: true });
  document.addEventListener('mouseleave', () => { ring.style.opacity = '0'; dot.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { ring.style.opacity = '1'; dot.style.opacity = '1'; });
})();




// ── 7. AI CHAT WIDGET ────────────────────────────────────────
(function () {
  const widget    = document.getElementById('chatWidget');
  const toggle    = document.getElementById('chatToggle');
  const toggleTxt = document.getElementById('chatToggleText');
  const body      = document.getElementById('chatBody');
  const messages  = document.getElementById('chatMessages');
  const input     = document.getElementById('chatInput');
  const sendBtn   = document.getElementById('chatSend');
  const quickBtns = document.getElementById('quickBtns');
  if (!widget || !toggle || !messages || !input || !sendBtn) return;

  // Knowledge base — keyword scored Q&A
  const kb = [
    { keys: ['security','guard','manned','patrol','cctv','door','key hold','event security','sia'],
      answer: '🛡 <strong>Security Services</strong><br>We provide:<br>• Manned guarding & site officers<br>• Mobile patrol & key holding<br>• CCTV monitoring & support<br>• Door supervision (SIA licensed)<br>• Event security & crowd management<br><br><a href="security.html" style="color:#d4a843">→ Full security details</a>' },
    { keys: ['cleaning','clean','deep clean','office clean','commercial clean','janitorial','hygiene'],
      answer: '🧹 <strong>Cleaning Services</strong><br>We provide:<br>• Commercial & office cleaning<br>• Deep cleaning services<br>• Event & venue cleaning<br>• Flexible schedules (daily/weekly)<br><br><a href="cleaning.html" style="color:#d4a843">→ Cleaning details</a>' },
    { keys: ['it','web','website','development','digital','marketing','ai','software','technology','seo','saas'],
      answer: '💻 <strong>IT & Digital Services</strong><br>Our IT division delivers:<br>• Custom web development<br>• AI-powered digital marketing<br>• SEO, PPC & social media strategy<br>• SaaS & business software solutions<br><br><a href="it-services.html" style="color:#d4a843">→ IT services details</a>' },
    { keys: ['construction','plumbing','painting','electrical','building','labour','site support','renovation'],
      answer: '🏗 <strong>Construction Services</strong><br>Our skilled trades team covers:<br>• Labour supply & site support<br>• Plumbing — installations & maintenance<br>• Electrical — wiring & inspections<br>• Painting & decorating<br><br><a href="construction.html" style="color:#d4a843">→ Construction details</a>' },
    { keys: ['hospitality','waitress','waiter','catering','staffing','event staff','hotel','front of house'],
      answer: '🍽 <strong>Hospitality Staffing</strong><br>We provide trained staff:<br>• Waitressing & front-of-house<br>• Event catering support<br>• Hotel & venue cleaning teams<br>• Flexible contract & ad-hoc staffing<br><br><a href="hospitality.html" style="color:#d4a843">→ Hospitality details</a>' },
    { keys: ['quote','price','cost','pricing','rate','charge','how much','fee'],
      answer: '💰 <strong>Get a Free Quote</strong><br>• 📞 <a href="tel:03332248175" style="color:#d4a843">0333 224 8175</a><br>• 💬 <a href="https://wa.me/447380738256" style="color:#d4a843">WhatsApp us</a><br>• ✉ <a href="contact.html" style="color:#d4a843">Contact form</a><br><br>We typically respond within <strong>2 hours</strong>.' },
    { keys: ['location','where','address','area','cover','bury','lancashire','uk','nationwide'],
      answer: '📍 <strong>Our Location</strong><br><strong>Acorn Business Centre</strong><br>Fountain Street North<br>Bury, Lancashire, BL9 7AN<br><br>Serving clients <strong>nationwide across the UK</strong>. <a href="contact.html" style="color:#d4a843">→ Get directions</a>' },
    { keys: ['contact','phone','email','call','reach','speak','talk'],
      answer: '📞 <strong>Contact Us</strong><br>• Phone: <a href="tel:03332248175" style="color:#d4a843">0333 224 8175</a><br>• WhatsApp: <a href="https://wa.me/447380738256" style="color:#d4a843">+44 7380 738256</a><br>• Email: <a href="mailto:enquiries@ukdefenceservices.co.uk" style="color:#d4a843">enquiries@ukdefenceservices.co.uk</a><br>• <a href="contact.html" style="color:#d4a843">Contact form →</a>' },
    { keys: ['job','vacancy','vacanc','hire','recruit','career','work','employment','apply'],
      answer: '💼 <strong>Vacancies & Careers</strong><br>We are always looking for talented people. Current roles include:<br>• Security officers & supervisors<br>• IT developers & digital marketers<br>• Skilled tradespeople<br>• Hospitality & cleaning staff<br><br><a href="vacancies.html" style="color:#d4a843">→ View all vacancies</a>' },
    { keys: ['about','company','who','history','founded','team','experience'],
      answer: '🏢 <strong>About UK Defence Services</strong><br>UK Defence Services LTD is a multi-disciplinary professional services company registered in England & Wales (Co: 16088343).<br><br>We unite elite teams across security, IT, construction and hospitality. <a href="about.html" style="color:#d4a843">→ Our full story</a>' },
    { keys: ['hello','hi','hey','good morning','good afternoon','help','start'],
      answer: '👋 Hello! I\'m the UK Defence AI Assistant. I can help with:<br>• 🛡 Security services<br>• 🧹 Cleaning<br>• 💻 IT & digital<br>• 🏗 Construction<br>• 🍽 Hospitality staffing<br>• 💰 Quotes & pricing<br><br>What can I help you with today?' }
  ];

  function findAnswer(q) {
    const lower = q.toLowerCase();
    let best = null, bestScore = 0;
    kb.forEach(entry => {
      let score = 0;
      entry.keys.forEach(k => { if (lower.includes(k)) score += k.length; });
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    if (best && bestScore > 0) return best.answer;
    return `Thank you for your enquiry. Please reach us directly:<br><br>📞 <a href="tel:03332248175" style="color:#e8b84b;font-weight:600;">0333 224 8175</a><br>💬 <a href="https://wa.me/447380738256" style="color:#e8b84b;font-weight:600;">WhatsApp Us</a><br>✉ <a href="mailto:enquiries@ukdefenceservices.co.uk" style="color:#e8b84b;font-weight:600;">enquiries@ukdefenceservices.co.uk</a><br>📋 <a href="contact.html" style="color:#e8b84b;font-weight:600;">Online form →</a>`;
  }

  function addMsg(html, cls) {
    const b = document.createElement('div');
    b.className = 'bubble ' + cls;
    b.innerHTML = html;
    messages.appendChild(b);
    messages.scrollTop = messages.scrollHeight;
    return b;
  }

  function sendMessage(q) {
    if (!q.trim()) return;
    addMsg(q.replace(/</g, '&lt;'), 'user');
    if (input) input.value = '';
    if (quickBtns) quickBtns.style.display = 'none';
    const typing = addMsg('<div class="typing-dots"><span></span><span></span><span></span></div>', 'typing');
    const delay = 600 + Math.min(q.length * 7, 500);
    setTimeout(() => { typing.remove(); addMsg(findAnswer(q), 'agent'); }, delay);
  }

  if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input.value));
  if (input)   input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });
  if (quickBtns) quickBtns.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.question));
  });

  if (toggle && body && toggleTxt) {
    toggle.addEventListener('click', () => {
      const hidden = body.style.display === 'none';
      body.style.display = hidden ? '' : 'none';
      toggleTxt.textContent = hidden ? 'Hide ▾' : 'Show ▲';
    });
  }
})();



// ── 8. SERVICES VIDEO PLAYER ─────────────────────────────
(function () {
  const poster  = document.getElementById('svsPoster');
  const playBtn = document.getElementById('svsPlayBtn');
  const video   = document.getElementById('svsVideo');
  if (!poster || !video) return;

  function play() {
    poster.style.display = 'none';
    video.style.display  = 'block';
    video.play().catch(() => { video.controls = true; });
  }
  poster.addEventListener('click', play);
  if (playBtn) playBtn.addEventListener('click', e => { e.stopPropagation(); play(); });
})();


// ── 9. FAQ TAB SWITCHER ──────────────────────────────────
// openTab is called inline from HTML: onclick="openTab('tab-id', this)"
function openTab(tabId, el) {
  document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  el.classList.add('active');
}


// ── 10. REVIEW / TESTIMONIAL CAROUSEL ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const track         = document.querySelector('.review-track');
  const cards         = Array.from(document.querySelectorAll('.review-card'));
  const prevBtn       = document.querySelector('.prev');
  const nextBtn       = document.querySelector('.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!track || !cards.length || !dotsContainer) return;

  const cardsPerView = 3;
  let currentIndex   = 0;
  let autoScroll;

  const totalSlides = Math.ceil(cards.length / cardsPerView);

  // Build dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(document.querySelectorAll('.carousel-dots span'));

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap       = parseFloat(window.getComputedStyle(track).gap) || 0;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap) * cardsPerView}px)`;
    updateDots();
  }

  function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; updateCarousel(); }
  function prevSlide() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateCarousel(); }
  function startAuto() { autoScroll = setInterval(nextSlide, 6500); }
  function stopAuto()  { clearInterval(autoScroll); }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); stopAuto(); });
  });

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', updateCarousel);

  track.style.transition = 'transform 0.8s ease';
  updateCarousel();
  startAuto();
});


// ── 11. AVATAR COLOUR ASSIGNMENT ─────────────────────────
document.querySelectorAll('.avatar').forEach((avatar, i) => {
  const colors = ['g-blue', 'g-red', 'g-yellow', 'g-green'];
  avatar.classList.add(colors[i % colors.length]);
});


// ── 12. APPLY MODAL (Vacancies page) ─────────────────────
const applyModal  = document.getElementById('applyModal');
const applyBtns   = document.querySelectorAll('.apply-btn');
const closeApply  = document.querySelector('.close-modal-vac');

if (applyModal) {
  applyBtns.forEach(btn => btn.addEventListener('click', () => applyModal.classList.add('active')));
  if (closeApply) closeApply.addEventListener('click', () => applyModal.classList.remove('active'));
  window.addEventListener('click', e => { if (e.target === applyModal) applyModal.classList.remove('active'); });
}


// ── 13. SERVICES PAGE TABS ───────────────────────────────
// Handles both .ukds-tab/.ukds-content and .service-tab/.service-content
document.addEventListener('DOMContentLoaded', () => {

  // New style (ukds-tab)
  const ukdsSection = document.querySelector('.ukds-services');
  if (ukdsSection) {
    const tabs     = ukdsSection.querySelectorAll('.ukds-tab');
    const contents = ukdsSection.querySelectorAll('.ukds-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.dataset.ukds;
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        const el = ukdsSection.querySelector('#ukds-' + target);
        if (el) el.classList.add('active');
      });
    });
  }

  // Old style (service-tab)
  const serviceTabs     = document.querySelectorAll('.service-tab');
  const serviceContents = document.querySelectorAll('.service-content');
  if (serviceTabs.length) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');
        serviceTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        serviceContents.forEach(c => c.classList.remove('active'));
        const el = document.getElementById(target);
        if (el) el.classList.add('active');
      });
    });
  }

});

// ── 13. SERVICES TABS (services.html + service detail pages) ──
// srv-tab-btn → switches srv-content panels
document.querySelectorAll('.srv-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.srv-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.srv-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// ukds-tab → switches ukds-content panels (services page variant)
document.querySelectorAll('.ukds-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.ukds-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.ukds-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});


// ── 14. SCROLL REVEAL (IntersectionObserver) ──────────────────
// Covers .reveal (sections/cards) and .reveal-up (headings)
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.classList.add('active');
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-up').forEach(el => observer.observe(el));
})();

//-15. Gallery __________________________
/* ── All JS uses gl__ / gl prefixes to avoid conflicts ── */

var glActiveFilter = 'all';
var glActivePanel = 'photos';
var glLbCards = [];
var glLbIdx = 0;

/* ── Panel toggle (Images / Videos) ── */
function glShowPanel(panel) {
  glActivePanel = panel;
  var photoPanel = document.getElementById('glPhotosPanel');
  var videoPanel = document.getElementById('glVideosPanel');
  var filterBar  = document.getElementById('glFilters');
  var btnImgs    = document.getElementById('glToggleImgs');
  var btnVids    = document.getElementById('glToggleVids');
  if (panel === 'photos') {
    photoPanel.style.display = 'block';
    videoPanel.style.display = 'none';
    filterBar.style.display  = 'flex';
    btnImgs.classList.add('gl__t-active');
    btnVids.classList.remove('gl__t-active');
  } else {
    photoPanel.style.display = 'none';
    videoPanel.style.display = 'block';
    filterBar.style.display  = 'none';
    btnImgs.classList.remove('gl__t-active');
    btnVids.classList.add('gl__t-active');
  }
}

/* ── Filter ── */
function glFilter(btn, cat) {
  glActiveFilter = cat;
  document.querySelectorAll('.gl__filter-pill').forEach(function(p) {
    p.classList.remove('gl__f-active');
  });
  btn.classList.add('gl__f-active');
  var cards = document.querySelectorAll('#glPhotoGrid .gl__card');
  var visible = 0;
  cards.forEach(function(c) {
    var match = cat === 'all' || c.dataset.cat === cat;
    if (match) { c.classList.remove('gl__hidden'); visible++; }
    else        { c.classList.add('gl__hidden'); }
  });
  var empty = document.getElementById('glEmpty');
  if (visible === 0) { empty.classList.add('gl__show'); }
  else               { empty.classList.remove('gl__show'); }
  document.getElementById('glImgCount').textContent = visible;
}

/* ── Lightbox ── */
function glBuildLbCards() {
  glLbCards = Array.from(
    document.querySelectorAll('#glPhotoGrid .gl__card:not(.gl__hidden)')
  ).filter(function(c) { return c.dataset.img; });
}

function glOpenLb(el) {
  glBuildLbCards();
  glLbIdx = glLbCards.indexOf(el);
  glRenderLb();
  document.getElementById('glLightbox').classList.add('gl__lb-open');
  document.body.style.overflow = 'hidden';
}

function glRenderLb() {
  var el = glLbCards[glLbIdx];
  if (!el) return;
  var img = document.getElementById('glLbImg');
  img.src = el.dataset.img;
  img.alt = el.querySelector('img').alt;
  document.getElementById('glLbTag').textContent   = el.dataset.tag;
  document.getElementById('glLbTitle').textContent = el.dataset.title;
  document.getElementById('glLbCounter').textContent =
    (glLbIdx + 1) + ' / ' + glLbCards.length;
}

function glNavLb(dir) {
  glLbIdx = (glLbIdx + dir + glLbCards.length) % glLbCards.length;
  glRenderLb();
}

function glCloseLb() {
  document.getElementById('glLightbox').classList.remove('gl__lb-open');
  document.body.style.overflow = '';
}

function glLbBgClick(e) {
  if (e.target.id === 'glLightbox') glCloseLb();
}

/* ── Video play ── */
function glPlayVid(n) {
  var vid = document.getElementById('glV' + n);
  var ov  = document.getElementById('glVo' + n);
  var lbl = document.getElementById('glVl' + n);
  var card= document.getElementById('glVc' + n);
  if (vid.paused) {
    vid.muted = false;
    vid.play();
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
    lbl.style.opacity = '0';
    card.classList.add('gl__vid-playing');
  } else {
    vid.pause();
    ov.style.opacity = '1';
    ov.style.pointerEvents = 'auto';
    lbl.style.opacity = '1';
    card.classList.remove('gl__vid-playing');
  }
}

/* ── Keyboard ── */
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('glLightbox');
  if (!lb.classList.contains('gl__lb-open')) return;
  if (e.key === 'Escape')      glCloseLb();
  if (e.key === 'ArrowRight')  glNavLb(1);
  if (e.key === 'ArrowLeft')   glNavLb(-1);
});


 /* ── Blog index filter — all vars/functions prefixed blgi ── */
    var blgiActiveFilter = 'all';

    function blgiFilter(btn, cat) {
      blgiActiveFilter = cat;

      /* Update pill states */
      document.querySelectorAll('.blgi__pill').forEach(function(p) {
        p.classList.remove('blgi__active');
      });
      btn.classList.add('blgi__active');

      /* Show/hide cards */
      var cards = document.querySelectorAll('#blgiGrid .blgi__card');
      var visible = 0;
      cards.forEach(function(c) {
        var match = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('blgi__hidden', !match);
        if (match) visible++;
      });

      /* Show/hide category section headers */
      document.querySelectorAll('.blgi__cat-hdr').forEach(function(hdr) {
        if (cat === 'all') {
          hdr.style.display = 'flex';
        } else {
          hdr.style.display = hdr.dataset.section === cat ? 'flex' : 'none';
        }
      });

      /* Update count */
      document.getElementById('blgiCount').textContent = visible;

      /* Empty state */
      var empty = document.getElementById('blgiEmpty');
      empty.classList.toggle('blgi__show', visible === 0);
    }

    /* Mobile nav toggle */
    var blgiMenuToggle = document.getElementById('menuToggle');
    var blgiMobileNav  = document.getElementById('mobileNav');
    if (blgiMenuToggle && blgiMobileNav) {
      blgiMenuToggle.addEventListener('click', function() {
        blgiMobileNav.classList.toggle('open');
      });
    }