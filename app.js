document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');
    const pausePlayBtn = document.querySelector('.pause-play-btn');
    const navDots = document.querySelector('.nav-dots');
    let autoPlayInterval;
    let isPaused = false;

    // 確保所有元素都存在
    if (!slides.length || !carouselInner || !pausePlayBtn || !navDots) {
        console.error('Required carousel elements not found');
        return;
    }

    // 初始化輪播
    function initCarousel() {
        // 設置初始樣式
        slides.forEach((slide, index) => {
            slide.style.flex = '0 0 100%';
            // 顯示第一張幻燈片的文字卡
            if (index === 0) {
                slide.classList.add('active');
                const contentWrapper = slide.querySelector('.content-wrapper');
                if (contentWrapper) {
                    contentWrapper.style.opacity = '1';
                }
            }
        });

        // 初始化導航點
        initNavDots();
        
        // 設置事件監聽器
        setupEventListeners();
        
        // 開始自動播放
        startAutoPlay();
    }

    // 設置事件監聽器
    function setupEventListeners() {
        // 暫停/播放按鈕
        pausePlayBtn.addEventListener('click', togglePause);
        
        // 前後按鈕
        const prevBtn = document.querySelector('.pre-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    }

    // 初始化導航點
    function initNavDots() {
        navDots.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            navDots.appendChild(dot);
        });
    }

    // 切換到指定幻燈片
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;

        // 移除所有幻燈片的 active 類
        slides.forEach(slide => {
            slide.classList.remove('active');
            const contentWrapper = slide.querySelector('.content-wrapper');
            if (contentWrapper) {
                contentWrapper.style.opacity = '0';
            }
        });

        // 添加新的 active 類
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        
        // 顯示當前幻燈片的文字卡
        const activeContentWrapper = slides[currentSlide].querySelector('.content-wrapper');
        if (activeContentWrapper) {
            activeContentWrapper.style.opacity = '1';
        }

        // 更新輪播位置
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // 更新導航點
        updateNavDots();

        // 重置自動播放計時器
        if (!isPaused) {
            startAutoPlay();
        }
    }

    // 更新導航點
    function updateNavDots() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // 下一張幻燈片
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // 上一張幻燈片
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // 開始自動播放
    function startAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // 停止自動播放
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // 切換播放/暫停
    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
        updatePlayPauseButton();
    }

    // 更新播放/暫停按鈕
    function updatePlayPauseButton() {
        const icon = pausePlayBtn.querySelector('i');
        if (icon) {
            icon.className = isPaused ? 'fa-regular fa-circle-play' : 'fa-regular fa-circle-pause';
        }
    }

    // 啟動輪播
    initCarousel();
});




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
document.getElementById('menu-toggle-checkbox').addEventListener('change', function() {
    const overlay = document.querySelector('.menu-overlay');
    if (this.checked) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
});

// 點擊遮罩時關閉選單
document.querySelector('.menu-overlay').addEventListener('click', function() {
    document.getElementById('menu-toggle-checkbox').checked = false;
    this.classList.remove('active');
});




// 回首頁按鈕

document.addEventListener("DOMContentLoaded", function() {
    const backToHome = document.getElementById("backToHome");
    const stopPoint = document.getElementById("stopPoint");
    let isFixed = true;

    // 監聽滾動事件
    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
        const stopPointRect = stopPoint.getBoundingClientRect();
        const stopPointTop = stopPointRect.top + window.scrollY;

        // 當滾動超過 25% 時顯示按鈕
        if (scrollPercentage > 0.25) {
            backToHome.classList.add("show");
        } else {
            backToHome.classList.remove("show");
        }

        // 判斷是否到達停駐點
        if (window.scrollY + windowHeight >= stopPointTop) {
            if (isFixed) {
                backToHome.classList.add("stop");
                stopPoint.appendChild(backToHome);
                isFixed = false;
            }
        } else {
            if (!isFixed) {
                backToHome.classList.remove("stop");
                document.body.appendChild(backToHome);
                isFixed = true;
            }
        }
    });

    // 點擊回到頂部
    backToHome.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});