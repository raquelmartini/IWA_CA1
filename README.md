[![CCT](https://www.cct.ie/wp-content/themes/hdcct/img/atoms/logo.jpg)](http://cct.ie)

# Interactive Web Application - CA2 -  Raquel Martini - 2020
* Added body payload limit of 100Kb for JSON object
* Added rate limiting for users of 250 REST requests per hour
* Added data sanitization against XSS
* Added Mongo data sanitization

## Startup environment variables
* Create in .env file the following variables
1. DB_CONNECTION=<link>
2. DB_NAME=restaurant_menu
3. DB_COLLECTION=entrees
4. SERVER_PORT=3000

