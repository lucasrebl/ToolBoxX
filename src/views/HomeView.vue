<template>
  <main class="page-layout home-view">
    <section class="page-shell">
      <HomeHero />

      <section class="page-section features-section">
        <div class="page-heading">
          <p class="page-kicker">Fonctionnalites disponibles</p>
          <h2 class="page-title">Des outils concrets pour les usages rapides du quotidien</h2>
          <p class="page-subtitle">
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
    accent: 'UN',
    title: 'Convertisseur',
    tag: 'Unites',
    description:
      'Convertissez rapidement des longueurs et temperatures dans une interface claire, pensee pour accueillir d autres unites ensuite.',
    to: '/convertisseur',
  },
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
  {
    accent: 'PW',
    title: 'Mot de passe',
    tag: 'Generation',
    description:
      'Creez un mot de passe personnalise en choisissant la longueur, les chiffres, les majuscules et les caracteres speciaux.',
    to: '/password',
  },
]
</script>

<style scoped>
.features-section {
  margin-bottom: 5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 720px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
