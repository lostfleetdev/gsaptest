// Starlit Night Surprise - App Logic (Fixed Version)
class StarlitApp {
    constructor() {
        this.currentPhoto = 0;
        this.photos = [
            {
                id: 1,
                title: "Starlit Mountain Peak",
                description: "Where dreams touch the sky under countless stars, a moment of pure magic captured forever",
                date: "August 1, 2024",
                dominantColor: "#0D1B2A",
                image: "https://images.unsplash.com/photo-1483728642387-6c351b4d6788?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 2,
                title: "Moonlit Ocean Waves",
                description: "Gentle waves reflecting moonbeams, each ripple carrying wishes to distant shores",
                date: "August 2, 2024",
                dominantColor: "#2D3A52",
                image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 3,
                title: "Enchanted Forest Path",
                description: "A mysterious trail winds through ancient trees, lit by fireflies dancing in the darkness",
                date: "August 3, 2024",
                dominantColor: "#1A2E1A",
                image: "https://images.unsplash.com/photo-1501854143455-4c4d2b45b34a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 4,
                title: "City of Golden Lights",
                description: "Urban constellations twinkle below as the city sleeps, dreams rising like gentle smoke",
                date: "August 4, 2024",
                dominantColor: "#2A1F0D",
                image: "https://images.unsplash.com/photo-1490642914612-34836f3563a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
        ];

        this.isLoaded = false;
        this.init();
    }

    init() {
        // Wait for DOM and GSAP to be ready
        if (typeof gsap === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.setupGSAP();
        this.startLoadingSequence();
        this.setupEventListeners();
        this.initializePhotoAlbum();
        this.detectReducedMotion();
        this.isLoaded = true;
    }

    detectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }
    }

