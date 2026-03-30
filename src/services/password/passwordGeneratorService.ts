type PasswordGeneratorOptions = {
  length: number
  includeNumbers: boolean
  includeUppercase: boolean
  includeSpecial: boolean
}

type PasswordStrength = {
  label: string
  score: number
  hint: string
}

const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER_CHARACTERS = '0123456789'
export const SPECIAL_CHARACTERS = '!@#$%^&*()-_=+[]{};:,.?/'

// Retourne un index aleatoire securise.
const randomIndex = (max: number): number => {
  const randomValues = new Uint32Array(1)
  crypto.getRandomValues(randomValues)
  return (randomValues[0] ?? 0) % max
}

// Melange les caracteres pour eviter un ordre previsible.
const shuffleCharacters = (characters: string[]): string[] => {
  const shuffled = [...characters]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1)
    const currentCharacter = shuffled[index]
    const swapCharacter = shuffled[swapIndex]

    if (!currentCharacter || !swapCharacter) {
      continue
    }

    shuffled[index] = swapCharacter
    shuffled[swapIndex] = currentCharacter
  }

  return shuffled
}

// Selectionne un caractere dans un jeu donne.
const pickCharacter = (pool: string): string => {
  const character = pool[randomIndex(pool.length)]

  if (!character) {
    throw new Error('Impossible de selectionner un caractere.')
  }

  return character
}

export const passwordGeneratorService = {
  // Genere un mot de passe selon les options choisies.
  generatePassword(options: PasswordGeneratorOptions): string {
    const normalizedLength = Math.trunc(options.length)
    const characterPools = [LOWERCASE_CHARACTERS]

    if (options.includeUppercase) {
      characterPools.push(UPPERCASE_CHARACTERS)
    }

    if (options.includeNumbers) {
      characterPools.push(NUMBER_CHARACTERS)
    }

    if (options.includeSpecial) {
      characterPools.push(SPECIAL_CHARACTERS)
    }

    if (normalizedLength < characterPools.length) {
      throw new Error(
        `Choisissez au moins ${characterPools.length} caracteres pour inclure tous les types selectionnes.`,
      )
    }

    const requiredCharacters = characterPools.map((pool) => pickCharacter(pool))
    const allCharacters = characterPools.join('')
    const remainingLength = normalizedLength - requiredCharacters.length

    const generatedCharacters = [...requiredCharacters]

    for (let index = 0; index < remainingLength; index += 1) {
      generatedCharacters.push(pickCharacter(allCharacters))
    }

    return shuffleCharacters(generatedCharacters).join('')
  },

  // Note le mot de passe générer pour plus de sécurité
  getStrength(password: string, options: PasswordGeneratorOptions): PasswordStrength {
    if (!password) {
      return {
        label: 'Vide',
        score: 0,
        hint: 'Generez un mot de passe pour voir sa robustesse.',
      }
    }

    let score = 0

    if (password.length >= 10) {
      score += 1
    }

    if (password.length >= 14) {
      score += 1
    }

    if (options.includeUppercase) {
      score += 1
    }

    if (options.includeNumbers) {
      score += 1
    }

    if (options.includeSpecial) {
      score += 1
    }

    if (score <= 2) {
      return {
        label: 'Faible',
        score: 1,
        hint: 'Augmentez la longueur ou ajoutez plus de types de caracteres.',
      }
    }

    if (score <= 4) {
      return {
        label: 'Moyenne',
        score: 2,
        hint: 'Bon point de depart, mais vous pouvez encore durcir ce mot de passe.',
      }
    }

    return {
      label: 'Forte',
      score: 3,
      hint: 'Configuration solide pour un usage general.',
    }
  },
}

export type { PasswordGeneratorOptions, PasswordStrength }
