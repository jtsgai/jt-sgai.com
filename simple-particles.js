document.addEventListener('DOMContentLoaded', function() {
  // 创建canvas元素
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1000'; // 非常高的z-index
  canvas.style.pointerEvents = 'none'; // 允许点击穿透
  
  // 将canvas添加到body
  document.body.appendChild(canvas);
  
  // 设置canvas尺寸
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // 粒子设置
  const particlesArray = [];
  const numberOfParticles = 100;
  
  // 窗口大小调整
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  // 粒子类
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = '#00ff00'; // 荧光绿
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // 边界检查
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // 初始化粒子
  function init() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  // 连接粒子
  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = 1 - (distance/100);
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
  }
  
  // 初始化并开始动画
  init();
  animate();
});
