const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const siteRoutes = require('./routes/site');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permissões do EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cors());

siteRoutes(app);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Escutando a porta ${port}!`));