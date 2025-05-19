// widget.js - macOS风格系统监控组件（完整修复版）
document.addEventListener('DOMContentLoaded', function() {
    // 1. 创建组件容器
    const widgetWindow = document.createElement('div');
    widgetWindow.className = 'macos-window';
    
    // 2. 创建标题栏
    const titlebar = document.createElement('div');
    titlebar.className = 'window-titlebar';
    
    // 窗口控制按钮
    const controls = document.createElement('div');
    controls.className = 'window-controls';
    controls.innerHTML = `
        <button class="control-btn close-btn"></button>
        <button class="control-btn minimize-btn"></button>
        <button class="control-btn maximize-btn"></button>
    `;
    
    // 窗口标题
    const title = document.createElement('h3'); // 改为创建h3元素
    title.className = 'window-title'; // 保留原有class
    title.textContent = '终端监视器';
    
    titlebar.appendChild(controls);
    titlebar.appendChild(title);
    widgetWindow.appendChild(titlebar);
    
    // 3. 创建内容区域
    const content = document.createElement('div');
    content.className = 'window-content';
    
    // 4. 创建信息网格
    const grid = document.createElement('div');
    grid.className = 'sci-fi-grid';
    
    // 4.1 设备信息面板
    const devicePanel = createSciFiPanel('fa-desktop', '数据终端状况');
    const deviceInfo = document.createElement('div');
    deviceInfo.className = 'sci-fi-data';
    devicePanel.appendChild(deviceInfo);
    
    // 4.2 网络信息面板
    const networkPanel = createSciFiPanel('fa-network-wired', '网络终端连接');
    const networkInfo = document.createElement('div');
    networkInfo.className = 'sci-fi-data';
    networkPanel.appendChild(networkInfo);
    
    // 4.3 系统时间面板
    const timePanel = createSciFiPanel('fa-clock', '系统时间显示');
    const timeInfo = document.createElement('div');
    timeInfo.className = 'sci-fi-data';
    timePanel.appendChild(timeInfo);
    
    // 4.4 CPU监控面板
    const cpuPanel = createSciFiPanel('fa-microchip', '中央算力用量');
    const cpuInfo = document.createElement('div');
    cpuInfo.className = 'sci-fi-data';
    
    // CPU使用率指示器
    const cpuMeter = document.createElement('div');
    cpuMeter.className = 'cpu-meter';
    cpuMeter.innerHTML = `
        <div class="meter-bar">
            <div class="meter-fill"></div>
        </div>
        <div class="meter-labels">
            <span>0%</span>
            <span class="current-value">0%</span>
            <span>100%</span>
        </div>
    `;
    
    cpuPanel.appendChild(cpuInfo);
    cpuPanel.appendChild(cpuMeter);
    
    // 5. 组装所有组件
    grid.appendChild(devicePanel);
    grid.appendChild(networkPanel);
    grid.appendChild(timePanel);
    grid.appendChild(cpuPanel);
    content.appendChild(grid);
    widgetWindow.appendChild(content);
    
    // 6. 添加状态栏
    const statusbar = document.createElement('div');
    statusbar.className = 'window-statusbar';
    statusbar.innerHTML = `
        <div><i class="fas fa-circle" style="color: var(--macos-green)"></i> 悠茶重工所属</div>
        <div><i class="fas fa-shield-alt"></i> 三级认证</div>
        <div><i class="fas fa-sync-alt"></i> 实时监控中</div>
    `;
    widgetWindow.appendChild(statusbar);
    
    // 7. 智能插入到页面中间位置
    function insertWidget() {
        const container = document.querySelector('.content-container') || document.body;
        const firstCard = document.querySelector('.content-card');
        const searchWindow = document.querySelector('.search-window');
        
        // 插入到搜索窗口后面（如果有）
        if (searchWindow && searchWindow.parentNode) {
            searchWindow.parentNode.insertBefore(widgetWindow, searchWindow.nextSibling);
            return;
        }
        
        // 插入到第一个卡片后面（如果有）
        if (firstCard && firstCard.parentNode) {
            firstCard.parentNode.insertBefore(widgetWindow, firstCard.nextSibling);
            return;
        }
        
        // 插入到容器开头（保底方案）
        if (container) {
            container.insertBefore(widgetWindow, container.firstChild);
            return;
        }
        
        // 最终保底方案
        document.body.appendChild(widgetWindow);
    }
    insertWidget();
    
    // 8. 添加样式
    const style = document.createElement('style');
    style.textContent = `
        /* 主窗口样式 */
        .macos-window {
            margin: 25px auto;
            max-width: 800px;
            width: calc(100% - 50px);
            border-radius: var(--window-radius);
            overflow: hidden;
            box-shadow: var(--window-shadow);
            background-color: rgba(var(--macos-secondary), var(--window-opacity));
            border: 1px solid rgba(var(--macos-text), 0.1);
            backdrop-filter: blur(var(--window-blur));
            -webkit-backdrop-filter: blur(var(--window-blur));
        }
        
         /* 新增h3标题样式 */
        .window-titlebar h3.window-title {
            flex: 1;
            text-align: center;
            font-size: 0.92em; /* h3的默认大小 */
            font-weight: 800; /* 中等加粗 */
            margin: 0;
            color: rgba(var(--macos-text), 0.9);
            font-family: var(--header-font);
            letter-spacing: -0.24px;
            /* 保持原有布局属性 */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* 暗色模式适配 */
        @media (prefers-color-scheme: dark) {
            .window-titlebar h3.window-title {
                color: rgb(var(--macos-text));
            }
        }

        /* 网格布局 */
        .sci-fi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        
        /* 信息面板 */
        .sci-fi-panel {
            background-color: rgba(var(--macos-primary), 0.4);
            border-radius: 8px;
            padding: 20px;
            border: 1px solid rgba(var(--macos-text), 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .sci-fi-panel:hover {
            background-color: rgba(var(--macos-primary), 0.5);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* 面板标题 */
        .sci-fi-panel-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: rgb(var(--macos-text));
            font-family: var(--header-font);
            font-weight: 500;
            font-size: 14px;
        }
        
        .sci-fi-panel-header i {
            margin-right: 10px;
            color: rgba(var(--macos-text), 0.7);
            font-size: 14px;
        }
        
        /* 数据展示 */
        .sci-fi-data {
            font-size: 13px;
            line-height: 1.6;
            color: rgba(var(--macos-text), 0.8);
            font-family: var(--mono-font);
        }
        
        .sci-fi-data strong {
            color: rgb(var(--macos-text));
            font-weight: 500;
        }
        
        /* CPU指示器 */
        .cpu-meter {
            margin-top: 15px;
        }
        
        .meter-bar {
            height: 6px;
            background-color: rgba(var(--macos-primary), 0.6);
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }
        
        .meter-fill {
            height: 100%;
            width: 30%;
            background: linear-gradient(90deg, 
                rgba(var(--macos-green), 0.8), 
                rgba(var(--macos-accent), 0.8));
            border-radius: 3px;
            transition: width 0.5s ease;
        }
        
        .meter-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 11px;
            color: rgba(var(--macos-text), 0.6);
        }
        
        .meter-labels .current-value {
            color: rgb(var(--macos-text));
            font-weight: 500;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .macos-window {
                width: calc(100% - 30px);
                margin: 15px auto;
            }
            
            .sci-fi-grid {
                grid-template-columns: 1fr;
                padding: 15px;
            }
            
            .sci-fi-panel {
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 9. 辅助函数
    function createSciFiPanel(icon, title) {
        const panel = document.createElement('div');
        panel.className = 'sci-fi-panel';
        
        const header = document.createElement('div');
        header.className = 'sci-fi-panel-header';
        header.innerHTML = `<i class="fas ${icon}"></i> ${title}`;
        
        panel.appendChild(header);
        return panel;
    }
    
    // 10. 功能函数
    function getDeviceInfo() {
        const userAgent = navigator.userAgent;
        let os = 'Unknown';
        let device = 'Unknown';
        
        // 检测操作系统
        if (userAgent.match(/Android/i)) os = 'Android';
        else if (userAgent.match(/iPhone|iPad|iPod/i)) os = 'iOS';
        else if (userAgent.match(/Macintosh/i)) os = 'MacOS';
        else if (userAgent.match(/Windows/i)) os = 'Windows';
        else if (userAgent.match(/Linux/i)) os = 'Linux';
        
        // 检测设备类型
        if (userAgent.match(/Mobile/i)) device = '移动服务终端';
        else if (userAgent.match(/Tablet/i)) device = '扩大移动服务终端';
        else device = '桌面服务终端';
        
        deviceInfo.innerHTML = `
            <strong>OS:</strong> ${os}<br>
            <strong>Device:</strong> ${device}<br>
            <strong>Resolution:</strong> ${window.screen.width} × ${window.screen.height}<br>
            <strong>Language:</strong> ${navigator.language}
        `;
    }
    
    function getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let connectionType = 'Unknown';
        let effectiveType = 'Unknown';
        
        if (connection) {
            connectionType = connection.type || 'Unknown';
            effectiveType = connection.effectiveType || 'Unknown';
        }
        
        networkInfo.innerHTML = `
            <strong>Connection:</strong> ${connectionType}<br>
            <strong>Effective type:</strong> ${effectiveType}<br>
            <strong>Online:</strong> ${navigator.onLine ? 'Yes' : 'No'}<br>
            <strong>Cores:</strong> ${navigator.hardwareConcurrency || 'Unknown'}
        `;
    }
    
    function updateDateTime() {
        const now = new Date();
        timeInfo.innerHTML = `
            <strong>Time:</strong> ${now.toLocaleTimeString()}<br>
            <strong>Date:</strong> ${now.toLocaleDateString()}<br>
            <strong>Timezone:</strong> ${Intl.DateTimeFormat().resolvedOptions().timeZone}
        `;
    }
    
    function updateCpuUsage() {
        const randomUsage = Math.floor(20 + Math.random() * 60);
        const meterFill = document.querySelector('.meter-fill');
        const currentValue = document.querySelector('.current-value');
        
        meterFill.style.width = `${randomUsage}%`;
        currentValue.textContent = `${randomUsage}%`;
        
        // 根据使用率改变颜色
        if (randomUsage > 70) {
            meterFill.style.background = `linear-gradient(90deg, 
                rgba(var(--macos-red), 0.8), 
                rgba(var(--macos-yellow), 0.8))`;
        } else if (randomUsage > 40) {
            meterFill.style.background = `linear-gradient(90deg, 
                rgba(var(--macos-yellow), 0.8), 
                rgba(var(--macos-accent), 0.8))`;
        } else {
            meterFill.style.background = `linear-gradient(90deg, 
                rgba(var(--macos-green), 0.8), 
                rgba(var(--macos-accent), 0.8))`;
        }
        
        cpuInfo.innerHTML = `
            <strong>Usage:</strong> ${randomUsage}%<br>
            <strong>Processes:</strong> ${Math.floor(Math.random() * 12937) + 340}<br>
            <strong>Threads:</strong> ${Math.floor(Math.random() * 53422) + 13432}
        `;
    }
    
    // 11. 初始化
    getDeviceInfo();
    getNetworkInfo();
    updateDateTime();
    updateCpuUsage();
    
    // 12. 定时更新
    setInterval(updateDateTime, 1000);
    setInterval(updateCpuUsage, 2000);
});