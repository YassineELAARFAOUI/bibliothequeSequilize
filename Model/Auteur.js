const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

// Définition du modèle Auteur
const Auteur = db.define('Auteur', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'auteurs',  // Nom de la table
    timestamps: false,     // Ne pas ajouter les champs 'createdAt' et 'updatedAt'
});

module.exports = Auteur;
