const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const entreeController = require('../controllers/entree-controller');

router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.put('/:id/update', entreeController.updateOne);
router.delete('/:id/delete', entreeController.deleteOne);
router.delete('/delete', entreeController.deleteAll);

module.exports = router;
