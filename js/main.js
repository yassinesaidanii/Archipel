  /* ══════════════════════════════════════════════
    TESTIMONIALS CAROUSEL — 4 vidéos visibles
    ► Pour ajouter une vidéo : ajouter un objet dans TESTIS
    ══════════════════════════════════════════════ */
  const TESTIS = [
    { name:' ياسين سعيداني',     score:'16.12', subject:'بكالوريا إعلاميّة', cover:'assets/images/cover-saidani.jpg', emoji:'🎓', url:'https://www.facebook.com/reel/1166127139048707', portrait:true },
    { name:'ريان خليف',   score:'16,76', subject:'بكالوريا إعلاميّة',  cover:'assets/images/cover-khlif.jpg', emoji:'🏆', url:'https://www.facebook.com/reel/865947309906194', portrait:true },
    { name:'عزة همامي',     score:'17,52', subject:'إقتصاد وتصرف', cover:'assets/images/azza.png', emoji:'🎓', url:'https://www.facebook.com/reel/739893285052757', portrait:true },
    { name:'ياسمين بن عمر', score:'17,33', subject:'إقتصاد وتصرف', cover:'assets/images/yassmine.png', emoji:'⭐', url:'https://www.facebook.com/reel/1285349732922496', portrait:true  },
    { name:'طه حاج رجب',   score:'16,39', subject:'علوم تجريبية',  cover:'assets/images/taha.png', emoji:'🏆', url:'https://www.facebook.com/reel/754422650410304', portrait:true  },
    /* ← Ajouter d'autres vidéos ici facilement */
  ];

  let testitIdx   = 0;
  let testitTimer = null;
  const TESTI_DELAY = 5000;

  function testitVisible() {
    if (window.innerWidth < 440) return 1;
    if (window.innerWidth < 700) return 2;
    return 3;
  }

  function testitInit() {
    const track = document.getElementById('testi-track');
    if (!track) return;

    track.innerHTML = TESTIS.map(v => `
      <div class="testi-card">
        <div class="testi-thumb-wrap${v.portrait ? ' portrait-thumb' : ''}" onclick="openVideo('${v.url}')">
          <img class="cover-img" src="${v.cover}" alt="${v.name}"
            onerror="this.style.display='none';this.parentElement.querySelector('.cover-placeholder').style.display='flex'">
          <div class="overlay"></div>
          <div class="cover-placeholder" style="display:none">
            <span class="cp-emoji">${v.emoji}</span>
            <span class="cp-name">${v.name}${v.score ? '<br>'+v.score : ''}</span>
          </div>
          <div class="play-btn">&#9654;</div>
        </div>
        <div class="testi-card-label">${v.name}${v.score ? ' — ' + v.score : ''}${v.subject ? ' / ' + v.subject : ''}</div>
      </div>
    `).join('');

    testitBuildDots();
    testitUpdate();
    testitAutoStart();
    window.addEventListener('resize', () => { testitIdx = 0; testitBuildDots(); testitUpdate(); });
  }

  function testitBuildDots() {
    const vis   = testitVisible();
    const pages = Math.ceil(TESTIS.length / vis);
    const dots  = document.getElementById('testi-dots');
    if (dots) dots.innerHTML = Array.from({length: pages}, (_,i) =>
      `<button class="testi-dot${i===0?' active':''}" onclick="testitGoTo(${i})"></button>`
    ).join('');
  }

  function testitUpdate() {
    const track = document.getElementById('testi-track');
    const cards = track ? track.querySelectorAll('.testi-card') : [];
    if (!cards.length) return;

    const vis    = testitVisible();
    const gap    = 16;
    const contW  = track.parentElement.offsetWidth;
    const cardW  = (contW - gap * (vis - 1)) / vis;
    const maxIdx = Math.max(0, TESTIS.length - vis);

    testitIdx = Math.max(0, Math.min(testitIdx, maxIdx));
    cards.forEach(c => c.style.flex = `0 0 ${cardW}px`);
    track.style.transform = `translateX(-${testitIdx * (cardW + gap)}px)`;

    /* dots */
    const pageIdx = Math.floor(testitIdx / vis);
    document.querySelectorAll('.testi-dot').forEach((d,i) => d.classList.toggle('active', i === pageIdx));

    /* arrows */
    const prev = document.getElementById('testi-prev');
    const next = document.getElementById('testi-next');
    if (prev) prev.disabled = (testitIdx === 0);
    if (next) next.disabled = (testitIdx >= maxIdx);
  }

  function testitShift(dir) {
    const vis = testitVisible();
    testitIdx += dir * vis;
    testitUpdate();
    testitAutoStart();
  }

  function testitGoTo(page) {
    const vis = testitVisible();
    testitIdx = page * vis;
    testitUpdate();
    testitAutoStart();
  }

  function testitAutoStart() {
    clearTimeout(testitTimer);
    testitTimer = setTimeout(() => {
      const vis    = testitVisible();
      const maxIdx = Math.max(0, TESTIS.length - vis);
      testitIdx = (testitIdx >= maxIdx) ? 0 : testitIdx + vis;
      testitUpdate();
      testitAutoStart();
    }, TESTI_DELAY);
  }

  /* ── METHODS TABS ── */
  function switchTab(tab) {
    document.querySelectorAll('.methods-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.methods-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    event.currentTarget.classList.add('active');
  }

  /* ── ABOUT VIDEO ── */
  function openAboutVideo() {
    // ⚠️ Remplace ABOUT_VIDEO_URL par le lien de ta vidéo Facebook/YouTube
    const ABOUT_VIDEO_URL = 'https://www.youtube.com/watch?v=aOBSu51h-ow';
    if (!ABOUT_VIDEO_URL || ABOUT_VIDEO_URL === 'ABOUT_VIDEO_URL') {
      alert('أضف رابط الفيديو في ملف index.html — ابحث عن ABOUT_VIDEO_URL');
      return;
    }
    openVideo(ABOUT_VIDEO_URL);
  }

  /* ── WORKSHOPS VIDEO ── */
  function openWorkshopsVideo() {
    // ⚠️ Remplace WORKSHOPS_VIDEO_URL par le lien de ta vidéo Facebook/YouTube (embed de préférence : https://www.youtube.com/embed/VOTRE_ID)
    const WORKSHOPS_VIDEO_URL = 'VIDEO_URL_HERE';
    if (!WORKSHOPS_VIDEO_URL || WORKSHOPS_VIDEO_URL === 'VIDEO_URL_HERE') {
      alert('أضف رابط الفيديو في ملف main.js — ابحث عن WORKSHOPS_VIDEO_URL');
      return;
    }
    openVideo(WORKSHOPS_VIDEO_URL);
  }

  /* ── FAQ ── */
  function toggleFaq(btn) {
    const a = btn.nextElementSibling;
    const open = a.classList.contains("open");
    document.querySelectorAll(".faq-a.open").forEach(x => x.classList.remove("open"));
    document.querySelectorAll(".faq-q.open").forEach(x => x.classList.remove("open"));
    if (!open) { a.classList.add("open"); btn.classList.add("open"); }
  }

  /* ── VIDEO MODAL ── */
  function openVideo(url) {
    if (!url || url.startsWith('VIDEO_PARENT')) {
      alert('لم يتم تحديد رابط الفيديو بعد');
      return;
    }

    let src = url;

    // YouTube
    const yt = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&?#]+)/
    );

    if (yt) {
      src = `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`;
    }

    // Facebook
    if (url.includes('facebook.com')) {
      src =
        'https://www.facebook.com/plugins/video.php?href=' +
        encodeURIComponent(url) +
        '&show_text=false&width=720';
    }

    // Portrait sizing for YouTube Shorts / Facebook Reels / Instagram Reels / TikTok-style vertical videos
    const isPortraitVideo =
      url.includes('/shorts/') ||
      url.includes('/reel/') ||
      url.includes('facebook.com/reel') ||
      url.includes('instagram.com/reel') ||
      url.includes('tiktok.com');
    const modalBox = document.getElementById('videoModalBox');
    if (modalBox) {
      modalBox.classList.toggle('portrait', isPortraitVideo);
    }

    document.getElementById('videoIframe').src = src;
    document.getElementById('videoModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(e) {
    if (e.target === document.getElementById('videoModal')) closeVideoBtn();
  }
  function closeVideoBtn() {
    document.getElementById('videoIframe').src = '';
    document.getElementById('videoModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── FORM ── */
  function submitForm(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = '...جاري الإرسال';
    btn.disabled = true;

    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Archipel Landing',
        content_category: document.getElementById('f-branch').value
      });
    }

    // ⚠️ Remplace cette URL par ton endpoint (Make / n8n / Google Sheets)
    const WEBHOOK_URL = 'WEBHOOK_URL_HERE';

    const payload = {
      name:   document.getElementById('f-name').value,
      phone:  document.getElementById('f-phone').value,
      gov:    document.getElementById('f-gov').value,
      level:  document.getElementById('f-branch').value,
      source: 'archipel-landing',
      date:   new Date().toISOString()
    };

    if (WEBHOOK_URL !== 'WEBHOOK_URL_HERE') {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    }

    setTimeout(() => {
      document.getElementById('form-content').style.display = 'none';
      document.getElementById('form-ok').style.display = 'block';
      if (typeof fbq !== 'undefined') fbq('track', 'CompleteRegistration');
    }, 900);
  }

  /* ── HAMBURGER ── */
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('navDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
    });
  }
  function closeDrawer() {
    if (burger) burger.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleDrawerSub(e) {
    e.preventDefault();
    const li = e.currentTarget.closest('.drawer-has-sub');
    if (!li) return;
    li.classList.toggle('open');
  }

  /* ── FLOATING CTA ── */
  const floatCta = document.getElementById('floatCta');
  window.addEventListener('scroll', () => {
    if (floatCta) floatCta.classList.toggle('show', window.scrollY > 500);
    closeDrawer();
  }, { passive: true });

  /* ══════════════════════════════════════════════
    JOURNEY STEPPER — Parcours de l'élève
    ► Pour modifier : changer les objets dans JOURNEY_STEPS
    ══════════════════════════════════════════════ */
  const JOURNEY_STEPS = [
    {
      icon:'<img src="assets/icons/Asset 2.svg" alt="يفهم الدرس" class="journey-step-icon">', label:'يفهم الدرس بوضوح',
      title:'يفهم الدرس بوضوح',
      desc:'فيديوهات مبسّطة تشرح كل درس خطوة بخطوة — حتى تصبح المادة واضحة قبل الحصة أو بعدها.',
      thumb:'hero-plat.png', url:'https://youtu.be/NyeJXvfUf1E',
      gradient:'linear-gradient(135deg,#3D1A6E,#6B34C5)'
    },
    {
      icon:'<img src="assets/icons/Asset 3.svg" alt="حصص مباشرة"  class="journey-step-icon">', label:'حصص مباشرة',
      title:'حصص مباشرة',
      desc:'حصص مباشرة للإجابة على الأسئلة وتثبيت الفهم — تفاعل حقيقي مع الأستاذ في الوقت الفعلي.',
      thumb:'explain-plat.png', url:'https://youtu.be/QUXm4_VZHkc',
      gradient:'linear-gradient(135deg,#1a4d8e,#2563eb)'
    },
    {
      icon:'<img src="assets/icons/Asset 4.svg" alt="يطبّق ما تعلّمه" class="journey-step-icon">', label:'يطبّق ما تعلّمه',
      title:'يطبّق ما تعلّمه',
      desc:'تمارين مرفقة بالإصلاح لتثبيت المكتسبات — يتدرب على أمثلة حقيقية ويتحقق من إجاباته فورًا.',
      thumb:'hero-plat.png', url:'https://youtu.be/kCG5rYPvVTM',
      gradient:'linear-gradient(135deg,#6b3d1e,#d97706)'
    },
    {
      icon:'<img src="assets/icons/Asset 5.svg" alt="يراجع في أي وقت" class="journey-step-icon">', label:'يراجع في أي وقت',
      title:'يراجع في أي وقت',
      desc:'إمكانية الرجوع للحصص متى احتاج — لا يفوّته درس، ولا يبقى عالقًا في نقطة لم يفهمها.',
      thumb:'explain-plat.png', url:'https://youtu.be/D3RYM-kwCR0',
      gradient:'linear-gradient(135deg,#1a5e3a,#16a34a)'
    },
    {
      icon:'<img src="assets/icons/Asset 6.svg" alt="يتابع تقدّمه" class="journey-step-icon">', label:'يتابع تقدّمه',
      title:'يتابع تقدّمه',
      desc:'اختبارات تساعده على معرفة مستواه وتحسينه — ابنك يعرف أين هو، وإلى أين يتجه.',
      thumb:'hero-plat.png', url:'https://youtu.be/hkKtMDQL7CA',
      gradient:'linear-gradient(135deg,#5b1a6e,#9333ea)'
    },
  ];

  let journeyCurrent = 0;

  function platformInit() {
    const nav = document.getElementById('journey-steps');
    if (!nav) return;

    nav.innerHTML =
      `<div class="journey-progress" id="journey-prog"></div>` +
      JOURNEY_STEPS.map((s, i) => `
        <div class="journey-step${i===0?' active':''}" id="jstep-${i}" onclick="journeySelect(${i})">
          <div class="journey-step-circle">${s.icon}</div>
          <div class="journey-step-label">${s.label}</div>
          <div class="journey-step-num">${i+1}</div>
        </div>
      `).join('');

    journeyRender(0);
  }

  function journeySelect(idx) {
    journeyCurrent = idx;
    journeyRender(idx);
    /* Lancer la vidéo inline dans la card automatiquement */
    const s = JOURNEY_STEPS[idx];
    if (s && s.url && !s.url.startsWith('PLATFORM_VIDEO')) {
      setTimeout(() => playJourneyInline(idx), 260);
    }
  }

  /* Extracts YouTube video ID from a URL */
  function ytId(url) {
    if (!url) return null;

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\n?#]+)/
    );

    return match ? match[1] : null;
  }

  /* ── OFFRES DROPDOWN ── */
  function toggleOffresDropdown(e){
    e.preventDefault();
    const li = e.currentTarget.closest('.nav-dropdown');
    if(!li) return;
    const isOpen = li.classList.toggle('open');
    if(isOpen){
      // close on outside click
      setTimeout(()=>{
        document.addEventListener('click', function handler(ev){
          if(!li.contains(ev.target)){li.classList.remove('open');document.removeEventListener('click',handler);}
        });
      },0);
    }
  }

  /* Returns the best thumbnail URL for a given step */
  function thumbUrl(s) {
    const id = ytId(s.url);
    if (id) return 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
    if (s.thumb) return s.thumb;
    return null;
  }

  /* Embed YouTube iframe inline inside the card.
    If YouTube blocks embedding (err 150/153), show a fallback button. */
  function playJourneyInline(idx) {
    const s = JOURNEY_STEPS[idx];
    if (!s || !s.url || s.url.startsWith('PLATFORM_VIDEO')) return;
    /* If video owner disabled embedding, open YouTube directly */
    if (s.noEmbed) { window.open(s.url, '_blank'); return; }
    const id = ytId(s.url);
    if (!id) { window.open(s.url, '_blank'); return; }
    const embed = document.querySelector('#journey-card .journey-video-embed');
    if (!embed) return;

    /* YouTube bloque l'embedding depuis file:// — on affiche directement le fallback */
    if (location.protocol === 'file:') {
      showEmbedFallback(embed, s.url, idx);
      return;
    }

    /* Sur un vrai domaine http/https : embedding normal */
    const originParam = location.origin.startsWith('http')
      ? `&origin=${encodeURIComponent(location.origin)}`
      : '';

    /* Garder la miniature visible pendant le chargement, iframe par dessus.
      - embed a overflow:hidden (voir style inline ci-dessous) + iframe surdimensionné (inset négatif)
        => "zoome" légèrement la vidéo pour rogner la barre-titre YouTube (haut) et la
        barre de partage/logo YouTube (bas) qui apparaissent quand la vidéo est en pause.
      - une couche transparente par-dessus l'iframe intercepte les clics pour empêcher
        l'utilisateur de mettre la vidéo en pause (ce qui déclenche justement ces barres). */
    embed.style.overflow = 'hidden';
    const thumb = thumbUrl(s);
    embed.innerHTML = `
      ${thumb ? `<img src="${thumb}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">` : ''}
      <iframe id="jv-iframe-${idx}"
        src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0${originParam}"
        style="position:absolute;inset:-25%;width:150%;height:150%;border:none;z-index:1;background:transparent"
        allow="autoplay; encrypted-media; fullscreen"
        allowfullscreen></iframe>
      <div style="position:absolute;inset:0;z-index:2;background:transparent"></div>`;

    /* Detect embed blocked via YouTube postMessage */
    function onYtMsg(e) {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'infoDelivery' && data.info && data.info.error) {
          showEmbedFallback(embed, s.url, idx);
          window.removeEventListener('message', onYtMsg);
        }
      } catch(err) {}
    }
    window.addEventListener('message', onYtMsg);

    /* Safety timeout — if iframe still blank after 4s, show fallback */
    setTimeout(() => {
      const iframe = document.getElementById('jv-iframe-' + idx);
      if (iframe && iframe.parentElement === embed) {
        /* Try to read if it loaded okay — cross-origin so we can't,
          but if user already saw error we show fallback */
      }
      window.removeEventListener('message', onYtMsg);
    }, 6000);
  }

  function showEmbedFallback(embed, url, idx) {
    const s = JOURNEY_STEPS[idx];
    const thumb = thumbUrl(s);
    embed.innerHTML = `
      ${thumb ? `<img src="${thumb}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : ''}
      <div style="position:absolute;inset:0;background:rgba(30,10,60,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:20px">
        <span style="font-size:2.5rem">🔒</span>
        <p style="color:#fff;font-size:.9rem;font-weight:700;margin:0">هذا الفيديو لا يسمح بالتشغيل المباشر</p>
        <a href="${url}" target="_blank"
          style="background:#fff;color:var(--p);padding:10px 22px;border-radius:8px;font-weight:800;font-size:.88rem;text-decoration:none">
          ▶ شاهد على YouTube
        </a>
      </div>`;
  }

  function journeyRender(idx) {
    const s    = JOURNEY_STEPS[idx];
    const card = document.getElementById('journey-card');
    if (!card || !s) return;

    /* Steps active / done state */
    document.querySelectorAll('.journey-step').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      el.classList.toggle('done',   i < idx);
    });

    /* Progress bar */
    const prog = document.getElementById('journey-prog');
    if (prog) prog.style.width = (idx / (JOURNEY_STEPS.length - 1) * 90) + '%';

    /* Fade out → update → fade in */
    card.style.opacity   = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity .25s,transform .25s';

    setTimeout(() => {
      const thumb  = thumbUrl(s);
      const hasUrl = s.url && !s.url.startsWith('PLATFORM_VIDEO');

      const videoArea = `
        <div class="journey-video-embed">
          ${thumb
            ? `<img src="${thumb}" alt="${s.title}"
                style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"
                onerror="this.style.display='none'">`
            : ''}
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(61,26,110,.55) 100%)"></div>
          ${!thumb ? `<div class="jv-placeholder" style="background:${s.gradient}"><span class="jv-placeholder-icon">${s.icon}</span><span class="jv-placeholder-label">${s.title}</span></div>` : ''}
          <span class="jv-step-badge">الخطوة ${idx+1} من ${JOURNEY_STEPS.length}</span>
          ${hasUrl ? `<button class="journey-play-btn" onclick="playJourneyInline(${idx})" aria-label="شاهد الفيديو">&#9654;</button>` : ''}
        </div>`;

      card.innerHTML = videoArea + `
        <div class="journey-video-body">
          <span class="jvb-icon">${s.icon}</span>
          <div class="jvb-text">
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        </div>
      `;
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }, 200);
  }

  /**----------------------------------------- */
  /* ── OFFRES : toggle online / حضوري ── */
  const OFFRE_PRICES = [
    { online:'39', presentiel:'59' },
    { online:'59', presentiel:'89' },
    { online:'549', presentiel:'699' }
  ];
  const OFFRE_DETAILS = [
    {
      online:   ['حصص مباشرة أسبوعية لجميع المواد','تسجيلات كاملة للمراجعة في أي وقت','دعم عبر الواتساب 6 أيام / 7','امتحانات تجريبية شهرية','متابعة فردية للتقدم'],
      presentiel:['حصص مباشرة + حضورية في المركز','تسجيلات كاملة للمراجعة','دعم عبر الواتساب 6 أيام / 7','ورشات عملية شهرية','متابعة فردية للتقدم']
    },
    {
      online:   ['كل مزايا العرض الأكاديمي أونلاين','ورشات تفاعلية عبر الفيديو','مرافقة نفسية وبيداغوجية','تقرير تقدم دوري لأولياء الأمور','امتحانات تجريبية مع تصحيح'],
      presentiel:['كل مزايا العرض الأكاديمي','حصص حضورية في المركز أسبوعياً','ورشات عملية شهرية','مرافقة نفسية وبيداغوجية فردية','تقرير تقدم دوري لأولياء الأمور']
    },
    {
      online:   ['كل مزايا Mixed أونلاين طوال السنة','مراجعة مكثفة مع البكالوريا البيضاء','حصص مكثفة قبل الامتحانات','امتحانات تجريبية كاملة بتصحيح','تسهيلات في الدفع متوفرة'],
      presentiel:['كل مزايا Mixed حضوري طوال السنة','مراجعة مكثفة مع البكالوريا البيضاء','حصص مكثفة في المركز قبل الامتحانات','امتحانات تجريبية كاملة بتصحيح','تسهيلات في الدفع متوفرة']
    }
  ];

  function setMode(btn, idx, mode) {
    /* Toggle buttons */
    const toggle = btn.closest('.offre-toggle');
    toggle.querySelectorAll('.tgl-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Update price */
    const priceEl = document.getElementById('price-' + idx);
    if (priceEl) {
      priceEl.style.transform = 'scale(.8)';
      priceEl.style.opacity = '0';
      setTimeout(() => {
        priceEl.textContent = OFFRE_PRICES[idx][mode];
        priceEl.style.transform = 'scale(1)';
        priceEl.style.opacity = '1';
      }, 150);
    }

    /* Update old price for bac */
    const oldEl = document.getElementById('old-' + idx);
    if (oldEl) oldEl.textContent = mode === 'online' ? '799' : '999';

    /* Update details */
    const detailsEl = document.getElementById('details-' + idx);
    if (detailsEl && OFFRE_DETAILS[idx]) {
      detailsEl.innerHTML = OFFRE_DETAILS[idx][mode]
        .map(t => `<li><span class="ck">✓</span> ${t}</li>`).join('');
    }
  }

  /* ══════════════════════════════════════════════
    HOME PACKS MODE SWITCH
    ══════════════════════════════════════════════ */
  function switchHomeMode(mode, btn) {
    // Update buttons
    document.querySelectorAll('.hms-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Show/hide panels
    const panels = { online: 'hmp-online', mix: 'hmp-mix', presentiel: 'hmp-presentiel' };
    Object.entries(panels).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = (key === mode) ? 'block' : 'none';
    });
  }

  /* ══════════════════════════════════════════════
    WORKSHOPS
    ► Pour ajouter une ورشة : ajouter un objet dans WORKSHOPS
    ══════════════════════════════════════════════ */
  const WORKSHOPS = [
    {
      icon:'🏥',
      title:'ورشة الإسعافات الأولية',
      desc:'ورشة تطبيقية لتعلّم أساسيات الإسعافات الأولية — الإنعاش القلبي الرئوي، التعامل مع الحالات الطارئة، وكيفية إنقاذ حياة. تدريب عملي بإشراف متخصصين.',
      tags:['إسعافات','تدريب عملي','مهارات حياتية'],
      duration:'3 ساعات', audience:'جميع المستويات', freq:'كل فصل',
      photo:'assets/images/workshop1.jpg',
      gradient:'linear-gradient(135deg,#E8520A,#D4A017)'
    },
    {
      icon:'🤸',
      title:'ورشة الألعاب التقليدية والتماسك',
      desc:'أنشطة جماعية مستوحاة من التراث التونسي — ألعاب تعزز روح الفريق والتعاون والثقة بين التلاميذ في أجواء ممتعة وتفاعلية.',
      tags:['فريق','تراث','أنشطة بدنية'],
      duration:'2 ساعات', audience:'الإعدادي', freq:'شهرياً',
      photo:'assets/images/workshop2.jpg',
      gradient:'linear-gradient(135deg,#3D1A6E,#00AECC)'
    },
    {
      icon:'🎈',
      title:'ورشة التعبير الإبداعي',
      desc:'ورشة تفاعلية تساعد التلميذ على التعبير عن أفكاره ومشاعره بطرق إبداعية — أنشطة فنية ممتعة لتنمية الخيال والثقة بالنفس.',
      tags:['إبداع','تعبير','فن'],
      duration:'2 ساعات', audience:'جميع المستويات', freq:'كل فصل',
      photo:'assets/images/workshop3.jpg',
      gradient:'linear-gradient(135deg,#E8520A,#5B2D9E)'
    },
    {
      icon:'🗺️',
      title:'رحلة استكشافية ميدانية',
      desc:'رحلات تربوية لاكتشاف التراث والبيئة المحلية — تجربة تعليمية خارج أسوار القسم تجمع بين المتعة والمعرفة والعمل الجماعي.',
      tags:['رحلات','استكشاف','تعلّم ميداني'],
      duration:'يوم كامل', audience:'جميع المستويات', freq:'فصلياً',
      photo:'assets/images/workshop4.jpg',
      gradient:'linear-gradient(135deg,#00AECC,#3D1A6E)'
    },
    {
      icon:'💎',
      title:'ورشة الفنون الرقمية والتصميم',
      desc:'اكتشاف عالم التصميم الرقمي — من تصميم المجوهرات إلى الفن الرقمي. ورشة عملية على الحاسوب لتنمية المهارات التقنية والإبداعية.',
      tags:['تصميم رقمي','فن','تكنولوجيا'],
      duration:'3 ساعات', audience:'الثانوي', freq:'شهرياً',
      photo:'assets/images/workshop6.jpg',
      gradient:'linear-gradient(135deg,#5B2D9E,#E8520A)'
    },
    {
      icon:'🏗️',
      title:'ورشة بناء المدن المصغرة',
      desc:'ورشة عملية لتصميم وبناء مجسمات مدن مصغرة — تنمية مهارات الهندسة والتخطيط العمراني والعمل الجماعي بطريقة ممتعة ومبتكرة.',
      tags:['هندسة','مجسمات','عمل جماعي'],
      duration:'4 ساعات', audience:'الإعدادي والثانوي', freq:'كل فصل',
      photo:'assets/images/workshop7.jpg',
      gradient:'linear-gradient(135deg,#2E7D32,#00AECC)'
    },
  ];

  let wkCurrent = 0;

  function workshopsInit() {
    const grid = document.getElementById('wk-grid');
    if (!grid) return;

    // Build thumbnail grid
    grid.innerHTML = WORKSHOPS.map((w, i) => `
      <div class="wk-thumb${i===0?' active':''}" onclick="wkSelect(${i})">
        <div class="wk-thumb-bg" style="background-image:url('${w.photo}')"></div>
        <div class="wk-th-placeholder" style="background:${w.gradient};display:none" id="wk-ph-${i}">
          <span class="wk-th-icon">${w.icon}</span>
          <span class="wk-th-name">${w.title}</span>
        </div>
        <div class="wk-th-overlay"></div>
        <div class="wk-th-title">${w.title}</div>
      </div>
    `).join('');

    // Handle missing images — show gradient placeholder
    WORKSHOPS.forEach((w, i) => {
      const img = new Image();
      img.onerror = () => {
        const thumb = grid.children[i];
        if (thumb) {
          thumb.querySelector('.wk-thumb-bg').style.display = 'none';
          document.getElementById('wk-ph-' + i).style.display = 'flex';
        }
      };
      img.src = w.photo;
    });

    // Render first workshop
    wkRender(0);
  }

  function wkSelect(idx) {
    if (idx === wkCurrent) return;
    wkCurrent = idx;
    wkRender(idx);
  }

  function wkRender(idx) {
    const w    = WORKSHOPS[idx];
    const feat = document.getElementById('wk-featured');
    if (!feat || !w) return;

    feat.style.opacity = '0';
    feat.style.transition = 'opacity .25s';

    setTimeout(() => {
      feat.innerHTML = `
        <div class="wk-feat-img" style="background:${w.gradient}">
          <img src="${w.photo}" alt="${w.title}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="wk-img-placeholder" style="display:none">
            <span class="wk-ph-icon">${w.icon}</span>
            <span class="wk-ph-label">${w.title}</span>
          </div>
        </div>
        <div class="wk-feat-body">
          <div class="wk-feat-tags">${w.tags.map(t=>`<span class="wk-tag">${t}</span>`).join('')}</div>
          <h3 class="wk-feat-title">${w.icon} ${w.title}</h3>
          <p class="wk-feat-desc">${w.desc}</p>
          <div class="wk-feat-meta">
            <div class="wk-meta-item">⏱️ <strong>${w.duration}</strong></div>
            <div class="wk-meta-item">👥 <strong>${w.audience}</strong></div>
            <div class="wk-meta-item">📅 <strong>${w.freq}</strong></div>
          </div>
          <a href="#inscription" class="wk-feat-cta">سجّل في الورشة ←</a>
        </div>
      `;
      feat.style.opacity = '1';
    }, 180);

    // Update active thumb
    document.querySelectorAll('.wk-thumb').forEach((el, i) =>
      el.classList.toggle('active', i === idx)
    );
  }

  /* ══════════════════════════════════════════════
    CENTRES — Style Acadomia (map + liste scrollable)
    ► Pour ajouter un centre : ajouter un objet dans CENTRES
    ══════════════════════════════════════════════ */
  const CENTRES = [
    {
      name:'العوينة',
      nameFr:'Aouina',
      address:'3 نهج الزهور، العوينة 3',
      addressFr:'3 rue Ezzouhour, Aouina 3',
      tel:'55 178 834',
      telLink:'+21655178834',
      mapUrl:'https://maps.google.com/?q=3+rue+ezzouhour+Aouina+Tunis',
      mapEmbed:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5!2d10.2194!3d36.8469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33b0e5555555%3A0x1!2sAouina%2C+Tunis!5e0!3m2!1sfr!2stn!4v1',
      status:'مفتوح',
      hours:'الاثنين – السبت: 8h – 20h',
      ready:true
    },
    {
      name:'المنزه 7',
      nameFr:'Menzah',
      address:'10 نهج جوهر سيكيلي، المنزه 7',
      addressFr:'10 rue Jaouher Sikili, Menzah 7',
      tel:'55 555 555',
      telLink:'+21655555555',
      mapUrl:'https://maps.google.com/?q=10+rue+Jaouher+Sikili+Menzah+7+Tunis',
      mapEmbed:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192!2d10.185!3d36.862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMenzah+7!5e0!3m2!1sfr!2stn!4v1',
      status:'مفتوح',
      hours:'الاثنين – السبت: 8h – 20h',
      ready:true
    },
    {
      name:'بومهل',
      nameFr:'Boumhal',
      address:'العنوان قريباً',
      addressFr:'',
      tel:'قريباً',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'مفتوح',
      hours:'الاثنين – السبت: 8h – 20h',
      ready:true
    },
    {
      name:'المروج 3',
      nameFr:'El Mourouj',
      address:'العنوان قريباً',
      addressFr:'',
      tel:'قريباً',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'مفتوح',
      hours:'الاثنين – السبت: 8h – 20h',
      ready:true
    },
    {
      name:'باردو',
      nameFr:'Bardo',
      address:'العنوان قريباً',
      addressFr:'',
      tel:'قريباً',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'مفتوح',
      hours:'الاثنين – السبت: 8h – 20h',
      ready:true
    },
    {
      name:'منوبة',
      nameFr:'Manouba',
      address:'',
      addressFr:'',
      tel:'',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'قريباً',
      hours:'',
      ready:false
    },
    {
      name:'رادس',
      nameFr:'Radès',
      address:'',
      addressFr:'',
      tel:'',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'قريباً',
      hours:'',
      ready:false
    },
    {
      name:'الغزالة',
      nameFr:'El Ghazela',
      address:'',
      addressFr:'',
      tel:'',
      telLink:'',
      mapUrl:'',
      mapEmbed:'',
      status:'قريباً',
      hours:'',
      ready:false
    },
  ];

  let ctCurrent = 0;

  function centresInit() {
    const list = document.getElementById('ct-list-col');
    if (!list) return;

    const phoneSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
    const pinSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#5B2D9E"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>`;

    list.innerHTML = CENTRES.map((c, i) => {
      const isSoon = !c.ready;
      const telBtn = c.telLink
        ? `<a href="tel:${c.telLink}" class="ct-card-tel">${phoneSvg} ${c.tel}</a>`
        : `<span class="ct-card-tel">${phoneSvg} ${c.tel}</span>`;
      const ctaBtn = `<a href="${c.mapUrl || '#'}" target="_blank" class="ct-card-cta">📍 الموقع على الخريطة</a>`;
      const addrText = c.addressFr ? `${c.address} — ${c.addressFr}` : c.address;

      return `
        <div class="ct-card${i===0?' active':''}${isSoon?' ct-soon':''}" data-idx="${i}" onclick="ctSelect(${i})">
          <div class="ct-card-name">
            ${c.name}
            <span class="ct-highlight">${c.nameFr}</span>
          </div>
          <div class="ct-card-addr">
            ${pinSvg}
            <span>${addrText}</span>
          </div>
          ${c.hours ? `<div class="ct-card-hours"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${c.hours}</div>` : ''}
          <div class="ct-card-status">
            <span class="dot"></span>
            ${c.status}
          </div>
          <div class="ct-card-actions">
            ${telBtn}
            ${ctaBtn}
          </div>
        </div>
      `;
    }).join('');

    /* Select first centre by default */
    ctUpdateMap(0);
  }

  function ctSelect(idx) {
    ctCurrent = idx;
    ctUpdateMap(idx);
    document.querySelectorAll('.ct-card').forEach((el, i) =>
      el.classList.toggle('active', i === idx)
    );
  }

  function ctUpdateMap(idx) {
    const c = CENTRES[idx];
    const iframe = document.getElementById('ct-map-iframe');
    if (!iframe || !c) return;

    if (c.mapEmbed) {
      iframe.src = c.mapEmbed;
    } else {
      /* Default: overview of Tunis */
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102239.7!2d10.1!3d36.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sfr!2stn!4v1';
    }
  }

  /* ══════════════════════════════════════════════
    PARTNERS CAROUSEL
    ► Pour modifier : changer le tableau PARTNERS
    ══════════════════════════════════════════════ */
  const PARTNERS = [
    { name:'SOTETEL',     logo:'LOGO_SOTETEL-removebg-preview.png' },
    { name:'STEG',        logo:'LOGO_STEG-removebg-preview.png' },
    { name:'ONAS',        logo:'Logo_ONAS_-removebg-preview.png' },
    { name:'Amlak Dawla', logo:'Logo_amlak_dawla_-removebg-preview.png' },
    { name:'OACA',        logo:'amicale_oaca-removebg-preview.png' },
    { name:'MAMF',        logo:'logo_MAMF_-removebg-preview.png' },
    { name:'Amen Bank',   logo:'logo_amen_bank-removebg-preview.png' },
    { name:'CNAM',        logo:'logo_amicale_cnam-removebg-preview.png' },
    { name:'BIAT',        logo:'logo_biat-removebg-preview.png' },
    { name:'Mut Défense', logo:'logo_mut_defense_-removebg-preview.png' },
    { name:'Orange',      logo:'logo_orange-removebg-preview.png' },
    { name:'Tunisair',    logo:'logo_tunisair-removebg-preview.png' },
    { name:'Vitalait',    logo:'logo_vitalait-removebg-preview.png' },
  ];

  function partnersInit() {
    const track = document.getElementById('partners-track');
    if (!track) return;

    // Build one set of items wrapped in .p-item
    const oneSet = PARTNERS.map(p =>
      `<span class="p-item">
        <img class="partner-logo" src="assets/logos/${p.logo}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">
        <span class="partner-placeholder" style="display:none">${p.name}</span>
      </span>`
    ).join('');

    // Step 1: render one set to measure its width
    track.innerHTML = oneSet;
    const setW = track.scrollWidth;
    const screenW = window.innerWidth;

    // Step 2: force minimum 8 copies for seamless infinite loop (never empty)
    const minCopies = Math.max(8, Math.ceil((screenW * 3) / setW) * 2);
    const totalCopies = minCopies % 2 === 0 ? minCopies : minCopies + 1;
    track.innerHTML = oneSet.repeat(totalCopies);

    // Step 3: animation moves exactly half the total width so it loops seamlessly
    const halfW = track.scrollWidth / 2;
    const speed = 50; // px per second
    track.style.setProperty('--dur', (halfW / speed) + 's');

    // Replace img with placeholders for logos that exist
    track.querySelectorAll('.p-item img').forEach(img => {
      img.addEventListener('error', () => {
        const name = img.alt;
        img.outerHTML = `<span class="partner-placeholder">${name}</span>`;
      });
    });
  }

  /* ══════════════════════════════════════════════
    PARENT TESTIMONIALS — شهادات الأولياء
    ► Pour ajouter : ajouter un objet dans PARENT_TESTIS
    ══════════════════════════════════════════════ */
  const PARENT_TESTIS = [
    {
      name: 'مدام هند زغلامي',
      info: 'وليّة أمر — Archipel',
      quote: 'تشاركنا تجربتها كوليّة مع Archipel.',
      cover: 'assets/images/parents/hend-soghlami.jpg',
      emoji:'👩',
      url: 'https://youtube.com/shorts/vvznPz-fg2o'
    },
    {
      name: 'مدام سهير زيدي',
      info: 'وليّة أمر — Archipel',
      quote: 'تشاركنا تجربتها كوليّة مع Archipel.',
      cover: 'assets/images/parents/a.png', emoji: '👩', url: 'https://www.youtube.com/embed/67lVx6jNYtc?si=mGQAwOVjhBHfv4SA'
    },
    {
      name: 'السيد أيمن',
      info: 'وليّ أمر — Archipel',
      quote: 'تشاركنا تجربتها كوليّ مع Archipel.',
      cover: 'assets/images/parents/parent8.jpeg', emoji: '👩', url: 'https://www.facebook.com/reel/1038290075661874'
    },
    {
      name: 'مدام',
      info: 'وليّة أمر — Archipel',
      quote: 'يشاركنا تجربته كولي مع Archipel.',
      cover: 'assets/images/parents/bac-parent.jpg', emoji: '👨', url: 'https://www.facebook.com/reel/1336093281288157'
    },
    {
      name: 'مدام فرح بن نصر',
      info: 'وليّة أمر — Archipel',
      quote: 'يشاركنا تجربته كولي مع Archipel.',
      cover: 'assets/images/parents/farah-benNasr.jpg', emoji: '👨', url: 'https://www.facebook.com/reel/2086956108884582'
    },
    {
      name: 'السيّد حسين سلامة',
      info: 'وليّ أمر — Archipel',
      quote: 'يشاركنا تجربته كولي مع Archipel.',
      cover: 'assets/images/parents/thumbnail.jpg', emoji: '👨', url: 'https://youtube.com/shorts/3nNlvZ9WED8'
    },
    {
      name: 'مدام أميرة',
      info: 'وليّة أمر — Archipel',
      quote: 'تشاركنا تجربتها كوليّة مع Archipel.',
      cover: 'assets/images/parents/Mme-amira.jpg', emoji: '👩', url: 'https://youtube.com/shorts/gUOvSjlVHEg'
    },
    {
      name: 'السيّد وناس كامل',
      info: 'وليّة أمر — Archipel',
      quote: 'تشاركنا تجربتها كوليّة مع Archipel.',
      cover: 'assets/images/parents/wannes-kamel.jpg', emoji: '👩', url: 'https://youtube.com/shorts/sO6dj7Kk-IU'
    },
    {
      name: 'مدام لمية فطناسي',
      info: 'وليّ أمر — Archipel',
      quote: 'لكلّنا في Archipel عائلة وحدة!',
      cover: 'assets/images/parents/mme-lamia-fatnassi.jpg', emoji: '👨', url: 'https://youtube.com/shorts/cgZ6Z7tkCqo'
    },
    {
      name: 'مدام ناهد',
      info: 'وليّة أمر — Archipel',
      quote: 'لكلّنا في Archipel عائلة وحدة!',
      cover: 'assets/images/parents/mme-nahed.jpg', emoji: '👨', url: 'https://www.facebook.com/reel/860148563859673'
    },
    {
      name: 'مدام حنان',
      info: 'وليّة أمر — Archipel',
      quote: 'لكلّنا في Archipel عائلة وحدة!',
      cover: 'assets/images/parents/mme-hanen.jpg', emoji: '👨', url: 'https://www.facebook.com/reel/1250433186671957'
    },
    /* ← يمكنك إضافة شهادات جديدة بنفس الصيغة */
  ];

  let ptestitIdx = 0;
  let ptestitTimer = null;

  function ptestitVisible() {
    if (window.innerWidth < 440) return 1;
    if (window.innerWidth < 700) return 2;
    return 3;
  }

  function ptestitInit() {
    const track = document.getElementById('ptesti-track');
    if (!track) return;

    track.innerHTML = PARENT_TESTIS.map(v => `
      <div class="parent-quote-card">
        <div class="pq-video" onclick="openVideo('${v.url}')">
          <img class="cover-img" src="${v.cover}" alt="${v.name}"
            onerror="this.style.display='none';this.parentElement.querySelector('.pq-placeholder').style.display='flex'">
          <div class="overlay"></div>
          <div class="pq-placeholder" style="display:none">
            <span class="pp-emoji">${v.emoji}</span>
            <span class="pp-name">${v.name}</span>
          </div>
          <div class="play-btn">&#9654;</div>
          <div class="pq-overlay-info">
            <img class="pq-overlay-avatar" src="${v.cover}" alt="${v.name}"
              onerror="this.style.display='none'">
            <div>
              <div class="pq-overlay-name">${v.name}</div>
              <div class="pq-overlay-sub">${v.info}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    ptestitBuildDots();
    ptestitUpdate();
    ptestitAutoStart();
    window.addEventListener('resize', () => { ptestitIdx = 0; ptestitBuildDots(); ptestitUpdate(); });
  }

  function ptestitBuildDots() {
    const vis   = ptestitVisible();
    const pages = Math.ceil(PARENT_TESTIS.length / vis);
    const dots  = document.getElementById('ptesti-dots');
    if (dots) dots.innerHTML = Array.from({length: pages}, (_,i) =>
      `<button class="testi-dot${i===0?' active':''}" onclick="ptestitGoTo(${i})"></button>`
    ).join('');
  }

  function ptestitUpdate() {
    const track = document.getElementById('ptesti-track');
    const cards = track ? track.querySelectorAll('.parent-quote-card') : [];
    if (!cards.length) return;

    const vis    = ptestitVisible();
    const gap    = 16;
    const contW  = track.parentElement.offsetWidth;
    const cardW  = (contW - gap * (vis - 1)) / vis;
    const maxIdx = Math.max(0, PARENT_TESTIS.length - vis);

    ptestitIdx = Math.max(0, Math.min(ptestitIdx, maxIdx));
    cards.forEach(c => c.style.flex = `0 0 ${cardW}px`);
    track.style.transform = `translateX(-${ptestitIdx * (cardW + gap)}px)`;

    const pageIdx = Math.floor(ptestitIdx / vis);
    document.querySelectorAll('#ptesti-dots .testi-dot').forEach((d,i) => d.classList.toggle('active', i === pageIdx));

    const prev = document.getElementById('ptesti-prev');
    const next = document.getElementById('ptesti-next');
    if (prev) prev.disabled = (ptestitIdx === 0);
    if (next) next.disabled = (ptestitIdx >= maxIdx);
  }

  function ptestitShift(dir) {
    const vis = ptestitVisible();
    ptestitIdx += dir * vis;
    ptestitUpdate();
    ptestitAutoStart();
  }

  function ptestitGoTo(page) {
    const vis = ptestitVisible();
    ptestitIdx = page * vis;
    ptestitUpdate();
    ptestitAutoStart();
  }

  function ptestitAutoStart() {
    clearTimeout(ptestitTimer);
    ptestitTimer = setTimeout(() => {
      const vis    = ptestitVisible();
      const maxIdx = Math.max(0, PARENT_TESTIS.length - vis);
      ptestitIdx = (ptestitIdx >= maxIdx) ? 0 : ptestitIdx + vis;
      ptestitUpdate();
      ptestitAutoStart();
    }, 5500);
  }

  /* ── HERO PHOTO BACKGROUND (transition diagonale, glissement vers la droite) ── */
  function heroPhotoBgInit() {
    const wrap    = document.querySelector('.hero-photo-bg');
    const imgBack = document.getElementById('heroPhotoBgImg');
    if (!wrap || !imgBack) return;

    const photos = [
      'assets/images/bb1.jpg',
      'assets/images/bb3.jpg',
      'assets/images/bb4.jpg',
      'assets/images/bb5.jpg',
      'assets/images/bb6.jpg',
      'assets/images/bb7.jpg',
      'assets/images/bb8.jpg',
      'assets/images/bb9.jpg',
      'assets/images/bb10.jpg',
      'assets/images/bb11.jpg',
      'assets/images/bb12.jpg',
      'assets/images/bb13.jpg',
      'assets/images/bb14.jpg',
      'assets/images/bb15.jpg',
      'assets/images/bb16.jpg',
      'assets/images/bb17.jpg',
      'assets/images/bb18.jpg',
      'assets/images/bb19.jpg',
      'assets/images/bb20.jpg',
      'assets/images/bb21.jpg'
    ];

    let idx = 0;
    const INTERVAL_MS = 4000; // fondu de 4s + 1.5s d'affichage fixe entre les photos

    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      /* Repli simple en fondu pour les personnes sensibles au mouvement */
      imgBack.style.transition = 'opacity 4s ease';
      setInterval(() => {
        idx = (idx + 1) % photos.length;
        imgBack.style.opacity = '0';
        setTimeout(() => {
          imgBack.src = photos[idx];
          imgBack.style.opacity = '1';
        }, 4000);
      }, INTERVAL_MS);
      return;
    }

    /* Couche arrière = photo affichée actuellement, plein cadre */
    imgBack.classList.add('is-back');

    /* Couche avant = prochaine photo, révélée par un biseau diagonal
      qui balaye de gauche à droite (RTL friendly, purement visuel) */
    const imgFront = document.createElement('img');
    imgFront.className = 'hero-photo-bg-img is-front';
    imgFront.alt = '';
    wrap.appendChild(imgFront);

    function triggerWipe() {
      idx = (idx + 1) % photos.length;
      imgFront.src = photos[idx];
      imgFront.classList.remove('is-wiping');
      void imgFront.offsetWidth; // force reflow pour relancer l'animation
      imgFront.classList.add('is-wiping');
    }

    imgFront.addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'opacity') return;
      imgBack.src = imgFront.src;
      imgFront.classList.remove('is-wiping');
    });

    setInterval(triggerWipe, INTERVAL_MS);
  }

  /* ── INIT ── */
  platformInit();
  workshopsInit();
  centresInit();
  partnersInit();
  testitInit();
  ptestitInit();
  heroPhotoBgInit();


  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── AUTO-PLAY vidéo يفهم الدرس quand la section entre dans le viewport ──
    Si la vidéo 0 a noEmbed:true, on skip l'auto-play (évite Erreur 153) */
  let journeyAutoPlayed = false;
  const journeySecEl = document.getElementById('platform-sec');
  if (journeySecEl) {
    const journeyAutoObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !journeyAutoPlayed) {
          journeyAutoPlayed = true;
          journeyAutoObs.disconnect();
          setTimeout(() => playJourneyInline(0), 600);
        }
      });
    }, { threshold: 0.15 });
    journeyAutoObs.observe(journeySecEl);
  }