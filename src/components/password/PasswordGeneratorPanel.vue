<template>
  <section class="generator-card">
    <div class="card-header">
      <div>
        <p class="eyebrow">Parametres</p>
        <h2>Generateur personnalise</h2>
      </div>
      <p class="summary">{{ length }} caracteres</p>
    </div>

    <div class="controls-grid">
      <label class="length-card" for="password-length">
        <span class="field-label">Nombre de caracteres</span>
        <div class="length-value">{{ length }}</div>
        <input
          id="password-length"
          :value="length"
          class="range-input"
          max="32"
          min="6"
          type="range"
          @input="emit('update:length', Number(($event.target as HTMLInputElement).value))"
        />
        <div class="range-values">
          <span>6</span>
          <span>32</span>
        </div>
      </label>

      <div class="options-card">
        <p class="field-label">Types de caracteres</p>

        <label class="toggle-row">
          <input
            :checked="includeNumbers"
            type="checkbox"
            @change="
              emit(
                'update:includeNumbers',
                ($event.target as HTMLInputElement).checked,
              )
            "
          />
          <span>
            <strong>Chiffres</strong>
            <small>0 a 9</small>
          </span>
        </label>

        <label class="toggle-row">
          <input
            :checked="includeUppercase"
            type="checkbox"
            @change="
              emit(
                'update:includeUppercase',
                ($event.target as HTMLInputElement).checked,
              )
            "
          />
          <span>
            <strong>Majuscules</strong>
            <small>A a Z</small>
          </span>
        </label>

        <label class="toggle-row">
          <input
            :checked="includeSpecial"
            type="checkbox"
            @change="
              emit(
                'update:includeSpecial',
                ($event.target as HTMLInputElement).checked,
              )
            "
          />
          <span>
            <strong>Caracteres speciaux</strong>
            <small class="special-characters">{{ specialCharacters }}</small>
          </span>
        </label>
      </div>
    </div>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <div class="password-output">
      <div class="output-header">
        <div>
          <p class="field-label">Mot de passe genere</p>
          <p class="output-hint">Les minuscules sont toujours incluses pour garantir une base lisible.</p>
        </div>
        <button class="icon-button" @click="emit('regenerate')">Regenerer</button>
      </div>

      <p class="password-value">{{ generatedPassword || 'Le mot de passe apparaitra ici.' }}</p>
    </div>

    <div class="strength-card">
      <div class="strength-header">
        <p class="field-label">Robustesse</p>
        <span :class="['strength-badge', `strength-${strength.score}`]">{{ strength.label }}</span>
      </div>

      <div class="strength-meter" aria-hidden="true">
        <span
          v-for="level in 3"
          :key="level"
          :class="['meter-bar', { active: level <= strength.score }]"
        ></span>
      </div>

      <p class="strength-hint">{{ strength.hint }}</p>
    </div>

    <div class="action-row">
      <button class="btn btn-primary" :disabled="!generatedPassword" @click="emit('copy')">
        Copier
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PasswordStrength } from '@/services/password/passwordGeneratorService'

defineProps<{
  errorMessage: string
  generatedPassword: string
  includeNumbers: boolean
  includeSpecial: boolean
  includeUppercase: boolean
  length: number
  specialCharacters: string
  strength: PasswordStrength
}>()

const emit = defineEmits<{
  copy: []
  regenerate: []
  'update:includeNumbers': [value: boolean]
  'update:includeSpecial': [value: boolean]
  'update:includeUppercase': [value: boolean]
  'update:length': [value: number]
}>()
</script>

<style scoped>
.generator-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.6rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--gradient-card);
  box-shadow: var(--shadow-panel);
}

.card-header,
.output-header,
.strength-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  font-weight: 800;
}

.card-header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.75rem;
}

.summary {
  margin: 0;
  padding: 0.7rem 0.9rem;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  color: var(--color-primary-strong);
  font-weight: 700;
}

.controls-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 1rem;
}

.length-card,
.options-card,
.password-output,
.strength-card {
  padding: 1.2rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.66);
}

.field-label {
  margin: 0;
  color: var(--color-text);
  font-weight: 700;
}

.length-card {
  display: block;
}

.length-value {
  margin-top: 0.9rem;
  font-size: clamp(2rem, 5vw, 3rem);
  font-family: var(--font-display);
  color: var(--color-primary-strong);
}

.range-input {
  width: 100%;
  margin-top: 0.75rem;
  accent-color: var(--color-primary);
}

.range-values {
  display: flex;
  justify-content: space-between;
  margin-top: 0.35rem;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.options-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.toggle-row {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.95);
  cursor: pointer;
}

.toggle-row input {
  margin-top: 0.2rem;
  accent-color: var(--color-primary);
}

.toggle-row span {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.toggle-row strong {
  color: var(--color-text);
}

.toggle-row small,
.output-hint,
.strength-hint {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.special-characters {
  font-family: monospace;
  word-break: break-all;
}

.output-hint,
.strength-hint {
  margin: 0.35rem 0 0;
}

.error-message {
  margin: 0;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: #fee2e2;
  color: #b91c1c;
}

.icon-button,
.btn {
  border: 1px solid transparent;
  border-radius: 12px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease,
    background 0.2s ease;
}

.icon-button:hover,
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.icon-button {
  padding: 0.78rem 1rem;
  background: var(--color-surface-strong);
  border-color: var(--color-border);
  color: var(--color-text);
}

.password-value {
  margin: 1rem 0 0;
  padding: 1rem;
  border-radius: 14px;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  font-family: monospace;
  font-size: 1.05rem;
  line-height: 1.8;
  word-break: break-word;
}

.strength-badge {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
}

.strength-0,
.strength-1 {
  background: #fee2e2;
  color: #b91c1c;
}

.strength-2 {
  background: #ffedd5;
  color: #c2410c;
}

.strength-3 {
  background: rgba(15, 118, 110, 0.14);
  color: var(--color-success);
}

.strength-meter {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
  margin-top: 1rem;
}

.meter-bar {
  height: 0.55rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.3);
}

.meter-bar.active:nth-child(1) {
  background: #fb7185;
}

.meter-bar.active:nth-child(2) {
  background: #fb923c;
}

.meter-bar.active:nth-child(3) {
  background: #14b8a6;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.btn {
  padding: 0.9rem 1.2rem;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--gradient-accent);
  color: var(--color-text-inverse);
}

.btn-secondary {
  background: var(--color-surface-strong);
  border-color: var(--color-border);
  color: var(--color-text);
}

@media (max-width: 900px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .card-header,
  .output-header,
  .strength-header {
    flex-direction: column;
  }

  .icon-button,
  .btn {
    width: 100%;
  }
}
</style>
