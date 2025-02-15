/**
 * ============================
 * "回首頁" 按鈕 Debug 腳本
 * ============================
 */

// 除錯設定
const DEBUG = {
    enabled: true,
    logScroll: false  // 設為 true 會記錄所有滾動事件，可能會淹沒 console
};

// 元素選擇器
const SELECTORS = {
    scrollTrigger: '#scrollTrigger',
    backToHome: '#backToHome',
    footerBackground: '.footer-background'
};

// 主要初始化函數
document.addEventListener("DOMContentLoaded", function () {
    logInfo("DOM 載入完成，開始初始化...");

    // 獲取必要元素
    const elements = getRequiredElements();
    if (!elements) return;

    const { backToHome, scrollTrigger, footerBackground } = elements;

    // 初始化按鈕狀態
    initializeButton(backToHome);

    // 防抖動的滾動監聽器
    const debouncedUpdate = debounce(() => {
        updateButtonVisibility(elements);
    }, 16);

    // 綁定事件
    window.addEventListener("scroll", debouncedUpdate);
    window.addEventListener("resize", debouncedUpdate);
    
    // 綁定點擊事件
    backToHome.addEventListener("click", handleBackToHomeClick);

    // 初始檢查
    updateButtonVisibility(elements);
    
    logInfo("初始化完成！");
});

/**
 * 取得所需元素並進行檢查
 */
function getRequiredElements() {
    const elements = {
        backToHome: document.querySelector(SELECTORS.backToHome),
        scrollTrigger: document.querySelector(SELECTORS.scrollTrigger),
        footerBackground: document.querySelector(SELECTORS.footerBackground)
    };

    const missingElements = Object.entries(elements)
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        logError(`找不到以下元素: ${missingElements.join(', ')}`);
        return null;
    }

    logInfo("所有必要元素已找到");
    return elements;
}

/**
 * 初始化按鈕
 */
function initializeButton(button) {
    // 確保初始狀態
    button.style.display = 'none';
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    
    logInfo("按鈕初始化完成");
}

/**
 * 更新按鈕可見性
 */
function updateButtonVisibility({ backToHome, scrollTrigger, footerBackground }) {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const triggerPosition = scrollTrigger.offsetTop;
    const footerPosition = footerBackground.getBoundingClientRect().top + window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (DEBUG.logScroll) {
        logDebug(`滾動位置: ${scrollY}, 觸發位置: ${triggerPosition}, Footer位置: ${footerPosition}`);
    }

    // 顯示/隱藏按鈕
    if (scrollY > triggerPosition) {
        backToHome.classList.add("show");
        logDebug("按鈕顯示");
    } else {
        backToHome.classList.remove("show");
        logDebug("按鈕隱藏");
    }

    // 調整按鈕位置
    const footerOffset = footerPosition - scrollY - windowHeight;
    if (footerOffset < 0) {
        backToHome.style.bottom = `${Math.abs(footerOffset) + 20}px`;
        logDebug("按鈕位置調整為相對於 footer");
    } else {
        backToHome.style.bottom = '20px';
        logDebug("按鈕位置重置為預設值");
    }
}

/**
 * 處理回到頂部點擊事件
 */
function handleBackToHomeClick(e) {
    e.preventDefault();
    logInfo("點擊回到頂部按鈕");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/**
 * 防抖動函數
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Debug 工具函數
function logInfo(message) {
    if (!DEBUG.enabled) return;
    console.log(`ℹ️ ${message}`);
}

function logError(message) {
    if (!DEBUG.enabled) return;
    console.error(`❌ ${message}`);
}

function logDebug(message) {
    if (!DEBUG.enabled) return;
    console.debug(`🔍 ${message}`);
}

// 調試工具
const DebugTools = {
    /**
     * 檢查按鈕的 CSS 狀態
     */
    checkButtonCSS() {
        const button = document.querySelector(SELECTORS.backToHome);
        if (!button) {
            logError("找不到回到頂部按鈕");
            return;
        }
        
        const styles = window.getComputedStyle(button);
        console.table({
            display: styles.display,
            position: styles.position,
            bottom: styles.bottom,
            right: styles.right,
            zIndex: styles.zIndex,
            visibility: styles.visibility,
            opacity: styles.opacity
        });
    },

    /**
     * 強制顯示按鈕
     */
    forceShowButton() {
        const button = document.querySelector(SELECTORS.backToHome);
        if (!button) {
            logError("找不到回到頂部按鈕");
            return;
        }
        button.classList.add("show");
        button.style.display = 'flex';
        logInfo("已強制顯示按鈕");
    },

    /**
     * 重置按鈕狀態
     */
    resetButton() {
        const button = document.querySelector(SELECTORS.backToHome);
        if (!button) {
            logError("找不到回到頂部按鈕");
            return;
        }
        button.classList.remove("show");
        button.style.display = 'none';
        button.style.bottom = '20px';
        logInfo("已重置按鈕狀態");
    }
};

// 將除錯工具暴露到全局作用域
window.BackToTopDebug = DebugTools;