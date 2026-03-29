import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'

export interface ScanResult {
    text: string
    timestamp: number
    rawData: string
}

// Service de scan de QR codes
export const qrcodeScanService = {
    private: {
        scanner: null as Html5QrcodeScanner | null,
        fileScanner: null as Html5Qrcode | null,
        isScanning: false
    },

    // Initialise le scanner avec la caméra
    async startScanning(
        elementId: string,
        onSuccess: (result: ScanResult) => void,
        onError?: (error: string) => void
    ): Promise<void> {
        try {
            await this.stopScanning()
            this.clearFileScan()

            this.private.scanner = new Html5QrcodeScanner(
                elementId,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    rememberLastUsedCamera: true,
                    showTorchButtonIfSupported: true
                },
                false
            )

            const success = (decodedText: string) => {
                onSuccess({
                    text: decodedText,
                    timestamp: Date.now(),
                    rawData: decodedText
                })
            }

            const error = (error: string) => {
                // Ignore les erreurs de scanner (messages "Not detected..." fréquents)
                if (!error.includes('Not detected') && onError) {
                    onError(error)
                }
            }

            await this.private.scanner.render(success, error)
            this.private.isScanning = true
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
            onError?.(
                `Erreur lors du démarrage du scanner: ${errorMessage}`
            )
            throw error
        }
    },

    // Analyse un fichier image contenant un QR code
    async scanFile(elementId: string, file: File): Promise<ScanResult> {
        try {
            await this.stopScanning()

            if (!this.private.fileScanner) {
                this.private.fileScanner = new Html5Qrcode(elementId, false)
            } else {
                this.private.fileScanner.clear()
            }

            const decodedText = await this.private.fileScanner.scanFile(file, true)

            return {
                text: decodedText,
                timestamp: Date.now(),
                rawData: decodedText
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Impossible de lire ce fichier'
            throw new Error(`Erreur lors de l'analyse du fichier: ${errorMessage}`)
        }
    },

    // Arrête le scanner
    async stopScanning(): Promise<void> {
        if (this.private.scanner && this.private.isScanning) {
            try {
                await this.private.scanner.clear()
            } catch (error) {
                console.error('Erreur lors de l\'arrêt du scanner:', error)
            } finally {
                this.private.isScanning = false
                this.private.scanner = null
            }
        }
    },

    clearFileScan(): void {
        if (this.private.fileScanner) {
            this.private.fileScanner.clear()
            this.private.fileScanner = null
        }
    },

    // Vérifie si le scanner est actif
    isActive(): boolean {
        return this.private.isScanning
    },

    // Vérifie si le navigateur supporte la caméra
    async isCameraSupported(): Promise<boolean> {
        try {
            if (!navigator.mediaDevices?.enumerateDevices) {
                return false
            }

            const devices = await navigator.mediaDevices.enumerateDevices()
            return devices.some((device) => device.kind === 'videoinput')
        } catch {
            return false
        }
    }
}
