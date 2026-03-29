<template>
  <div class="qrcode-view">
    <div class="header">
      <h1>QR Code Manager</h1>
      <p class="subtitle">Générez et scannez des codes QR facilement</p>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab === 'generate' ? '📝 Générer' : '📷 Scanner' }}
      </button>
    </div>

    <div class="content">
      <QrcodeGenerator v-show="activeTab === 'generate'" />
      <QrcodeScanner v-show="activeTab === 'scan'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QrcodeGenerator from '@/components/qrcode/QrcodeGenerator.vue'
import QrcodeScanner from '@/components/qrcode/QrcodeScanner.vue'

type TabType = 'generate' | 'scan'

const activeTab = ref<TabType>('generate')
const tabs: TabType[] = ['generate', 'scan']
</script>

<style scoped>
.qrcode-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.tab-button.active {
  background: white;
  color: #667eea;
  border-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.content {
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .qrcode-view {
    padding: 1rem 0.5rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .header .subtitle {
    font-size: 1rem;
  }

  .tabs {
    margin-bottom: 1rem;
  }

  .tab-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
  }
}
</style>