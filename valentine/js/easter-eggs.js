/* ===================================================================
   easter-eggs.js — All 14 Easter Eggs + localStorage Tracking
   =================================================================== */

(function () {
    'use strict';

    // Track found eggs
    const STORAGE_KEY = 'eternal-tour-eggs';
    let foundEggs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    function markFound(eggNum) {
        if (!foundEggs.includes(eggNum)) {
            foundEggs.push(eggNum);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(foundEggs));
        }
    }

    // ======== EASTER EGG #1: Click #140324 → hearts float up ========
    const passNumber = document.getElementById('pass-number');
    if (passNumber) {
        passNumber.addEventListener('click', () => {
            markFound(1);
            const rect = passNumber.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            window.particleSystem.emit(x, y, 15, {
                vy: -3,
                spread: 2,
                colors: ['#e63946', '#ff6b81', '#ff4757'],
                shape: 'heart',
                size: 6,
                decay: 0.015,
                gravity: -0.02,
            });
        });
    }

    // ======== EASTER EGG #2: Hover 3+ sec on "Beautiful Night Club" → starry night ========
    const beautifulNight = document.getElementById('beautiful-night');
    const starryOverlay = document.getElementById('starry-night-overlay');
    let nightHoverTimer = null;

    if (beautifulNight && starryOverlay) {
        beautifulNight.addEventListener('mouseenter', () => {
            nightHoverTimer = setTimeout(() => {
                markFound(2);
                starryOverlay.classList.add('active');
                setTimeout(() => {
                    starryOverlay.classList.remove('active');
                }, 4000);
            }, 3000);
        });

        beautifulNight.addEventListener('mouseleave', () => {
            if (nightHoverTimer) clearTimeout(nightHoverTimer);
        });
    }

    // ======== EASTER EGG #3: Click "TOKYO, JAPAN" → airplane flies across ========
    const tokyoCity = document.getElementById('tokyo-city');
    const airplane = document.getElementById('airplane');

    if (tokyoCity && airplane) {
        tokyoCity.addEventListener('click', () => {
            markFound(3);
            airplane.classList.remove('flying');
            void airplane.offsetWidth;
            airplane.classList.add('flying');
            setTimeout(() => airplane.classList.remove('flying'), 3000);
        });
    }

    // ======== EASTER EGG #4: Click "Three Days of Thunder" → page shake + flash ========
    const thunderSong = document.getElementById('thunder-song');

    if (thunderSong) {
        thunderSong.addEventListener('click', () => {
            markFound(4);

            // Page shake
            document.body.classList.add('page-shake');
            setTimeout(() => document.body.classList.remove('page-shake'), 500);

            // Lightning flash
            const flash = document.createElement('div');
            flash.className = 'lightning-flash';
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 300);
        });
    }

    // ======== EASTER EGG #5: Click "Ocean Apart" → teardrop stain ========
    const oceanSong = document.getElementById('ocean-song');
    const teardrop = document.getElementById('teardrop');

    if (oceanSong && teardrop) {
        oceanSong.addEventListener('click', () => {
            markFound(5);
            teardrop.classList.add('visible');
        });
    }

    // ======== EASTER EGG #6: Click "THE RING" 3 times → spinning vinyl ========
    const ringAlbum = document.getElementById('ring-album');
    let ringClicks = 0;
    let ringClickTimer = null;

    if (ringAlbum) {
        ringAlbum.addEventListener('click', (e) => {
            ringClicks++;
            if (ringClickTimer) clearTimeout(ringClickTimer);
            ringClickTimer = setTimeout(() => { ringClicks = 0; }, 1500);

            if (ringClicks >= 3) {
                markFound(6);
                e.stopPropagation();
                ringAlbum.classList.toggle('spinning');
                ringClicks = 0;
            }
        });
    }

    // ======== EASTER EGG #7: "Nothing Else Matters" on guitar ========
    // (Handled in main.js via guitarAudio callback — just mark it found)
    if (window.guitarAudio) {
        const originalCallback = window.guitarAudio.nemCallback;
        window.guitarAudio.onNothingElseMatters(() => {
            markFound(7);
            if (originalCallback) originalCallback();
        });
    }

    // ======== EASTER EGG #8: Double-click ticket → flip ========
    // (The flip is handled in main.js. Just mark it found.)
    const theTicket = document.getElementById('the-ticket');
    if (theTicket) {
        theTicket.addEventListener('dblclick', () => {
            markFound(8);
        });
    }

    // ======== EASTER EGG #9: Backstage door ========
    const backstageDoor = document.getElementById('backstage-door');
    const backstageOverlay = document.getElementById('backstage-overlay');
    const backstageClose = document.querySelector('.backstage-close');

    if (backstageDoor && backstageOverlay) {
        backstageDoor.addEventListener('click', () => {
            markFound(9);
            backstageOverlay.classList.add('active');
        });
    }

    if (backstageClose && backstageOverlay) {
        backstageClose.addEventListener('click', () => {
            backstageOverlay.classList.remove('active');
        });
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backstageOverlay) {
            backstageOverlay.classList.remove('active');
        }
    });

    // ======== EASTER EGG #10: Type "manas" → guitar pick cursor ========
    let typedBuffer = '';

    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            typedBuffer += e.key.toLowerCase();
            if (typedBuffer.length > 20) typedBuffer = typedBuffer.slice(-20);

            if (typedBuffer.includes('manas')) {
                markFound(10);
                document.body.classList.add('guitar-pick-cursor');
                typedBuffer = '';
                setTimeout(() => {
                    document.body.classList.remove('guitar-pick-cursor');
                }, 30000);
            }
        }
    });

    // ======== EASTER EGG #11: Click "M" in MANAS at finale → mini firework ========
    const mLetter = document.querySelector('.encore-name .letter[data-letter="M"]');
    if (mLetter) {
        mLetter.addEventListener('click', (e) => {
            e.stopPropagation();
            markFound(11);
            const rect = mLetter.getBoundingClientRect();
            window.particleSystem.firework(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        });
    }

    // ======== EASTER EGG #12: Scroll past bottom → secret footer text ========
    // (The text is already in HTML at very low opacity. Just mark it as found when footer is visible.)
    const footer = document.getElementById('site-footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    markFound(12);
                }
            });
        }, { threshold: 0.5 });
        footerObserver.observe(footer);
    }

    // ======== EASTER EGG #13: Right-click → custom context menu ========
    const contextMenu = document.getElementById('custom-context-menu');

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        markFound(13);

        if (contextMenu) {
            contextMenu.style.left = e.clientX + 'px';
            contextMenu.style.top = e.clientY + 'px';
            contextMenu.classList.add('visible');

            setTimeout(() => {
                contextMenu.classList.remove('visible');
            }, 2500);
        }
    });

    // Hide context menu on click
    document.addEventListener('click', () => {
        if (contextMenu) contextMenu.classList.remove('visible');
    });

    // ======== EASTER EGG #14: Konami Code → wild light show ========
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;
    const konamiOverlay = document.getElementById('konami-overlay');

    document.addEventListener('keydown', (e) => {
        const expected = konamiSequence[konamiIndex];
        if (e.key === expected || e.key.toLowerCase() === expected) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                markFound(14);
                konamiIndex = 0;
                activateKonami();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonami() {
        if (!konamiOverlay) return;
        konamiOverlay.classList.add('active');

        // Burst particles too
        window.particleSystem.burst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            100,
            {
                speed: 10,
                colors: ['#e63946', '#f4a261', '#9b5de5', '#fff', '#ff6b81'],
                shapes: ['circle', 'star', 'heart'],
                gravity: 0.02,
                decay: 0.01,
            }
        );

        setTimeout(() => {
            konamiOverlay.classList.remove('active');
        }, 5000);
    }

})();
