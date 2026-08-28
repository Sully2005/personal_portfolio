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
/* Contact Interactions: 1-Click Copy & Direct Mail                            */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const copyBtn = document.getElementById('copyEmailBtn');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'ahmadsuleman726@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older/insecure environments
          const textarea = document.createElement('textarea');
          textarea.value = email;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px; color: var(--accent-orange);">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        showToast('✓ Email copied to clipboard');
        
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2200);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
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
