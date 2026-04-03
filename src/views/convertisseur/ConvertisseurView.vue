<template>
  <main class="page-layout convertisseur-view">
    <section class="page-shell">
      <AppBackHomeLink />

      <header class="convertisseur-hero">
        <div class="hero-copy">
          <p class="page-kicker">Convertisseur d unites</p>
          <h1 class="page-title">Passez d une unite a l autre sans vous perdre dans l interface</h1>
          <p class="page-subtitle">
            Le convertisseur est pense pour accueillir plusieurs familles d unites. Il couvre deja
            la longueur, la masse, la temperature et le temps dans une interface simple a etendre
            ensuite.
          </p>
        </div>

        <aside class="hero-side glass-card">
          <p class="side-kicker">Architecture evolutive</p>
          <p class="side-title">Une categorie, une liste d unites, et la meme interface reutilisable.</p>
          <p class="side-text">
            Ajouter la surface, le volume ou la vitesse reviendra surtout a enrichir les donnees et
            le service, sans repenser la page.
          </p>
        </aside>
      </header>

      <section class="page-section">
        <UnitConverterCategoryTabs v-model="selectedCategoryId" :categories="categories" />
      </section>

      <section class="page-section content-grid">
        <UnitConverterPanel
          v-model:amount-input="amountInput"
          v-model:source-unit-id="sourceUnitId"
          v-model:target-unit-id="targetUnitId"
          :category="selectedCategory"
          :converted-value="convertedValue"
          :error-message="errorMessage"
          @swap="swapUnits"
        />

        <UnitConverterReferenceCard :category="selectedCategory" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppBackHomeLink from '@/components/AppBackHomeLink.vue'
import UnitConverterCategoryTabs from '@/components/convertisseur/UnitConverterCategoryTabs.vue'
import UnitConverterPanel from '@/components/convertisseur/UnitConverterPanel.vue'
import UnitConverterReferenceCard from '@/components/convertisseur/UnitConverterReferenceCard.vue'
import {
  unitConverterService,
} from '@/services/convertisseur/unitConverterService'
import type { UnitCategoryId } from '@/services/convertisseur/unitConverterData'

const categories = unitConverterService.getCategories()

const selectedCategoryId = ref<UnitCategoryId>('length')
const amountInput = ref('1')
const sourceUnitId = ref('meter')
const targetUnitId = ref('kilometer')

const selectedCategory = computed(() => unitConverterService.getCategory(selectedCategoryId.value))

watch(
  selectedCategoryId,
  (categoryId) => {
    const category = unitConverterService.getCategory(categoryId)
    sourceUnitId.value = category.defaultFromUnitId
    targetUnitId.value = category.defaultToUnitId
    amountInput.value = '1'
  },
  { immediate: true },
)

const conversionState = computed(() => {
  if (!amountInput.value.trim()) {
    return {
      convertedValue: '',
      errorMessage: '',
    }
  }

  try {
    const converted = unitConverterService.convertInput(
      selectedCategoryId.value,
      sourceUnitId.value,
      targetUnitId.value,
      amountInput.value,
    )

    const targetUnit = selectedCategory.value.units.find((unit) => unit.id === targetUnitId.value)

    return {
      convertedValue: `${unitConverterService.formatValue(converted)} ${targetUnit?.symbol ?? ''}`.trim(),
      errorMessage: '',
    }
  } catch (error) {
    return {
      convertedValue: '',
      errorMessage: error instanceof Error ? error.message : 'Conversion impossible.',
    }
  }
})

const convertedValue = computed(() => conversionState.value.convertedValue)
const errorMessage = computed(() => conversionState.value.errorMessage)

const swapUnits = () => {
  const nextSourceUnitId = targetUnitId.value

  targetUnitId.value = sourceUnitId.value
  sourceUnitId.value = nextSourceUnitId
}
</script>

<style scoped>
.convertisseur-view {
  --gradient-page:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.2), transparent 24%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.16), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #e0f2fe 36%, #fff7ed 70%, #f8fafc 100%);
}

.convertisseur-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.8fr);
  gap: 1.5rem;
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
  color: #7dd3fc;
}

.hero-copy :deep(.page-title) {
  color: var(--color-text-inverse);
}

.hero-copy :deep(.page-subtitle) {
  color: rgba(226, 232, 240, 0.92);
  max-width: 46rem;
}

.hero-side {
  background: var(--gradient-panel-soft);
}

.side-kicker {
  margin: 0 0 0.85rem;
  color: var(--color-secondary);
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
  line-height: 1.75;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.9fr);
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 980px) {
  .convertisseur-hero,
  .content-grid {
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
