<template>
  <section class="converter-card">
    <div class="card-header">
      <h2>Binaire vers texte</h2>
      <p>Collez des groupes binaires de 8 bits pour retrouver le texte.</p>
    </div>

    <label class="field-label" for="binary-input">Binaire</label>
    <textarea
      id="binary-input"
      :value="modelValue"
      class="converter-textarea"
      placeholder="Exemple : 01000010 01101111 01101110 01101010 01101111 01110101 01110010"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <div class="action-row">
      <button class="btn btn-secondary" @click="emit('clear')">
        Effacer
      </button>
      <button
        class="btn btn-primary"
        :disabled="!textOutput"
        @click="emit('copy', textOutput)"
      >
        Copier le texte
      </button>
    </div>

    <div class="result-box">
      <p class="result-label">Texte decode</p>
      <p class="result-value">{{ textOutput || 'Le texte decode apparaitra ici.' }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  textOutput: string
  errorMessage: string
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
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.card-header h2 {
  margin: 0 0 0.35rem;
  font-size: 1.4rem;
  color: #16213e;
}

.card-header p {
  margin: 0;
  color: #52607a;
  line-height: 1.5;
}

.field-label {
  font-weight: 700;
  color: #16213e;
}

.converter-textarea {
  min-height: 180px;
  padding: 1rem;
  border: 1px solid #c8d2e2;
  border-radius: 12px;
  font: inherit;
  resize: vertical;
  background: #f8fbff;
  color: #1f2937;
}

.error-message {
  margin: 0;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background: #fee2e2;
  color: #b91c1c;
}

.action-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 1.2rem;
  border: none;
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
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
}

.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
}

.result-box {
  padding: 1rem;
  background: #102a43;
  color: #e0f2fe;
  border-radius: 12px;
}

.result-label {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
  color: #7dd3fc;
}

.result-value {
  margin: 0;
  line-height: 1.7;
  word-break: break-word;
}
</style>
