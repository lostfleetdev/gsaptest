// Enhanced Photo data from provided JSON
const photosData = {
  "photos": [
    {
      "id": 1,
      "title": "The Confused Cat",
      "message": "This little guy seems to be questioning all of life's mysteries while sitting in a tiny box that's clearly too small for his philosophical thoughts.",
      "image": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop"
    },
    {
      "id": 2,
      "title": "Floating Pizza",
      "message": "Someone clearly forgot the laws of physics when they took this perfectly timed shot! This pizza has mastered the ancient art of levitation.",
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop"
    },
    {
      "id": 3,
      "title": "The Thinking Llama",
      "message": "This llama appears to be contemplating the meaning of existence... or maybe just wondering where all the good hay went. Deep thoughts from our fluffy friend.",
      "image": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop"
    },
    {
      "id": 4,
      "title": "Upside Down World",
      "message": "Everything is topsy-turvy in this mind-bending optical illusion that'll make you question which way is up! Reality is clearly overrated.",
      "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
    },
    {
      "id": 5,
      "title": "The Dancing Cactus",
      "message": "Who knew cacti could have such rhythm? This spiky friend is showing off some serious moves that would make professional dancers jealous.",
      "image": "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=600&h=400&fit=crop"
    },
    {
      "id": 6,
      "title": "Gravity-Defying Coffee",
      "message": "This coffee cup has clearly mastered the art of levitation. Science teachers hate this one weird trick that defies all known laws of physics!",
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
    },
    {
      "id": 7,
      "title": "The Judgemental Owl",
      "message": "This owl is giving you the ultimate stink eye and silently judging all your questionable life choices. Those eyes see straight into your soul.",
      "image": "https://images.unsplash.com/photo-1539628399213-d6aa2acb2104?w=600&h=400&fit=crop"
    },
    {
      "id": 8,
      "title": "Miniature Giant",
      "message": "Perspective is everything! This 'giant' person is actually just really good at forced perspective photography. Size really doesn't matter when you have creativity!",
      "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
    }
  ]
};

// Global state management
let currentPhotoIndex = 0;
let currentStage = 'gift-card';
let isTransitioning = false;

// Enhanced stage management with smooth transitions
function switchToStage(targetStage) {
  if (isTransitioning) return;
  
  console.log(`🎬 Switching from ${currentStage} to ${targetStage}`);
  isTransitioning = true;
  
  const currentStageElement = document.querySelector('.stage.active');
  const targetStageElement = document.getElementById(targetStage + '-stage');

  if (currentStageElement && targetStageElement) {
    currentStageElement.classList.remove('active');
    currentStageElement.classList.add('exiting');
    
    setTimeout(() => {
      currentStageElement.classList.remove('exiting');
      targetStageElement.classList.add('active');
      currentStage = targetStage;
      isTransitioning = false;
      console.log(`✅ Successfully switched to ${targetStage}`);
    }, 200);
  } else {
    console.error('❌ Stage elements not found:', { currentStageElement, targetStageElement });
    isTransitioning = false;
  }
}

// Enhanced ripple effect with better positioning
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = button.querySelector('.ripple-effect');
  
  if (!ripple) return;

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  // Reset animation
  ripple.style.animation = 'none';
  ripple.offsetHeight; // Trigger reflow
  ripple.style.animation = 'ripple-animation 0.6s linear';
}

// Stage 1: Enhanced Gift Card with Cake Animation
function initGiftCardStage() {
  console.log('🎂 Initializing Gift Card Stage');
  
  const openGiftBtn = document.getElementById('open-gift-btn');
  const cakeContainer = document.getElementById('cake-container');
  const continueBtn = document.getElementById('continue-from-cake');
  const confettiContainer = document.getElementById('confetti-container');
  
  if (!openGiftBtn) {
    console.error('❌ Open gift button not found');
    return;
  }
  
  openGiftBtn.addEventListener('click', (e) => {
    console.log('🎁 Open Gift button clicked');
    createRipple(e);
    
    // Disable button to prevent multiple clicks
    openGiftBtn.disabled = true;
    openGiftBtn.style.opacity = '0.6';
    
    // Start the cake animation sequence
    setTimeout(() => {
      console.log('🎂 Starting cake animation');
      
      // Hide the open gift button
      openGiftBtn.style.transition = 'all 0.3s ease';
      openGiftBtn.style.opacity = '0';
      openGiftBtn.style.transform = 'translateY(20px)';
      
      // Show cake with bounce animation
      setTimeout(() => {
        if (cakeContainer) {
          cakeContainer.classList.remove('hidden');
          cakeContainer.classList.add('show');
          console.log('🎂 Cake container shown');
        }
        
        // Trigger confetti
        if (confettiContainer) {
          confettiContainer.classList.add('active');
          console.log('🎉 Confetti activated');
        }
        
        // Show continue button after cake animation
        setTimeout(() => {
          if (continueBtn) {
            continueBtn.classList.remove('hidden');
            continueBtn.style.transition = 'all 0.5s ease';
            continueBtn.style.opacity = '1';
            continueBtn.style.transform = 'translateY(0)';
            console.log('⏭️ Continue button shown');
          }
        }, 1200);
        
        // Hide confetti after animation
        setTimeout(() => {
          if (confettiContainer) {
            confettiContainer.classList.remove('active');
          }
        }, 3500);
        
      }, 400);
    }, 300);
  });
  
  if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
      console.log('⏭️ Continue from cake clicked');
      createRipple(e);
      setTimeout(() => {
        switchToStage('envelope');
        setTimeout(initEnvelopeStage, 400);
      }, 200);
    });
  }
}