    setupGSAP() {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Setup scroll-triggered animations for cards
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            if (index === 0) return; // Skip loading card

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => this.animateCardEnter(card),
                    onLeave: () => this.animateCardLeave(card),
                    onEnterBack: () => this.animateCardEnter(card),
                    onLeaveBack: () => this.animateCardLeave(card)
                });
            }
        });
    }

    animateCardEnter(card) {
        gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    }

    animateCardLeave(card) {
        gsap.to(card, {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.4,
            ease: "power2.in"
        });
    }

    startLoadingSequence() {
        const progressFill = document.querySelector('.progress-fill');
        const loadingCard = document.getElementById('loading-card');
        
        if (!progressFill) return;
        
        // Animate progress bar
        gsap.to(progressFill, {
            width: '100%',
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
                setTimeout(() => {
                    this.transitionToIntro();
                }, 500);
            }
        });

        // Add stardust particles to progress bar
        this.createProgressParticles();
    }

    createProgressParticles() {
        const container = document.querySelector('.stardust-particles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #FFD166;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
            `;
            container.appendChild(particle);

            gsap.to(particle, {
                x: Math.random() * 300,
                y: Math.random() * 20 - 10,
                opacity: 1,
                duration: 0.5,
                delay: Math.random() * 2,
                repeat: -1,
                repeatDelay: Math.random() * 3,
                ease: "power2.out"
            });
        }
    }

    transitionToIntro() {
        const loadingCard = document.getElementById('loading-card');
        const introCard = document.getElementById('intro-card');
        
        if (!loadingCard) return;
        
        gsap.to(loadingCard, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                loadingCard.style.display = 'none';
                this.animateIntroElements();
            }
        });
    }

    animateIntroElements() {
        const title = document.querySelector('.intro-title');
        const button = document.querySelector('.open-gift-btn');
        
        if (!title || !button) return;
        
        gsap.timeline()
            .from(title, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            })
            .from(button, {
                y: 30,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");
    }

    setupEventListeners() {
        // Open Gift button
        const openGiftBtn = document.getElementById('open-gift-btn');
        if (openGiftBtn) {
            openGiftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToNext('intro-card');
                this.addStardustEffect(openGiftBtn);
            });
        }

        // Bloom button
        const bloomBtn = document.getElementById('bloom-btn');
        if (bloomBtn) {
            bloomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.bloomFlower();
            });
        }

        // Flip card button
        const flipBtn = document.getElementById('flip-btn');
        if (flipBtn) {
            flipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.flipCard();
            });
        }

        // Spoiler reveal button
        const revealBtn = document.getElementById('reveal-btn');
        if (revealBtn) {
            revealBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.revealSpoiler();
                this.addStardustEffect(revealBtn);
            });
        }

        // Photo album navigation
        const prevBtn = document.getElementById('prev-photo');
        const nextBtn = document.getElementById('next-photo');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousPhoto();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextPhoto();
            });
        }

        // Photo indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.currentPhoto = index;
                this.animatePhotoTransition('direct');
            });
        });

        // Finale buttons
        const replayBtn = document.getElementById('replay-btn');
        const shareBtn = document.getElementById('share-btn');
        
        if (replayBtn) {
            replayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.replayExperience();
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareExperience();
            });
        }

        // Touch swipe for photo album
        this.setupPhotoSwipe();

        // Add hover effects to buttons
        this.setupButtonHoverEffects();
    }

    addStardustEffect(button) {
        const effect = button.querySelector('.stardust-effect');
        if (!effect) return;

        // Clear existing particles
        effect.innerHTML = '';

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #FFD166;
                border-radius: 50%;
                pointer-events: none;
                top: 50%;
                left: 50%;
            `;
            effect.appendChild(particle);

            const angle = (i / 15) * 360;
            const distance = 30 + Math.random() * 20;
            
            gsap.to(particle, {
                x: Math.cos(angle * Math.PI / 180) * distance,
                y: Math.sin(angle * Math.PI / 180) * distance,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    scrollToNext(currentCardId) {
        const currentCard = document.getElementById(currentCardId);
        const nextCard = currentCard?.nextElementSibling;
        
        if (nextCard) {
            nextCard.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    bloomFlower() {
        const flower = document.querySelector('.flower');
        if (!flower) return;
        flower.classList.add('bloom');
    }

    flipCard() {
        const card = document.getElementById('flip-card');
        if (!card) return;
        card.classList.toggle('is-flipped');
    }

    revealSpoiler() {
        const mosaic = document.querySelector('.preview-mosaic');
        const revealBtn = document.getElementById('reveal-btn');
        
        if (!mosaic) return;
        
        mosaic.classList.add('revealed');
        
        if (revealBtn) {
            revealBtn.textContent = 'Revealed! ✨';
            revealBtn.disabled = true;
        }
        
        setTimeout(() => {
            this.scrollToNext('spoiler-card');
        }, 1000);
    }

    initializePhotoAlbum() {
        this.updatePhotoDisplay();
    }

    updatePhotoDisplay() {
        const photo = this.photos[this.currentPhoto];
        const photoImage = document.getElementById('photo-image');
        const photoGradient = document.getElementById('photo-gradient');
        const photoTitle = document.getElementById('photo-title');
        const photoDescription = document.getElementById('photo-description');
        const photoDate = document.getElementById('photo-date');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!photo) return;
        
        // Update content
        if(photoImage) photoImage.src = photo.image;
        if (photoTitle) photoTitle.textContent = photo.title;
        if (photoDescription) photoDescription.textContent = photo.description;
        if (photoDate) photoDate.textContent = photo.date;
        
        // Update gradient background
        const gradients = [
            'linear-gradient(135deg, #0D1B2A 0%, #2D3A52 50%, #1A2E1A 100%)',
            'linear-gradient(135deg, #2D3A52 0%, #0D1B2A 50%, #5F4B8B 100%)',
            'linear-gradient(135deg, #1A2E1A 0%, #5F4B8B 50%, #0D1B2A 100%)',
            'linear-gradient(135deg, #2A1F0D 0%, #FFD166 30%, #0D1B2A 100%)'
        ];
        
        if (photoGradient) {
            photoGradient.style.background = gradients[this.currentPhoto];
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentPhoto);
        });
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-photo');
        const nextBtn = document.getElementById('next-photo');
        
        if (prevBtn) prevBtn.disabled = this.currentPhoto === 0;
        if (nextBtn) nextBtn.disabled = this.currentPhoto === this.photos.length - 1;
    }

    previousPhoto() {
        if (this.currentPhoto > 0) {
            this.currentPhoto--;
            this.animatePhotoTransition('left');
        }
    }

    nextPhoto() {
        if (this.currentPhoto < this.photos.length - 1) {
            this.currentPhoto++;
            this.animatePhotoTransition('right');
        }
    }

    animatePhotoTransition(direction) {
        const photoContent = document.getElementById('photo-content');
        
        if (!photoContent) return;
        
        // Slide out animation
        gsap.to(photoContent, {
            x: direction === 'right' ? -50 : (direction === 'left' ? 50 : 0),
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                // Update content
                this.updatePhotoDisplay();
                
                // Slide in animation
                gsap.fromTo(photoContent, 
                    {
                        x: direction === 'right' ? 50 : (direction === 'left' ? -50 : 0),
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    }
                );
            }
        });
    }

    setupPhotoSwipe() {
        const photoDisplay = document.querySelector('.photo-display');
        if (!photoDisplay) return;
        
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const handleStart = (e) => {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            currentX = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX;
        };

        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            if (Math.abs(currentX) > 50) {
                if (currentX > 0 && this.currentPhoto > 0) {
                    this.previousPhoto();
                } else if (currentX < 0 && this.currentPhoto < this.photos.length - 1) {
                    this.nextPhoto();
                }
            }
            
            currentX = 0;
        };

        photoDisplay.addEventListener('mousedown', handleStart);
        photoDisplay.addEventListener('mousemove', handleMove);
        photoDisplay.addEventListener('mouseup', handleEnd);

        photoDisplay.addEventListener('touchstart', handleStart, { passive: true });
        photoDisplay.addEventListener('touchmove', handleMove, { passive: true });
        photoDisplay.addEventListener('touchend', handleEnd);
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    replayExperience() {
        // Reset all states
        this.currentPhoto = 0;
        
        // Scroll to top smoothly
        const container = document.querySelector('.app-container');
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Reset spoiler
        const mosaic = document.querySelector('.preview-mosaic');
        const revealBtn = document.getElementById('reveal-btn');
        
        if (mosaic) mosaic.classList.remove('revealed');
        if (revealBtn) {
            revealBtn.textContent = 'Reveal';
            revealBtn.disabled = false;
        }
        
        // Reset photo album
        this.updatePhotoDisplay();
        
        // Show loading card and restart
        const loadingCard = document.getElementById('loading-card');
        if (loadingCard) {
            loadingCard.style.display = 'flex';
            gsap.set(loadingCard, { opacity: 1 });
            gsap.set('.progress-fill', { width: '0%' });
            
            setTimeout(() => {
                this.startLoadingSequence();
            }, 500);
        }
    }

    shareExperience() {
        const shareData = {
            title: 'Starlit Night Surprise',
            text: 'Experience a magical journey under the stars ✨',
            url: window.location.href
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Fallback - copy to clipboard
        const url = window.location.href;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                this.showShareNotification('Link copied to clipboard! ✨');
            }).catch(() => {
                this.showShareNotification('Starlit Night Surprise: ' + url);
            });
        } else {
            // Even older browser fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showShareNotification('Link copied to clipboard! ✨');
            } catch (err) {
                this.showShareNotification('Share this link: ' + url);
            }
            
            document.body.removeChild(textArea);
        }
    }

    showShareNotification(message) {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--star-gold);
            color: var(--starlit-night-blue);
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 80%;
            text-align: center;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        gsap.fromTo(notification, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
        
        setTimeout(() => {
            gsap.to(notification, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => notification.remove()
            });
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StarlitApp();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.pause();
        }
    } else {
        // Resume animations when page becomes visible
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.resume();
        }
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger on resize
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});