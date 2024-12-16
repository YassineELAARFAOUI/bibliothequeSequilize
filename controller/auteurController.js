const express = require('express');
const auteurs = express.Router();
const Auteur = require('../Model/Auteur'); // Assurez-vous que le chemin est correct

// Fonction pour récupérer tous les auteurs
async function getAllAuteurs(req, res) {
    try {
        const auteurs = await Auteur.findAll(); // Récupérer tous les auteurs
        res.status(200).json(auteurs);  // Retourner les résultats en JSON
    } catch (err) {
        console.error("Erreur lors de la récupération des auteurs:", err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

// Fonction pour ajouter un nouvel auteur
async function addAuteur(req, res) {
    const { name, country } = req.body;
    try {
        const newAuteur = await Auteur.create({ name, country });
        res.status(201).json(newAuteur);  // Retourner le nouvel auteur créé
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'auteur:", err);
        res.status(400).json({ error: 'Erreur lors de l\'ajout de l\'auteur' });
    }
}

// Fonction pour mettre à jour un auteur existant
async function updateAuteur(req, res) {
    const { id } = req.params;
    const { name, country } = req.body;
    try {
        const auteur = await Auteur.findByPk(id);
        if (auteur) {
            auteur.name = name || auteur.name;
            auteur.country = country || auteur.country;
            await auteur.save();  // Sauvegarder les modifications
            res.status(200).json(auteur);  // Retourner l'auteur mis à jour
        } else {
            res.status(404).json({ error: 'Auteur non trouvé' });
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'auteur:", err);
        res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'auteur' });
    }
}

// Fonction pour supprimer un auteur
async function deleteAuteur(req, res) {
    const { id } = req.params;
    try {
        const auteur = await Auteur.findByPk(id);
        if (auteur) {
            await auteur.destroy();  // Supprimer l'auteur de la base de données
            res.status(204).send();  // Répondre avec une réponse vide (suppression réussie)
        } else {
            res.status(404).json({ error: 'Auteur non trouvé' });
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de l'auteur:", err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

module.exports = { getAllAuteurs, addAuteur, updateAuteur, deleteAuteur };
