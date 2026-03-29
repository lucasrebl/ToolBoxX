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
import { qrcodeService } from '@/services/qrcodeService'

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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0;
  color: #333;
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
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.url-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.url-input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover:not(:disabled) {
  background: #667eea;
  color: white;
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
  background-color: #fee;
  border-left: 4px solid #f44;
  color: #c33;
  border-radius: 4px;
  font-size: 0.95rem;
}

.result-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qrcode-display {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.qrcode-display img {
  max-width: 100%;
  height: auto;
  border: 3px solid #ddd;
  border-radius: 8px;
}

.url-display {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.url-display .label {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.url-display .url-text {
  margin: 0;
  word-break: break-all;
  color: #333;
  font-family: monospace;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
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
