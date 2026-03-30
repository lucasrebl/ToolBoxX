<template>
  <main class="page-layout password-view">
    <section class="page-shell">
      <AppBackHomeLink />

      <header class="password-hero">
        <div class="hero-copy">
          <p class="page-kicker">Outil mot de passe</p>
          <h1 class="page-title">Generer un mot de passe fort selon vos propres criteres</h1>
          <p class="page-subtitle">
            Ajustez la longueur, ajoutez des chiffres, des majuscules et des caracteres
            speciaux, puis copiez un resultat pret a l'emploi.
          </p>
          <p v-if="copyFeedback" class="copy-feedback">{{ copyFeedback }}</p>
        </div>

        <aside class="hero-side glass-card">
          <p class="side-kicker">Recommandation</p>
          <p class="side-title">14 caracteres ou plus avec plusieurs types de caracteres.</p>
          <p class="side-text">
            Un mot de passe plus long reste generalement plus robuste et plus durable dans le
            temps.
          </p>
        </aside>
      </header>

      <section class="page-section">
        <PasswordGeneratorPanel
          :error-message="generationError"
          :generated-password="generatedPassword"
          :include-numbers="includeNumbers"
          :include-special="includeSpecial"
          :include-uppercase="includeUppercase"
          :length="passwordLength"
          :special-characters="SPECIAL_CHARACTERS"
          :strength="passwordStrength"
          @copy="copyPassword"
          @regenerate="generatePassword"
          @update:include-numbers="includeNumbers = $event"
          @update:include-special="includeSpecial = $event"
          @update:include-uppercase="includeUppercase = $event"
          @update:length="passwordLength = $event"
        />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppBackHomeLink from '@/components/AppBackHomeLink.vue'
import PasswordGeneratorPanel from '@/components/password/PasswordGeneratorPanel.vue'
import {
  SPECIAL_CHARACTERS,
  passwordGeneratorService,
  type PasswordGeneratorOptions,
} from '@/services/password/passwordGeneratorService'

const passwordLength = ref(14)
const includeNumbers = ref(true)
const includeUppercase = ref(true)
const includeSpecial = ref(true)
const generatedPassword = ref('')
const generationError = ref('')
const copyFeedback = ref('')

const passwordOptions = computed<PasswordGeneratorOptions>(() => ({
  length: passwordLength.value,
  includeNumbers: includeNumbers.value,
  includeUppercase: includeUppercase.value,
  includeSpecial: includeSpecial.value,
}))

const passwordStrength = computed(() =>
  passwordGeneratorService.getStrength(generatedPassword.value, passwordOptions.value),
)

const generatePassword = () => {
  try {
    generatedPassword.value = passwordGeneratorService.generatePassword(passwordOptions.value)
    generationError.value = ''
  } catch (error) {
    generatedPassword.value = ''
    generationError.value =
      error instanceof Error ? error.message : 'Impossible de generer un mot de passe.'
  }
}

const copyPassword = async () => {
  if (!generatedPassword.value) {
    return
  }

  await navigator.clipboard.writeText(generatedPassword.value)
  copyFeedback.value = 'Mot de passe copie dans le presse-papiers.'

  window.setTimeout(() => {
    copyFeedback.value = ''
  }, 2000)
}

watch(passwordOptions, () => {
  generatePassword()
})

onMounted(() => {
  generatePassword()
})
</script>

<style scoped>
.password-view {
  --gradient-page:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.2), transparent 26%),
    radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.16), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #dcfce7 44%, #f8fafc 100%);
}

.password-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 1.5rem;
  align-items: stretch;
}

.hero-copy,
.hero-side {
  padding: 2rem 2.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-panel);
}

.hero-copy {
  background: var(--gradient-hero-dark);
}

.hero-copy :deep(.page-kicker) {
  color: #86efac;
}

.hero-copy :deep(.page-title) {
  color: var(--color-text-inverse);
}

.hero-copy :deep(.page-subtitle) {
  color: rgba(226, 232, 240, 0.92);
  max-width: 720px;
}

.copy-feedback {
  display: inline-block;
  margin: 1.25rem 0 0;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: rgba(134, 239, 172, 0.14);
  color: #bbf7d0;
  font-weight: 700;
}

.hero-side {
  background: var(--gradient-panel-soft);
}

.side-kicker {
  margin: 0 0 0.85rem;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  font-weight: 800;
}

.side-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 1.35;
  color: var(--color-text);
}

.side-text {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .password-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-copy,
  .hero-side {
    padding: 1.5rem;
  }
}
</style>
