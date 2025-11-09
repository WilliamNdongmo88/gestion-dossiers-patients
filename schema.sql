CREATE TABLE patients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    numero_securite_sociale VARCHAR(255) NOT NULL,
    nss_masker VARCHAR(100),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP 
);