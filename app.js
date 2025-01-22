// 左邊收合選單


document.addEventListener('DOMContentLoaded', function () {
    // 選擇所有帶有 submenu 的項目
    const submenuItems = document.querySelectorAll('.has-submenu');

    submenuItems.forEach(item => {
        const toggleBtn = item.querySelector('.toggle-btn');
        const submenu = item.querySelector('.submenu');

        toggleBtn.addEventListener('click', () => {
            // 切換顯示狀態
            item.classList.toggle('open');
            if (submenu.style.display === "block") {
                submenu.style.display = "none";
            } else {
                submenu.style.display = "block";
            }
        });
    });
});

// 获取元素
const slides = document.querySelector('.slides');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const playRadio = document.getElementById('play');
const pauseRadio = document.getElementById('pause');

let currentIndex = 0;
let interval;

// 切换到下一张图片
function nextSlide() {
    currentIndex = (currentIndex + 1) % 2;  // 0 → 1 → 0
    updateSlide();
}

// 切换到上一张图片
function prevSlide() {
    currentIndex = (currentIndex - 1 + 2) % 2;  // 1 → 0 → 1
    updateSlide();
}

// 更新轮播图及指示点
function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 50}%)`;
    
    if (currentIndex === 0) {
        dot1.classList.replace('fa-regular', 'fa-solid');  
        dot2.classList.replace('fa-solid', 'fa-regular');  
    } else {
        dot1.classList.replace('fa-solid', 'fa-regular'); 
        dot2.classList.replace('fa-regular', 'fa-solid');  
    }
}

// 自动播放功能
function startCarousel() {
    interval = setInterval(nextSlide, 3000);
}

// 停止播放
function stopCarousel() {
    clearInterval(interval);
}

// 監聽 radio 按钮切换播放状态
playRadio.addEventListener('change', () => {
    if (playRadio.checked) {
        startCarousel();
    }
});

pauseRadio.addEventListener('change', () => {
    if (pauseRadio.checked) {
        stopCarousel();
    }
});

// 默認自動輪播
startCarousel();


// 左邊下拉式選單


// 查找所有的切換按鈕
// document.querySelectorAll('.toggle-btn').forEach(button => {
//     button.addEventListener('click', function () {
//         const links = this.parentElement.nextElementSibling; // 找到相鄰的 .mobile-nav-links
//         if (links) { // 確保選中的項目存在
//             this.classList.toggle('active'); // 切換按鈕的 active 狀態
//             if (getComputedStyle(links).display === 'none') {
//                 links.style.display = 'block'; // 顯示
//             } else {
//                 links.style.display = 'none'; // 隱藏
//             }
//         } else {
//             console.error('找不到對應的 .mobile-nav-links');
//         }
//     });
// });

document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function () {
        const links = this.closest('.mobile-nav-list').nextElementSibling; // 修改这里
        if (links && links.classList.contains('mobile-nav-links')) {
            this.classList.toggle('active'); // 切换按钮样式
            links.style.display = (links.style.display === 'block') ? 'none' : 'block'; // 切换显示状态
        } else {
            console.error('找不到 .mobile-nav-links');
        }
    });
});