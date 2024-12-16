const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

// Définition du modèle Livre avec Sequelize
const Livre = db.define('Livre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    editeur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'livres',  // Nom de la table dans la base de données
    timestamps: false    // Désactive les colonnes createdAt et updatedAt
});

// Fonction pour récupérer tous les livres
async function getAllLivres(callback) {
    try {
        const livres = await Livre.findAll(); // Récupère tous les livres
        callback(null, livres);
    } catch (err) {
        console.error("Erreur lors de la récupération des livres:", err);
        callback(err, null);
    }
}

// Fonction pour ajouter un livre
async function addLivre(livre, callback) {
    try {
        await Livre.sync(); // Synchroniser la table avec la base de données

        const newLivre = await Livre.create({
            title: livre.title,
            author: livre.author,
            editeur: livre.editeur,
        });

        console.log("Livre ajouté avec succès:", newLivre);
        callback(null, newLivre);
    } catch (err) {
        console.error("Erreur lors de l'ajout du livre:", err);
        callback(err, null);
    }
}

// Fonction pour récupérer un livre par son ID
async function getLivreById(id, callback) {
    try {
        const livre = await Livre.findByPk(id);  // Utilise findByPk pour récupérer un livre par son ID
        if (livre) {
            callback(null, livre);
        } else {
            callback(null, null); // Si le livre n'est pas trouvé, retourne null
        }
    } catch (err) {
        console.error("Erreur lors de la récupération du livre:", err);
        callback(err, null);
    }
}

// Fonction pour supprimer un livre par son ID
async function deleteLivre(id, callback) {
    try {
        const livre = await Livre.findByPk(id);  // Utilise findByPk pour récupérer un livre par son ID
        if (livre) {
            await livre.destroy();  // Supprime le livre
            callback(null, true);  // Retourne true si la suppression a réussi
        } else {
            callback(null, false);  // Retourne false si le livre n'est pas trouvé
        }
    } catch (err) {
        console.error("Erreur lors de la suppression du livre:", err);
        callback(err, null);  // Si erreur, retourne l'erreur
    }
}

module.exports = { Livre, getAllLivres, addLivre, getLivreById, deleteLivre };

