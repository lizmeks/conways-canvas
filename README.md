# Conway's Canvas

Created by Elizabeth Meeker

GitHub: https://github.com/lizardskelly

LinkedIn: https://www.linkedin.com/in/elizabeth-meeker-83781b237/

This app is deployed on Heroku: https://conways-canvas.herokuapp.com/

## Client-side app

The client-side repository can be found here: https://github.com/lizardskelly/conways-canvas

### Installation Instructions

1.) 'npm install' will install all required dependencies. 
2.) 'npm start' will run the app in development mode.
3.) Open http://localhost:3000 to view the app in your browser.

NOTE: The Conway's Canvas server application is required to run this client-side application as-is.
If you do not wish to use the server application:

1.) Open the config.js file.
2.) Change 'SERVER_ENABLE' to 0.

## Server-side app

The server-side repostitory can be found here: https://github.com/lizardskelly/conways-canvas-server

### Installation Instructions

1.) 'npm install' will install all required dependencies. 
2.) 'nodemon index' will run the app, listening on port 8080 as the default.
3.) In client-side app's installation folder, open the config.js file.
4.) Change 'SERVER_TARGET' to http://localhost:8080. 