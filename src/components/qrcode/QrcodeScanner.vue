<template>
  <div class="qrcode-scanner">
    <h2>Scanner un QR Code</h2>

    <div class="scanner-options">
      <section class="option-card">
        <div class="option-header">
          <h3>Scanner avec la caméra</h3>
          <p>
            Recommandé sur téléphone pour lire un QR code en direct.
          </p>
        </div>

        <button
          v-if="!isScanning"
          @click="startScanning"
          :disabled="!cameraSupported || isProcessingFile"
          class="btn btn-primary"
        >
          📷 Démarrer le scanner
        </button>

        <div v-if="!cameraSupported" class="info-message">
          Caméra non disponible sur cet appareil ou ce navigateur.
        </div>

        <div v-if="isScanning" class="scanner-container">
          <div id="qr-scanner"></div>
          <button @click="stopScanning" class="btn btn-danger">
            ⏹️ Arrêter le scanner
          </button>
        </div>
      </section>

      <section class="option-card">
        <div class="option-header">
          <h3>Importer une image</h3>
          <p>
            Recommandé sur ordinateur pour analyser une capture ou un fichier QR code.
          </p>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-input"
          @change="handleFileSelection"
        >

        <button
          @click="openFilePicker"
          :disabled="isScanning || isProcessingFile"
          class="btn btn-secondary"
        >
          {{ isProcessingFile ? 'Analyse en cours...' : '🖼️ Importer une image' }}
        </button>

        <p v-if="selectedFileName" class="selected-file">
          Fichier sélectionné : {{ selectedFileName }}
        </p>

        <div v-show="showFilePreview" id="qr-file-scanner" class="file-preview"></div>
      </section>
    </div>

    <div v-if="errorMessage" class="error-message">
      ⚠️ {{ errorMessage }}
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { qrcodeScanService, type ScanResult } from '@/services/qrcode/qrcodeScanService'

const isScanning = ref(false)
const isProcessingFile = ref(false)
const cameraSupported = ref(false)
const errorMessage = ref('')
const lastScannedResult = ref<ScanResult | null>(null)
const isCopied = ref(false)
const selectedFileName = ref('')
const showFilePreview = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  cameraSupported.value = await qrcodeScanService.isCameraSupported()
})

onUnmounted(async () => {
  if (isScanning.value) {
    await stopScanning()
  }

  qrcodeScanService.clearFileScan()
})

const startScanning = async () => {
  errorMessage.value = ''
  lastScannedResult.value = null
  showFilePreview.value = false
  qrcodeScanService.clearFileScan()

  try {
    isScanning.value = true
    await nextTick()

    await qrcodeScanService.startScanning(
      'qr-scanner',
      (result) => {
        lastScannedResult.value = result
      },
      (error) => {
        errorMessage.value = error
      }
    )
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

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFileSelection = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  errorMessage.value = ''
  lastScannedResult.value = null
  selectedFileName.value = file.name

  try {
    if (isScanning.value) {
      await stopScanning()
    }

    isProcessingFile.value = true
    showFilePreview.value = true
    await nextTick()

    lastScannedResult.value = await qrcodeScanService.scanFile('qr-file-scanner', file)
  } catch (error) {
    showFilePreview.value = false
    errorMessage.value = error instanceof Error ? error.message : 'Erreur lors de l\'analyse du fichier'
  } finally {
    isProcessingFile.value = false
    target.value = ''
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

h3 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-family: var(--font-display);
}

.scanner-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.option-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-soft);
}

.option-header h3 {
  margin-bottom: 0.5rem;
}

.option-header p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.5;
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
  align-self: flex-start;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: var(--color-text-inverse);
  align-self: center;
}

.btn-danger:hover {
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--color-surface-strong);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover:not(.disabled) {
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  transform: translateY(-2px);
}

.btn-secondary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  padding: 1rem;
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #b91c1c;
  border-radius: 10px;
  font-size: 0.95rem;
}

.info-message {
  padding: 0.9rem 1rem;
  background: #fff7e6;
  border-left: 4px solid #f59e0b;
  color: #9a6700;
  border-radius: 10px;
  font-size: 0.95rem;
}

.scanner-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

#qr-scanner {
  width: 100%;
}

.file-input {
  display: none;
}

.selected-file {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.file-preview {
  min-height: 220px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(14, 165, 233, 0.12);
}

:deep(#qr-scanner) {
  width: 100%;
}

:deep(#qr-file-scanner) {
  width: 100%;
  text-align: center;
}

:deep(#html5-qrcode-button-camera-stop) {
  display: none;
}

.result-section {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.timestamp {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.scanned-content {
  padding: 1rem;
  background: rgba(248, 250, 252, 0.92);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.scanned-content .label {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.scanned-content .content-text {
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
}

@media (max-width: 600px) {
  .qrcode-scanner {
    padding: 1rem;
  }

  .scanner-options {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
