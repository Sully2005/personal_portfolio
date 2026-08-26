/**
 * Minimalist Portfolio Interactions
 * Muhammad Ahmad - Electrical & Computer Engineering @ UBC
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
});

/* -------------------------------------------------------------------------- */
/* Navigation & Mobile Drawer                                                 */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileBtn = document.querySelector('.mobile-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Contact Form to Mailto                                                     */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('message')?.value.trim() || '';

    const fullBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:ahmadsuleman726@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

    window.location.href = mailtoUrl;
    showToast('Opening email client...');
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
