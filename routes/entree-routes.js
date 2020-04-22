const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const entreeController = require('../controllers/entree-controller');

router.get('/test', entreeController.test);
router.post('/create', entreeController.createEntree);
router.get('/all', entreeController.retrieveAll);

module.exports = router;
