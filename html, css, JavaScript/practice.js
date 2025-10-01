function performSearch() {
    const searchBox = document.querySelector('.search-box');
    const query = searchBox.value.trim();
    
    if (query) {
        // 実際の検索機能の代わりにアラートを表示
        alert(`「${query}」を検索します`);
        searchBox.value = '';
    } else {
        alert('検索キーワードを入力してください');
    }
}

// Enterキーで検索
document.querySelector('.search-box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// アニメーション効果
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 200);
    });
});

// ニュースアイテムのクリックイベント
document.querySelectorAll('.news-title').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        alert('ニュース記事の詳細ページに移動します');
    });
});

// サービスアイテムのクリックイベント
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.textContent.trim();
        alert(`${serviceName}サービスを開きます`);
    });
});

// 時刻の更新（リアルタイム）
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // ニュース時刻を現在時刻周辺にランダム更新
    const newsItems = document.querySelectorAll('.news-time');
    newsItems.forEach((item, index) => {
        const randomMinutes = Math.floor(Math.random() * 60);
        const randomHours = Math.max(0, hours - Math.floor(Math.random() * 4));
        item.textContent = `${String(randomHours).padStart(2, '0')}:${String(randomMinutes).padStart(2, '0')}`;
    });
}

// 5分ごとに時刻更新
setInterval(updateTime, 300000);