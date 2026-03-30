<template>
  <RouterLink class="back-home-link" to="/">
    <span class="arrow" aria-hidden="true">←</span>
    <span>Retour a l'accueil</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.back-home-link {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.74);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 700;
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(12px);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.back-home-link:hover {
  transform: translateY(-2px);
  background: var(--color-surface-strong);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
}

.arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 999px;
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  font-size: 0.92rem;
}

@media (max-width: 600px) {
  .back-home-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
