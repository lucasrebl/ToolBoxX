<template>
  <div class="qrcode-generator">
    <h2>Générer un QR Code</h2>
    
    <div class="input-group">
      <input
        v-model="inputUrl"
        type="url"
        placeholder="Entrez un lien (https://...)"
        @keyup.enter="generateQR"
        :disabled="isLoading"
        class="url-input"
      />
      <button
        @click="generateQR"
        :disabled="!inputUrl.trim() || isLoading"
        class="btn btn-primary"
      >
        <span v-if="isLoading" class="spinner"></span>
        {{ isLoading ? 'Génération...' : 'Générer' }}
      </button>
    </div>

    <div v-if="errorMessage" class="error-message">
      ⚠️ {{ errorMessage }}
    </div>

    <div v-if="generatedQRCode" class="result-container">
      <div class="qrcode-display">
        <img :src="generatedQRCode" :alt="'QR Code pour ' + inputUrl" />
      </div>
      
      <div class="url-display">
        <p class="label">Lien encodé:</p>
        <p class="url-text">{{ inputUrl }}</p>
      </div>

      <div class="action-buttons">
        <button @click="downloadQR" class="btn btn-secondary">
          📥 Télécharger
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { qrcodeService } from '@/services/qrcode/qrcodeService'

const inputUrl = ref('')
const generatedQRCode = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const generateQR = async () => {
  errorMessage.value = ''
  generatedQRCode.value = ''

  if (!inputUrl.value.trim()) {
    errorMessage.value = 'Veuillez entrer un lien'
    return
  }

  isLoading.value = true
  try {
    generatedQRCode.value = await qrcodeService.generateQRCode(inputUrl.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Erreur lors de la génération'
    generatedQRCode.value = ''
  } finally {
    isLoading.value = false
  }
}

const downloadQR = () => {
  if (generatedQRCode.value) {
    qrcodeService.downloadQRCode(generatedQRCode.value, 'qrcode.png')
  }
}
</script>

<style scoped>
.qrcode-generator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}

h2 {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.5rem;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.url-input {
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text);
}

.url-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
}

.url-input:disabled {
  background-color: rgba(226, 232, 240, 0.7);
  cursor: not-allowed;
  opacity: 0.6;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.btn-primary {
  background: var(--gradient-accent);
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--color-surface-strong);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  transform: translateY(-2px);
}

.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  padding: 1rem;
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #b91c1c;
  border-radius: 10px;
  font-size: 0.95rem;
}

.result-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-soft);
}

.qrcode-display {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 12px;
}

.qrcode-display img {
  max-width: 100%;
  height: auto;
  border: 2px solid var(--color-border);
  border-radius: 12px;
}

.url-display {
  padding: 1rem;
  background: rgba(248, 250, 252, 0.92);
  border-radius: 12px;
}

.url-display .label {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.url-display .url-text {
  margin: 0;
  word-break: break-all;
  color: var(--color-text);
  font-family: monospace;
  padding: 0.5rem;
  background: var(--color-surface-strong);
  border-radius: 8px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 600px) {
  .qrcode-generator {
    padding: 1rem;
  }

  .input-group {
    flex-direction: column;
  }

  .url-input {
    min-width: auto;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
