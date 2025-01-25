let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const carouselInner = document.getElementById('carouselInner');
const pausePlayBtn = document.getElementById('pausePlayBtn');
let autoPlayInterval;
let isPaused = false;

// 創建導航點
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    navDots.appendChild(dot);
});

function updatePlayPauseButton() {
    const icon = pausePlayBtn.querySelector('i');
    icon.className = isPaused ? 'fa-solid fa-circle-play' : 'fa-regular fa-circle-pause';
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
    updatePlayPauseButton();
}

function startAutoPlay() {
    stopAutoPlay(); // 清除現有的計時器
    autoPlayInterval = setInterval(nextSlide, 3000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const offset = currentSlide * -100;
    carouselInner.style.transform = `translateX(${offset}%)`;
    
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}
function updateSlide(index) {
    // 移除所有 active class
    document.querySelectorAll('.carousel-item').forEach(item => {
      item.classList.remove('active');
    });
  // 添加新的 active class
  document.querySelectorAll('.carousel-item')[index].classList.add('active');
}

// 初始化輪播
pausePlayBtn.addEventListener('click', togglePause);
startAutoPlay();











// 左邊收合選單


document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const links = this.closest('.mobile-nav-list').querySelector('.mobile-nav-links');
        this.classList.toggle('active');
        links.classList.toggle('active');
    });
});





document.querySelectorAll('.mobile-nav h3').forEach(header => {
    header.addEventListener('click', () => {
        const navLinks = header.nextElementSibling;
        header.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});
// 回首頁
document.addEventListener('scroll', () => {
    const button = document.getElementById('backToHome');
    const footer = document.querySelector('footer');
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const buttonHeight = button.offsetHeight;

    // 檢查按鈕是否超出 footer 範圍
    if (footerTop <= windowHeight) {
      button.classList.add('stop');
      button.style.bottom = `${windowHeight - footerTop + 20}px`; // 固定在 footer 上方
    } else {
      button.classList.remove('stop');
      button.style.bottom = '20px'; // 恢復固定位置
    }
  });