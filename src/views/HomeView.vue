<template>
  <main class="home-view">
    <div class="backdrop backdrop-one" />
    <div class="backdrop backdrop-two" />

    <section class="home-shell">
      <HomeHero />

      <section class="features-section">
        <div class="section-heading">
          <p class="section-kicker">Fonctionnalites disponibles</p>
          <h2>Des outils concrets pour les usages rapides du quotidien</h2>
          <p>
            Chaque section vous emmene directement vers une page dediee, avec une interface
            pensee pour aller droit au but.
          </p>
        </div>

        <div class="features-grid">
          <HomeFeatureCard
            v-for="feature in features"
            :key="feature.title"
            :accent="feature.accent"
            :description="feature.description"
            :tag="feature.tag"
            :title="feature.title"
            :to="feature.to"
          />
        </div>
      </section>

      <HomeComingSoon />
    </section>
  </main>
</template>

<script setup lang="ts">
import HomeComingSoon from '@/components/home/HomeComingSoon.vue'
import HomeFeatureCard from '@/components/home/HomeFeatureCard.vue'
import HomeHero from '@/components/home/HomeHero.vue'

const features = [
  {
    accent: 'QR',
    title: 'QR Code',
    tag: 'Scan et generation',
    description:
      'Creez un QR code en quelques secondes ou scannez un code existant depuis la camera ou une image.',
    to: '/qrcode',
  },
  {
    accent: '01',
    title: 'Binaire',
    tag: 'Conversion',
    description:
      'Passez du texte au binaire, puis du binaire au texte, avec des retours instantanes et lisibles.',
    to: '/binaire',
  },
]
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    linear-gradient(180deg, #f8fafc 0%, #e2e8f0 48%, #f8fafc 100%);
}

.backdrop {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.7;
  pointer-events: none;
}

.backdrop-one {
  top: -5rem;
  left: -3rem;
  width: 18rem;
  height: 18rem;
  background: rgba(14, 165, 233, 0.22);
}

.backdrop-two {
  right: -5rem;
  top: 14rem;
  width: 24rem;
  height: 24rem;
  background: rgba(249, 115, 22, 0.18);
}

.home-shell {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.features-section {
  margin-top: 2rem;
  margin-bottom: 5rem;
}

.section-heading {
  max-width: 780px;
  margin-bottom: 1.25rem;
}

.section-kicker {
  margin: 0 0 0.8rem;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-heading p:last-child {
  margin: 1rem 0 0;
  color: #475569;
  line-height: 1.8;
  font-size: 1.02rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 900px) {
  .home-shell {
    width: min(100% - 1rem, 1180px);
    padding-top: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
