
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

const entreeController = require('../controllers/entree-controller');

//load page
router.get('/', entreeController.renderIndex);  

//JSON body containing entree detauls
router.post('/create', entreeController.createOne);

//No param or JSON
router.get('/read', entreeController.readAll);

//ID as param 
router.get('/read/:id', entreeController.readOne);

//ID as param and JSON details in the body
router.put('/update/:id', entreeController.updateOne); 

//ID as JSON field
router.delete('/delete', entreeController.deleteOne);  

//ID as param 
router.delete('/delete/:id', entreeController.deleteOne); 

module.exports = router;