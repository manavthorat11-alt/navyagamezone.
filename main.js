/* ----------------------------------------------------
   NAVYA GAME ZONE - INTERACTIVE JAVASCRIPT
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------
  // 1. STICKY HEADER & SCROLL TRANSITIONS
  // ---------------------------------------------
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load


  // ---------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // ---------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  };

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navbar.classList.remove('active');
    document.body.classList.remove('nav-open');
  };

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // ---------------------------------------------
  // 3. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
  // ---------------------------------------------
  const sections = document.querySelectorAll('section');
  
  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger near the center/top
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);
  sections.forEach(section => observer.observe(section));


  // ---------------------------------------------
  // 4. LIGHTBOX GALLERY
  // ---------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const galleryData = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src'),
    caption: item.getAttribute('data-caption')
  }));

  const openLightbox = (index) => {
    currentGalleryIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Release scroll
  };

  const updateLightboxContent = () => {
    const item = galleryData[currentGalleryIndex];
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption;
      lightboxCaption.textContent = item.caption;
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  const showNextImage = (e) => {
    if (e) e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  };

  const showPrevImage = (e) => {
    if (e) e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  };

  // Click on gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Controls click listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNextImage);
  lightboxPrev.addEventListener('click', showPrevImage);
  
  // Close when clicking overlay backdrop outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });


  // ---------------------------------------------
  // 5. BOOKING FORM -> WHATSAPP REDIRECT
  // ---------------------------------------------
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('clientName').value.trim();
    const parentPhone = document.getElementById('clientPhone').value.trim();
    const dateOfVisit = document.getElementById('visitDate').value;
    const kidsCount = document.getElementById('kidsCount').value;
    const packageType = document.getElementById('packageType').value;
    const customMessage = document.getElementById('clientMsg').value.trim();

    // Construct nice clean readable text
    let messageText = `*New Visit Enquiry - Navya Game Zone*%0A%0A`;
    messageText += `👤 *Parent Name:* ${parentName}%0A`;
    messageText += `📞 *Contact Phone:* ${parentPhone}%0A`;
    messageText += `📅 *Date of Visit:* ${dateOfVisit}%0A`;
    messageText += `👶 *Number of Kids:* ${kidsCount}%0A`;
    messageText += `🎁 *Interested In:* ${packageType}%0A`;
    
    if (customMessage) {
      messageText += `📝 *Notes/Requests:* ${customMessage}%0A`;
    }

    // Direct WhatsApp API endpoint
    // Primary WhatsApp contact: +91 86555 80803
    const whatsappUrl = `https://wa.me/918655580803?text=${messageText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Optional form resetting & visual feedback
    bookingForm.reset();
    
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>🎉 Inquiry Sent Successfully!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #25d366, #20ba5a)';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  });

  // ---------------------------------------------
  // 6. INTERACTIVE SCROLL TOUR ANIMATION
  // ---------------------------------------------
  const scrollWrapper = document.getElementById('tourScrollWrapper');
  const canvas = document.getElementById('tour-canvas');
  const canvasLoading = document.getElementById('canvasLoading');
  
  if (scrollWrapper && canvas) {
    const ctx = canvas.getContext('2d');
    const steps = document.querySelectorAll('.tour-step');
    const loadingText = canvasLoading.querySelector('span');
    
    const totalFrames = 150;
    const images = [];
    let loadedCount = 0;
    
    const formatFrameNumber = (num) => String(num).padStart(3, '0');
    
    const drawFrame = (index) => {
      let img = images[index];
      // Fallback: if the target frame isn't loaded yet, draw the closest loaded frame
      if (!img || !img.complete) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = images[index - offset];
          if (prev && prev.complete) {
            img = prev;
            break;
          }
          const next = images[index + offset];
          if (next && next.complete) {
            img = next;
            break;
          }
        }
      }
      
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const updateTourText = (progress) => {
      let activeIndex = 0;
      if (progress >= 0.33 && progress < 0.67) {
        activeIndex = 1;
      } else if (progress >= 0.67) {
        activeIndex = 2;
      }
      
      steps.forEach((step, idx) => {
        if (idx === activeIndex) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    };
    
    // Preload all 150 images
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        
        // Update loading progress UI
        const percent = Math.round((loadedCount / totalFrames) * 100);
        if (loadingText) {
          loadingText.textContent = `Loading Tour (${percent}%)`;
        }
        
        // Once all images are loaded, hide spinner and draw initial frame
        if (loadedCount === totalFrames) {
          setTimeout(() => {
            canvasLoading.classList.add('fade-out');
          }, 300);
          
          // Match canvas native resolution to image dimensions
          canvas.width = img.naturalWidth || 720;
          canvas.height = img.naturalHeight || 1280;
          
          // Draw first frame
          drawFrame(0);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++; // Increment to not halt completion logic
        if (loadedCount === totalFrames) {
          canvasLoading.classList.add('fade-out');
        }
      };
      
      img.src = `/images/scroll-frames/ezgif-frame-${formatFrameNumber(i)}.jpg`;
      images.push(img);
    }
    
    let tick = false;
    const handleScroll = () => {
      if (!tick) {
        window.requestAnimationFrame(() => {
          const rect = scrollWrapper.getBoundingClientRect();
          const stickyContainer = scrollWrapper.querySelector('.tour-sticky-container');
          
          if (stickyContainer) {
            const stickyHeight = stickyContainer.getBoundingClientRect().height;
            const wrapperHeight = rect.height;
            
            // Calculate progress of scroll within the wrapper track
            // Top offset matches CSS sticky top (100px for desktop, 80px for mobile)
            const stickyTopOffset = window.innerWidth <= 768 ? 80 : 100;
            const maxScroll = wrapperHeight - stickyHeight;
            
            let progress = (stickyTopOffset - rect.top) / maxScroll;
            progress = Math.max(0, Math.min(1, progress));
            
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            
            drawFrame(frameIndex);
            updateTourText(progress);
          }
          tick = false;
        });
        tick = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
  }

});
