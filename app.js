// Smooth scroll interne et gestion des liens actifs
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    // Retire la classe active de tous les liens
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });
    // Ajoute la classe active au lien cliqué
    this.classList.add('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});



// Configuration améliorée de l'Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3 // Détection plus sensible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      // Cas spécial pour la section CVs
      if (id === 'cvs') {
        // Vérifie si au moins 30% de la section est visible
        const sectionTop = entry.target.getBoundingClientRect().top;
        const sectionHeight = entry.target.offsetHeight;
        const visibleRatio = Math.max(0, (window.innerHeight - sectionTop) / sectionHeight);
        
        if (visibleRatio >= 0.3) {
          updateActiveNav(id);
        }
      } else {
        updateActiveNav(id);
      }
   
    if (id === 'publications') {
        // Vérifie si au moins 30% de la section est visible
        const sectionTop = entry.target.getBoundingClientRect().top;
        const sectionHeight = entry.target.offsetHeight;
        const visibleRatio = Math.max(0, (window.innerHeight - sectionTop) / sectionHeight);
        
        if (visibleRatio >= 0.3) {
          updateActiveNav(id);
        }
      } else {
        updateActiveNav(id);
      }
    }
  });
}, observerOptions);

function updateActiveNav(sectionId) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
}

// Observe toutes les sections
document.querySelectorAll('main section').forEach(section => {
  observer.observe(section);
});





// Formulaire contact -> mailto
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  if (!email || !subject || !message) return alert('Veuillez remplir tous les champs.');
  window.location.href = `mailto:mohamedellmellouli@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});