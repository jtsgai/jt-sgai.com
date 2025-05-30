// 粒子背景动画
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 粒子配置
    const particlesArray = [];
    const numberOfParticles = 100;
    
    // 创建粒子
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
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
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    }
    
    // 窗口大小变化时重置画布大小
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    init();
    animate();
  }
});

// 语言切换功能
function switchLanguage(lang) {
  // 保存语言偏好到localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // 应用语言设置
  applyLanguage(lang);
}

// 应用语言设置
function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  // 获取语言文件
  fetch(`/locales/${lang}/translation.json`)
    .then(response => response.json())
    .then(translations => {
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
          element.innerHTML = translations[key];
        }
      });
      
      // 更新语言按钮状态
      document.querySelectorAll('.language-switcher button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    })
    .catch(error => console.error('Error loading translations:', error));
}

// 页面加载时检查语言设置
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    applyLanguage(savedLang);
  } else {
    // 默认语言为英文
    applyLanguage('en');
  }
  
  // 添加移动端菜单切换功能
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
  }
});

// 移动端菜单切换
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('mobile-nav-open');
  
  // 切换汉堡图标样式
  const bars = document.querySelectorAll('.hamburger-menu .bar');
  bars.forEach(bar => bar.classList.toggle('active'));
}

// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
  // 检查浏览器是否原生支持懒加载
  if ('loading' in HTMLImageElement.prototype) {
    // 浏览器支持懒加载
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // 浏览器不支持懒加载，加载polyfill
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
});
