const button = document.getElementById('loveButton');
const container = document.querySelector('.container');
const photoDisplay = document.getElementById('photoDisplay');
const prevPhotoBtn = document.getElementById('prevPhoto');
const nextPhotoBtn = document.getElementById('nextPhoto');

// 照片列表
let photos = [];
let currentPhotoIndex = 0;

// 预加载音效
const audio = new Audio();
audio.src = 'sounds/love-sound.mp3';

// 加载照片
async function loadPhotos() {
  try {
    // 修改图片路径，移除多余的目录名
    photos = Array.from({length: 15}, (_, i) => `images/${i + 1}.jpg`);
    
    // 预加载所有图片
    await Promise.all(photos.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    }));
    
    showPhoto(currentPhotoIndex);
  } catch (error) {
    console.error('加载图片时出错:', error);
    // 显示错误提示
    photoDisplay.src = 'images/error.jpg';
  }
}

// 显示照片
function showPhoto(index) {
  if (photos.length > 0) {
    currentPhotoIndex = (index + photos.length) % photos.length;
    photoDisplay.src = photos[currentPhotoIndex];
    
    // 添加淡入效果
    photoDisplay.style.opacity = 0;
    setTimeout(() => {
      photoDisplay.style.opacity = 1;
    }, 50);
  }
}

// 初始化照片功能
loadPhotos();

// 照片切换事件
prevPhotoBtn.addEventListener('click', () => {
  showPhoto(currentPhotoIndex - 1);
});

nextPhotoBtn.addEventListener('click', () => {
  showPhoto(currentPhotoIndex + 1);
});

button.addEventListener('click', () => {
    // 播放音效
    audio.play();
    
    // 创建爱心雨
    createHearts();
    
    // 显示浪漫消息
    showRomanticMessage();
});

function createHearts() {
    const numHearts = 50;
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-rain');
        heart.innerHTML = '❤️';
        
        // 随机设置位置和动画
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.opacity = Math.random();
        
        container.appendChild(heart);
        
        // 动画结束后移除爱心
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

function showRomanticMessage() {
    const messages = [
        "我爱你",
        "你是我的一切",
        "永远在一起",
        "你让我完整",
        "我的唯一",
        "爱你到永远"
    ];
    
    const message = document.createElement('div');
    message.classList.add('romantic-message');
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    container.appendChild(message);
    
    // 3秒后移除消息
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
.heart-rain {
    position: fixed;
    top: -10vh;
    color: #ff4757;
    animation: fall linear;
    z-index: 9999;
}

@keyframes fall {
    to {
        transform: translateY(110vh);
    }
}

.romantic-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    animation: fadeInOut 3s ease-in-out;
    z-index: 10000;
}

@keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
}
`;
document.head.appendChild(style);