// Stage 2: Enhanced Envelope with Full Opening Animation
function initEnvelopeStage() {
  console.log('✉️ Initializing Envelope Stage');
  
  const envelope = document.getElementById('envelope');
  const letterContainer = document.getElementById('letter-container');
  const continueBtn = document.getElementById('continue-from-envelope');
  
  // Start envelope opening sequence
  setTimeout(() => {
    if (envelope) {
      envelope.classList.add('opening');
      console.log('✉️ Envelope opening animation started');
    }
  }, 600);
  
  // Show letter after envelope opens
  setTimeout(() => {
    if (letterContainer) {
      letterContainer.classList.add('show');
      console.log('📝 Letter revealed');
    }
  }, 1400);
  
  // Show continue button after letter is revealed
  setTimeout(() => {
    if (continueBtn) {
      continueBtn.classList.remove('hidden');
      continueBtn.style.transition = 'all 0.5s ease';
      continueBtn.style.opacity = '1';
      continueBtn.style.transform = 'translateY(0)';
      console.log('⏭️ Continue button from envelope shown');
    }
  }, 2200);
  
  if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
      console.log('⏭️ Continue from envelope clicked');
      createRipple(e);
      setTimeout(() => {
        switchToStage('spoiler');
        setTimeout(initSpoilerStage, 400);
      }, 200);
    });
  }
}

// Stage 3: Spoiler Warning with Blur Reveal
function initSpoilerStage() {
  console.log('⚠️ Initializing Spoiler Stage');
  
  const revealBtn = document.getElementById('reveal-photos-btn');
  const blurredPreview = document.getElementById('blurred-preview');
  
  if (revealBtn) {
    revealBtn.addEventListener('click', (e) => {
      console.log('👁️ Reveal photos clicked');
      createRipple(e);
      
      // Start blur reveal animation
      if (blurredPreview) {
        blurredPreview.classList.add('revealing');
        console.log('🌊 Blur reveal started');
      }
      
      setTimeout(() => {
        switchToStage('photo-album');
        setTimeout(() => {
          initPhotoAlbumStage();
        }, 400);
      }, 1600);
    });
  }
}

// Stage 4: Enhanced Photo Album with Cassie Codes Layout
function initPhotoAlbumStage() {
  console.log('📸 Initializing Photo Album Stage');
  
  // Initialize photo indicators
  createPhotoIndicators();
  
  // Load first photo
  loadPhoto(0);
  
  // Setup navigation
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');
  
  if (navPrev) {
    navPrev.addEventListener('click', () => {
      console.log('⬅️ Previous photo clicked');
      navigatePhoto(-1);
    });
  }
  
  if (navNext) {
    navNext.addEventListener('click', () => {
      console.log('➡️ Next photo clicked');
      navigatePhoto(1);
    });
  }
  
  // Setup touch gestures and keyboard navigation
  setupTouchGestures();
  setupKeyboardNavigation();
}

function createPhotoIndicators() {
  const indicatorsContainer = document.getElementById('photo-indicators');
  if (!indicatorsContainer) return;
  
  indicatorsContainer.innerHTML = '';
  
  photosData.photos.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'indicator-dot';
    if (index === 0) dot.classList.add('active');
    
    dot.addEventListener('click', () => {
      if (index !== currentPhotoIndex) {
        console.log(`📍 Indicator ${index} clicked`);
        loadPhoto(index);
      }
    });
    
    indicatorsContainer.appendChild(dot);
  });
  
  console.log('📍 Photo indicators created');
}

function loadPhoto(index) {
  if (index < 0 || index >= photosData.photos.length) return;
  
  console.log(`📸 Loading photo ${index}`);
  
  const photo = photosData.photos[index];
  const currentPhoto = document.getElementById('current-photo');
  const photoTitle = document.getElementById('photo-title');
  const photoDescription = document.getElementById('photo-description');
  const photoLoader = document.getElementById('photo-loader');
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');
  
  // Show loader
  if (photoLoader) photoLoader.style.display = 'block';
  if (currentPhoto) currentPhoto.style.opacity = '0.5';
  
  // Create new image to ensure proper loading
  const img = new Image();
  
  img.onload = () => {
    console.log(`✅ Photo ${index} loaded successfully`);
    
    // Update photo
    if (currentPhoto) {
      currentPhoto.src = photo.image;
      currentPhoto.alt = photo.title;
    }
    
    // Update text content with smooth animation
    if (photoTitle && photoDescription) {
      photoTitle.style.opacity = '0';
      photoDescription.style.opacity = '0';
      
      setTimeout(() => {
        photoTitle.textContent = photo.title;
        photoDescription.textContent = photo.message;
        
        photoTitle.style.opacity = '1';
        photoDescription.style.opacity = '1';
      }, 150);
    }
    
    // Hide loader and show photo
    if (photoLoader) photoLoader.style.display = 'none';
    if (currentPhoto) currentPhoto.style.opacity = '1';
    
    // Update current index
    currentPhotoIndex = index;
    
    // Update navigation buttons
    if (navPrev) navPrev.disabled = index === 0;
    if (navNext) navNext.disabled = index === photosData.photos.length - 1;
    
    // Update indicators
    updatePhotoIndicators();
  };
  
  img.onerror = () => {
    console.warn(`⚠️ Failed to load image: ${photo.image}`);
    if (photoLoader) photoLoader.style.display = 'none';
    if (currentPhoto) currentPhoto.style.opacity = '1';
  };
  
  img.src = photo.image;
}

