const express = require('express');
const Livre = require('../Model/livre');

const livres = express.Router();

// Obtenir la liste des livres
const listLivres = (req, res) => {
    Livre.getAllLivres((err, results) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des livres.", error: err });
        } else {
            res.json(results);
        }
    });
};

// Ajouter un nouveau livre
const createLivre = (req, res) => {
    const newLivre = req.body;

    // Appeler la méthode addLivre pour ajouter le livre
    Livre.addLivre(newLivre, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout du livre.", error: err });
        } else {
            res.status(201).json({ message: "Livre ajouté avec succès.", livre: result });
        }
    });
};

// Obtenir le nombre de livres en bibliothèque
const nbrOfBooks = (req, res) => {
    Livre.getAllLivres((err, results) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des livres.", error: err });
        } else {
            const nombreDeLivre = results.length;
            res.json({ nombreDeLivre });
        }
    });
};

// Supprimer un livre spécifique
const deleteBook = (req, res) => {
    const { id } = req.params;

    Livre.deleteLivre(id, (err, isDeleted) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la suppression du livre.", error: err });
        } else if (isDeleted === true) {
            res.status(200).send(`Le livre avec l'ID ${id} a été supprimé avec succès.`);
        } else {
            res.status(404).send(`Le livre avec l'ID ${id} est introuvable.`);
        }
    });
};

// Obtenir un livre par son ID
const getLivre = (req, res) => {
    const { id } = req.params;

    Livre.getLivreById(id, (err, livre) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération du livre.", error: err });
        } else if (livre) {
            res.json(livre);
        } else {
            res.status(404).send(`Livre avec l'ID ${id} non trouvé.`);
        }
    });
};

// Exportation des méthodes du contrôleur
module.exports = { listLivres, createLivre, nbrOfBooks, deleteBook, getLivre };