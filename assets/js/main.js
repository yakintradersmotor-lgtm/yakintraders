
/* main.js â€” Clean, single-file JS for your site */

/* eslint-disable no-unused-vars */
(() => {
  'use strict';

  /* -------------------------
     Helpers
     ------------------------- */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  /* -------------------------
     NAV: Mega dropdown (desktop) + keyboard
     ------------------------- */
  const productsLink = $('#productsLink');
  const productsMega = $('#productsMega');

  if (productsLink && productsMega) {
    let openTimer = null;

    const openMega = () => {
      clearTimeout(openTimer);
      productsMega.style.display = 'block';
      productsMega.setAttribute('aria-hidden', 'false');
      productsLink.setAttribute('aria-expanded', 'true');
    };
    const closeMega = () => {
      clearTimeout(openTimer);
      openTimer = setTimeout(() => {
        productsMega.style.display = 'none';
        productsMega.setAttribute('aria-hidden', 'true');
        productsLink.setAttribute('aria-expanded', 'false');
      }, 160);
    };

    if (!isTouch) {
      productsLink.addEventListener('mouseenter', openMega);
      productsLink.addEventListener('mouseleave', closeMega);
      productsMega.addEventListener('mouseenter', () => clearTimeout(openTimer));
      productsMega.addEventListener('mouseleave', closeMega);
    }

    productsLink.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        const visible = productsMega.style.display === 'block';
        if (visible) closeMega();
        else openMega();
      } else if (ev.key === 'Escape') {
        closeMega();
        productsLink.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!productsLink.contains(e.target) && !productsMega.contains(e.target)) {
        productsMega.style.display = 'none';
        productsMega.setAttribute('aria-hidden', 'true');
        productsLink.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll(".toggle-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      document.querySelectorAll(".sub").forEach(sub => {
        if (sub !== submenu) sub.style.display = "none";
      });
      document.querySelectorAll(".toggle-link").forEach(l => {
        if (l !== this) l.classList.remove("active");
      });
      if (submenu.style.display === "block") {
        submenu.style.display = "none";
        this.classList.remove("active");
      } else {
        submenu.style.display = "block";
        this.classList.add("active");
      }
    });
  });

  /* -------------------------
     MOBILE PANEL
     ------------------------- */
  const menuToggle = $('#menuToggle');
  const mobilePanel = $('#mobilePanel');
  const mobileOverlay = $('#mobileOverlay');
  const mobileClose = $('#mobileClose');

  const openMobile = () => {
    if (!mobilePanel || !mobileOverlay) return;
    mobilePanel.classList.add('open');
    mobilePanel.setAttribute('aria-hidden', 'false');
    mobileOverlay.style.display = 'block';
    mobileOverlay.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
    if (mobileClose) mobileClose.focus();
  };

  const closeMobile = () => {
    if (!mobilePanel || !mobileOverlay) return;
    mobilePanel.classList.remove('open');
    mobilePanel.setAttribute('aria-hidden', 'true');
    mobileOverlay.style.display = 'none';
    mobileOverlay.classList.add('hidden');
    document.documentElement.style.overflow = '';
    if (menuToggle) menuToggle.focus();
  };

  if (menuToggle) menuToggle.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobile();
      if (productsMega) { productsMega.style.display = 'none'; productsMega.setAttribute('aria-hidden', 'true'); }
    }
  });

  /* -------------------------
     SEARCH: Global Embedded
     ------------------------- */
  const initSearch = () => {
    // Shared Data
    const products = [
      { "name": "25 HP ABB Motor", "url": "products/abb-25hp.html", "image": "assets/images/new/1000299952.jpg" },
      { "name": "2 HP ABB Motor", "url": "products/abb-2hp.html", "image": "assets/images/new/1000299955.jpg" },
      { "name": "3 HP ABB Motor", "url": "products/abb-3hp.html", "image": "assets/images/new/1000299958.jpg" },
      { "name": "50 HP ABB Motor", "url": "products/abb-50hp.html", "image": "assets/images/new/1000299961.jpg" },
      { "name": "5 HP ABB Motor", "url": "products/abb-5hp.html", "image": "assets/images/new/1000299964.jpg" },
      { "name": "ABB Electric Motors", "url": "products/abb-motor.html", "image": "assets/images/new/1000299967.jpg" },
      { "name": "1.5 HP Crompton Motor", "url": "products/crompton-1.5hp.html", "image": "assets/images/new/1000299970.jpg" },
      { "name": "10 HP Crompton Motor", "url": "products/crompton-10hp.html", "image": "assets/images/new/1000299973.jpg" },
      { "name": "5 HP Crompton Motor", "url": "products/crompton-5hp.html", "image": "assets/images/new/1000299976.jpg" },
      { "name": "Crompton Electric Motors", "url": "products/crompton-motor.html", "image": "assets/images/new/1000299979.jpg" },
      { "name": "10 HP Kirloskar Motor", "url": "products/kirloskar-10hp.html", "image": "assets/images/new/1000299952.jpg" },
      { "name": "15 HP Kirloskar Motor", "url": "products/kirloskar-15hp.html", "image": "assets/images/new/1000299982.jpg" },
      { "name": "1 HP Kirloskar Motor", "url": "products/kirloskar-1hp.html", "image": "assets/images/new/1000299983.jpg" },
      { "name": "25 HP Kirloskar Motor", "url": "products/kirloskar-25hp.html", "image": "assets/images/new/1000299984.jpg" },
      { "name": "2 HP Kirloskar Motor", "url": "products/kirloskar-2hp.html", "image": "assets/images/new/1000299955.jpg" },
      { "name": "3 HP Kirloskar Motor", "url": "products/kirloskar-3hp.html", "image": "assets/images/new/1000299958.jpg" },
      { "name": "5 HP Kirloskar Motor", "url": "products/kirloskar-5hp.html", "image": "assets/images/new/1000299985.jpg" },
      { "name": "7.5 HP Kirloskar Motor", "url": "products/kirloskar-7.5hp.html", "image": "assets/images/new/1000299986.jpg" },
      { "name": "Kirloskar Electric Motors", "url": "products/kirloskar-motors.html", "image": "assets/images/new/1000299988.jpg" },
      { "name": "100 HP Siemens Motor", "url": "products/siemens-100hp.html", "image": "assets/images/new/1000299961.jpg" },
      { "name": "500 HP Siemens Motor", "url": "products/siemens-500hp.html", "image": "assets/images/new/1000299989.jpg" },
      { "name": "Siemens Electric Motors", "url": "products/siemens-motors.html", "image": "assets/images/new/1000299990.jpg" },
      { "name": "20 HP VEM Germany Motor", "url": "products/vem-20hp.html", "image": "assets/images/new/1000299998.jpg" },
      { "name": "VEM Electric Motors", "url": "products/vem-motor.html", "image": "assets/images/new/1000300002.jpg" },
      { "name": "40 HP WEG Brazil Motor", "url": "products/weg-40hp.html", "image": "assets/images/new/1000300004.jpg" },
      { "name": "WEG Electric Motors", "url": "products/weg-motor.html", "image": "assets/images/new/1000300006.jpg" }
    ];

    const bindSearch = (searchBox, searchWrap) => {
      if (!searchBox || !searchWrap) return;

      // Create container if not exists
      let resultsContainer = searchWrap.querySelector('.search-results');
      if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        searchWrap.style.position = 'relative';
        searchWrap.appendChild(resultsContainer);
      }

      searchBox.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';
        searchBox.style.borderColor = q.length > 0 ? '#0d47a1' : '#ccc';

        if (q.length === 0) {
          resultsContainer.classList.remove('active');
          return;
        }

        const matches = products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 8);
        const isProductPage = window.location.pathname.includes('/products/');

        if (matches.length > 0) {
          matches.forEach(m => {
            const a = document.createElement('a');
            a.className = 'search-result-item';
            let targetUrl = m.url;
            let imgPath = m.image;
            if (isProductPage) {
              targetUrl = '../' + m.url;
              if (!imgPath.startsWith('../')) imgPath = '../' + imgPath;
            }
            a.href = targetUrl;
            a.innerHTML = `
              <img src="${imgPath}" class="search-result-thumb" alt="" onError="this.style.display='none'">
              <div class="search-result-info"><span class="search-result-name">${m.name}</span></div>
            `;
            resultsContainer.appendChild(a);
          });
          resultsContainer.classList.add('active');
        } else {
          const noRes = document.createElement('div');
          noRes.className = 'search-result-item';
          noRes.innerHTML = `<span class="search-result-name" style="color:#666">No found: "${q}"</span>`;
          resultsContainer.appendChild(noRes);
          resultsContainer.classList.add('active');
        }
      });

      document.addEventListener('click', (e) => {
        if (!searchWrap.contains(e.target)) resultsContainer.classList.remove('active');
      });
    };

    // 1. Desktop Search
    bindSearch(document.getElementById('searchBox'), document.querySelector('.search-wrap'));

    // 2. Mobile Top Search
    bindSearch(document.getElementById('topSearchBox'), document.querySelector('.top-search-wrap'));
  };

  // Run search init
  initSearch();

  /* -------------------------
     LAZY IMAGES
     ------------------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, o) => es.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) img.src = img.dataset.src;
        img.classList.remove('lazy');
        o.unobserve(img);
      }
    }), { rootMargin: '60px' });
    document.querySelectorAll('img[data-src]').forEach(i => io.observe(i));
  }

  /* -------------------------
     FAQ
     ------------------------- */
  $$('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('open');
      const answer = item.querySelector('.faq-answer');
      if (answer) {
        // Optionally close others
        $$('.faq-item .faq-answer').forEach(a => { if (a !== answer) a.parentElement.classList.remove('open'); });
      }
    });
  });

  /* -------------------------
     SLIDER
     ------------------------- */
  (function sliderModule() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const imgs = Array.from(slider.querySelectorAll('.slides img'));
    if (!imgs.length) return;

    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const captionEl = slider.querySelector('.slider-caption');

    let idx = 0;
    const setActive = (n) => {
      idx = ((n % imgs.length) + imgs.length) % imgs.length;
      imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
      if (captionEl) captionEl.textContent = imgs[idx].dataset.caption || '';
    };
    setActive(idx);

    if (nextBtn) nextBtn.addEventListener('click', () => setActive(idx + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => setActive(idx - 1));

    let autoTimer = setInterval(() => setActive(idx + 1), 4500);
    slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    slider.addEventListener('mouseleave', () => autoTimer = setInterval(() => setActive(idx + 1), 4500));
  })();

  /* -------------------------
     Safe Back-To-Top
     ------------------------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTop.style.display = "block";
      else backToTop.style.display = "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------
     Safe Contact Form
     ------------------------- */
  const cForm = document.getElementById("contactForm");
  if (cForm) {
    cForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(cForm);
      fetch(cForm.action, { method: "POST", body: formData })
        .then(() => { alert("✅ Your inquiry has been sent successfully!"); cForm.reset(); })
        .catch(() => { alert("❌ Something went wrong. Please try again."); });
    });
  }

  /* -------------------------
     Google Map
     ------------------------- */
  window.initMap = function () {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (typeof google === 'undefined') {
      mapEl.innerHTML = '<p style="padding:10px">Map unavailable</p>';
      return;
    }
    const loc = { lat: 21.7645, lng: 72.1519 };
    const map = new google.maps.Map(mapEl, { center: loc, zoom: 13 });
    new google.maps.Marker({ position: loc, map });
  };


  /* -------------------------
     PRODUCT SPECIFIC LOGIC (Merged from product.js)
     ------------------------- */

  // 1. POPUP & QUOTE FORM HANDLERS
  const quoteForm = document.getElementById("quoteForm");
  const quickQuoteForm = document.getElementById('quickQuote');
  const openQuoteBtn = document.getElementById('openQuote');
  const quoteCancel = document.getElementById('quoteCancel');
  const quoteProduct = document.getElementById('quoteProduct');
  const quoteFeedback = document.getElementById('quoteFeedback');

  // Floating Quick Quote Button
  const quickBtn = document.getElementById('quickQuoteBtn');
  if (quickBtn) {
    let quickShown = false;
    const showQuick = () => {
      if (!quickShown) {
        quickBtn.classList.add('show');
        quickBtn.style.transform = 'scale(1)';
        quickShown = true;
      }
    };
    quickBtn.addEventListener('click', () => {
      if (document.getElementById('quoteProduct')) document.getElementById('quoteProduct').value = '5 HP Kirloskar Motor';
      if (quickQuoteForm) quickQuoteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    setTimeout(showQuick, 4000);
    window.addEventListener('scroll', showQuick, { once: true });
  }

  // Pre-fill Quote Form
  if (openQuoteBtn && quickQuoteForm) {
    openQuoteBtn.addEventListener('click', () => {
      if (quoteProduct) {
        quoteProduct.value = '5 HP Kirloskar Motor';
        quoteProduct.focus();
      }
      quickQuoteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (quoteCancel) {
    quoteCancel.addEventListener('click', () => {
      if (quoteForm) quoteForm.reset();
      if (quoteFeedback) quoteFeedback.textContent = 'Request cancelled.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Handle Quote Form Submit
  if (quoteForm) {
  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: quoteForm.name.value,
      mobile: quoteForm.mobile.value,
      product: quoteForm.product.value,
      quantity: quoteForm.quantity.value,
      message: quoteForm.message.value
    };

    if (quoteFeedback) {
      quoteFeedback.textContent = "Sending...";
    }

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbzkEV2I9zYYpWc2AAx9vA6HhFYv67ZG6G7dQAE9ta_3x-QMOx-VDs_VmZKBBSrCgPdW/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (quoteFeedback) {
        quoteFeedback.textContent =
          "✅ Request Submitted Successfully!";
      }

      quoteForm.reset();

    } catch (err) {

      console.error(err);

      if (quoteFeedback) {
        quoteFeedback.textContent =
          "❌ Unable to submit request.";
      }
    }
  });
}

  // 2. EXPOSE GLOBALS (Required for inline onclick HTML)
  window.changeImage = function (el) {
    const mainImg = document.getElementById("mainProductImage");
    if (mainImg) {
      mainImg.src = el.src;
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      el.classList.add("active");
    }
  };

  window.openPopup = function () {
    const p = document.getElementById("popupForm");
    if (p) p.style.display = "flex";
  };

  window.closePopup = function () {
    const p = document.getElementById("popupForm");
    if (p) p.style.display = "none";
  };


  /* -------------------------
     BRAND FILTER
     ------------------------- */
  const initFilters = () => {
    const filters = document.querySelectorAll('.filter-btn');
    const sections = document.querySelectorAll('.brand-section');

    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active class
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter sections
        const filterVal = btn.dataset.filter;
        sections.forEach(sec => {
          if (filterVal === 'all') {
            sec.classList.remove('hidden');
          } else {
            if (sec.dataset.brand === filterVal) {
              sec.classList.remove('hidden');
            } else {
              sec.classList.add('hidden');
            }
          }
        });
      });
    });
  };
  initFilters();

})();


