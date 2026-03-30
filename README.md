# 🧰 ToolBoxX

Une application web de mini-outils utiles du quotidien, développée avec Vue.js 3 et TypeScript.

🚀 **[Voir le repository](https://github.com/lucasrebl/ToolBoxX)**

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19+-339933?style=flat-square&logo=node.js&logoColor=white)

## 📖 Description

ToolBoxX est une boite a outils web qui regroupe plusieurs utilitaires rapides dans une seule interface. Le projet met l'accent sur des experiences simples, accessibles et efficaces pour realiser des actions courantes sans friction.

## 🚧 Statut du Projet

⚠️ **Le projet est actuellement en cours de developpement**

La base applicative est en place avec une page d'accueil, des outils deja disponibles, et une section dediee aux fonctionnalites a venir. Le projet a vocation a s'enrichir progressivement avec de nouveaux utilitaires.

## ✨ Fonctionnalités

### 🔳 Outil QR Code
- **Generation de QR code** : creez un QR code a partir d'un lien ou d'un texte
- **Telechargement en PNG** : exportez facilement le QR code genere
- **Scan via camera** : lisez un QR code en direct depuis un appareil compatible
- **Analyse d'image** : importez une capture ou une image contenant un QR code

### 0️⃣1️⃣ Outil Binaire
- **Texte vers binaire** : convertissez instantanement une chaine de caracteres en binaire
- **Binaire vers texte** : decodez une suite de bits en texte lisible
- **Validation des entrees** : verification du format binaire par groupes de 8 bits
- **Copie rapide** : copiez le resultat obtenu dans le presse-papiers

### 🏠 Experience Generale
- **Page d'accueil centralisee** : accedez rapidement aux outils disponibles
- **Navigation simple** : une route dediee pour chaque utilitaire
- **Retour utilisateur clair** : messages d'erreur, etats de chargement et confirmation de copie
- **Design responsive** : interface adaptee au mobile comme au desktop

### 🧪 Evolutions Prevues
- **Nouveaux outils express** : futurs utilitaires de conversion, formatage ou decodage
- **Navigation enrichie** : passer plus facilement d'un outil a l'autre
- **Boite a outils extensible** : architecture prevue pour accueillir d'autres modules

## 🚀 Installation

### Prérequis
- **Node.js** : version 20.19.0 ou superieure
- **npm** : gestionnaire de paquets

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/lucasrebl/ToolBoxX.git
cd ToolBoxX
```

2. **Installer les dependances**
```bash
npm install
```

3. **Lancer en mode developpement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```text
http://localhost:5173
```

## 🛠️ Scripts Disponibles

```bash
# Developpement avec hot-reload
npm run dev

# Build de production
npm run build

# Build Vite uniquement
npm run build-only

# Previsualisation du build
npm run preview

# Verification TypeScript
npm run type-check
```

## 🏗️ Architecture

### Structure du Projet
```text
src/
├── components/                  # Composants Vue reutilisables
│   ├── binaire/
│   │   ├── BinaryToTextConverter.vue
│   │   └── TextToBinaryConverter.vue
│   ├── home/
│   │   ├── HomeComingSoon.vue
│   │   ├── HomeFeatureCard.vue
│   │   └── HomeHero.vue
│   └── qrcode/
│       ├── QrcodeGenerator.vue
│       └── QrcodeScanner.vue
├── services/                    # Logique metier
│   ├── binaire/
│   │   └── binaryConverterService.ts
│   └── qrcode/
│       ├── qrcodeScanService.ts
│       └── qrcodeService.ts
├── views/                       # Pages principales
│   ├── HomeView.vue
│   ├── binaire/
│   │   └── BinaireView.vue
│   └── qrcode/
│       └── QrcodeView.vue
├── router/                      # Configuration des routes
│   └── index.ts
├── App.vue                      # Shell principal de l'application
└── main.ts                      # Point d'entree Vue
```

### Séparation des Responsabilités
- **Services** : logique metier pure pour la generation, le scan et la conversion
- **Components** : blocs d'interface reutilisables pour chaque outil
- **Views** : pages principales exposees par le routeur
- **Router** : navigation entre l'accueil et les utilitaires
- **App** : structure globale de l'interface

## 🎨 Technologies Utilisées

- **Frontend** : Vue.js 3 avec `<script setup>`
- **Langage** : TypeScript
- **Build Tool** : Vite
- **Router** : Vue Router
- **QR Code** : `qrcode` pour la generation
- **Scan QR Code** : `html5-qrcode` pour la lecture via camera ou image
- **Styling** : CSS scoped et interface responsive

## 🎮 Comment Jouer

1. **Acceder a l'application** : ouvrez l'application sur la page d'accueil
2. **Choisir un outil** : selectionnez QR Code ou Binaire depuis l'accueil
3. **Utiliser l'outil QR Code** :
   - entrez un lien pour generer un QR code
   - ou basculez sur le mode scan pour lire un QR code via camera ou image
4. **Utiliser l'outil Binaire** :
   - saisissez du texte pour obtenir sa conversion binaire
   - ou collez une suite binaire pour la decoder en texte
5. **Recuperer le resultat** : copiez le contenu converti, ouvrez un lien detecte ou telechargez le QR code genere

## 🏅 Conseils pour Améliorer

- Ajoutez de nouveaux outils en suivant le schema `view + components + service`
- Centralisez la logique metier dans `services/` pour garder les composants legers
- Conservez des interfaces simples et rapides a utiliser
- Testez les usages mobile pour les fonctionnalites liees a la camera
- Validez clairement les entrees utilisateur pour chaque nouvel outil

## 🔧 Configuration IDE Recommandée

**VS Code** + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Extensions utiles :
- **Vue.js devtools** pour navigateur
- **TypeScript Vue Plugin (Volar)**
- **ESLint** pour VS Code
- **Prettier** pour le formatage du code

## 📝 Licences Utilisées

Bibliotheques open source utilisees pour la generation et le scan de QR codes :
- `qrcode`
- `html5-qrcode`

---

**Developpe avec ❤️ par [lucasrebl](https://github.com/lucasrebl)**