function updatePhotoIndicators() {
  const indicators = document.querySelectorAll('.indicator-dot');
  indicators.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPhotoIndex);
  });
}

function navigatePhoto(direction) {
  const newIndex = currentPhotoIndex + direction;
  if (newIndex >= 0 && newIndex < photosData.photos.length) {
    loadPhoto(newIndex);
  }
}

// Touch gesture support for photo swiping
function setupTouchGestures() {
  const photoContainer = document.querySelector('.photo-container');
  if (!photoContainer) return;
  
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  
  photoContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  photoContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 75;
    const verticalThreshold = 100;
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Only handle horizontal swipes
    if (verticalDistance > verticalThreshold) return;
    
    if (Math.abs(horizontalDistance) > swipeThreshold) {
      if (horizontalDistance > 0 && currentPhotoIndex > 0) {
        console.log('👈 Swipe right - previous photo');
        navigatePhoto(-1);
      } else if (horizontalDistance < 0 && currentPhotoIndex < photosData.photos.length - 1) {
        console.log('👉 Swipe left - next photo');
        navigatePhoto(1);
      }
    }
  }
  
  console.log('👆 Touch gestures setup complete');
}

// Keyboard navigation support
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (currentStage !== 'photo-album') return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentPhotoIndex > 0) {
          console.log('⌨️ Left arrow - previous photo');
          navigatePhoto(-1);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentPhotoIndex < photosData.photos.length - 1) {
          console.log('⌨️ Right arrow - next photo');
          navigatePhoto(1);
        }
        break;
      case ' ':
        e.preventDefault();
        if (currentPhotoIndex < photosData.photos.length - 1) {
          console.log('⌨️ Space - next photo');
          navigatePhoto(1);
        }
        break;
    }
  });
  
  console.log('⌨️ Keyboard navigation setup complete');
}

// Performance optimization: Preload images
function preloadImages() {
  console.log('🔄 Preloading images...');
  
  const imagePromises = photosData.photos.slice(0, 4).map(photo => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = photo.image;
    });
  });
  
  Promise.all(imagePromises)
    .then(() => console.log('✅ Critical images preloaded successfully'))
    .catch(() => console.log('⚠️ Some images failed to preload'));
}

// Initialize application with enhanced error handling
function initializeApp() {
  console.log('🌺 Enhanced Poppy Gift Card App Initializing...');
  
  try {
    // Verify critical elements exist
    const criticalElements = [
      'gift-card-stage',
      'envelope-stage', 
      'spoiler-stage',
      'photo-album-stage',
      'open-gift-btn'
    ];
    
    const missingElements = criticalElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
      console.error('❌ Missing critical elements:', missingElements);
      return;
    }
    
    // Initialize first stage
    initGiftCardStage();
    
    // Setup performance optimizations
    preloadImages();
    
    // Add visual feedback for app ready state
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
    
    console.log('✨ App ready! Click "Open Gift" to start your journey!');
    
  } catch (error) {
    console.error('❌ App initialization failed:', error);
    
    // Fallback error handling
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="text-align: center; padding: 50px; font-family: var(--font-family-base); max-width: 400px; margin: 0 auto; background: var(--color-surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
        <h1 style="color: #E53E3E; margin-bottom: 16px;">Oops! Something went wrong</h1>
        <p style="margin-bottom: 24px; color: var(--color-text-secondary);">Please refresh the page to try again.</p>
        <button onclick="location.reload()" style="padding: 12px 24px; background: #E53E3E; color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 16px;">
          Refresh Page
        </button>
      </div>
    `;
    document.body.appendChild(errorDiv);
  }
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  const animations = document.querySelectorAll('.petal, .confetti, .cake');
  if (document.hidden) {
    animations.forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    animations.forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});

// Initialize the application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Global error handlers
window.addEventListener('error', (e) => {
  console.error('❌ Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('❌ Unhandled promise rejection:', e.reason);
  e.preventDefault();
});

// Debug exports
if (typeof window !== 'undefined') {
  window.AppDebug = {
    photosData,
    currentPhotoIndex: () => currentPhotoIndex,
    currentStage: () => currentStage,
    switchToStage,
    loadPhoto,
    initGiftCardStage,
    initEnvelopeStage,
    initSpoilerStage,
    initPhotoAlbumStage
  };
}