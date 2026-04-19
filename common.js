// 공통 기능: 쿠키 동의 배너 + 헤더 네비게이션 + footer 업데이트
(function () {
  'use strict';

  var COOKIE_KEY = 'cookie_consent_v1';

  /* ── 쿠키 동의 배너 ── */
  function showCookieBanner() {
    if (localStorage.getItem(COOKIE_KEY)) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', '쿠키 사용 동의');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p>본 사이트는 서비스 제공 및 맞춤형 광고(Google AdSense)를 위해 쿠키를 사용합니다. ' +
        '사이트를 계속 이용하시면 <a href="/privacy.html">개인정보처리방침</a> 및 쿠키 정책에 동의하는 것으로 간주됩니다.</p>' +
        '<div class="cookie-buttons">' +
          '<button id="cookie-accept" class="cookie-btn-accept">동의하고 계속하기</button>' +
          '<a href="/privacy.html" class="cookie-btn-more">자세히 보기</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, '1');
      banner.style.display = 'none';
    });
  }

  /* ── 헤더 네비게이션 주입 (계산기 개별 페이지 전용) ── */
  function addHeaderNav() {
    var header = document.querySelector('.header');
    if (!header) return;
    if (header.querySelector('.header-nav')) return; // 중복 방지

    var nav = document.createElement('nav');
    nav.className = 'header-nav';
    nav.setAttribute('aria-label', '주요 메뉴');
    nav.innerHTML =
      '<a href="/">계산기 목록</a>' +
      '<a href="/about.html">서비스 소개</a>' +
      '<a href="/contact.html">문의하기</a>';
    header.appendChild(nav);
  }

  /* ── 푸터에 문의하기 링크 추가 ── */
  function updateFooter() {
    var footerLinks = document.querySelector('.footer-links');
    if (!footerLinks) return;
    if (footerLinks.querySelector('a[href="/contact.html"]')) return; // 중복 방지

    var a = document.createElement('a');
    a.href = '/contact.html';
    a.textContent = '문의하기';
    footerLinks.appendChild(a);
  }

  document.addEventListener('DOMContentLoaded', function () {
    showCookieBanner();
    addHeaderNav();
    updateFooter();
  });
})();
