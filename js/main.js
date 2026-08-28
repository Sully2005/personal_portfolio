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
/* Contact Interactions: 1-Click Copy & Direct Messaging                       */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  // Helper copy function
  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  // Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'ahmadsuleman726@gmail.com';
      try {
        await copyToClipboard(email);
        copyEmailBtn.textContent = 'Copied!';
        showToast('✓ Email copied to clipboard');
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  // Copy Phone Button
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', async () => {
      const phone = copyPhoneBtn.getAttribute('data-phone') || '825-365-1445';
      try {
        await copyToClipboard(phone);
        copyPhoneBtn.textContent = 'Copied!';
        showToast('✓ Phone number copied for messaging');
        setTimeout(() => {
          copyPhoneBtn.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        showToast('Phone: ' + phone);
      }
    });
  }

  // SMS Link Desktop Interceptor (prevents browser prompt on desktop, copies instead)
  const smsLink = document.getElementById('smsLink');
  if (smsLink) {
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    if (!isMobile) {
      smsLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const phone = '825-365-1445';
        try {
          await copyToClipboard(phone);
          showToast('✓ Phone number copied for messaging');
        } catch (err) {
          showToast('Phone: ' + phone);
        }
      });
    }
  }
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
