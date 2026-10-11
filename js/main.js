/**
 * PORTOFOLIO - MUHAMMAD RIZQI FEBRIAN
 * Interactive behaviors, filtering, modal lightbox, and smooth UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Navbar Scroll Effect & Back-to-Top Button
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar background on scroll
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scrollspy - Highlight Active Link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetNavLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  });

  // 4. Experience Filtering (Semua, Organisasi, Kepanitiaan)
  const expFilters = document.querySelectorAll('.exp-filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  expFilters.forEach(button => {
    button.addEventListener('click', () => {
      expFilters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      expCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Filtering (Semua, Website, Desain Grafis)
  const projectFilters = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach(button => {
    button.addEventListener('click', () => {
      projectFilters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Lightbox Modal for Projects & Graphic Design Preview
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');
  const modalLink = document.getElementById('modalLink');

  const previewButtons = document.querySelectorAll('.btn-preview-project');

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Detail Proyek';
      const desc = btn.getAttribute('data-desc') || '';
      const imgSrc = btn.getAttribute('data-img') || '';
      const tags = btn.getAttribute('data-tags') ? btn.getAttribute('data-tags').split(',') : [];
      const link = btn.getAttribute('data-link') || '#';

      if (modalTitle) modalTitle.textContent = title;
      if (modalDescription) modalDescription.textContent = desc;

      if (modalImage) {
        if (imgSrc) {
          modalImage.src = imgSrc;
          modalImage.style.display = 'block';
        } else {
          modalImage.style.display = 'none';
        }
      }

      if (modalTags) {
        modalTags.innerHTML = '';
        tags.forEach(tag => {
          const pill = document.createElement('span');
          pill.className = 'tech-pill';
          pill.textContent = tag.trim();
          modalTags.appendChild(pill);
        });
      }

      if (modalLink) {
        if (link && link !== '#') {
          modalLink.href = link;
          modalLink.style.display = 'inline-flex';
        } else {
          modalLink.style.display = 'none';
        }
      }

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent bg scrolling
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 7. Interactive Contact Form -> Direct WhatsApp integration
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Kolaborasi Proyek';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) {
        alert('Mohon isi nama dan pesan Anda sebelum mengirimkan.');
        return;
      }

      // Format WhatsApp Message
      const waText = `Halo Muhammad Rizqi Febrian,\n\nSaya: ${name}\nEmail/Kontak: ${email || '-'}\nSubjek: ${subject}\n\nPesan:\n${message}`;
      const encodedText = encodeURIComponent(waText);

      // WhatsApp URL (Placeholder phone number - Rizqi can customize his actual phone in index.html)
      const waPhoneNumber = contactForm.getAttribute('data-phone') || '6281234567890';
      const waUrl = `https://wa.me/${waPhoneNumber}?text=${encodedText}`;

      // Open in new tab
      window.open(waUrl, '_blank');
      
      // Feedback to user
      alert('Terima kasih! Pesan Anda telah disiapkan dan dialihkan ke WhatsApp.');
      contactForm.reset();
    });
  }
});

