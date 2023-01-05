// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login');
    }
    next();
  };
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };



  module.exports = {
    isLoggedIn,
    isLoggedOut
  };

// The syntax to create a custom auth middleware is as follows:
/*

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
  next();
};

*/





// The syntax to use a custom middleware to protect a route is:
/*

const { isLoggedIn } = require('./path-to-file-with-middleware');

app.get('/example-route', isLoggedIn, (req, res, next) => {
    Route logic...
});


*/