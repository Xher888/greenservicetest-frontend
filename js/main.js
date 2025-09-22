  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');

  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      navLinks.classList.remove('active');
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

  // Stay on Site
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
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
    const errorMessage = document.getElementById('errorMessage');
    const responseDiv = document.getElementById('formResponse');


    // Validaciones
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
    const emailRegex = /^[^@]{2,}@[^@]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9\s\-]{7,}$/;

    if (!name || !email || !message) {
        responseDiv.innerText = 'Tutti i campi sono obbligatori.';
        responseDiv.style.color = 'red';
        return;
    }

    if (!nameRegex.test(name)) {
      responseDiv.innerText = 'Il nome deve contenere almeno 3 lettere e solo caratteri alfabetici.';
      responseDiv.style.color = 'red';
      return;
    }

    if (!emailRegex.test(email)) {
      responseDiv.innerText = 'Inserisci un indirizzo email valido (es. nome@dominio.com).';
      responseDiv.style.color = 'red';
      return;
    }
    
    if (!phoneRegex.test(phone)) {
      responseDiv.innerText = 'Inserisci un numero di telefono valido.';
      responseDiv.style.color = 'red';
      return;
    }

   // Activar spinner en el botón
      submitButton.classList.add('loading');

    // Envío al backend
    fetch('https://greenservicetest-backend.onrender.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message })
    })
    .then(response => response.text())
    .then(data => {
      responseDiv.innerText = data;
      responseDiv.style.color = 'green';
      form.reset();
      submitButton.classList.remove('loading');
      submitButton.innerText = '✅';

    })
    .catch(error => {
      responseDiv.innerText = 'Errore nell\'invio del messaggio.';
      responseDiv.style.color = 'red';
      console.error(error);
    })
    .finally(() => {
      setTimeout(() => {
        responseDiv.innerText = 'Messaggio inviato ✅';
        submitButton.innerText = 'Inviare messaggio';
     }, 5000);
});


});
