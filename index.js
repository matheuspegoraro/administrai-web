const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authorization = require('./auth');

//routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const siteRoutes = require('./routes/site');

const app = express();

const { Users } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permissões do EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;
app.use(cors());

//routes
authRoutes(app);
usersRoutes(app, Users);
siteRoutes(app);

const port = 3000;
const server = app.listen(port, () => console.log(`Escutando a porta ${port}!`));