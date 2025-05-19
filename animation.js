// 科技感背景动画
document.addEventListener('DOMContentLoaded', function() {
  // 创建背景动画容器
  const animContainer = document.createElement('div');
  animContainer.className = 'tech-background';
  animContainer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1; overflow:hidden; pointer-events:none;';
  document.body.appendChild(animContainer);
  
  // 创建动态元素
  for (let i = 0; i < 50; i++) {
    createAnimElement(animContainer);
  }
  
  // 定期添加新元素
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      createAnimElement(animContainer);
    }
  }, 3000);
});

// 创建单个动画元素
function createAnimElement(container) {
  const element = document.createElement('div');
  
  // 随机大小、位置和动画持续时间
  const size = Math.random() * 5 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 50 + 30;
  const delay = Math.random() * 5;
  
  // 设置样式
  element.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${posX}%;
    top: ${posY}%;
    background: rgba(64, 156, 255, 0.2);
    border: 1px solid rgba(64, 156, 255, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(64, 156, 255, 0.5);
    animation: float ${duration}s linear ${delay}s infinite;
    opacity: 0;
  `;
  
  container.appendChild(element);
  
  // 移除旧元素以避免内存泄漏
  setTimeout(() => {
    element.remove();
  }, (duration + delay) * 1000);
}

// 添加动画关键帧
if (!document.getElementById('tech-animation-style')) {
  const style = document.createElement('style');
  style.id = 'tech-animation-style';
  style.textContent = `
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.6; }
      100% { transform: translate(${Math.random() > 0.5 ? '+' : '-'}100px, ${Math.random() > 0.5 ? '+' : '-'}100px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
