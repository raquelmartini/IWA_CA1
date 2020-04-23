const express = require('express');
const router = express.Router();

//controller reference
const entreeController = require('../controllers/entree-controller');
router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.get('/read/:id', entreeController.readOne);
router.put('/update/:id', entreeController.updateOne);
router.delete('/delete/:id', entreeController.deleteOne);

module.exports = router;
