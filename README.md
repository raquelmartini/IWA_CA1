[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)

# Interactive Web Application - CA2 -  Raquel Martini - 2020

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

