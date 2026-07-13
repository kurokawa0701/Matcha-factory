// N.concept Architects LP - vanilla JS
// 1. 施工実績カルーセル（自動送り + 矢印 + ドット）
// 2. スクロール連動フェードイン

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- カルーセル ---------- */
  var track = document.getElementById('case-track');
  var prevBtn = document.getElementById('case-prev');
  var nextBtn = document.getElementById('case-next');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.carousel-dot'));
  var slideCount = dots.length || 3;
  var current = 0;
  var timer = null;

  function render() {
    if (track) {
      track.style.transform = 'translateX(' + (current * -100) + '%)';
    }
    dots.forEach(function (dot, i) {
      if (i === current) {
        dot.classList.add('is-active');
        dot.style.background = '#3f7355';
      } else {
        dot.classList.remove('is-active');
        dot.style.background = '#c8d4c4';
      }
    });
  }

  function goTo(index) {
    current = ((index % slideCount) + slideCount) % slideCount;
    render();
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(current + 1);
    }, 4500);
  }

  if (track) {
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        startAutoplay();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startAutoplay();
      });
    });
    render();
    startAutoplay();
  }

  /* ---------- スクロール連動フェードイン ---------- */
  var targets = document.querySelectorAll('h2, h3, [data-reveal]');
  if ('IntersectionObserver' in window) {
    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el) { observer.observe(el); });
  }
});
