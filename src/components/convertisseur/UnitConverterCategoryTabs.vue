<template>
  <div class="category-tabs glass-card">
    <button
      v-for="category in categories"
      :key="category.id"
      :class="['category-tab', { 'category-tab-active': category.id === modelValue }]"
      type="button"
      @click="$emit('update:modelValue', category.id)"
    >
      <span class="category-icon" aria-hidden="true">{{ category.icon }}</span>
      <span class="category-copy">
        <span class="category-name">{{ category.name }}</span>
        <span class="category-description">{{ category.shortDescription }}</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UnitCategory, UnitCategoryId } from '@/services/convertisseur/unitConverterData'

defineProps<{
  categories: UnitCategory[]
  modelValue: UnitCategoryId
}>()

defineEmits<{
  'update:modelValue': [value: UnitCategoryId]
}>()
</script>

<style scoped>
.category-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.85rem;
  padding: 0.9rem;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  width: 100%;
  padding: 1rem 1.05rem;
  border: 1px solid transparent;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.58);
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.category-tab:hover {
  transform: translateY(-2px);
  border-color: rgba(14, 165, 233, 0.22);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.08);
}

.category-tab-active {
  border-color: rgba(14, 165, 233, 0.34);
  background: rgba(14, 165, 233, 0.1);
  box-shadow: inset 0 0 0 1px rgba(14, 165, 233, 0.12);
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 18px;
  background: var(--gradient-accent);
  color: var(--color-text-inverse);
  font-size: 1.35rem;
}

.category-copy {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.category-name {
  font-weight: 800;
}

.category-description {
  color: var(--color-text-muted);
  font-size: 0.94rem;
  line-height: 1.45;
}

</style>
