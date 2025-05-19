// 立即执行函数，避免全局变量污染
(function() {
  // 检查是否已经存在粒子效果
  if (window.particlesEffectInitialized) return;
  window.particlesEffectInitialized = true;
  
  // 创建canvas元素
  function createParticlesEffect() {
    // 如果已经存在canvas，先移除
    const existingCanvas = document.getElementById('particles-canvas');
    if (existingCanvas) existingCanvas.remove();
    
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
    const numberOfParticles = 150; // 增加粒子数量
    let hoverRadius = 120; // 增加鼠标影响范围
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
      mouse.radius = 180; // 点击时增加影响半径
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
        this.size = Math.random() * 4 + 2; // 增加粒子大小
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = [
          '#00ff00', // 荧光绿（黑客帝国风格）
          '#0088ff', // 科技蓝
          '#00ffff', // 霓虹青
          '#8800ff', // 紫色
          '#ff00ff'  // 霓虹粉
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // 添加发光效果
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }
      
      update() {
        // 检查鼠标位置
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        // 最大距离，超过此距离的粒子不受鼠标影响
        const maxDistance = 120;
        let force = (maxDistance - distance) / maxDistance;
        
        // 如果力为负值，设为0
        if (force < 0) force = 0;
        
        // 鼠标影响下的运动
        if (distance < mouse.radius) {
          this.x -= forceDirectionX * force * this.density;
          this.y -= forceDirectionY * force * this.density;
        } else {
          // 回到原位，加快速度
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/5; // 加快回位速度
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/5; // 加快回位速度
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
          
          if (distance < 150) { // 增加连线距离
            opacityValue = 1 - (distance/150);
            ctx.strokeStyle = 'rgba(0, 255, 0, ' + opacityValue + ')'; // 荧光绿连线
            ctx.lineWidth = 0.6; // 增加线宽
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
      if (!document.getElementById('particles-canvas')) return; // 如果canvas被移除，停止动画
      
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
    
    return canvas;
  }
  
  // 初始加载时创建粒子效果
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticlesEffect);
  } else {
    createParticlesEffect();
  }
  
  // 监听页面变化，确保在页面切换后重新创建粒子效果
  // 这对于单页应用(SPA)特别重要
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(createParticlesEffect, 300); // 延迟一点时间确保DOM已更新
    }
  }).observe(document, {subtree: true, childList: true});
})();
