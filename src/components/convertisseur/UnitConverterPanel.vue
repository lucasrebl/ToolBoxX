<template>
  <section class="converter-panel glass-card">
    <div class="panel-header">
      <div>
        <p class="panel-kicker">Conversion active</p>
        <h2>{{ category.icon }} {{ category.name }}</h2>
      </div>

      <p class="panel-helper">{{ category.helperText }}</p>
    </div>

    <div class="panel-body">
      <article class="entry-card">
        <label class="field-label" for="converter-amount">Valeur de depart</label>
        <input
          id="converter-amount"
          :value="amountInput"
          class="amount-input"
          inputmode="decimal"
          placeholder="Ex: 12,5"
          type="text"
          @input="onInput"
        />

        <label class="field-label" for="converter-from-unit">Unite source</label>
        <select
          id="converter-from-unit"
          :value="sourceUnitId"
          class="unit-select"
          @change="$emit('update:sourceUnitId', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="unit in category.units" :key="unit.id" :value="unit.id">
            {{ unit.label }} ({{ unit.symbol }})
          </option>
        </select>
      </article>

      <button class="swap-button" type="button" @click="$emit('swap')">
        Echanger les unites
      </button>

      <article class="result-card">
        <p class="field-label">Resultat</p>
        <p v-if="convertedValue" class="result-value">{{ convertedValue }}</p>
        <p v-else class="result-placeholder">Le resultat apparaitra ici.</p>

        <label class="field-label" for="converter-to-unit">Unite d arrivee</label>
        <select
          id="converter-to-unit"
          :value="targetUnitId"
          class="unit-select"
          @change="$emit('update:targetUnitId', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="unit in category.units" :key="unit.id" :value="unit.id">
            {{ unit.label }} ({{ unit.symbol }})
          </option>
        </select>

        <p class="result-note">{{ category.baseUnitLabel }}</p>
      </article>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">
import type { UnitCategory } from '@/services/convertisseur/unitConverterData'

defineProps<{
  amountInput: string
  category: UnitCategory
  convertedValue: string
  errorMessage: string
  sourceUnitId: string
  targetUnitId: string
}>()

const emit = defineEmits<{
  swap: []
  'update:amountInput': [value: string]
  'update:sourceUnitId': [value: string]
  'update:targetUnitId': [value: string]
}>()

const onInput = (event: Event) => {
  emit('update:amountInput', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.converter-panel {
  padding: 1.4rem;
}

.panel-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.panel-kicker {
  margin: 0 0 0.45rem;
  color: var(--color-primary-strong);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.76rem;
  font-weight: 800;
}

h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 3vw, 2rem);
}

.panel-helper {
  max-width: 25rem;
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
}

.entry-card,
.result-card {
  padding: 1.2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.7);
}

.field-label {
  display: block;
  margin-bottom: 0.55rem;
  color: var(--color-text-muted);
  font-size: 0.86rem;
  font-weight: 700;
}

.amount-input,
.unit-select {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--color-text);
}

.amount-input {
  margin-bottom: 1rem;
  padding: 1rem 1.05rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.unit-select {
  padding: 0.95rem 1rem;
}

.swap-button {
  padding: 0.9rem 1.15rem;
  border: none;
  border-radius: 999px;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.swap-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.16);
  background: var(--color-surface-dark-soft);
}

.result-card {
  min-height: 100%;
}

.result-value {
  margin: 0 0 1rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1;
  color: var(--color-primary-strong);
  word-break: break-word;
}

.result-placeholder {
  margin: 0 0 1rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.result-note {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.error-message {
  margin: 1rem 0 0;
  padding: 0.9rem 1rem;
  border-radius: 18px;
  background: rgba(220, 38, 38, 0.08);
  color: #b91c1c;
  font-weight: 700;
}

@media (max-width: 980px) {
  .panel-header {
    align-items: start;
    flex-direction: column;
  }

  .panel-body {
    grid-template-columns: 1fr;
  }

  .swap-button {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .converter-panel {
    padding: 1rem;
  }
}
</style>
