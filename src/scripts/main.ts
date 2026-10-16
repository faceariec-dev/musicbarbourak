// Music Bar Bourák – interakce na stránce (bez knihoven).

function initMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const icon = document.getElementById('hamburgerIcon');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !icon || !menu) return;

  const setOpen = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
    icon.textContent = open ? '✕' : '☰';
  };

  btn.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      btn.focus();
    }
  });
}

function initActiveNav() {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav__links a, .mobile-menu a')];
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hash = '#' + entry.target.id;
        links.forEach((l) => l.classList.toggle('is-active', l.hash === hash));
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );
  sections.forEach((s) => observer.observe(s));
}

function initEventsCarousel() {
  const viewport = document.getElementById('eventsViewport');
  const prevBtn = document.getElementById('eventsPrev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('eventsNext') as HTMLButtonElement | null;
  if (!viewport || !prevBtn || !nextBtn) return;

  // Akce s datem, které skončily po posledním sestavení webu, schovat.
  const today = new Date().toLocaleDateString('sv-SE');
  viewport.querySelectorAll<HTMLElement>('[data-until]').forEach((card) => {
    if ((card.dataset.until ?? '') < today) card.remove();
  });

  const cardStep = () => {
    const card = viewport.querySelector('.event-card');
    if (!card) return 300;
    const gap = parseFloat(getComputedStyle(viewport).columnGap) || 18;
    return card.getBoundingClientRect().width + gap;
  };
  const updateButtons = () => {
    const max = viewport.scrollWidth - viewport.clientWidth - 2;
    prevBtn.disabled = viewport.scrollLeft <= 0;
    nextBtn.disabled = viewport.scrollLeft >= max;
  };

  prevBtn.addEventListener('click', () => viewport.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => viewport.scrollBy({ left: cardStep(), behavior: 'smooth' }));
  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();

  // Tažení myší na desktopu (dotykové posouvání funguje samo)
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    isDown = true;
    dragged = false;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 4) dragged = true;
    viewport.scrollLeft = startScroll - delta;
  });
  const endDrag = () => (isDown = false);
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);
  viewport.addEventListener(
    'click',
    (e) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
}

// Dnešní den v otevírací době + „Dnes otevřeno do…“ v úvodu
function initOpeningHours() {
  const rows = [...document.querySelectorAll<HTMLElement>('.hours-list__row')];
  if (!rows.length) return;
  const now = new Date();
  const day = now.getDay(); // 0 = neděle
  const todayRow = rows.find((r) => r.dataset.day === String(day));
  todayRow?.classList.add('is-today');
  document.querySelector(`.tyden__den[data-day="${day}"]`)?.classList.add('is-today');

  const out = document.getElementById('openToday');
  if (!out || !todayRow) return;
  const text = todayRow.lastElementChild?.textContent ?? '';
  out.innerHTML =
    text === 'zavřeno'
      ? 'Dnes máme <strong>zavřeno</strong>.'
      : `Dnes otevřeno: <strong class="is-open">${text}</strong>`;
  out.hidden = false;
}

// Poptávka akce → předvyplněný e-mail (zatím bez serveru)
function initReservationForm() {
  const form = document.getElementById('rezervaceForm') as HTMLFormElement | null;
  const error = document.getElementById('rezervaceError');
  if (!form || !error) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll<HTMLInputElement>('input[required]')];
    let ok = true;
    fields.forEach((f) => {
      const valid = f.value.trim() !== '' && f.checkValidity();
      f.setAttribute('aria-invalid', String(!valid));
      if (!valid) ok = false;
    });
    error.hidden = ok;
    if (!ok) {
      fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }

    const d = new FormData(form);
    const datum = new Date(String(d.get('datum')) + 'T12:00:00').toLocaleDateString('cs-CZ');
    const subject = `Rezervace: ${d.get('typ')} ${datum}, ${d.get('osob')} os.`;
    const body = [
      `Jméno: ${d.get('jmeno')}`,
      `Telefon: ${d.get('telefon')}`,
      `Datum: ${datum}`,
      `Počet osob: ${d.get('osob')}`,
      `Typ akce: ${d.get('typ')}`,
      '',
      String(d.get('zprava') ?? ''),
    ].join('\n');
    window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function initPrint() {
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const show = (el: Element) => el.classList.add('is-visible');
  if (!('IntersectionObserver' in window)) return items.forEach(show);

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px 120px 0px' },
  );
  items.forEach((el) => observer.observe(el));

  // Pojistka: při rychlém skrolování nic nesmí zůstat neviditelné.
  window.addEventListener('load', () => setTimeout(() => document.querySelectorAll('.reveal:not(.is-visible)').forEach(show), 1500));
}

initMobileMenu();
initActiveNav();
initEventsCarousel();
initOpeningHours();
initReservationForm();
initPrint();
initReveal();
