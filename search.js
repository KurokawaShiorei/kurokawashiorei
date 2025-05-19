// search.js
document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    document.getElementById('searchButton').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim();
        if (searchTerm) {
            window.open(`https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
        }
    }
});