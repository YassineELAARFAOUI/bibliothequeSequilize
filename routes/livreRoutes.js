const express = require('express');
const { listLivres, createLivre,nbrOfBooks,deleteBook,getLivre} = require('../controller/livreController');
const router = express.Router(); 
router.get('/livres', listLivres);
router.post('/livres', createLivre);
router.get('/nombreDelivre',nbrOfBooks);
router.delete('/delete/:id',deleteBook);
router.get('/livres/:id', getLivre);
module.exports = router;