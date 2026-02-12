/* ===================================================================
   finale.js — Encore Sequence + Button Logic + Celebration Explosion
   =================================================================== */

(function () {
    'use strict';

    const encoreSection = document.getElementById('encore');
    const encoreOverlay = encoreSection ? encoreSection.querySelector('.encore-overlay') : null;
    const encoreChant = encoreSection ? encoreSection.querySelector('.encore-chant') : null;
    const encoreSpotlight = encoreSection ? encoreSection.querySelector('.encore-spotlight') : null;
    const encoreName = document.getElementById('encore-name');
    const encoreQuestion = encoreSection ? encoreSection.querySelector('.encore-question') : null;
    const encoreButtons = encoreSection ? encoreSection.querySelector('.encore-buttons') : null;
    const btnYes = document.getElementById('btn-hell-yes');
    const btnConvince = document.getElementById('btn-convince');
    const convinceReasons = encoreSection ? encoreSection.querySelector('.convince-reasons') : null;
    const celebration = encoreSection ? encoreSection.querySelector('.celebration') : null;
    const celebrationCanvas = document.getElementById('celebration-canvas');

    let sequencePlayed = false;
    let convinceCount = 0;

    const convinceTexts = [
        { button: "Are you sure?", reason: "Because I'll always save you a spot in the front row." },
        { button: "Really though?", reason: "Because nobody headbangs through life better than us." },
        { button: "I'll wait...", reason: "Because you're my encore every single day." },
        { button: "...but not really", reason: "Because from Bumble to forever was always the plan." },
        { button: "Last chance!", reason: "Because 22,000 miles apart and I still choose you every morning." },
    ];

    // ---- Encore Sequence (scroll-triggered) ----
    function playEncoreSequence() {
        if (sequencePlayed || !encoreSection) return;
        sequencePlayed = true;

        // Step 1: Lights Out (0.0s)
        if (encoreOverlay) {
            encoreOverlay.style.opacity = '1';
        }

        // Step 2: Crowd Chant (0.5s) — flicker EN-CORE! 3 times
        setTimeout(() => {
            if (!encoreChant) return;
            encoreChant.style.visibility = 'visible';
            let flicks = 0;
            const flickerInterval = setInterval(() => {
                encoreChant.style.opacity = encoreChant.style.opacity === '1' ? '0' : '1';
                flicks++;
                if (flicks >= 6) {
                    clearInterval(flickerInterval);
                    encoreChant.style.opacity = '0';
                    encoreChant.style.visibility = 'hidden';
                }
            }, 250);
        }, 500);

        // Step 3: Spotlight (2.5s)
        setTimeout(() => {
            if (encoreSpotlight) {
                encoreSpotlight.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 2500);

        // Step 4: The Name (3.5s) — letter by letter
        setTimeout(() => {
            if (!encoreName) return;
            encoreName.style.opacity = '1';
            const letters = encoreName.querySelectorAll('.letter');
            letters.forEach((letter, i) => {
                setTimeout(() => {
                    letter.classList.add('visible');
                }, i * 200);
            });
        }, 3500);

        // Step 5: The Question (5.0s)
        setTimeout(() => {
            if (encoreQuestion) {
                encoreQuestion.style.opacity = '1';
                encoreQuestion.style.transition = 'opacity 0.8s ease';
            }
        }, 5000);

        // Step 6: Buttons (6.5s)
        setTimeout(() => {
            if (encoreButtons) {
                encoreButtons.style.opacity = '1';
                encoreButtons.style.transition = 'opacity 0.5s ease';
            }
        }, 6500);
    }

    // ---- Observe encore section ----
    if (encoreSection) {
        const encoreObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playEncoreSequence();
                    encoreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        encoreObserver.observe(encoreSection);
    }

    // ---- "HELL YES" button ----
    function triggerCelebration() {
        if (!encoreSection) return;

        // Hide buttons and convince reasons
        if (encoreButtons) encoreButtons.style.display = 'none';
        if (convinceReasons) convinceReasons.style.display = 'none';

        // Warm background
        encoreSection.style.background = 'linear-gradient(135deg, #2a0a0a, #1a0a00, #0a0a0a)';

        // Show celebration text
        if (celebration) celebration.classList.add('active');

        // Canvas explosion
        if (celebrationCanvas) {
            celebrationCanvas.width = encoreSection.offsetWidth;
            celebrationCanvas.height = encoreSection.offsetHeight;

            const cx = celebrationCanvas.width / 2;
            const cy = celebrationCanvas.height / 2;

            // Use global particle system for the big burst
            window.particleSystem.burst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                200,
                {
                    speed: 12,
                    gravity: 0.06,
                    friction: 0.97,
                    decay: 0.005,
                    colors: ['#e63946', '#f4a261', '#ff6b81', '#ffd700', '#fff', '#9b5de5'],
                    shapes: ['circle', 'heart', 'star', 'square'],
                    size: 5,
                }
            );

            // Second delayed burst
            setTimeout(() => {
                window.particleSystem.burst(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    100,
                    {
                        speed: 8,
                        gravity: 0.04,
                        decay: 0.006,
                        colors: ['#ffd700', '#f4a261', '#fff'],
                        shapes: ['star', 'circle'],
                        size: 3,
                    }
                );
            }, 500);

            // Start persistent sparkles
            setTimeout(() => {
                window.particleSystem.startSparkles();
            }, 2000);
        }
    }

    if (btnYes) {
        btnYes.addEventListener('click', triggerCelebration);
    }

    // ---- "NEED MORE CONVINCING" button ----
    if (btnConvince) {
        btnConvince.addEventListener('click', () => {
            if (convinceCount < convinceTexts.length) {
                const data = convinceTexts[convinceCount];

                // Add reason
                if (convinceReasons) {
                    const reason = document.createElement('p');
                    reason.className = 'convince-reason';
                    reason.textContent = data.reason;
                    convinceReasons.appendChild(reason);
                }

                // Update button text
                btnConvince.textContent = data.button;

                convinceCount++;
            } else {
                // Transform into "HELL YES" button
                btnConvince.textContent = 'HELL YES 🤘';
                btnConvince.className = 'btn-yes';
                btnConvince.removeEventListener('click', arguments.callee);
                btnConvince.addEventListener('click', triggerCelebration);
            }
        });
    }

})();
