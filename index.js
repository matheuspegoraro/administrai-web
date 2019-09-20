const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const { User } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);  
});

app.post('/users', async (req, res) => {
    const name = req.body.name.substring(0, 255);
    const email = req.body.email.substring(0, 255);
    const password = req.body.password.substring(0, 255);

    await User.create({ name, email, password }).then(user => {
        res.json(user);
    });
});

app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    await User.findByPk(id).then(user => {
        res.json(user);  
    });
});

app.put('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const { name, email, password } = req.body;

    await User.findByPk(id).then(user => {
        user.update({ name, email, password }).then(newUser => {
            res.json(newUser);  
        })
    });
});

app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    await User.findByPk(id).then(user => {
        user.destroy().then(user => res.json(user));
    });
});

const port = 3000;
const server = app.listen(port, () => console.log(`Escutando a porta ${port}!`));