[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)

# Interactive Web Application - CA2 -  Raquel Martini - 2020


## Issues
* See Issues in GitHub
* POSTMAN suddenly stopped working eventhough the browser can access the service
[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)
[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)

## Routes
~~~~
//entree-controller.js
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
~~~~


## Additional Functionality
* Added auto-capitalization of dish name string
* Added regex validation on dish form submit
* Added sorting of dishes table by section name and then price (ascending)
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
//xss, sanitization, rate limit - see server.js
DB_ENABLE_SECURITY_FUNCTIONS=false
SERVER_PORT=3000
~~~~



