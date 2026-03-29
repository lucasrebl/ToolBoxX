<template>
  <section class="converter-card">
    <div class="card-header">
      <h2>Texte vers binaire</h2>
      <p>Saisissez un texte pour obtenir sa representation binaire.</p>
    </div>

    <label class="field-label" for="text-input">Texte</label>
    <textarea
      id="text-input"
      :value="modelValue"
      class="converter-textarea"
      placeholder="Exemple : Bonjour"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>

    <div class="action-row">
      <button class="btn btn-secondary" @click="emit('clear')">
        Effacer
      </button>
      <button
        class="btn btn-primary"
        :disabled="!binaryOutput"
        @click="emit('copy', binaryOutput)"
      >
        Copier le binaire
      </button>
    </div>

    <div class="result-box">
      <p class="result-label">Resultat binaire</p>
      <p class="result-value">{{ binaryOutput || 'Le resultat apparaitra ici.' }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  binaryOutput: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
  copy: [value: string]
}>()
</script>

<style scoped>
.converter-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-soft);
}

.card-header h2 {
  margin: 0 0 0.35rem;
  font-size: 1.4rem;
  color: var(--color-text);
  font-family: var(--font-display);
}

.card-header p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.field-label {
  font-weight: 700;
  color: var(--color-text);
}

.converter-textarea {
  min-height: 180px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font: inherit;
  resize: vertical;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text);
}

.converter-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
}

.action-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 1.2rem;
  border: 1px solid transparent;
  border-radius: 10px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
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

.result-box {
  padding: 1rem;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  border-radius: 12px;
}

.result-label {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
  color: #93c5fd;
}

.result-value {
  margin: 0;
  line-height: 1.7;
  word-break: break-word;
  font-family: monospace;
}
</style>
