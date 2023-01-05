// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/index")(app);

require('./config/session.config.js')(app);
//                                  ^
//                                  |
// the "app" that gets passed here is the
// previously defined Express app (const app = express();)


// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "basic-auth";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use( (req, res, next) => {
    app.locals.userDetails = req.session.currentUser; //store user details in app.locals (so that is is available in handlebars)
    next();
});

// 👇 Start handling routes here
const index = require('./routes/index.routes'); // <== already included
app.use('/', index); // <== already included
 
// authRouter needs to be added so paste the following lines:
const authRouter = require('./routes/auth.routes'); // <== has to be added
app.use('/', authRouter); // <== has to be added

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
