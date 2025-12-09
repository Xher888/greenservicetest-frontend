/*
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
    try {
      const response = await fetch('/contact', {  
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

    } catch (error) {
      responseDiv.innerText = 'Errore nell\'invio del messaggio.';
      responseDiv.style.color = 'red';
      console.error(error);
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      setTimeout(() => {
        responseDiv.innerText = 'Messaggio inviato ✅';
      }, 5000);
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

*/



// Mobile menu toggle con aria-expanded
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
  const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', String(!isExpanded));
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
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

// DateUpdate
document.getElementById("annoCorrente").textContent = new Date().getFullYear();

// HideMail
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
  const honeypotInput = form.querySelector('[name="website"]');
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

  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorPhone = document.getElementById('errorPhone');
  const errorMessage = document.getElementById('errorMessage');

  // Limpiar errores previos
  errorName.innerText = '';
  errorEmail.innerText = '';
  errorPhone.innerText = '';
  errorMessage.innerText = '';
  responseDiv.innerText = '';

  // Validaciones
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

submitButton.disabled = true;
submitButton.classList.add('loading');

(async () => {
  try {
    const response = await fetch('https://greenservicetest-backend.onrender.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message })
    });

    if (!response.ok) {
      throw new Error('Errore di rete');
    }

    const data = await response.json();
    responseDiv.innerText = data.message;
    responseDiv.style.color = 'green';
    form.reset();
  } catch (error) {
    responseDiv.innerText = 'Errore nell\'invio del messaggio.';
    responseDiv.style.color = 'red';
    console.error(error);
  } finally {
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    setTimeout(() => {
      responseDiv.innerText = 'Messaggio inviato ✅';
    }, 5000);
  }
})();
});

// Video "Come Arrivare" – reproducción condizionata
const videoArrivare = document.getElementById('videoArrivare');
const wrapper = document.querySelector('.video-wrapper');

if (videoArrivare && wrapper) {
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

// Refuerzo manual del loop por si el navegador lo ignora
videoArrivare.addEventListener('ended', () => {
  videoArrivare.currentTime = 0;
  videoArrivare.play().catch(() => {});
});
}
   
// Scroll al top al hacer clic en el botón flotante
document.querySelector('.scroll-top-float a').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
	top: 0,
	behavior: 'smooth'
  });
});

// Scroll al top al hacer clic en el logo
document.querySelector('.logo').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Cookie consent avanzado
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieModal = document.getElementById('cookieModal');
  const acceptAll = document.getElementById('acceptAll');
  const customize = document.getElementById('customize');
  const cookieForm = document.getElementById('cookieForm');

  // Mostrar banner si no hay preferencias guardadas
  if (!localStorage.getItem('cookiePreferences')) {
    cookieBanner.classList.add('show');
  }

  // Aceptar todas las cookies
  acceptAll.addEventListener('click', () => {
    localStorage.setItem('cookiePreferences', JSON.stringify({
      technical: true,
      analytics: true,
      marketing: true
    }));
    cookieBanner.classList.remove('show');
  });

  // Abrir modal de personalización
  customize.addEventListener('click', () => {
    cookieModal.setAttribute('aria-hidden', 'false');
  });

  // Guardar preferencias desde el formulario
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
