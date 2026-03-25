// =====================
// 転職エージェントナビ - メインJS
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // ハンバーガーメニュー
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav) nav.classList.remove('open');
      }
    });
  });

  // アフィリエイトリンクのUTMパラメータ自動付与
  document.querySelectorAll('a[data-affiliate]').forEach(link => {
    const base = link.href;
    const source = link.dataset.affiliate;
    link.href = `${base}?utm_source=tensyoku-navi&utm_medium=affiliate&utm_campaign=${source}`;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer nofollow');
  });

  // スクロールアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .compare-table').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

});
