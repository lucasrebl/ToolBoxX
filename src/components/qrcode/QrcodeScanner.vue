<template>
  <div class="qrcode-scanner">
    <h2>Scanner un QR Code</h2>

    <button
      v-if="!isScanning"
      @click="startScanning"
      :disabled="!cameraSupported"
      class="btn btn-primary"
    >
      📷 Démarrer le scanner
    </button>

    <div v-if="!cameraSupported" class="error-message">
      ⚠️ Votre navigateur ne supporte pas l'accès à la caméra
    </div>

    <div v-if="errorMessage" class="error-message">
      ⚠️ {{ errorMessage }}
    </div>

    <div v-if="isScanning" class="scanner-container">
      <div id="qr-scanner"></div>
      <button @click="stopScanning" class="btn btn-danger">
        ⏹️ Arrêter le scanner
      </button>
    </div>

    <div v-if="lastScannedResult" class="result-section">
      <h3>QR Code détecté</h3>
      <div class="timestamp">
        Détecté à: {{ formatTime(lastScannedResult.timestamp) }}
      </div>
      
      <div class="scanned-content">
        <p class="label">Contenu:</p>
        <p class="content-text">{{ lastScannedResult.text }}</p>
      </div>

      <div class="action-buttons">
        <a
          :href="isValidUrl(lastScannedResult.text) ? lastScannedResult.text : '#'"
          :target="isValidUrl(lastScannedResult.text) ? '_blank' : undefined"
          :rel="isValidUrl(lastScannedResult.text) ? 'noopener noreferrer' : undefined"
          :class="['btn', 'btn-secondary', { disabled: !isValidUrl(lastScannedResult.text) }]"
        >
          🔗 Ouvrir le lien
        </a>
        <button @click="copyScannedText" class="btn btn-secondary">
          {{ isCopied ? '✓ Copié!' : '📋 Copier' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { qrcodeScanService, type ScanResult } from '@/services/qrcodeScanService'

const isScanning = ref(false)
const cameraSupported = ref(false)
const errorMessage = ref('')
const lastScannedResult = ref<ScanResult | null>(null)
const isCopied = ref(false)

onMounted(async () => {
  cameraSupported.value = await qrcodeScanService.isCameraSupported()
})

onUnmounted(async () => {
  if (isScanning.value) {
    await stopScanning()
  }
})

const startScanning = async () => {
  errorMessage.value = ''
  lastScannedResult.value = null

  try {
    await qrcodeScanService.startScanning(
      'qr-scanner',
      (result) => {
        lastScannedResult.value = result
      },
      (error) => {
        errorMessage.value = error
      }
    )
    isScanning.value = true
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Erreur lors du démarrage du scanner'
    isScanning.value = false
  }
}

const stopScanning = async () => {
  try {
    await qrcodeScanService.stopScanning()
    isScanning.value = false
  } catch (error) {
    console.error('Erreur lors de l\'arrêt du scanner:', error)
  }
}

const isValidUrl = (text: string): boolean => {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}

const copyScannedText = () => {
  if (lastScannedResult.value) {
    navigator.clipboard.writeText(lastScannedResult.value.text)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}

const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString('fr-FR')
}
</script>

<style scoped>
.qrcode-scanner {
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

h3 {
  margin: 0 0 1rem 0;
  color: #333;
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
  align-self: flex-start;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger {
  background: #ef4444;
  color: white;
  align-self: center;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover:not(.disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.btn-secondary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  padding: 1rem;
  background-color: #fee;
  border-left: 4px solid #f44;
  color: #c33;
  border-radius: 4px;
  font-size: 0.95rem;
}

.scanner-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#qr-scanner {
  width: 100%;
}

:deep(#qr-scanner) {
  width: 100%;
}

:deep(#html5-qrcode-button-camera-stop) {
  display: none;
}

.result-section {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timestamp {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.scanned-content {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.scanned-content .label {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.scanned-content .content-text {
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
}

@media (max-width: 600px) {
  .qrcode-scanner {
    padding: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
