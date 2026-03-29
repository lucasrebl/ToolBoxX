import { Html5QrcodeScanner } from 'html5-qrcode'

export interface ScanResult {
    text: string
    timestamp: number
    rawData: string
}

// Service de scan de QR codes
export const qrcodeScanService = {
    private: {
        scanner: null as Html5QrcodeScanner | null,
        isScanning: false
    },

    // Initialise le scanner avec la caméra
    async startScanning(
        elementId: string,
        onSuccess: (result: ScanResult) => void,
        onError?: (error: string) => void
    ): Promise<void> {
        try {
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

    // Arrête le scanner
    async stopScanning(): Promise<void> {
        if (this.private.scanner && this.private.isScanning) {
            try {
                await this.private.scanner.clear()
                this.private.isScanning = false
                this.private.scanner = null
            } catch (error) {
                console.error('Erreur lors de l\'arrêt du scanner:', error)
            }
        }
    },

    // Vérifie si le scanner est actif
    isActive(): boolean {
        return this.private.isScanning
    },

    // Vérifie si le navigateur supporte la caméra
    async isCameraSupported(): Promise<boolean> {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices()
            return devices.some((device) => device.kind === 'videoinput')
        } catch {
            return false
        }
    }
}
