const express = require('express');
const router = express.Router();

//controller reference
const entreeController = require('../controllers/entree-controller');
router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.put('/:id/update', entreeController.updateOne);
router.delete('/:id/delete', entreeController.deleteOne);

module.exports = router;
