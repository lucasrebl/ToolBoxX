<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Boite a outils pratique</p>
      <h1>ToolBoxX</h1>
      <p class="description">
        Une collection d'outils utiles pour gagner du temps au quotidien, avec des experiences
        simples, rapides et accessibles depuis une seule interface.
      </p>
    </div>

    <div class="hero-panel">
      <p class="panel-label">Ce que vous trouverez ici</p>
      <ul class="panel-list">
        <li>Generation et scan de QR codes</li>
        <li>Conversion texte et binaire</li>
        <li>Generateur de mots de passe</li>
        <li>De nouveaux outils en preparation</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.9fr);
  gap: 1.5rem;
  align-items: stretch;
}

.hero-copy,
.hero-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-panel);
}

.hero-copy {
  padding: 2.5rem;
  background: var(--gradient-hero-dark);
  color: var(--color-text-inverse);
}

.hero-copy::after {
  content: '';
  position: absolute;
  inset: auto -10% -25% auto;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent 70%);
}

.eyebrow {
  margin: 0 0 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.78rem;
  font-weight: 700;
  color: #67e8f9;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 10vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.description {
  max-width: 46rem;
  margin: 1.4rem 0 0;
  font-size: 1.08rem;
  line-height: 1.8;
  color: rgba(226, 232, 240, 0.92);
}

.hero-panel {
  padding: 2rem;
  background: var(--gradient-panel-soft);
  align-self: end;
}

.panel-label {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #c2410c;
}

.panel-list {
  margin: 1.2rem 0 0;
  padding: 0;
  list-style: none;
}

.panel-list li {
  position: relative;
  margin: 0;
  padding: 0.95rem 0 0.95rem 1.5rem;
  color: var(--color-text);
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

.panel-list li:last-child {
  border-bottom: none;
}

.panel-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.35rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #0ea5e9, #f97316);
  box-shadow: 0 0 0 6px rgba(14, 165, 233, 0.12);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .hero-panel {
    padding: 1.75rem;
  }
}
</style>
