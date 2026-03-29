<template>
  <main class="page-layout qrcode-view">
    <section class="page-shell">
      <header class="qrcode-hero">
        <div class="hero-copy">
          <p class="page-kicker">Outil QR Code</p>
          <h1 class="page-title">Generer et scanner des QR codes depuis une seule page</h1>
          <p class="page-subtitle">
            Creez un QR code pour partager une information ou scannez un code existant a partir
            de la camera et d'une image.
          </p>
        </div>

        <div class="hero-tabs glass-card">
          <p class="tabs-label">Choisissez un mode</p>
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              :class="['tab-button', { active: activeTab === tab }]"
              @click="activeTab = tab"
            >
              {{ tab === 'generate' ? 'Generer' : 'Scanner' }}
            </button>
          </div>
        </div>
      </header>

      <section class="content">
        <QrcodeGenerator v-show="activeTab === 'generate'" />
        <QrcodeScanner v-show="activeTab === 'scan'" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QrcodeGenerator from '@/components/qrcode/QrcodeGenerator.vue'
import QrcodeScanner from '@/components/qrcode/QrcodeScanner.vue'

type TabType = 'generate' | 'scan'

const activeTab = ref<TabType>('generate')
const tabs: TabType[] = ['generate', 'scan']
</script>

<style scoped>
.qrcode-view {
  --gradient-page:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 26%),
    radial-gradient(circle at right center, rgba(59, 130, 246, 0.14), transparent 24%),
    linear-gradient(180deg, #f8fafc 0%, #dbeafe 46%, #f8fafc 100%);
}

.qrcode-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.8fr);
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 2rem;
}

.hero-copy {
  padding: 2rem 2.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--gradient-hero-dark);
  box-shadow: var(--shadow-panel);
}

.hero-copy :deep(.page-kicker) {
  color: #7dd3fc;
}

.hero-copy :deep(.page-title) {
  color: var(--color-text-inverse);
}

.hero-copy :deep(.page-subtitle) {
  color: rgba(226, 232, 240, 0.9);
}

.hero-tabs {
  padding: 1.5rem;
}

.tabs-label {
  margin: 0 0 1rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  font-weight: 800;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tab-button {
  padding: 0.82rem 1.35rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.56);
  color: var(--color-text);
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.tab-button:hover {
  transform: translateY(-2px);
  background: var(--color-surface-strong);
}

.tab-button.active {
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.16);
}

.content {
  max-width: 960px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .qrcode-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-copy,
  .hero-tabs {
    padding: 1.5rem;
  }

  .tab-button {
    width: 100%;
  }
}
</style>
