export const binaryConverterService = {
  // Convertit un texte en binaire.
  textToBinary(text: string): string {
    if (!text) {
      return ''
    }

    return Array.from(text)
      .map((character) => character.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ')
  },

  // Convertit un binaire en texte.
  binaryToText(binary: string): string {
    const trimmedBinary = binary.trim()

    if (!trimmedBinary) {
      return ''
    }

    const normalizedBinary = trimmedBinary.replace(/\s+/g, ' ')
    const bytes = normalizedBinary.split(' ')

    if (bytes.some((byte) => !/^[01]{8}$/.test(byte))) {
      throw new Error('Le binaire doit contenir des groupes de 8 bits separes par des espaces (uniquement des 0 et des 1).')
    }

    return bytes
      .map((byte) => String.fromCharCode(Number.parseInt(byte, 2)))
      .join('')
  },
}
