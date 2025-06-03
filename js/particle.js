document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  let particles = [];
  const colors = ['#4cc9f0', '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4895ef'];
  let particleCount = 150;
  let maxConnectionDistance = 100;
  let showConnections = true;

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 0.8;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      if (this.size > 0.2) this.size -= 0.01;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxConnectionDistance) {
          const opacity = 1 - distance / maxConnectionDistance;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 180, 246, ${opacity * 0.3})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  init();

  function animate() {
    ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showConnections) {
      drawConnections();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        particles.push(new Particle());
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
    if (particles.length > particleCount + 50) {
      particles.splice(0, 30);
    }
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    init();
  });
});
