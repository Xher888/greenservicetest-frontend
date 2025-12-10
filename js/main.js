// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
  const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', String(!isExpanded));
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Date update
document.getElementById("annoCorrente").textContent = new Date().getFullYear();

// HideMail (obfuscation)
const correo = "serlorenzo" + "@hotmail.com";
const enlace = document.getElementById("correoDesigner");
enlace.setAttribute("href", "mailto:" + correo);
enlace.setAttribute("target", "_blank");
enlace.style.cursor = "pointer";

// Form submission 
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = e.target;
  const responseDiv = document.getElementById('formResponse');
  responseDiv.setAttribute('role', 'alert'); // Accessibility for response messages
  const honeypotInput = form.querySelector('[name="website"]');
  
  // Honeypot check
  if (honeypotInput.value.trim() !== '') {
    responseDiv.innerText = 'Spam rilevato. Invio bloccato.';
    responseDiv.style.color = 'red';
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');
  const phoneInput = form.querySelector('[name="phone"]');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear previous errors and set ARIA roles
  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorPhone = document.getElementById('errorPhone');
  const errorMessage = document.getElementById('errorMessage');

  [errorName, errorEmail, errorPhone, errorMessage].forEach(el => {
    el.innerText = '';
    el.setAttribute('role', 'alert'); // Accessibility for errors
  });
  
  responseDiv.innerText = '';

  // Validations 
  const nameRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
  const emailRegex = /^[^@]{2,}@[^@]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(?:\+39)?\s?(0|\d{3})\s?\d{6,8}$/;

  let hasError = false;

  if (!nameRegex.test(name)) {
    errorName.innerText = 'Il nome deve contenere almeno 3 lettere e solo caratteri alfabetici.';
    hasError = true;
  }

  if (!emailRegex.test(email)) {
    errorEmail.innerText = 'Inserisci un indirizzo email valido.';
    hasError = true;
  }

  if (!phoneRegex.test(phone)) {
    errorPhone.innerText = 'Inserisci un numero di telefono valido.';
    hasError = true;
  }

  if (!message) {
    errorMessage.innerText = 'Il messaggio non può essere vuoto.';
    hasError = true;
  }

  if (hasError) return;

  // Disable submit button while processing
  submitButton.disabled = true;
  submitButton.classList.add('loading');

  (async () => {
	let success = false;
    try {
      const response = await fetch('https://greenservicetest-backend.onrender.com/contact', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (!response.ok) {
        throw new Error('Errore di rete');
      }

      const data = await response.json();
      responseDiv.innerText = data.message;
      responseDiv.style.color = 'green';
      form.reset();
	  success = true;

    } catch (error) {
      responseDiv.innerText = 'Errore nell\'invio del messaggio.';
      responseDiv.style.color = 'red';
      console.error(error);
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      if (success) {
        setTimeout(() => {
          responseDiv.innerText = 'Messaggio inviato ✅';
        }, 5000);
	  }
    }
  })();
});

// Video "Come Arrivare"
const videoArrivare = document.getElementById('videoArrivare');
const wrapper = document.querySelector('.video-wrapper');
if (videoArrivare && wrapper) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoArrivare.play().catch(() => {});
        } else {
          videoArrivare.pause();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(wrapper);
  } else {
    // Fallback: autoplay video
    videoArrivare.play().catch(() => {});
  }

  videoArrivare.addEventListener('ended', () => {
    videoArrivare.currentTime = 0;
    videoArrivare.play().catch(() => {});
  });
}

// Scroll to top buttons
document.querySelector('.scroll-top-float a').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('.logo').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cookie consent
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieModal = document.getElementById('cookieModal');
  const acceptAll = document.getElementById('acceptAll');
  const customize = document.getElementById('customize');
  const cookieForm = document.getElementById('cookieForm');
  if (!cookieBanner || !cookieModal || !acceptAll || !customize || !cookieForm) return;


  if (!localStorage.getItem('cookiePreferences')) {
    cookieBanner.classList.add('show');
  }

  acceptAll.addEventListener('click', () => {
    localStorage.setItem('cookiePreferences', JSON.stringify({
      technical: true,
      analytics: true,
      marketing: true
    }));
    cookieBanner.classList.remove('show');
  });

  customize.addEventListener('click', () => {
    cookieModal.setAttribute('aria-hidden', 'false');
  });

  cookieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const prefs = {
      technical: true,
      analytics: cookieForm.analytics.checked,
      marketing: cookieForm.marketing.checked
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    cookieModal.setAttribute('aria-hidden', 'true');
    cookieBanner.classList.remove('show');
  });
});

// Lightbox gallery
(function() {
  const lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return; 

  const images = Array.from(document.querySelectorAll('#gallery .gallery-item img'));
  if (!images.length) return;

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');

  let currentIndex = 0;
  let lastFocusedElement = null;

  function openLightbox(index) {
    currentIndex = index;
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = img.alt || '';

    lastFocusedElement = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    btnClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = img.alt || '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = img.alt || '';
  }

  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(index));
  });

  btnClose.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
})();

// Gallery carousel 
(function() {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;
    const viewport = carousel.querySelector('.gallery-viewport');
    const grid = carousel.querySelector('.gallery-grid');
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    const btnPrev = carousel.querySelector('.gallery-nav-prev');
    const btnNext = carousel.querySelector('.gallery-nav-next');

    if (!items.length || !btnPrev || !btnNext || !viewport) return;
    let currentIndex = 0;

  function getItemsPerView() {
    const viewportWidth = viewport.clientWidth;

    if (viewportWidth >= 1024) {
      return 4;          
    } else if (viewportWidth >= 768) {
      return 3;          
    } else {
      return 1;          
    }
  }

/*
  function getItemsPerView() {
    const viewportWidth = viewport.clientWidth;
    const itemWidth = items[0].clientWidth || viewportWidth;
    return Math.max(1, Math.round(viewportWidth / itemWidth));
  }*/
    
  function updateCarousel() {
    const itemWidth = viewport.clientWidth / getItemsPerView();
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, items.length - itemsPerView);

    const offset = -currentIndex * itemWidth;
    grid.style.transform = `translateX(${offset}px)`;
  }
  
  btnNext.addEventListener('click', () => {
  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, items.length - itemsPerView);

  if (currentIndex >= maxIndex) {
    currentIndex = 0;              
  } else {
    currentIndex += itemsPerView;  
  }

  updateCarousel();
});

  btnPrev.addEventListener('click', () => {
  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, items.length - itemsPerView);

  if (currentIndex <= 0) {
    currentIndex = maxIndex;        
  } else {
    currentIndex -= itemsPerView;   
  }

  updateCarousel();
});
  
  
  window.addEventListener('resize', updateCarousel);
  window.addEventListener('load', updateCarousel);
})();


