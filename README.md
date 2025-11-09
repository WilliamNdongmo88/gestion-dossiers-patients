# 🟢 Projet Node.js – API de Gestion de Données de Santé Simplifiée

## 📘 Description
Ce projet est une application Node.js utilisant Express et MySQL.  
L'application doit gérer des "patients" et leurs "visites" médicales. Pour des raisons de sécurité et de confidentialité (conformément à la norme ISO 27001 mentionnée), l'accès aux données doit être contrôlé.

## 🚀 Installation

### 1️⃣ Cloner le projet

git clone https://github.com/WilliamNdongmo88/gestion-dossiers-patients.git
cd ton-projet

2️⃣ Installer les dépendances

Assure-toi d’avoir Node.js et npm installés, puis exécute :
npm install

🐳 Configuration de la base de données MySQL avec Docker
1️⃣ Démarrer le conteneur MySQL

Assure-toi que ton fichier docker-compose.yml contient une section similaire à ceci :
networks: 
  gestion_donnees_sante_net:
    driver: bridge

networks:
  gestion-dossiers-patients_net:
    driver: bridge

services:
  dev-db:
    image: mysql:8.1
    container_name: dossiers_patients_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3310:3306"
    networks:
      - gestion-dossiers-patients_net
    volumes:
      - ./schema.sql:/docker-entrypoint-initdb.d/schema.sql
      - dev-db_data:/var/lib/mysql
    
  adminer:
    image: adminer
    container_name: adminer_gestion-dossiers-patients
    restart: always
    ports:
      - "8010:8080"
    environment:
      ADMINER_DEFAULT_SERVER: dev-db
    networks:
      - gestion-dossiers-patients_net

volumes:
  dev-db_data:

### Démarre le conteneur :
docker compose -p gestion_donnees_sante up -d

🟢 Cela lancera MySQL sur le port 3310 et créera automatiquement la base de données indiquée.

2️⃣ Configurer les variables d’environnement 
Crée un fichier .env à la racine du projet avec les informations de connexion suivantes :

MYSQL_HOST=localhost
MYSQL_PORT=3310
MYSQL_USER=user-root
MYSQL_ROOT_PASSWORD=dev-root
MYSQL_PASSWORD=dev-root
MYSQL_DATABASE=dev_epiconcept_test

# Port du serveur Node.js
PORT=3000

💡 Assure-toi que le fichier .env est bien ajouté à ton .gitignore pour éviter de partager tes identifiants.

▶️ Lancer le serveur

Démarre le serveur en mode production :
npm start

Ou en mode développement (si tu utilises nodemon) :
npm run dev

Le serveur sera accessible sur :
http://localhost:3000

🧱 Schéma de la base de données
# Table patients
| Colonne                  | Type         | Contraintes                 |
| -------------------------| ------------ | --------------------------- |
| id                       | INT          | PRIMARY KEY, AUTO_INCREMENT |
| nom                      | VARCHAR(100) | NOT NULL                    |
| prenom                   | VARCHAR(100) | NOT NULL                    |
| date_naissance           | DATE         | NULLABLE                    |
| numero_securite_sociale  | VARCHAR(100) | NULLABLE                    |
| nss_masker               | VARCHAR(100) | NULLABLE                    |
| date_creation            | DATETIME     | CURRENT_TIMESTAMP           |

# Table visits
| Colonne    | Type | Contraintes                                   |
| ---------- | ---- | --------------------------------------------- |
| id         | INT  | PRIMARY KEY, AUTO_INCREMENT                   |
| patient_id | INT  | NOT NULL, FOREIGN KEY REFERENCES patients(id) |
| visit_date | DATE | NOT NULL                                      |
| notes      | TEXT | NULLABLE                                      |

🌐 Endpoints de l’API
👤 Patients
➕ Créer un patient
POST /api/patients
```json
{
  "nom": "Ndon",
  "prenom": "Will",
  "date_naissance": "1995-02-12",
  "numero_securite_sociale": "2 95 123 654 12"
}
```
Réponse (201 - Created)
```json
{
  "id": 1,
  "nom": "Ndon",
  "prenom": "Will",
  "date_naissance": "1995-02-12",
  "numero_securite_sociale": "2 95 123 654 12"
}
```
📋 Lister tous les patients
GET /api/patients
Réponse (200) :
```json
[
  {
    "id": 1,
    "nom": "Ndon",
    "prenom": "Will",
    "date_naissance": "1995-02-12",
    "numero_securite_sociale": "2 95 123 654 12"
  },
  {
    "id": 2,
    "nom": "Ndon2",
    "prenom": "Will2",
    "date_naissance": "1995-02-12",
    "numero_securite_sociale": "2 95 123 654 12"
  }
]

🩺 Visits
➕ Créer une visite
POST /api/visits
Corps de la requête :
```json
{
  "patient_id": 1,
  "visit_date": "2025-11-09",
  "notes": "Consultation de routine. RAS."
}
Réponse (201 - Created) :
```json
{
  "id": 1,
  "patient_id": 1,
  "visit_date": "2025-11-09",
  "notes": "Consultation de routine. RAS."
}

📋 Lister toutes les visites
GET /api/visits
Réponse (200) :
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "visit_date": "2025-11-09",
    "notes": "Consultation de routine. RAS."
  },
  {
    "id": 2,
    "patient_id": 3,
    "visit_date": "2025-11-07",
    "notes": "Visite de suivi après traitement antibiotique."
  }
]

🔍 Récupérer les visites d’un patient

GET /api/patient/:id/visits

Exemple : /api/patient/1/visits

Réponse (200) :
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "visit_date": "2025-11-09",
    "notes": "Consultation de routine. RAS."
  }
]


🧪 Lancer les tests
npm test

🧰 Stack technique

Node.js – Runtime JavaScript
Express.js – Framework serveur
MySQL – Base de données relationnelle
Docker – Conteneurisation de la base de données
dotenv – Gestion des variables d’environnement
Jest – Tests unitaires et Tests d'intégrations

📂 Structure du projet
├── src/
│   ├── config/
│   │   └── db.js                  # Configuration MySQL
│   ├── controller/
│   │   └── patient.controller.js      
|   |   └── visit.controller.js
│   ├── docs/
|   |   └── swagger.js
│   ├── middleware/
|   |   └── errorHandler.js
│   ├── models/
|   |   └── index.js
│   │   └── patient.js
|   |   └── visit.js
│   ├── routes/
│   │   └── patient.routes.js       # Routes principales
|   |   └── visit.route.js
│   ├── app.js                      # Configuration de l’application Express
│   └── server.js                   # Point d’entrée du serveur
├── .env    
├── .env.test                       # Fichier d’environnement pour les tests
├── .gitignore
├── .docker-compose.yml
├── package.json
├── README.md
└── tests/                          # Dossier des tests


🧑‍💻 Auteur
William Ndongmo B.