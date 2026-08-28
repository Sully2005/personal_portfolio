/**
 * Minimalist Portfolio Interactions
 * Muhammad Ahmad - Electrical & Computer Engineering @ UBC
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectsSubmenu();
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
/* Projects Card Grid to Submenu Expansion (David Reina Style)                */
/* -------------------------------------------------------------------------- */
function initProjectsSubmenu() {
  const gridView = document.getElementById('projectsGridView');
  const cardItems = document.querySelectorAll('.project-card-item');
  const submenuViews = document.querySelectorAll('.project-submenu-view');
  const backButtons = document.querySelectorAll('[data-back]');
  const pagerButtons = document.querySelectorAll('[data-switch]');

  if (!gridView || !cardItems.length) return;

  function openProject(projectId, updateHash = true) {
    const targetView = document.getElementById(`view-${projectId}`);
    if (!targetView) return;

    // Hide Grid, show target submenu view
    gridView.style.display = 'none';
    submenuViews.forEach(view => view.classList.remove('active'));
    targetView.classList.add('active');

    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    if (updateHash) {
      history.pushState(null, '', `#${projectId}`);
    }
  }

  function closeToGrid(updateHash = true) {
    submenuViews.forEach(view => view.classList.remove('active'));
    gridView.style.display = 'block';

    if (updateHash) {
      history.pushState(null, '', window.location.pathname);
    }
  }

  // Card click triggers project expansion
  cardItems.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      if (projectId) {
        openProject(projectId);
      }
    });
  });

  // Back button triggers return to grid
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeToGrid();
    });
  });

  // Next / Prev pager buttons
  pagerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextProjectId = btn.getAttribute('data-switch');
      if (nextProjectId) {
        openProject(nextProjectId);
      }
    });
  });

  // Handle URL hash on initial load
  function checkHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`view-${hash}`)) {
      openProject(hash, false);
    } else {
      closeToGrid(false);
    }
  }

  // Listen for browser back / forward navigation
  window.addEventListener('popstate', checkHash);
  checkHash();

  // Escape key closes submenu view
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gridView.style.display === 'none') {
      closeToGrid();
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
