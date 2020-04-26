[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)

# Interactive Web Application - CA2 -  Raquel Martini - 2020

## Routes
~~~~
//postman
router.post('/create', entreeController.createOne);
router.get('/read', entreeController.readAll);
router.get('/read/:id', entreeController.readOne);
router.put('/update/:id', entreeController.updateOne);
router.delete('/delete/:id', entreeController.deleteOne);

//web page
router.get('/', entreeController.web_page_Get);  
router.get('/web/read', entreeController.web_page_readAll); 
router.post('/web/create', entreeController.web_page_CreateOne);
router.post('/web/delete', entreeController.web_page_DeleteOne); 
~~~~

## Additional Security-related Functionality
* Added body payload limit of 100Kb for JSON object
* Added rate limiting for users of 250 REST requests per hour
* Added data sanitization against XSS
* Added Mongo data sanitization

## Startup environment variables
* Create in .env file the following variables
~~~~
DB_CONNECTION=URL TO MONGO CLOUD HERE
DB_NAME=restaurant_menu
DB_COLLECTION=entrees
SERVER_PORT=3000
~~~~



