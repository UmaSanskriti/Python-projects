/* ===================================================================
   main.js — Scroll Logic, Intersection Observer, Vinyl Nav, Wristband,
              Stage Lights, Guitar String Interaction
   =================================================================== */

(function () {
    'use strict';

    // ---- Section names for vinyl tooltip ----
    const sectionNames = [
        'SOUNDCHECK', 'BACKSTAGE PASS', 'TOUR DATES', 'THE SETLIST',
        'THE DISCOGRAPHY', 'THE STAGE', 'TICKET STUB', 'THE ENCORE'
    ];

    const sections = document.querySelectorAll('.section');
    const stamps = document.querySelectorAll('#wristband .stamp');
    const vinylRecord = document.querySelector('.vinyl-record');
    const vinylTooltip = document.querySelector('.vinyl-tooltip');
    const vinylTonearm = document.querySelector('.vinyl-tonearm');
    const vinylNav = document.getElementById('vinyl-nav');
    let currentSectionIndex = 0;

    // ---- Intersection Observer for scroll animations ----
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        animObserver.observe(el);
    });

    // ---- Section Observer for wristband stamps ----
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = parseInt(entry.target.dataset.section);
                if (!isNaN(idx)) {
                    currentSectionIndex = idx;
                    // Mark stamp as collected
                    if (stamps[idx]) stamps[idx].classList.add('collected');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ---- Vinyl Navigator: scroll-linked rotation ----
    function updateVinyl() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;

        // Rotate vinyl proportional to scroll
        const rotation = progress * 720; // Two full rotations over entire page
        if (vinylRecord) {
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
        }

        // Move tonearm
        if (vinylTonearm) {
            const armAngle = -30 + progress * 25; // -30deg to -5deg
            vinylTonearm.style.transform = `rotate(${armAngle}deg)`;
        }

        // Update tooltip
        if (vinylTooltip) {
            vinylTooltip.textContent = sectionNames[currentSectionIndex] || '';
        }
    }

    window.addEventListener('scroll', updateVinyl, { passive: true });
    updateVinyl();

    // ---- Vinyl click to jump ----
    if (vinylNav) {
        vinylNav.addEventListener('click', () => {
            const next = (currentSectionIndex + 1) % sections.length;
            sections[next].scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- Stage Lights: mouse-reactive ----
    const stageSection = document.getElementById('the-stage');
    const stageLights = stageSection ? stageSection.querySelectorAll('.stage-light') : [];

    if (stageSection) {
        stageSection.addEventListener('mousemove', (e) => {
            const rect = stageSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;  // 0 to 1
            const y = (e.clientY - rect.top) / rect.height;   // 0 to 1

            stageLights.forEach((light, i) => {
                // Each light follows mouse with offset and easing
                const offsetX = (i - 1.5) * 15; // Spread them apart
                const offsetY = (i % 2) * 10;
                const tx = (x - 0.5) * 100 + offsetX;
                const ty = (y - 0.5) * 50 + offsetY;
                light.style.transform = `translate(${tx}px, ${ty}px)`;
            });
        });
    }

    // ---- Guitar Strings: hover to play ----
    const guitarStrings = document.querySelectorAll('.guitar-string');
    let lastPlayedString = -1;

    guitarStrings.forEach(string => {
        const handler = (e) => {
            const idx = parseInt(string.dataset.string);
            if (idx === lastPlayedString) return;
            lastPlayedString = idx;

            // Vibrate animation
            string.classList.remove('vibrating');
            void string.offsetWidth; // Force reflow
            string.classList.add('vibrating');

            // Play sound
            if (window.guitarAudio) {
                window.guitarAudio.init();
                window.guitarAudio.playString(idx);
            }

            setTimeout(() => { lastPlayedString = -1; }, 200);
        };

        string.addEventListener('mouseenter', handler);
        // Touch support
        string.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handler(e);
        }, { passive: false });
    });

    // ---- Start embers on stage section visibility ----
    const emberCanvas = document.getElementById('ember-canvas');
    let embersStarted = false;

    if (stageSection && emberCanvas) {
        const emberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !embersStarted) {
                    embersStarted = true;
                    window.particleSystem.startEmbers(emberCanvas);
                }
            });
        }, { threshold: 0.1 });

        emberObserver.observe(stageSection);
    }

    // ---- Album card flip ----
    document.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't flip if this is the ring album spinning easter egg
            if (card.id === 'ring-album' && card.classList.contains('spinning')) {
                card.classList.remove('spinning');
                return;
            }
            card.classList.toggle('flipped');
        });
    });

    // ---- Ticket flip ----
    const ticket = document.getElementById('the-ticket');
    if (ticket) {
        ticket.addEventListener('dblclick', () => {
            ticket.classList.toggle('flipped');
        });
    }

    // ---- "Nothing Else Matters" easter egg callback ----
    if (window.guitarAudio) {
        window.guitarAudio.onNothingElseMatters(() => {
            if (!stageSection) return;

            const stageText = stageSection.querySelector('.stage-text');
            const originalText = stageText ? stageText.textContent : '';

            stageSection.classList.add('nem-mode');
            if (stageText) stageText.textContent = 'Nothing else matters.';

            setTimeout(() => {
                stageSection.classList.remove('nem-mode');
                if (stageText) stageText.textContent = originalText;
            }, 5000);
        });
    }

    // ---- Handle resize for ember canvas ----
    window.addEventListener('resize', () => {
        if (emberCanvas && stageSection) {
            emberCanvas.width = stageSection.offsetWidth;
            emberCanvas.height = stageSection.offsetHeight;
        }
    });

})();
