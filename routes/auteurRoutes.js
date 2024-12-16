const express = require('express');
const { getAllAuteurs, addAuteur, updateAuteur, deleteAuteur } = require('../controller/auteurController'); // Assurez-vous que le chemin est correct

const router = express.Router();

// Route pour récupérer tous les auteurs
router.get('/auteurs', getAllAuteurs);

// Route pour ajouter un nouvel auteur
router.post('/auteurs', addAuteur);

// Route pour mettre à jour un auteur existant
router.put('/auteurs/:id', updateAuteur);

// Route pour supprimer un auteur
router.delete('/auteurs/:id', deleteAuteur);

module.exports = router;
