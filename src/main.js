import './style.css'

const imageSources = {
  hero: 'https://basehabitation.com/wp-content/uploads/2024/04/Summer-Shot.jpg',
  winter: 'https://basehabitation.com/wp-content/uploads/2024/04/Winter-Shot.jpg',
  base1: 'https://basehabitation.com/wp-content/uploads/2024/03/Base-I-Elevation-Front-Dark-1024x672.png',
  base1Back: 'https://basehabitation.com/wp-content/uploads/2024/02/BASE1_Black_BACK-1024x672.png',
  base1Plus: 'https://basehabitation.com/wp-content/uploads/2024/02/BASE1_White_FRONT-1-1024x672.png',
  base1PlusBack: 'https://basehabitation.com/wp-content/uploads/2024/02/BACK_B_Pale_V3-1024x672.png',
  base1Beige: 'https://basehabitation.com/wp-content/uploads/2024/02/BASE1_White_FRONT-576x378.png',
  base1BeigeBack: 'https://basehabitation.com/wp-content/uploads/2024/02/BACK_A_Pale_V3-576x378.png',
  base1PlusBlack: 'https://basehabitation.com/wp-content/uploads/2024/02/BASE1_Black_FRONT-1-576x378.png',
  base1PlusBlackBack: 'https://basehabitation.com/wp-content/uploads/2024/02/BASE1_Black_BACK-1-576x378.png',
  interior: 'https://basehabitation.com/wp-content/uploads/2024/04/BASE_salon01-version2-576x360.jpg',
  interiorAlt: 'https://basehabitation.com/wp-content/uploads/2024/04/A-space-to-recharge-lifes-batteries-B-576x360.jpg',
  kitchen: 'https://basehabitation.com/wp-content/uploads/2024/04/Kitchen-Full-576x360.jpg',
  kitchenStripped: 'https://basehabitation.com/wp-content/uploads/2024/04/Kitchen-Stripped-Down-576x360.jpg',
  bedroom: 'https://basehabitation.com/wp-content/uploads/2024/04/Bedroom-Plus-576x360.jpg',
  bedroomLoft: 'https://basehabitation.com/wp-content/uploads/2024/02/f2601831c4758c99aef7db34305708f1-576x360.jpg',
  deck: 'https://basehabitation.com/wp-content/uploads/2024/04/BASE_deck01-version2-576x325.jpg',
  deckPlus: 'https://basehabitation.com/wp-content/uploads/2024/04/Deck-Plus-576x325.jpg',
  material: 'https://basehabitation.com/wp-content/uploads/2024/04/20240315_Base_Material_Section_D-768x768.jpg',
  assembly: 'https://basehabitation.com/wp-content/uploads/2024/08/Quick-Assembly-Transparent-Process_sm-768x768.jpg',
  adaptable: 'https://basehabitation.com/wp-content/uploads/2024/04/Adapts-with-you-over-time-768x768.png',
}

const state = {
  model: 'base1',
  modelImage: 'front',
  modelColor: 'black',
  surroundings: 'summer',
  interiorImage: 'interior',
  interestOpen: false,
  menuOpen: false,
}

const app = document.querySelector('#app')

