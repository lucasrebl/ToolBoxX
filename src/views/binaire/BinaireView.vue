<template>
  <main class="page-layout binaire-view">
    <section class="page-shell">
      <section class="hero">
        <p class="page-kicker">Outil de conversion</p>
        <h1 class="page-title">Convertir du texte en binaire et du binaire en texte</h1>
        <p class="page-subtitle hero-text">
          Utilisez les deux convertisseurs ci-dessous pour encoder ou decoder rapidement vos donnees.
        </p>
        <p v-if="copyFeedback" class="copy-feedback">{{ copyFeedback }}</p>
      </section>

      <section class="converter-grid">
        <TextToBinaryConverter
          v-model="textInput"
          :binary-output="binaryOutput"
          @clear="clearTextInput"
          @copy="copyToClipboard"
        />

        <BinaryToTextConverter
          v-model="binaryInput"
          :text-output="textOutput"
          :error-message="binaryError"
          @clear="clearBinaryInput"
          @copy="copyToClipboard"
        />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BinaryToTextConverter from '@/components/binaire/BinaryToTextConverter.vue'
import TextToBinaryConverter from '@/components/binaire/TextToBinaryConverter.vue'
import { binaryConverterService } from '@/services/binaire/binaryConverterService'

const textInput = ref('')
const binaryInput = ref('')
const copyFeedback = ref('')

const binaryOutput = computed(() => binaryConverterService.textToBinary(textInput.value))

const binaryToTextState = computed(() => {
  if (!binaryInput.value.trim()) {
    return {
      text: '',
      error: '',
    }
  }

  try {
    return {
      text: binaryConverterService.binaryToText(binaryInput.value),
      error: '',
    }
  } catch (error) {
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Conversion impossible',
    }
  }
})

const textOutput = computed(() => binaryToTextState.value.text)
const binaryError = computed(() => binaryToTextState.value.error)

const clearTextInput = () => {
  textInput.value = ''
}

const clearBinaryInput = () => {
  binaryInput.value = ''
}

const copyToClipboard = async (value: string) => {
  if (!value) {
    return
  }

  await navigator.clipboard.writeText(value)
  copyFeedback.value = 'Valeur copiee dans le presse-papiers.'

  window.setTimeout(() => {
    copyFeedback.value = ''
  }, 2000)
}
</script>

<style scoped>
.binaire-view {
  --gradient-page:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 26%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.16), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #dbeafe 44%, #f8fafc 100%);
}

.hero {
  max-width: 880px;
  margin: 0 auto 2rem;
  text-align: center;
  padding: 2rem 2.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-panel);
  backdrop-filter: blur(18px);
}

.hero-text {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.copy-feedback {
  display: inline-block;
  margin: 1.25rem 0 0;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--color-success);
  font-weight: 700;
}

.converter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .converter-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 1.5rem;
  }
}
</style>
