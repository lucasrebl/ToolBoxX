<template>
  <main class="binaire-view">
    <section class="hero">
      <p class="eyebrow">Outil de conversion</p>
      <h1>Convertir du texte en binaire et du binaire en texte</h1>
      <p class="hero-text">
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
  min-height: 100vh;
  padding: 3rem 1.5rem;
  background:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.2), transparent 28%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.18), transparent 30%),
    linear-gradient(160deg, #eff6ff 0%, #dbeafe 45%, #f8fafc 100%);
}

.hero {
  max-width: 880px;
  margin: 0 auto 2rem;
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f766e;
}

h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 1.1;
}

.hero-text {
  max-width: 700px;
  margin: 1rem auto 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
}

.copy-feedback {
  display: inline-block;
  margin: 1.25rem 0 0;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: #115e59;
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
</style>
