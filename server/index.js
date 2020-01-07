const session = require('express-session');
const express = require('express');
const app = express();
require("dotenv").config();
const checkForSession = require('./middlewares/checkForSession');
const con = require('./controllers/swagController');
const authcon = require('./controllers/authController');
const cartcon = require('./controllers/cartController');
const searchcon = require('./controllers/searchController');
let {SERVER_PORT, SESSION_SECRET} = process.env;

/* OBJECT DESTRUCTURING MAY OR MAY NOT SAVE YOU A LOT OF TYPING. */

//app.use(cb here) is a top-level middleware
app.use(express.json());

app.use(session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true
}));
//we are saving our own callback function as top-level middleware
//Note that we are NOT invoking the function here; simply referencing it
app.use(checkForSession.checkSession);
app.get('/api/swag', con.read);
app.post('/api/login', authcon.login);
app.post('/api/register', authcon.register);
app.post('/api/signout', authcon.signout);
app.get('/api/user', authcon.getUser);
app.get('/api/search', searchcon.search);
app.post('/api/cart/checkout', cartcon.checkout);
app.post('/api/cart/:id', cartcon.add);
app.delete('/api/cart/:id', cartcon.delete);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));