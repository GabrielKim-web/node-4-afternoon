const users = require('../models/users');
let id = 1;
module.exports = {
   login: (req, res) => {
      const {username, password} = req.body;

      //returns an object called user if any element in the users array matches the username AND the password
      const user = users.find(user => username === username && user.password === password);
      if (user) {
         //logs in user by setting session username to be whoeve just logged in
         req.session.username = user.username;
         res.status(200).send(req.session.user)
      } else {
         //No user? Denied.
         res.status(500).send('Please log in first.');
      }
   },
   register: (req, res) => {
      const {username, password} = req.body;
      //adds new user to the database, and increments id by 1 to give each user unique ID
      users.push({id, username, password});
      id++;

      //sets current session who whoever just registered
      req.session.user.username = username;
      res.status(200).send(req.session.user);
   },
   signout: (req, res) => {
      //the destroy method terminates the current req.session
      req.session.destroy()
      //req.session should be undefined
      res.status(200).send(req.session);
   },
   getUser: (req, res) => {
      //who's logged in right now?
      res.status(200).send(req.session.user);
   }
}