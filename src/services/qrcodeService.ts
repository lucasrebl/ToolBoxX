import QRCode from 'qrcode'

// Service de génération de QR codes
export const qrcodeService = {
    // Génère un code QR à partir d'une URL/texte
    async generateQRCode(
        text: string,
        options?: {
            width?: number
            margin?: number
            color?: { dark: string; light: string }
            errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
        }
    ): Promise<string> {
        try {
            if (!text || text.trim() === '') {
                throw new Error('Le texte ne peut pas être vide')
            }

            const qrOptions = {
                width: options?.width || 300,
                margin: options?.margin || 10,
                color: options?.color || { dark: '#000000', light: '#FFFFFF' },
                errorCorrectionLevel: options?.errorCorrectionLevel || 'M'
            }

            const dataUrl = await QRCode.toDataURL(text, qrOptions)
            return dataUrl
        } catch (error) {
            throw new Error(
                `Erreur lors de la génération du QR code: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
            )
        }
    },

    // Télécharge un QR code en image PNG
    downloadQRCode(dataUrl: string, filename: string = 'qrcode.png'): void {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    },
}
