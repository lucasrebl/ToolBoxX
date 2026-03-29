<template>
  <article class="feature-card">
    <div class="card-top">
      <p class="feature-tag">{{ tag }}</p>
      <span class="feature-accent">{{ accent }}</span>
    </div>

    <h3>{{ title }}</h3>
    <p class="description">{{ description }}</p>

    <RouterLink :to="to" class="feature-link">
      Ouvrir l'outil
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  accent: string
  description: string
  tag: string
  title: string
  to: string
}>()
</script>

<style scoped>
.feature-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.6rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--gradient-card);
  box-shadow: var(--shadow-soft);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.feature-tag {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary-strong);
}

.feature-accent {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  height: 3rem;
  border-radius: var(--radius-sm);
  background: var(--gradient-accent);
  color: var(--color-text-inverse);
  font-size: 1.25rem;
  font-weight: 700;
}

h3 {
  margin: 1rem 0 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.5rem;
}

.description {
  margin: 0.85rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.7;
  flex: 1;
}

.feature-link {
  align-self: flex-start;
  margin-top: 1.5rem;
  padding: 0.78rem 1.1rem;
  border-radius: 999px;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  text-decoration: none;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.feature-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.18);
  background: var(--color-surface-dark-soft);
}
</style>
