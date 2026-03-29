<template>
  <section class="coming-soon">
    <div class="section-copy">
      <p class="section-label">En cours de construction</p>
      <h2>D'autres fonctionnalites arrivent bientot</h2>
      <p>
        ToolBoxX continue d'evoluer. De nouveaux outils pratiques sont en cours de developpement
        pour completer la boite a outils et couvrir encore plus de besoins du quotidien.
      </p>
    </div>

    <div class="status-grid">
      <article v-for="item in items" :key="item.title" class="status-card">
        <p class="status-badge">{{ item.status }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    status: 'En preparation',
    title: 'Nouveaux outils express',
    description: 'Des utilitaires rapides pour convertir, formater ou decoder des donnees en un clic.',
  },
  {
    status: 'En developpement',
    title: 'Experience encore plus fluide',
    description: 'Une navigation enrichie et des pages mieux reliees pour passer d un outil a l autre sans friction.',
  },
]
</script>

<style scoped>
.coming-soon {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 30px;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 24%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.16), transparent 28%),
    linear-gradient(140deg, #0f172a, #111827 45%, #1e293b);
  color: #e2e8f0;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.18);
}

.section-label,
.status-badge {
  display: inline-flex;
  width: fit-content;
  padding: 0.42rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-label {
  margin: 0 0 1rem;
  background: rgba(14, 165, 233, 0.16);
  color: #7dd3fc;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.1;
}

.section-copy p:last-child {
  margin: 1rem 0 0;
  max-width: 50rem;
  line-height: 1.8;
  color: rgba(226, 232, 240, 0.86);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.status-card {
  padding: 1.35rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.status-badge {
  margin: 0;
  background: rgba(249, 115, 22, 0.14);
  color: #fdba74;
}

h3 {
  margin: 1rem 0 0;
  font-size: 1.2rem;
  color: #f8fafc;
}

.status-card p:last-child {
  margin: 0.75rem 0 0;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.8);
}

@media (max-width: 820px) {
  .coming-soon {
    padding: 1.6rem;
  }

  .status-grid {
    grid-template-columns: 1fr;
  }
}
</style>
