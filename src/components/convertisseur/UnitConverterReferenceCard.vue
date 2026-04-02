<template>
  <aside class="reference-card glass-card">
    <div class="reference-header">
      <p class="reference-kicker">Unites disponibles</p>
      <h2>{{ category.name }}</h2>
    </div>

    <div class="unit-list">
      <article v-for="unit in category.units" :key="unit.id" class="unit-item">
        <p class="unit-symbol">{{ unit.symbol }}</p>
        <div>
          <p class="unit-name">{{ unit.label }}</p>
          <p class="unit-description">{{ unit.description }}</p>
        </div>
      </article>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { UnitCategory } from '@/services/convertisseur/unitConverterData'

defineProps<{
  category: UnitCategory
}>()
</script>

<style scoped>
.reference-card {
  padding: 1.4rem;
  background: var(--gradient-panel-soft);
}

.reference-header {
  margin-bottom: 1rem;
}

.reference-kicker {
  margin: 0 0 0.45rem;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.76rem;
  font-weight: 800;
}

h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.7rem;
}

.unit-list {
  display: grid;
  gap: 0.8rem;
}

.unit-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.9rem;
  align-items: start;
  padding: 0.95rem 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.unit-symbol {
  margin: 0;
  min-width: 3rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  font-weight: 800;
  text-align: center;
}

.unit-name {
  margin: 0;
  font-weight: 800;
}

.unit-description {
  margin: 0.35rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.55;
}
</style>
