# 悠茶重工导航页

**悠茶重工**是Ceteaonia设定集中的一个虚构企业，本页面借用它的名字来增加代入感。这是一个仿照苹果MacOS风格的导航页面，使用简单的前端方式来实现类似的效果。

## ✔ 拥有以下内容

- 🖥️ **MacOS 风格界面** - 完整的窗口控制按钮、标题栏和状态栏
- ✨ **毛玻璃效果** -真实的磨砂玻璃效果
- 🔍 **搜索功能** - 支持通过 Bing 或其他搜索引擎进行搜索
- 🚀 **快速链接** - 可自定义的网站快捷方式
- 🌙 **暗色主题** - 优雅的深色配色方案
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 🔗 修改快速链接
~~~
<!-- 在 index.html 中修改以下部分 -->
<a href="你的链接" class="quick-link" target="_blank">
    <div class="quick-link-icon">
        <i class="fab fa-图标名称"></i>
    </div>
    <div class="quick-link-label">链接名称</div>
</a>
~~~

## 🔍 修改默认搜索引擎
~~~
// 在 script 标签内修改
window.open(`https://搜索引擎URL/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
~~~

## 📜 许可证
本页面实现效果的所有代码部分遵守MIT License。
*毕竟其实基本都是D老师帮忙的嘛，甚至这个Readme.md都是D老师代劳的，我就是吃软饭XD。*
