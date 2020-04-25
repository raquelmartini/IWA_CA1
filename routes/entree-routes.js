
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

//generic CRUD from POSTMAN
const entreeController = require('../controllers/entree-controller');
router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.get('/read/:id', entreeController.readOne);
router.put('/update/:id', entreeController.updateOne);
router.delete('/delete/:id', entreeController.deleteOne);

//web CRUD 
router.get('/', entreeController.web_page_Get);  //y
router.get('/web/read', entreeController.web_page_readAll); //y
router.post('/web/create', entreeController.web_page_CreateOne);
router.post('/web/delete', entreeController.web_page_DeleteOne); //y

module.exports = router;