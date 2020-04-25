
/**
 * Contains route path and request handlers for the application to implement CRUD
 * 
 * @author RMR
 * @version 1.0
 * @see entree-controller
 * @tutorial https://www.youtube.com/watch?v=vjf774RKrLc - used this tutorial to learn how to add routes [Accessed: 22/4/20]
 */
 
const express = require('express');
const router = express.Router();

//general CRUD invokable from POSTMAN
const entreeController = require('../controllers/entree-controller');
router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.get('/read/:id', entreeController.readOne);
router.put('/update/:id', entreeController.updateOne);
router.delete('/delete/:id', entreeController.deleteOne);

//web page specific 
router.get('/get/html', entreeController.readAllAsHTML);

module.exports = router;
