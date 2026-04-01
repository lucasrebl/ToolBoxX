import { Html5Qrcode } from 'html5-qrcode'

export interface ScanResult {
    text: string
    timestamp: number
    rawData: string
}

export type CameraPermissionState = PermissionState | 'unsupported'

const getPreferredCamera = async () => {
    const cameras = await Html5Qrcode.getCameras()

    if (cameras.length === 0) {
        return null
    }

    return cameras.find((camera) => /back|rear|environment/iu.test(camera.label)) ?? cameras[0]
}

// Service de scan de QR codes
export const qrcodeScanService = {
    private: {
        scanner: null as Html5Qrcode | null,
        fileScanner: null as Html5Qrcode | null,
        isScanning: false
    },

    // Ouvre directement la caméra pour le scan en temps réel.
    async startScanning(
        elementId: string,
        onSuccess: (result: ScanResult) => void,
        onError?: (error: string) => void
    ): Promise<void> {
        try {
            await this.stopScanning()
            this.clearFileScan()

            this.private.scanner = new Html5Qrcode(elementId, false)

            const success = (decodedText: string) => {
                if (!this.private.isScanning) {
                    return
                }

                this.private.isScanning = false
                onSuccess({
                    text: decodedText,
                    timestamp: Date.now(),
                    rawData: decodedText
                })

                void this.stopScanning()
            }

            const error = (errorMessage: string) => {
                if (!errorMessage.includes('NotFoundException') && !errorMessage.includes('QR code parse error')) {
                    onError?.(errorMessage)
                }
            }

            const scanConfig = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1
            }

            try {
                await this.private.scanner.start(
                    { facingMode: { ideal: 'environment' } },
                    scanConfig,
                    success,
                    error
                )
            } catch {
                const camera = await getPreferredCamera()

                if (!camera) {
                    throw new Error('Aucune caméra disponible sur cet appareil.')
                }

                await this.private.scanner.start(camera.id, scanConfig, success, error)
            }

            this.private.isScanning = true
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
            onError?.(`Erreur lors du démarrage du scanner: ${errorMessage}`)
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
        if (!this.private.scanner) {
            return
        }

        try {
            if (this.private.scanner.isScanning) {
                await this.private.scanner.stop()
            }
        } catch (error) {
            console.error('Erreur lors de l\'arrêt du scanner:', error)
        } finally {
            try {
                this.private.scanner.clear()
            } catch (error) {
                console.error('Erreur lors du nettoyage du scanner:', error)
            }

            this.private.isScanning = false
            this.private.scanner = null
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

    // Vérifie si le navigateur supporte la caméra sans déclencher de prompt.
    async isCameraSupported(): Promise<boolean> {
        return Boolean(navigator.mediaDevices?.getUserMedia)
    },

    async getCameraPermissionState(): Promise<CameraPermissionState> {
        if (!navigator.mediaDevices?.getUserMedia) {
            return 'unsupported'
        }

        if (!navigator.permissions?.query) {
            return 'prompt'
        }

        try {
            const status = await navigator.permissions.query({
                name: 'camera' as PermissionName
            })

            return status.state
        } catch {
            return 'prompt'
        }
    },

    isMobileDevice(): boolean {
        if (typeof window === 'undefined') {
            return false
        }

        return window.matchMedia('(max-width: 900px), (pointer: coarse)').matches
    }
}
