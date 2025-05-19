document.addEventListener('DOMContentLoaded', function() {
  // 创建canvas元素
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'auto'; // 允许鼠标交互
  
  // 将canvas添加到body最前面
  document.body.insertBefore(canvas, document.body.firstChild);
  
  // 确保内容在粒子之上
  Array.from(document.body.children).forEach(child => {
    if (child !== canvas) {
      child.style.position = 'relative';
      child.style.zIndex = '2';
    }
  });
  
  // 设置canvas尺寸
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // 粒子设置
  const particlesArray = [];
  const numberOfParticles = 100;
  let hoverRadius = 100;
  let mouse = {
    x: null,
    y: null,
    radius: hoverRadius
  };
  
  // 鼠标移动事件
  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  // 鼠标点击事件
  window.addEventListener('mousedown', function() {
    mouse.radius = 150; // 点击时增加影响半径
  });
  
  window.addEventListener('mouseup', function() {
    mouse.radius = hoverRadius; // 释放时恢复正常半径
  });
  
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
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 30) + 1;
      this.color = this.getRandomColor();
    }
    
    getRandomColor() {
      const colors = [
        '#4fc3f7', // 亮蓝色
        '#64ffda', // 青色
        '#18ffff', // 亮青色
        '#00b0ff', // 蓝色
        '#00e5ff'  // 青绿色
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    
    update() {
      // 检查鼠标位置
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      
      // 最大距离，超过此距离的粒子不受鼠标影响
      const maxDistance = 100;
      let force = (maxDistance - distance) / maxDistance;
      
      // 如果力为负值，设为0
      if (force < 0) force = 0;
      
      // 鼠标影响下的运动
      if (distance < mouse.radius) {
        this.x -= forceDirectionX * force * this.density;
        this.y -= forceDirectionY * force * this.density;
      } else {
        // 回到原位
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx/10;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/10;
        }
      }
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
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          opacityValue = 1 - (distance/120);
          ctx.strokeStyle = 'rgba(100, 255, 218, ' + opacityValue + ')';
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
