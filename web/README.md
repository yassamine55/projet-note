# Projet Web - Application de Notes

Ce projet est une application web complète pour gérer des notes personnelles. Il est composé d'un backend développé avec Laravel (PHP) et d'un frontend développé avec React (JavaScript).

## Structure du Projet

- `back/blogback/` : Backend Laravel pour l'API et la logique métier.
- `front/mon-app/` : Frontend React pour l'interface utilisateur.
- `package.json` : Configuration racine pour les dépendances partagées.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- PHP 8.1 ou supérieur
- Composer (pour les dépendances PHP)
- Node.js 16 ou supérieur
- npm ou yarn (pour les dépendances JavaScript)

## Installation

### Backend (Laravel)

1. Naviguez vers le dossier backend :
   ```
   cd back/blogback
   ```

2. Installez les dépendances PHP :
   ```
   composer install
   ```

3. Copiez le fichier d'environnement et configurez-le :
   ```
   cp .env.example .env
   ```

4. Générez la clé d'application :
   ```
   php artisan key:generate
   ```

5. Exécutez les migrations de base de données :
   ```
   php artisan migrate
   ```

6. (Optionnel) Lancez les seeders pour des données de test :
   ```
   php artisan db:seed
   ```

### Frontend (React)

1. Naviguez vers le dossier frontend :
   ```
   cd front/mon-app
   ```

2. Installez les dépendances JavaScript :
   ```
   npm install
   ```

## Utilisation

### Démarrer le Backend

Dans le dossier `back/blogback/` :
```
php artisan serve
```
Le serveur backend sera accessible sur `http://localhost:8000`.

### Démarrer le Frontend

Dans le dossier `front/mon-app/` :
```
npm start
```
L'application frontend sera accessible sur `http://localhost:3000`.

## Fonctionnalités

- Création, lecture, mise à jour et suppression de notes
- Authentification des utilisateurs
- Interface utilisateur moderne et responsive

## Tests

### Backend
```
cd back/blogback
php artisan test
```

### Frontend
```
cd front/mon-app
npm test
```

## Déploiement

Pour déployer l'application en production, consultez la documentation de Laravel et React respective.

## Contribution

Les contributions sont les bienvenues ! Veuillez suivre les bonnes pratiques de développement et soumettre des pull requests.

## Licence

Ce projet est sous licence MIT."# project-web" 
