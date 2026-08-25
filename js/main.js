/* =========================================================
   Music Bar Bourák — vanilla JS
   No dependencies, no build step. Organised by feature so
   each block maps cleanly to a future WordPress template part.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  function initMobileMenu() {
    var btn = document.getElementById('hamburgerBtn');
    var icon = document.getElementById('hamburgerIcon');
    var menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    function closeMenu() {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Otevřít menu');
      icon.textContent = '☰';
    }

    function openMenu() {
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Zavřít menu');
      icon.textContent = '✕';
    }

    btn.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        btn.focus();
      }
    });
  }

  /* ---------------------------------------------------------
     Active nav link on scroll
  --------------------------------------------------------- */
  function initActiveNav() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a, .mobile-menu a'));
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (l) {
      var id = l.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        (byId[id] = byId[id] || []).push(l);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        (byId[id] || []).forEach(function (l) { l.classList.add('is-active'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------------------------------------------------
     Events carousel (#akce) — arrow buttons + native swipe
  --------------------------------------------------------- */
  var EVENTS = [
    { poster: 'CHYTRÝ KVÍZ', bg: 'linear-gradient(135deg,#d94a1f,#1c1c1c)', title: 'Chytrý kvíz', date: 'Každé úterý', desc: 'Otestujte své znalosti a užijte si večer plný zábavy.', tag: 'KVÍZ', tagColor: '#B93A15', tagBg: '#fbe4db' },
    { poster: 'DISCO 80KY & 90KY', bg: 'linear-gradient(135deg,#c21e9c,#5b1e9c)', title: 'Disco 80ky & 90ky', date: 'Každý pátek a sobotu', desc: 'Největší hity, tanec a atmosféra až do noci.', tag: 'DISCO', tagColor: '#c21e9c', tagBg: '#fbe1f3' },
    { poster: 'LIVE KONCERT', bg: 'linear-gradient(135deg,#3a1f66,#7a2ea0)', title: 'Live koncerty', date: 'Pravidelně', desc: 'Živá hudba a koncertní večery.', tag: 'HUDBA', tagColor: '#7a2ea0', tagBg: '#efe1f5' },
    { poster: 'DĚTSKÝ DEN', bg: 'linear-gradient(135deg,#f0b429,#e8531d)', title: 'Dětský den', date: 'Sezónně', desc: 'Tematické a speciální akce pro děti a rodiny.', tag: 'ZÁBAVA', tagColor: '#c76a12', tagBg: '#fbecd6' },
    { poster: 'SOUKROMÉ AKCE', bg: 'linear-gradient(135deg,#7a1f2e,#2a2a2a)', title: 'Soukromé a tematické akce', date: 'Na míru', desc: 'Soukromé večírky, narozeninové oslavy či tematické večery.', tag: 'AKCE', tagColor: '#7a1f2e', tagBg: '#fbe1e6' }
  ];

  function renderEvents() {
    var viewport = document.getElementById('eventsViewport');
    if (!viewport) return;

    EVENTS.forEach(function (ev) {
      var card = document.createElement('article');
      card.className = 'event-card reveal';

      var poster = document.createElement('div');
      poster.className = 'event-card__poster';
      poster.style.background = ev.bg;
      poster.textContent = ev.poster;
      poster.setAttribute('aria-hidden', 'true');

      var body = document.createElement('div');
      body.className = 'event-card__body';

      var title = document.createElement('h3');
      title.className = 'event-card__title';
      title.textContent = ev.title;

      var date = document.createElement('div');
      date.className = 'event-card__date';
      date.textContent = ev.date;

      var desc = document.createElement('p');
      desc.className = 'event-card__desc';
      desc.textContent = ev.desc;

      var tag = document.createElement('span');
      tag.className = 'event-card__tag';
      tag.textContent = ev.tag;
      tag.style.color = ev.tagColor;
      tag.style.background = ev.tagBg;

      body.appendChild(title);
      body.appendChild(date);
      body.appendChild(desc);
      body.appendChild(tag);
      card.appendChild(poster);
      card.appendChild(body);
      viewport.appendChild(card);
    });
  }

  function initEventsCarousel() {
    var viewport = document.getElementById('eventsViewport');
    var prevBtn = document.getElementById('eventsPrev');
    var nextBtn = document.getElementById('eventsNext');
    if (!viewport || !prevBtn || !nextBtn) return;

    function cardStep() {
      var card = viewport.querySelector('.event-card');
      if (!card) return 300;
      var style = window.getComputedStyle(viewport);
      var gap = parseFloat(style.columnGap || style.gap || 18);
      return card.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
      var max = viewport.scrollWidth - viewport.clientWidth - 2;
      prevBtn.disabled = viewport.scrollLeft <= 0;
      nextBtn.disabled = viewport.scrollLeft >= max;
    }

    prevBtn.addEventListener('click', function () {
      viewport.scrollBy({ left: -cardStep(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      viewport.scrollBy({ left: cardStep(), behavior: 'smooth' });
    });
    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();

    /* Desktop mouse-drag scrolling (touch swipe works natively) */
    var isDown = false, startX = 0, startScroll = 0, dragged = false;
    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      isDown = true;
      dragged = false;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!isDown) return;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 4) dragged = true;
      viewport.scrollLeft = startScroll - delta;
    });
    function endDrag() { isDown = false; }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('pointerleave', endDrag);
    viewport.addEventListener('click', function (e) {
      if (dragged) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ---------------------------------------------------------
     Facebook wall — mock data now, ready for Meta Graph API later.
     Replace FB_POSTS with data fetched from the Graph API /feed
     endpoint (same shape: author, time, text, image, permalink)
     and call renderFacebookPosts() again — markup stays the same.
  --------------------------------------------------------- */
  var FB_POSTS = [
    { author: 'Music Bar Bourák', time: 'před 1 dnem', text: 'Díky všem za parádní koncert! Byla to jízda! 🤘', image: null, permalink: '#' },
    { author: 'Music Bar Bourák', time: 'před 3 dny', text: 'Tahle parta zvládla kvíz na jedničku! 🧠🏆', image: null, permalink: '#' },
    { author: 'Music Bar Bourák', time: 'před 5 dny', text: 'V pátek to u nás zase rozjedeme! Disco 80ky & 90ky nesmíte minout. Přijďte si užít hity, které znáte a milujete. 🍺🎵', image: null, permalink: '#' },
    { author: 'Music Bar Bourák', time: 'před 1 týdnem', text: 'Disco 80ky & 90ky – parket byl nabitý až do rána! Děkujeme za atmosféru. 🕺💃', image: null, permalink: '#' }
  ];

  var FB_IMAGE_COLORS = ['#3a1f4a', '#4a2a1f', '#5b1e5b', '#1e2a5b'];

  function buildFbCard(post, index) {
    var card = document.createElement('article');
    card.className = 'fb-card reveal';

    var head = document.createElement('div');
    head.className = 'fb-card__head';

    var avatar = document.createElement('div');
    avatar.className = 'fb-card__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = 'MB';

    var meta = document.createElement('div');
    var author = document.createElement('div');
    author.className = 'fb-card__author';
    author.textContent = post.author;
    var time = document.createElement('div');
    time.className = 'fb-card__time';
    time.textContent = post.time;
    meta.appendChild(author);
    meta.appendChild(time);

    head.appendChild(avatar);
    head.appendChild(meta);

    var text = document.createElement('p');
    text.className = 'fb-card__text';
    text.textContent = post.text;

    card.appendChild(head);
    card.appendChild(text);

    if (post.image) {
      var img = document.createElement('div');
      img.className = 'fb-card__image';
      img.style.backgroundImage = "url('" + post.image + "')";
      img.setAttribute('role', 'img');
      img.setAttribute('aria-label', 'Fotografie k příspěvku');
      card.appendChild(img);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'fb-card__image';
      placeholder.style.background = FB_IMAGE_COLORS[index % FB_IMAGE_COLORS.length];
      card.appendChild(placeholder);
    }

    var link = document.createElement('a');
    link.className = 'fb-card__link';
    link.href = post.permalink;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Zobrazit na Facebooku →';
    card.appendChild(link);

    return card;
  }

  function renderFacebookPosts() {
    var grid = document.getElementById('fbGrid');
    var carousel = document.getElementById('fbCarousel');
    if (!grid && !carousel) return;

    FB_POSTS.forEach(function (post, index) {
      if (grid) grid.appendChild(buildFbCard(post, index));
      if (carousel) carousel.appendChild(buildFbCard(post, index));
    });
  }

  /* ---------------------------------------------------------
     Reveal-on-scroll
  --------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 120px 0px' });

    items.forEach(function (el) { observer.observe(el); });

    /* Safety net: a fast/jumpy scroll (or an odd browser edge case) can
       skip an IntersectionObserver frame. Never leave content stuck
       invisible — reveal anything the observer missed after a short delay. */
    window.addEventListener('load', function () {
      setTimeout(function () {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
          el.classList.add('is-visible');
        });
      }, 1500);
    });
  }

  /* ---------------------------------------------------------
     Footer copyright year
  --------------------------------------------------------- */
  function initCopyrightYear() {
    var el = document.getElementById('copyrightYear');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initActiveNav();
    renderEvents();
    initEventsCarousel();
    renderFacebookPosts();
    initReveal();
    initCopyrightYear();
  });
})();