function render() {
  app.innerHTML = `
    <header class="site-header ${state.menuOpen ? 'menu-is-open' : ''}">
      <a class="brand" href="#top" aria-label="BASE home">
        <span class="brand-mark">B</span>
        <span class="brand-name">BASE</span>
      </a>
      <nav class="top-nav" aria-label="Main navigation">
        <button class="interest-toggle" aria-expanded="${state.interestOpen}" aria-controls="interest-panel" data-action="interest">I'm interested <span>${state.interestOpen ? '×' : '↗'}</span></button>
        <span class="nav-divider">/</span>
        <button class="menu-toggle" aria-expanded="${state.menuOpen}" aria-controls="menu-panel">${state.menuOpen ? 'Close' : 'Menu'} <span class="menu-icon">${state.menuOpen ? '×' : '☰'}</span></button>
      </nav>
      ${state.menuOpen ? `<div class="menu-panel" id="menu-panel"><a href="#models" data-action="close-panels">Models</a><a href="#why-base" data-action="close-panels">Why BASE</a><a href="#life" data-action="close-panels">Life at BASE</a><a href="#contact" data-action="close-panels">Contact</a><p>Find your base. Leave the everyday behind.</p></div>` : ''}
      ${state.interestOpen ? `<div class="interest-panel" id="interest-panel" role="dialog" aria-label="Contact BASE"><button class="panel-close" aria-label="Close contact panel" data-action="interest">×</button><p class="eyebrow">Start your escape</p><h2>Let’s find your BASE.</h2><p>Tell us where you want to go and we’ll help you choose the right model for your adventure.</p><a class="button button-dark" href="#contact" data-action="close-panels">Get in touch <span>↗</span></a></div>` : ''}
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero-image image-reveal" style="--image: url('${imageSources.hero}')"></div>
        <div class="hero-copy"><p class="eyebrow">BASE habitation</p><h1>Dream big,<br><em>live simple.</em></h1><a class="scroll-cue" href="#intro">Scroll to explore <span>↓</span></a></div>
      </section>

      <section class="intro section-pad" id="intro">
        <div class="section-label">What we do</div>
        <div class="intro-copy"><h2>Modular cabins for simple, <em>sustainable living.</em></h2><p>We produce high-performance, compact homes that let you escape the everyday to a space that is good for you and good for the planet.</p></div>
      </section>

      <section class="surroundings section-pad" id="models">
        <div class="split-heading"><div><p class="eyebrow">Find your base</p><h2>Your base camp,<br>no matter your <em>mountain.</em></h2></div><p>Built to go virtually anywhere, our models are the starting and end point for all your adventures.</p></div>
        <div class="surrounding-view"><div class="surrounding-image image-reveal" style="--image: url('${imageSources[state.surroundings === 'summer' ? 'hero' : 'winter']}')"></div><div class="surrounding-caption"><span>BASE in the wild</span><span>Quebec, Canada</span></div></div>
        <div class="control-row"><div class="dot-controls" aria-label="Environment images"><button class="dot ${state.surroundings === 'summer' ? 'active' : ''}" aria-label="Show summer view" aria-pressed="${state.surroundings === 'summer'}" data-action="surroundings" data-value="summer"></button><button class="dot ${state.surroundings === 'winter' ? 'active' : ''}" aria-label="Show winter view" aria-pressed="${state.surroundings === 'winter'}" data-action="surroundings" data-value="winter"></button><span>${state.surroundings === 'summer' ? '1' : '2'} / 2</span></div><div class="text-buttons" aria-label="Choose model"><button class="${state.model === 'base1Plus' ? 'active' : ''}" aria-pressed="${state.model === 'base1Plus'}" data-action="model" data-value="base1Plus">BASE 1+ <span>↗</span></button><button class="${state.model === 'base1' ? 'active' : ''}" aria-pressed="${state.model === 'base1'}" data-action="model" data-value="base1">BASE 1 <span>↗</span></button></div></div>
      </section>

      <section class="model-showcase section-pad">
        <div class="model-card"><div class="model-visual dark-visual"><img src="${state.model === 'base1' ? (state.modelColor === 'black' ? (state.modelImage === 'front' ? imageSources.base1 : imageSources.base1Back) : (state.modelImage === 'front' ? imageSources.base1Beige : imageSources.base1BeigeBack)) : (state.modelColor === 'black' ? (state.modelImage === 'front' ? imageSources.base1PlusBlack : imageSources.base1PlusBlackBack) : (state.modelImage === 'front' ? imageSources.base1Plus : imageSources.base1PlusBack))}" alt="${state.model === 'base1' ? 'BASE 1 cabin' : 'BASE 1 plus cabin'}" /><button class="expand-btn" aria-label="Enlarge image" data-action="expand-model">↗</button></div><div class="model-controls"><div class="dot-controls" aria-label="Model images"><button class="dot ${state.modelImage === 'front' ? 'active' : ''}" aria-label="Show front view" aria-pressed="${state.modelImage === 'front'}" data-action="modelImage" data-value="front"></button><button class="dot ${state.modelImage === 'back' ? 'active' : ''}" aria-label="Show back view" aria-pressed="${state.modelImage === 'back'}" data-action="modelImage" data-value="back"></button><span>${state.modelImage === 'front' ? '1' : '2'} / 2</span></div><div class="model-text"><p class="eyebrow">Models</p><h3>${state.model === 'base1' ? 'Base 1' : 'Base 1+'}</h3><div class="swatches"><button class="swatch black ${state.modelColor === 'black' ? 'selected' : ''}" data-action="color" data-value="black" aria-label="Black finish" aria-pressed="${state.modelColor === 'black'}"></button><button class="swatch beige ${state.modelColor === 'beige' ? 'selected' : ''}" data-action="color" data-value="beige" aria-label="Beige finish" aria-pressed="${state.modelColor === 'beige'}"></button></div><button class="plan-button" data-action="expand-plan">See plan <span>↗</span></button><div class="model-stats"><strong>${state.model === 'base1' ? '1 Sleeping Loft' : '1–2 Bedrooms + 1 Sleeping Loft'}</strong><span>— ${state.model === 'base1' ? '960' : '1200'} sq ft</span></div><a class="price-link" href="#contact">See pricing <span>↗</span></a><p class="model-description">${state.model === 'base1' ? 'Our signature model has the basics covered. Compact yet generous, efficient yet flexible, it maximizes its space for your comfort.' : 'Our upgraded model offers an extra bedroom off the end of the cabin. You’ll find everything else just as it is in the BASE 1.'} The total area includes a 200 sq ft sleeping loft.</p></div></div></div>
      </section>

      <section class="statement section-pad"><h2>Two base models.<br><em>Unlimited adventures.</em></h2><a class="button button-dark" href="#contact">Join the waitlist <span>↗</span></a></section>

      <section class="life section-pad" id="life"><div class="life-copy"><p class="eyebrow">Inside your BASE</p><h2>A space to recharge <em>life’s batteries.</em></h2><p>A quiet, considered interior with everything you need and nothing you don’t. Bring your people, your books, and your sense of wonder.</p></div><div class="life-image image-reveal" style="--image: url('${imageSources[state.interiorImage]}')"></div><div class="control-row"><div class="dot-controls" aria-label="Interior images"><button class="dot ${state.interiorImage === 'interior' ? 'active' : ''}" aria-label="Show interior image one" aria-pressed="${state.interiorImage === 'interior'}" data-action="interiorImage" data-value="interior"></button><button class="dot ${state.interiorImage === 'interiorAlt' ? 'active' : ''}" aria-label="Show interior image two" aria-pressed="${state.interiorImage === 'interiorAlt'}" data-action="interiorImage" data-value="interiorAlt"></button><span>${state.interiorImage === 'interior' ? '1' : '2'} / 2</span></div><div class="text-buttons" aria-label="Interior model"><button class="${state.model === 'base1' ? 'active' : ''}" aria-pressed="${state.model === 'base1'}" data-action="model" data-value="base1">BASE 1 <span>↗</span></button><button class="${state.model === 'base1Plus' ? 'active' : ''}" aria-pressed="${state.model === 'base1Plus'}" data-action="model" data-value="base1Plus">BASE 1+ <span>↗</span></button></div></div></section>

      <section class="why section-pad" id="why-base"><div class="section-label">Why BASE</div><div class="why-copy"><h2>Built better and delivered faster for an <em>all-in-one escape.</em></h2><p>Our homes are prefabricated quickly and efficiently with innovative materials for a robust shell and a minimalist design.</p></div><div class="feature-grid"><article><img src="${imageSources.assembly}" alt="Cabin assembly detail"><p class="feature-number">01</p><h3>Quick assembly, transparent process</h3><p>From our factory to your land, our process is clear and your timeline is respected.</p></article><article><img src="${imageSources.material}" alt="Natural cabin material detail"><p class="feature-number">02</p><h3>Climate-resilient, natural materials</h3><p>Thoughtful materials help create a healthy, durable home that belongs in its environment.</p></article><article><img src="${imageSources.adaptable}" alt="Cabin adaptable design"><p class="feature-number">03</p><h3>A home that adapts with you over time</h3><p>Start simple, then make room for the life you want to build.</p></article></div></section>

      <section class="gallery section-pad"><div class="gallery-header"><p class="eyebrow">Your space, your story</p><h2>Make room for <em>more.</em></h2></div><div class="gallery-grid"><img class="gallery-wide" src="${imageSources.kitchen}" alt="BASE kitchen"><img src="${imageSources.bedroom}" alt="BASE bedroom"><img src="${imageSources.deck}" alt="BASE deck"></div></section>

      <section class="contact section-pad" id="contact"><div><p class="eyebrow">Let’s chat</p><h2>Interested in a Base home? <em>Let’s chat.</em></h2><p>Leave your details and we’ll be in touch with more information about our models, pricing, and the journey home.</p></div><form data-action="contact-form"><label>Name<input name="name" required type="text" placeholder="Your name"></label><label>Email<input name="email" required type="email" placeholder="you@email.com"></label><label>What are you looking for?<select name="interest"><option>I'm exploring BASE</option><option>I'm ready to build</option><option>I'm looking for pricing</option></select></label><button class="button button-light" type="submit">Send inquiry <span>↗</span></button><p class="form-message" aria-live="polite"></p></form></section>
    </main>

    <footer class="footer"><a class="brand" href="#top"><span class="brand-mark">B</span><span class="brand-name">BASE</span></a><p>Let the wild in. Find your Base.</p><div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="#contact">Contact</a><a href="#top">Back to top ↑</a></div><small>© 2026 BASE Habitation · Privacy · English / Français</small></footer>
  `
}

render()

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-action]')
  if (!trigger) return
  const action = trigger.dataset.action
  if (action === 'interest') state.interestOpen = !state.interestOpen
  if (action === 'menu') { state.menuOpen = !state.menuOpen; state.interestOpen = false }
  if (action === 'close-panels') { state.menuOpen = false; state.interestOpen = false }
  if (action === 'surroundings') state.surroundings = trigger.dataset.value
  if (action === 'model') state.model = trigger.dataset.value
  if (action === 'modelImage') state.modelImage = trigger.dataset.value
  if (action === 'color') state.modelColor = trigger.dataset.value
  if (action === 'interiorImage') state.interiorImage = trigger.dataset.value
  if (action === 'expand-model') { document.querySelector('.model-visual img')?.requestFullscreen?.(); return }
  if (action === 'expand-plan') { window.alert('Plans will be available with your BASE consultation.'); return }
  render()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    state.menuOpen = false
    state.interestOpen = false
    render()
  }
})

document.addEventListener('submit', (event) => {
  if (!event.target.matches('[data-action="contact-form"]')) return
  event.preventDefault()
  const message = event.target.querySelector('.form-message')
  message.textContent = 'Thanks — we’ll be in touch soon.'
  event.target.reset()
})
