<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-root">
    <RouterView />
  </div>
</template>

<style>
:root {
  --font-display: 'Georgia', 'Times New Roman', serif;
  --font-body: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

  --color-bg: #f8fafc;
  --color-bg-soft: #e2e8f0;
  --color-surface: rgba(255, 255, 255, 0.82);
  --color-surface-strong: rgba(255, 255, 255, 0.92);
  --color-surface-dark: rgba(15, 23, 42, 0.92);
  --color-surface-dark-soft: rgba(30, 41, 59, 0.88);

  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-text-inverse: #f8fafc;
  --color-border: rgba(148, 163, 184, 0.22);

  --color-primary: #0ea5e9;
  --color-primary-strong: #0369a1;
  --color-secondary: #f97316;
  --color-secondary-soft: #fdba74;
  --color-success: #0f766e;

  --gradient-page:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.16), transparent 26%),
    radial-gradient(circle at right center, rgba(249, 115, 22, 0.14), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #e2e8f0 48%, #f8fafc 100%);
  --gradient-hero-dark:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 34%),
    linear-gradient(145deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.9));
  --gradient-card:
    radial-gradient(circle at top right, rgba(56, 189, 248, 0.16), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(248, 250, 252, 0.95));
  --gradient-panel-soft:
    radial-gradient(circle at top right, rgba(245, 158, 11, 0.22), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(241, 245, 249, 0.92));
  --gradient-panel-dark:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 24%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.16), transparent 28%),
    linear-gradient(140deg, #0f172a, #111827 45%, #1e293b);
  --gradient-accent: linear-gradient(135deg, #0f172a, #1d4ed8);

  --shadow-soft: 0 18px 50px rgba(15, 23, 42, 0.08);
  --shadow-panel: 0 24px 80px rgba(15, 23, 42, 0.14);
  --shadow-panel-strong: 0 24px 80px rgba(15, 23, 42, 0.18);

  --radius-sm: 18px;
  --radius-md: 24px;
  --radius-lg: 28px;
  --radius-xl: 30px;

  --space-page-y: 2rem;
  --space-section: 2rem;
  --content-max: 1180px;
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--gradient-page);
}

a,
button,
input,
textarea,
select {
  font: inherit;
}

.app-root {
  min-height: 100vh;
}

.page-layout {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--gradient-page);
}

.page-layout::before,
.page-layout::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.7;
  pointer-events: none;
}

.page-layout::before {
  top: -5rem;
  left: -3rem;
  width: 18rem;
  height: 18rem;
  background: rgba(14, 165, 233, 0.22);
}

.page-layout::after {
  right: -5rem;
  top: 14rem;
  width: 24rem;
  height: 24rem;
  background: rgba(249, 115, 22, 0.18);
}

.page-shell {
  position: relative;
  z-index: 1;
  width: min(var(--content-max), calc(100% - 2rem));
  margin: 0 auto;
  padding: var(--space-page-y) 0 3rem;
}

.page-section {
  margin-top: var(--space-section);
}

.page-heading {
  max-width: 780px;
  margin-bottom: 1.25rem;
}

.page-kicker {
  margin: 0 0 0.8rem;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

.page-title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
}

.page-subtitle {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.8;
  font-size: 1.02rem;
}

.glass-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--gradient-card);
  box-shadow: var(--shadow-soft);
}

@media (max-width: 900px) {
  :root {
    --space-page-y: 1rem;
    --space-section: 1.5rem;
  }

  .page-shell {
    width: min(100% - 1rem, var(--content-max));
  }
}
</style>
