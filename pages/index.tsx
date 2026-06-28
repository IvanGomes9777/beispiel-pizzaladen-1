import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById('nav') as HTMLElement;
    const ticker = document.getElementById('ticker') as HTMLElement;
    const onScroll = () => { const y = window.scrollY; nav.classList.toggle('solid', y > 40); ticker.classList.toggle('hide', y > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = document.getElementById('burger') as HTMLElement;
    const md = document.getElementById('menuDrawer') as HTMLElement;
    const ms = document.getElementById('menuScrim') as HTMLElement;
    const setMenu = (o: boolean) => { burger.classList.toggle('x', o); md.classList.toggle('open', o); ms.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
    burger.addEventListener('click', () => setMenu(!md.classList.contains('open')));
    ms.addEventListener('click', () => setMenu(false));
    md.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    const cd = document.getElementById('cartDrawer') as HTMLElement;
    const cs = document.getElementById('cartScrim') as HTMLElement;
    const openCart = (o: boolean) => { cd.classList.toggle('open', o); cs.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
    document.getElementById('cartBtn')!.addEventListener('click', () => openCart(true));
    document.getElementById('cartClose')!.addEventListener('click', () => openCart(false));
    cs.addEventListener('click', () => openCart(false));

    document.getElementById('plzForm')!.addEventListener('submit', e => {
      e.preventDefault();
      const val = (document.getElementById('plzInput') as HTMLInputElement).value.trim();
      const ok = /^481\d\d$/.test(val);
      (document.getElementById('resOk') as HTMLElement).style.display = ok ? 'flex' : 'none';
      (document.getElementById('resNo') as HTMLElement).style.display = ok ? 'none' : 'flex';
    });

    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.16 });
    document.querySelectorAll('.rv').forEach(n => io.observe(n));

    const legal = document.getElementById('legal');
    if (legal) legal.innerHTML = '<b>Allergene:</b> a = Gluten · c = Eier · d = Fisch · g = Milch · h = Schalenfrüchte. Preise inkl. USt (Speisen 7 %, Getränke 19 %). Bilder & Daten sind Platzhalter (Demo).';

    const IMG = (kw: string, lock: number, w = 600) => `https://loremflickr.com/${w}/450/${kw}?lock=${lock}`;
    const eur = (n: number) => n.toFixed(2).replace('.', ',') + ' €';
    const num = (s: string) => parseFloat(s.replace(',', '.'));

    interface Item { n: string; d: string; p: string; kw: string; al: string[]; t: string[]; lock: number; key: string; price: number; qty: number; }
    interface Category { id: string; name: string; note?: string; items: Partial<Item>[]; }

    const MENU: Category[] = [
      { id: 'pizza', name: 'Pizza', note: 'Ø 30 cm', items: [
        { n: 'Margherita', d: 'Tomate, Mozzarella, Basilikum', p: '7,50', kw: 'pizza,margherita', al: ['a','g'], t: ['veg'] },
        { n: 'Salami', d: 'Tomate, Mozzarella, Salami', p: '8,50', kw: 'pizza,salami', al: ['a','g'], t: ['halal'] },
        { n: 'Funghi', d: 'Champignons, Mozzarella', p: '8,50', kw: 'pizza,mushroom', al: ['a','g'], t: ['veg'] },
        { n: 'Prosciutto', d: 'Schinken, Tomate, Käse', p: '8,90', kw: 'pizza,ham', al: ['a','g'], t: [] },
        { n: 'Diavola', d: 'Scharfe Salami, Peperoni, Chili', p: '9,50', kw: 'pizza,pepperoni', al: ['a','g'], t: ['hot','halal'] },
        { n: 'Tonno', d: 'Thunfisch, Zwiebeln', p: '9,50', kw: 'pizza,tuna', al: ['a','d','g'], t: [] },
        { n: 'Quattro Formaggi', d: 'Vier Käsesorten', p: '9,90', kw: 'pizza,cheese', al: ['a','g'], t: ['veg'] },
        { n: 'Döner-Pizza', d: 'Dönerfleisch, Zwiebeln, Soße', p: '10,50', kw: 'pizza,kebab', al: ['a','g'], t: ['halal'] },
        { n: 'Familienpizza XXL', d: '40 cm, 2 Beläge frei', p: '14,50', kw: 'pizza,large', al: ['a','g'], t: [] },
      ]},
      { id: 'doener', name: 'Döner & Kebab', note: 'frisch vom Drehspieß', items: [
        { n: 'Döner Tasche', d: 'Kalbfleisch, Salat, Soße', p: '6,50', kw: 'doner,kebab', al: ['a','g'], t: ['halal'] },
        { n: 'Dürüm Döner', d: 'gerollt im Yufka', p: '7,50', kw: 'durum,wrap', al: ['a','g'], t: ['halal'] },
        { n: 'Döner Teller', d: 'mit Pommes oder Reis & Salat', p: '9,90', kw: 'kebab,plate', al: ['a','g'], t: ['halal'] },
        { n: 'Lahmacun mit Fleisch', d: 'türkische Pizza, Salat', p: '7,50', kw: 'lahmacun', al: ['a','g'], t: ['halal'] },
        { n: 'Falafel Dürüm', d: 'hausgemachte Falafel, Hummus', p: '6,90', kw: 'falafel,wrap', al: ['a'], t: ['vegan'] },
        { n: 'Iskender', d: 'Döner auf Brot, Tomatensoße, Joghurt', p: '11,90', kw: 'iskender,kebab', al: ['a','g'], t: ['halal'] },
      ]},
      { id: 'schnitzel', name: 'Schnitzel', note: 'mit Pommes & Salat', items: [
        { n: 'Schnitzel Wiener Art', d: 'paniert, mit Pommes', p: '9,90', kw: 'schnitzel', al: ['a','c'], t: [] },
        { n: 'Jägerschnitzel', d: 'Champignon-Rahmsоße', p: '11,50', kw: 'schnitzel,mushroom', al: ['a','c','g'], t: [] },
        { n: 'Paprikaschnitzel', d: 'Paprika-Rahmsоße', p: '11,50', kw: 'schnitzel,sauce', al: ['a','c','g'], t: ['hot'] },
        { n: 'Hähnchenschnitzel', d: 'knusprig, mit Pommes', p: '9,90', kw: 'chicken,schnitzel', al: ['a','c'], t: ['halal'] },
      ]},
      { id: 'burger', name: 'Burger & Grill', items: [
        { n: 'Cheeseburger', d: 'Beef, Cheddar, Salat', p: '7,90', kw: 'cheeseburger', al: ['a','c','g'], t: ['halal'] },
        { n: 'Smash Double', d: 'doppelt Beef, Cheddar, Pommes', p: '9,90', kw: 'burger,cheese', al: ['a','c','g'], t: ['halal'] },
        { n: 'Chicken Burger', d: 'knuspriges Hähnchen', p: '8,90', kw: 'chicken,burger', al: ['a','c'], t: ['halal'] },
        { n: 'Veggie Burger', d: 'Falafel-Patty, Avocado', p: '8,50', kw: 'veggie,burger', al: ['a'], t: ['veg'] },
      ]},
      { id: 'beilagen', name: 'Beilagen', items: [
        { n: 'Pommes', d: 'mit Ketchup & Mayo', p: '3,50', kw: 'french,fries', al: [], t: ['vegan'] },
        { n: 'Süßkartoffel-Pommes', d: 'knusprig', p: '4,50', kw: 'sweetpotato,fries', al: [], t: ['vegan'] },
        { n: 'Mozzarella Sticks', d: '6 Stück mit Dip', p: '5,50', kw: 'mozzarella,sticks', al: ['a','g'], t: ['veg'] },
        { n: 'Knoblauchbrot', d: 'mit Kräuterbutter', p: '4,50', kw: 'garlic,bread', al: ['a','g'], t: ['veg'] },
      ]},
      { id: 'getraenke', name: 'Getränke', note: 'inkl. 19 % USt', items: [
        { n: 'Coca-Cola 0,33l', d: '', p: '2,50', kw: 'cola,glass', al: [], t: [] },
        { n: 'Fanta 0,33l', d: '', p: '2,50', kw: 'orange,soda', al: [], t: [] },
        { n: 'Wasser 0,5l', d: 'still/medium', p: '2,00', kw: 'water,bottle', al: [], t: ['vegan'] },
        { n: 'Ayran 0,25l', d: 'Joghurtgetränk', p: '1,80', kw: 'ayran,drink', al: ['g'], t: ['veg'] },
      ]},
      { id: 'dessert', name: 'Dessert', items: [
        { n: 'Baklava', d: '2 Stück, süß', p: '3,50', kw: 'baklava', al: ['a','h'], t: ['veg'] },
        { n: 'Tiramisu', d: 'hausgemacht', p: '4,50', kw: 'tiramisu', al: ['a','c','g'], t: ['veg'] },
      ]},
    ];

    let lk = 10;
    const ITEMS: Record<string, Item> = {};
    MENU.forEach(c => c.items.forEach((it, idx) => { (it as Item).lock = ++lk; (it as Item).key = c.id + '-' + idx; (it as Item).price = num(it.p!); ITEMS[(it as Item).key] = it as Item; }));

    const tagLabel: Record<string, string> = { veg: 'vegetarisch', vegan: 'vegan', halal: 'halal', hot: 'scharf' };
    const tags = (a: string[]) => a.map(t => `<span class="tag ${t}">${tagLabel[t]}</span>`).join('');
    const allerg = (a: string[]) => a.map(x => `<span class="badge">${x}</span>`).join('');

    const catnav = document.getElementById('catnav')!;
    const grid = document.getElementById('grid')!;
    const catH = document.getElementById('catH')!;
    catnav.innerHTML = MENU.map((c, i) => `<a data-cat="${c.id}" class="${i === 0 ? 'on' : ''}">${c.name}</a>`).join('');

    const cart: Record<string, Item> = {};
    let mode = 'liefern';
    const DELIVERY = { min: 15, fee: 2.5, freeAbove: 25 };

    const dishHTML = (it: Item) => `<article class="dish" data-key="${it.key}"><div class="dish__im"><img loading="lazy" src="${IMG(it.kw, it.lock)}" alt="${it.n}"></div><div class="dish__b"><div class="dish__t"><h3>${it.n}</h3><span class="price">${it.p} €</span></div>${it.d ? `<p class="dish__d">${it.d}</p>` : ''}<div class="dish__f"><span class="dish__meta">${tags(it.t)} ${allerg(it.al)}</span><div data-mount="${it.key}"></div></div></div></article>`;

    function mountControls() {
      document.querySelectorAll('[data-mount]').forEach(m => {
        const key = (m as HTMLElement).getAttribute('data-mount')!;
        const q = cart[key]?.qty || 0;
        m.innerHTML = q > 0 ? `<div class="qstep"><button data-dec="${key}">−</button><span class="q">${q}</span><button data-inc="${key}">+</button></div>` : `<button class="add" data-add="${key}"><svg class="ic" viewBox="0 0 24 24"><use href="#i-bag"/></svg>Hinzufügen</button>`;
      });
    }

    function totals() {
      const sub = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
      const cnt = Object.values(cart).reduce((s, i) => s + i.qty, 0);
      let fee = DELIVERY.fee;
      if (mode === 'liefern' && sub >= DELIVERY.freeAbove) fee = 0;
      return { sub, cnt, fee, total: sub + (cnt ? fee : 0) };
    }

    function bump() { const b = document.getElementById('cartBtn')!; b.classList.remove('bump'); void (b as HTMLElement).offsetWidth; b.classList.add('bump'); }

    function fly(el: HTMLElement | null) {
      if (!el) return;
      const img = el.closest('.dish')?.querySelector('.dish__im img') as HTMLImageElement;
      const tgt = document.getElementById('cartBtn')!;
      if (!img || !tgt) return;
      const s = img.getBoundingClientRect(), e = tgt.getBoundingClientRect();
      const f = img.cloneNode() as HTMLImageElement;
      f.className = 'fly';
      Object.assign(f.style, { left: s.left + 'px', top: s.top + 'px', width: s.width + 'px', height: s.height + 'px' });
      document.body.appendChild(f);
      requestAnimationFrame(() => { f.style.transform = `translate(${e.left - s.left + 10}px,${e.top - s.top + 5}px) scale(.12)`; f.style.opacity = '0'; });
      setTimeout(() => f.remove(), 820);
    }

    function renderCart() {
      const { sub, cnt, fee, total } = totals();
      (document.getElementById('cartCnt') as HTMLElement).textContent = String(cnt);
      (document.getElementById('cartTotal') as HTMLElement).textContent = eur(mode === 'liefern' ? total : sub);
      const list = document.getElementById('cartList')!;
      const foot = document.getElementById('cartFoot')!;
      if (!cnt) { list.innerHTML = '<div class="empty">Dein Warenkorb ist leer.<br>Füge etwas Leckeres hinzu 🍕</div>'; foot.innerHTML = ''; return; }
      list.innerHTML = Object.values(cart).map(i => `<div class="ci"><img src="${IMG(i.kw, i.lock, 120)}" alt=""><div class="b"><h4>${i.n}</h4><div class="p">${eur(i.price)}</div></div><div class="qstep"><button data-dec="${i.key}">−</button><span class="q">${i.qty}</span><button data-inc="${i.key}">+</button></div></div>`).join('');
      const below = mode === 'liefern' && sub < DELIVERY.min;
      foot.innerHTML = `${mode === 'liefern' ? `<div class="cartline"><span>Zwischensumme</span><span>${eur(sub)}</span></div><div class="cartline"><span>Liefergebühr${fee === 0 ? ' (gratis)' : ''}</span><span>${eur(fee)}</span></div>` : ''}
        <div class="cartline total"><span>${mode === 'liefern' ? 'Gesamt' : 'Abholpreis'}</span><span>${eur(mode === 'liefern' ? total : sub)}</span></div>
        ${below ? `<div class="notice">Noch <b>${eur(DELIVERY.min - sub)}</b> bis zum Mindestbestellwert (${eur(DELIVERY.min)}).</div>` : ''}
        <button class="checkout" ${below ? 'disabled' : ''}><svg class="ic" viewBox="0 0 24 24"><use href="#i-${mode === 'liefern' ? 'bike' : 'bag'}"/></svg>${mode === 'liefern' ? 'Liefern lassen' : 'Abholen'} · ${eur(mode === 'liefern' ? total : sub)}</button>`;
      mountControls();
    }

    function addItem(key: string, el: HTMLElement) { const it = ITEMS[key]; if (!cart[key]) cart[key] = { ...it, qty: 0 }; cart[key].qty++; fly(el); bump(); mountControls(); renderCart(); }
    function incItem(key: string) { cart[key].qty++; mountControls(); renderCart(); }
    function decItem(key: string) { if (!cart[key]) return; cart[key].qty--; if (cart[key].qty <= 0) delete cart[key]; mountControls(); renderCart(); }

    function setMode(m: string) {
      mode = m;
      document.querySelectorAll('[data-segrow] button').forEach(b => (b as HTMLElement).classList.toggle('on', (b as HTMLElement).dataset.mode === m));
      renderCart();
    }

    function renderCategory(id: string) {
      const c = MENU.find(x => x.id === id)!;
      catnav.querySelectorAll('a').forEach(a => (a as HTMLElement).classList.toggle('on', (a as HTMLElement).dataset.cat === id));
      catH.classList.add('switching');
      catH.innerHTML = `<h2>${c.name}</h2><span>${c.note ? c.note + ' · ' : ''}${c.items.length} Gerichte</span>`;
      grid.innerHTML = c.items.map(it => dishHTML(it as Item)).join('');
      mountControls();
      requestAnimationFrame(() => { catH.classList.remove('switching'); [...grid.children].forEach((d, i) => { (d as HTMLElement).style.transitionDelay = (Math.min(i, 10) * 0.04) + 's'; requestAnimationFrame(() => d.classList.add('in')); }); });
    }

    document.addEventListener('click', e => {
      const t = e.target as HTMLElement;
      const cat = t.closest('[data-cat]') as HTMLElement; if (cat) { renderCategory(cat.dataset.cat!); return; }
      const a = t.closest('[data-add]') as HTMLElement; if (a) { addItem(a.dataset.add!, a); return; }
      const inc_ = t.closest('[data-inc]') as HTMLElement; if (inc_) { incItem(inc_.dataset.inc!); return; }
      const dec_ = t.closest('[data-dec]') as HTMLElement; if (dec_) { decItem(dec_.dataset.dec!); return; }
      const seg = t.closest('[data-segrow] button') as HTMLElement; if (seg) { setMode(seg.dataset.mode!); return; }
    });

    renderCategory(MENU[0].id);
    setMode('liefern');
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>DON VITO &ndash; Pizza &middot; D&ouml;ner &middot; Grill &middot; M&uuml;nster | Direkt bestellen</title>
        <meta name="description" content="DON VITO M&uuml;nster: Pizza, D&ouml;ner, Schnitzel &amp; Burger frisch zubereitet. Direkt bestellen &ndash; ohne Lieferando-Aufschlag." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true"><defs>
        <g id="i-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></g>
        <g id="i-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></g>
        <g id="i-bike"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 17.5h-6l-2-7h11l-1 4M9 6h3l1 4"/></g>
        <g id="i-list"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></g>
        <g id="i-check"><path d="M20 6 9 17l-5-5"/></g>
        <g id="i-x"><path d="M18 6 6 18M6 6l12 12"/></g>
        <g id="i-search"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></g>
        <g id="i-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></g>
      </defs></svg>

      <div className="ticker" id="ticker"><div className="ticker__track">
        <span>0% Provision &middot; direkt bestellen</span><span>Frisch vom Drehspie&szlig;</span><span>Halal</span><span>Vegan-Optionen</span><span>Lieferung in ganz M&uuml;nster</span><span>T&auml;glich 11&ndash;23 Uhr</span>
        <span>0% Provision &middot; direkt bestellen</span><span>Frisch vom Drehspie&szlig;</span><span>Halal</span><span>Vegan-Optionen</span><span>Lieferung in ganz M&uuml;nster</span><span>T&auml;glich 11&ndash;23 Uhr</span>
      </div></div>

      <nav className="nav" id="nav">
        <a className="brand" href="#start"><span className="mk"><img src="https://loremflickr.com/120/120/pizza?lock=1" alt="DON VITO"/></span><span className="word"><span className="l1">DON</span><span className="l2">VITO</span></span></a>
        <ul className="links"><li><a href="#speisekarte">Speisekarte</a></li><li><a href="#bestellen">Bestellen</a></li><li><a href="#bestellen">Liefergebiet</a></li><li><a href="#kontakt">Kontakt</a></li></ul>
        <div className="right">
          <span className="status"><span className="dot"></span>Jetzt ge&ouml;ffnet &middot; bis 23:00</span>
          <a className="call" href="tel:+4925198765"><svg className="ic" viewBox="0 0 24 24"><use href="#i-phone"/></svg>Anrufen</a>
          <button className="cartbtn" id="cartBtn"><svg className="ic" viewBox="0 0 24 24"><use href="#i-bag"/></svg><span id="cartTotal">0,00 &euro;</span><span className="cnt" id="cartCnt">0</span></button>
          <button className="burger" id="burger" aria-label="Men&uuml;"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div className="menu-scrim" id="menuScrim"></div>
      <aside className="menu-drawer" id="menuDrawer">
        <a href="#speisekarte">Speisekarte</a><a href="#bestellen">Bestellen</a><a href="#bestellen">Liefergebiet</a><a href="#kontakt">Kontakt</a>
        <a className="call" style={{justifyContent:'center',marginTop:'.5rem'}} href="tel:+4925198765"><svg className="ic" viewBox="0 0 24 24"><use href="#i-phone"/></svg>0251 / 98 76 54</a>
      </aside>

      <header className="hero" id="start">
        <video className="hero__video" autoPlay muted loop playsInline preload="auto" poster="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_3EknngK0c2BOTYwZTVuud4sjKuF/hf_20260622_200412_1577789c-39fc-4dbd-b7d1-6dd3406e4f44.mp4" type="video/mp4"/>
        </video>
        <div className="hero__grade"></div><div className="hero__grain"></div>
        <div className="hero-content">
          <span className="usp">&#9733; 0 % Aufschlag &middot; provisionsfrei direkt bei uns bestellen</span>
          <h1><span className="line"><span>Frisch.</span></span><span className="line"><span>Hei&szlig;.</span></span><span className="line"><span><em>Direkt bestellt.</em></span></span></h1>
          <p className="sub">Burger frisch vom Grill, D&ouml;ner vom Spie&szlig;, Pizza aus dem Steinofen &ndash; geliefert in ganz M&uuml;nster.</p>
          <div className="trust"><span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span><b>4,8</b> &middot; 612 Google-Bewertungen</span><span className="sep"></span><span><b>~30 Min</b> Lieferzeit</span><span className="sep"></span><span><b>0 &euro;</b> Provisionsaufschlag</span></div>
          <div className="feat"><span>Halal</span><span>Vegan-Optionen</span><span>Frische Zutaten</span><span>Eigene Lieferung</span></div>
          <div className="cta"><a className="btn" href="#speisekarte"><svg className="ic" viewBox="0 0 24 24"><use href="#i-bag"/></svg>Zur Speisekarte</a><a className="btn btn--ghost" href="tel:+4925198765"><svg className="ic" viewBox="0 0 24 24"><use href="#i-phone"/></svg>0251 / 98 76 54</a></div>
        </div>
      </header>

      <section className="shell" id="speisekarte" style={{paddingTop:'1.5rem'}}>
        <div className="eyebrow rv">Unsere Speisekarte</div>
        <h2 className="t rv">Was darf&apos;s <em>sein?</em></h2>
        <p className="lead rv">Frisch zubereitet &middot; Preise inkl. USt &middot; Allergene gekennzeichnet.</p>
        <div className="menubar"><div className="seg" data-segrow=""><button className="on" data-mode="liefern">Liefern</button><button data-mode="abholen">Abholen</button></div></div>
        <nav className="catnav"><div className="catnav__in" id="catnav"></div></nav>
        <div className="cat__h" id="catH"></div>
        <div className="grid" id="grid"></div>
      </section>

      <section className="shell" id="bestellen">
        <div className="wrap">
          <div className="eyebrow rv">Bestellen &amp; Liefergebiet</div>
          <h2 className="t rv">Direkt bestellen &ndash; <em>ohne Aufschlag</em></h2>
          <p className="lead rv">Pr&uuml;f dein Liefergebiet und warum sich die Direktbestellung lohnt.</p>
          <div className="plz rv">
            <label style={{fontWeight:700}}>Liefern wir zu dir? Deine PLZ:</label>
            <form id="plzForm"><input id="plzInput" inputMode="numeric" maxLength={5} placeholder="z. B. 48153"/><button className="btn" type="submit"><svg className="ic" viewBox="0 0 24 24"><use href="#i-search"/></svg>Pr&uuml;fen</button></form>
            <div className="res ok" id="resOk" style={{display:'none'}}><svg className="ic" viewBox="0 0 24 24" style={{color:'#8ef0a4'}}><use href="#i-check"/></svg><span>Super &ndash; <b>wir liefern zu dir!</b> Lieferzeit <b>~30 Min</b> &middot; Mindestbestellwert <b>15 &euro;</b>.</span></div>
            <div className="res no" id="resNo" style={{display:'none'}}><svg className="ic" viewBox="0 0 24 24" style={{color:'#ffe0a8'}}><use href="#i-pin"/></svg><span>Au&szlig;erhalb des Liefergebiets &ndash; <b>Abholung</b> jederzeit m&ouml;glich!</span></div>
            <div className="chk"><span><span className="dot"></span> <b>Jetzt ge&ouml;ffnet</b></span><span>Lieferzeit <b>~30 Min</b></span><span>Gratis ab <b>25 &euro;</b></span></div>
          </div>
          <div className="divider"></div>
          <div className="eyebrow rv">So funktioniert&apos;s</div>
          <h2 className="t rv" style={{fontSize:'clamp(1.6rem,1rem+3vw,2.6rem)'}}>In 3 Schritten <em>bestellt</em></h2>
          <div className="steps rv" id="steps">
            <div className="step"><div className="circle"><span className="nn">1</span><svg className="ic" viewBox="0 0 24 24" style={{color:'var(--mustard)',width:'34px',height:'34px'}}><use href="#i-list"/></svg></div><h3>Ausw&auml;hlen</h3><p>Lieblingsgericht in den Warenkorb legen.</p></div>
            <div className="step"><div className="circle"><span className="nn">2</span><svg className="ic" viewBox="0 0 24 24" style={{color:'var(--mustard)',width:'34px',height:'34px'}}><use href="#i-bag"/></svg></div><h3>Bestellen</h3><p>Liefern/Abholen w&auml;hlen, sicher bezahlen.</p></div>
            <div className="step"><div className="circle"><span className="nn">3</span><svg className="ic" viewBox="0 0 24 24" style={{color:'var(--mustard)',width:'34px',height:'34px'}}><use href="#i-bike"/></svg></div><h3>Genie&szlig;en</h3><p>Frisch &amp; in ~30 Min bei dir.</p></div>
          </div>
          <div className="divider"></div>
          <div className="eyebrow rv">Warum direkt?</div>
          <h2 className="t rv" style={{fontSize:'clamp(1.6rem,1rem+3vw,2.6rem)'}}>Direkt bestellen <em>lohnt sich</em></h2>
          <div className="cmp">
            <div className="col win rv"><span className="lab">&#9733; Empfohlen</span><h3>Direkt bei DON VITO</h3>
              <div className="row"><svg className="ic yes" viewBox="0 0 24 24"><use href="#i-check"/></svg><span><b>0 %</b> Provisionsaufschlag</span></div>
              <div className="row"><svg className="ic yes" viewBox="0 0 24 24"><use href="#i-check"/></svg> Faire Preise direkt vom Laden</div>
              <div className="row"><svg className="ic yes" viewBox="0 0 24 24"><use href="#i-check"/></svg> Treuepunkte &amp; Stammkunden-Angebote</div>
              <div className="row"><svg className="ic yes" viewBox="0 0 24 24"><use href="#i-check"/></svg> Unterst&uuml;tzt den lokalen Laden</div>
            </div>
            <div className="col lose rv"><span className="lab">Lieferplattform</span><h3>Lieferando &amp; Co.</h3>
              <div className="row"><svg className="ic nope" viewBox="0 0 24 24"><use href="#i-x"/></svg><span><b>13&ndash;30 %</b> Provision</span></div>
              <div className="row"><svg className="ic nope" viewBox="0 0 24 24"><use href="#i-x"/></svg> Oft h&ouml;here Men&uuml;preise</div>
              <div className="row"><svg className="ic nope" viewBox="0 0 24 24"><use href="#i-x"/></svg> Keine direkten Treuevorteile</div>
              <div className="row"><svg className="ic nope" viewBox="0 0 24 24"><use href="#i-x"/></svg> Plattform &bdquo;besitzt&ldquo; den Kunden</div>
            </div>
          </div>
          <div className="save rv">Jede Direktbestellung spart dem Laden bis zu <b>30 %</b> &ndash; das kommt als Qualit&auml;t &amp; faire Preise zu dir zur&uuml;ck.</div>
          <div style={{textAlign:'center',marginTop:'2rem'}} className="rv"><a className="btn" href="#speisekarte"><svg className="ic" viewBox="0 0 24 24"><use href="#i-bag"/></svg>Jetzt direkt bestellen</a></div>
        </div>
      </section>

      <footer id="kontakt">
        <div className="fcols">
          <div>
            <a className="brand" href="#start"><span className="mk" style={{width:'38px',height:'38px'}}><img src="https://loremflickr.com/120/120/pizza?lock=1" alt=""/></span><span className="word" style={{fontSize:'1.6rem'}}><span className="l1">DON</span><span className="l2">VITO</span></span></a>
            <p>Pizza &middot; D&ouml;ner &middot; Schnitzel &middot; Burger &ndash; frisch &amp; direkt bestellt in M&uuml;nster.</p>
          </div>
          <div><h4>Kontakt</h4><p className="li"><a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Hammer Str. 142<br/>48153 M&uuml;nster</a><a href="tel:+4925198765">0251 / 98 76 54</a><a href="mailto:hallo@donvito-muenster.de">hallo@donvito-muenster.de</a></p></div>
          <div><h4>&Ouml;ffnungszeiten</h4><p>Mo&ndash;Do 11&ndash;23 Uhr<br/>Fr&ndash;Sa 11&ndash;24 Uhr<br/>So 12&ndash;23 Uhr</p><p style={{marginTop:'.4rem',color:'#8ef0a4'}}><span className="dot"></span> Jetzt ge&ouml;ffnet</p></div>
          <div><h4>Rechtliches</h4><p className="li"><a href="#">Impressum</a><a href="#">Datenschutz</a><a href="#">AGB / Lieferbedingungen</a></p></div>
        </div>
        <div className="fbottom"><span>&copy; 2026 DON VITO M&uuml;nster &middot; fiktives Demo</span><span>Erstellt von <a href="https://webdesignbyivan.de" target="_blank" rel="noopener noreferrer">webdesignbyivan.de</a></span></div>
        <p className="legalnote" id="legal"></p>
      </footer>

      <div className="cart-scrim" id="cartScrim"></div>
      <aside className="cart-drawer" id="cartDrawer">
        <div className="cart-drawer__h"><svg className="ic" viewBox="0 0 24 24" style={{width:'1.4em',height:'1.4em'}}><use href="#i-bag"/></svg><h2>Warenkorb</h2><button className="x" id="cartClose">&times;</button></div>
        <div className="mode"><div className="seg" data-segrow="" style={{width:'100%',justifyContent:'center'}}><button className="on" data-mode="liefern">Liefern</button><button data-mode="abholen">Abholen</button></div></div>
        <div className="cart-list" id="cartList"></div>
        <div className="cart-foot" id="cartFoot"></div>
      </aside>
    </>
  );
}
