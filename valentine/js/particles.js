/* ===================================================================
   particles.js — Canvas Particle System
   Configurable: embers, confetti, sparks, hearts, fireworks
   =================================================================== */

class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 4;
        this.vy = options.vy || (Math.random() - 0.5) * 4;
        this.gravity = options.gravity || 0;
        this.friction = options.friction || 0.99;
        this.size = options.size || Math.random() * 4 + 2;
        this.color = options.color || '#f4a261';
        this.alpha = options.alpha || 1;
        this.decay = options.decay || 0.01;
        this.shape = options.shape || 'circle'; // circle, square, heart, star
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.life = 1;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.alpha = Math.max(0, this.life);
        this.rotation += this.rotationSpeed;
        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        switch (this.shape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'square':
                ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
                break;

            case 'heart':
                this.drawHeart(ctx, this.size);
                break;

            case 'star':
                this.drawStar(ctx, this.size);
                break;

            case 'bolt':
                this.drawBolt(ctx, this.size);
                break;
        }

        ctx.restore();
    }

    drawHeart(ctx, s) {
        ctx.beginPath();
        ctx.moveTo(0, s * 0.4);
        ctx.bezierCurveTo(-s, -s * 0.2, -s, -s, 0, -s * 0.4);
        ctx.bezierCurveTo(s, -s, s, -s * 0.2, 0, s * 0.4);
        ctx.fill();
    }

    drawStar(ctx, s) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const method = i === 0 ? 'moveTo' : 'lineTo';
            ctx[method](Math.cos(angle) * s, Math.sin(angle) * s);
        }
        ctx.closePath();
        ctx.fill();
    }

    drawBolt(ctx, s) {
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.5, -s * 0.2);
        ctx.lineTo(s * 0.1, -s * 0.2);
        ctx.lineTo(s * 0.3, s);
        ctx.lineTo(-s * 0.3, s * 0.1);
        ctx.lineTo(0, s * 0.1);
        ctx.closePath();
        ctx.fill();
    }
}

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    emit(x, y, count, options = {}) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, {
                ...options,
                vx: options.vx !== undefined ? options.vx + (Math.random() - 0.5) * (options.spread || 2) : (Math.random() - 0.5) * (options.spread || 4),
                vy: options.vy !== undefined ? options.vy + (Math.random() - 0.5) * (options.spread || 2) : (Math.random() - 0.5) * (options.spread || 4),
                size: options.size || Math.random() * 4 + 2,
                color: Array.isArray(options.colors)
                    ? options.colors[Math.floor(Math.random() * options.colors.length)]
                    : (options.color || '#f4a261'),
                shape: Array.isArray(options.shapes)
                    ? options.shapes[Math.floor(Math.random() * options.shapes.length)]
                    : (options.shape || 'circle'),
            }));
        }
        if (!this.running) this.animate();
    }

    // Burst from center — for celebration
    burst(x, y, count, options = {}) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = (options.speed || 8) * (0.5 + Math.random() * 0.5);
            this.particles.push(new Particle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: options.gravity || 0.05,
                friction: options.friction || 0.98,
                decay: options.decay || 0.008,
                size: options.size || Math.random() * 5 + 2,
                color: Array.isArray(options.colors)
                    ? options.colors[Math.floor(Math.random() * options.colors.length)]
                    : (options.color || '#f4a261'),
                shape: Array.isArray(options.shapes)
                    ? options.shapes[Math.floor(Math.random() * options.shapes.length)]
                    : (options.shape || 'circle'),
            }));
        }
        if (!this.running) this.animate();
    }

    // Mini firework from a point
    firework(x, y) {
        this.burst(x, y, 30, {
            speed: 5,
            gravity: 0.03,
            decay: 0.02,
            colors: ['#e63946', '#f4a261', '#9b5de5', '#fff'],
            shapes: ['circle', 'star'],
            size: 3,
        });
    }

    // Continuous upward embers (for stage section)
    startEmbers(canvas) {
        this.emberCanvas = canvas;
        this.emberCtx = canvas.getContext('2d');
        this.embers = [];
        this.embersRunning = true;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const emitEmber = () => {
            if (!this.embersRunning) return;
            this.embers.push(new Particle(
                Math.random() * canvas.width,
                canvas.height + 10,
                {
                    vx: (Math.random() - 0.5) * 1,
                    vy: -(Math.random() * 2 + 1),
                    gravity: -0.01,
                    friction: 0.99,
                    size: Math.random() * 3 + 1,
                    color: Math.random() > 0.5 ? '#e63946' : '#f4a261',
                    decay: 0.005,
                    shape: 'circle',
                }
            ));
        };

        this.emberInterval = setInterval(emitEmber, 100);
        this.animateEmbers();
    }

    animateEmbers() {
        if (!this.embersRunning) return;

        this.emberCtx.clearRect(0, 0, this.emberCanvas.width, this.emberCanvas.height);
        this.embers = this.embers.filter(p => {
            const alive = p.update();
            if (alive) p.draw(this.emberCtx);
            return alive;
        });

        requestAnimationFrame(() => this.animateEmbers());
    }

    stopEmbers() {
        this.embersRunning = false;
        if (this.emberInterval) clearInterval(this.emberInterval);
    }

    animate() {
        this.running = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            const alive = p.update();
            if (alive) p.draw(this.ctx);
            return alive;
        });

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.running = false;
        }
    }

    // Persistent gentle sparkles
    startSparkles() {
        this.sparkleRunning = true;
        const sparkle = () => {
            if (!this.sparkleRunning) return;
            this.emit(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                1,
                {
                    vx: 0,
                    vy: -0.3,
                    spread: 0.5,
                    size: Math.random() * 2 + 1,
                    decay: 0.015,
                    colors: ['#f4a261', '#e63946', '#fff'],
                    shape: 'star',
                }
            );
            setTimeout(sparkle, 200 + Math.random() * 400);
        };
        sparkle();
    }

    stopSparkles() {
        this.sparkleRunning = false;
    }

    clear() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize global particle system
window.particleSystem = new ParticleSystem(document.getElementById('particles-canvas'));
