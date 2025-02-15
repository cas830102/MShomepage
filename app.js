console.log("✅ JavaScript 成功載入！");

// 螢幕顯示方向判斷

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log("目前是直向模式");
        // document.body.style.backgroundColor = "lightblue";
    } else {
        console.log("目前是橫向模式");
        // document.body.style.backgroundColor = "lightcoral";
    }
}

// 監聽方向變化事件
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);

// 初次載入時檢查方向
checkOrientation();


// 圖片輪播功能
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



// 回首頁


// 回到首頁功能
document.addEventListener("DOMContentLoaded", function() {
    const backToHome = document.getElementById("backToHome");
    const stopPoint = document.getElementById("stopPoint"); // footer 的容器
    let isFixed = true;  // 是否固定在右下角

    function updateButtonPosition() {
        const scrollPosition = window.scrollY;  // 目前滾動的距離
        const windowHeight = window.innerHeight;  // 當前視窗高度
        const documentHeight = document.documentElement.scrollHeight;  // 整個頁面的總高度
        const scrollPercentage = scrollPosition / (documentHeight - windowHeight);  // 滾動的百分比

        const stopPointRect = stopPoint.getBoundingClientRect();  // 取得 stopPoint（footer）的位置
        const stopPointTop = stopPointRect.top + window.scrollY;  // stopPoint 的頂部相對於頁面的高度
        const stopPointBottom = stopPoint.offsetTop + stopPoint.offsetHeight;  // stopPoint 的底部

        // 顯示/隱藏按鈕
        if (scrollPercentage > 0.24) {
            backToHome.classList.add("show");
        } else {
            backToHome.classList.remove("show");
        }

        // 當按鈕滾動到 stopPoint 內部時，讓它停駐
        if (scrollPosition + windowHeight >= stopPointTop) {
            if (isFixed) {
                backToHome.classList.add("stop");
                stopPoint.appendChild(backToHome);  // 把按鈕移到 stopPoint 內
                isFixed = false;
            }
        } else if (scrollPosition + windowHeight >= stopPointBottom) {  
            // **如果滾動超過 footer 的底部，按鈕仍然停駐**
            if (!isFixed) {
                stopPoint.appendChild(backToHome);
                backToHome.classList.add("stop");
            }
        } else {
            if (!isFixed) {
                backToHome.classList.remove("stop");
                document.body.appendChild(backToHome);  // 按鈕回到原本右下角
                isFixed = true;
            }
        }
    }

    // 監聽滾動事件
    window.addEventListener("scroll", updateButtonPosition);
    // 監聽視窗大小改變
    window.addEventListener("resize", updateButtonPosition);

    // 點擊回到頂部
    backToHome.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    });

    // 初始化按鈕位置
    updateButtonPosition();
});




// 搜尋欄功能

document.addEventListener('DOMContentLoaded', function() {
    const headerSearchBtn = document.querySelector('.main-header-right .search-btn button');
    const searchContainer = document.querySelector('.search-container');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeBtn = document.querySelector('.search-form .close-btn');
    const searchInput = document.querySelector('.search-form input');

    // 打開搜尋欄
    function openSearch() {
        searchContainer.classList.add('active');
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    // 關閉搜尋欄
    function closeSearch() {
        searchContainer.classList.remove('active');
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        document.body.style.overflow = '';
    }

    // 監聽事件
    headerSearchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    // ESC 鍵關閉搜尋欄
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            closeSearch();
        }
    });
});