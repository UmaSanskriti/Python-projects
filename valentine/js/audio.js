/* ===================================================================
   audio.js — Web Audio API Guitar Strings & "Nothing Else Matters" Detection
   =================================================================== */

class GuitarAudio {
    constructor() {
        this.ctx = null;
        this.initialized = false;
        // Standard guitar tuning frequencies
        this.frequencies = {
            'E2': 82.41,
            'A2': 110.00,
            'D3': 146.83,
            'G3': 196.00,
            'B3': 246.94,
            'E4': 329.63
        };

        // Nothing Else Matters intro: strings 1(E4), 2(B3), 3(G3), 4(D3), 3(G3), 2(B3)
        // In our 0-indexed strings: 5, 4, 3, 2, 3, 4
        this.nemSequence = [5, 4, 3, 2, 3, 4];
        this.playedStrings = [];
        this.nemTimeout = null;
        this.nemCallback = null;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            // Web Audio not supported
        }
    }

    playString(stringIndex) {
        if (!this.ctx) this.init();
        if (!this.ctx) return;

        // Resume context if suspended (browser autoplay policy)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const notes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
        const note = notes[stringIndex];
        const freq = this.frequencies[note];
        if (!freq) return;

        const now = this.ctx.currentTime;

        // Create oscillator for a plucked string sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Triangle wave sounds more string-like
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Add slight detune for warmth
        osc.detune.setValueAtTime(Math.random() * 10 - 5, now);

        // Low-pass filter for warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.Q.setValueAtTime(1, now);

        // ADSR-like envelope: quick attack, medium decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack: 10ms
        gain.gain.exponentialRampToValueAtTime(0.1, now + 0.15); // Decay
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Release

        // Add a second harmonic for richness
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, now);
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.08, now + 0.01);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        // Connect: osc -> filter -> gain -> output
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);
        osc2.start(now);
        osc2.stop(now + 0.8);

        // Track for NEM detection
        this.trackNEM(stringIndex);
    }

    trackNEM(stringIndex) {
        this.playedStrings.push(stringIndex);

        // Reset if too many notes played
        if (this.playedStrings.length > 8) {
            this.playedStrings = this.playedStrings.slice(-6);
        }

        // Clear timeout — sequence must complete within 3 seconds
        if (this.nemTimeout) clearTimeout(this.nemTimeout);
        this.nemTimeout = setTimeout(() => {
            this.playedStrings = [];
        }, 3000);

        // Check if the last 6 notes match NEM
        if (this.playedStrings.length >= 6) {
            const last6 = this.playedStrings.slice(-6);
            const match = last6.every((val, i) => val === this.nemSequence[i]);
            if (match && this.nemCallback) {
                this.nemCallback();
                this.playedStrings = [];
            }
        }
    }

    onNothingElseMatters(callback) {
        this.nemCallback = callback;
    }
}

window.guitarAudio = new GuitarAudio();
