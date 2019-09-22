module.exports = (app, Users) => {

    app.get('/users', app.auth.authenticate(), async (req, res) => {
        const users = await Users.findAll();
        res.json(users);  
    });
    
    app.post('/users', app.auth.authenticate(), async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        await Users.create({ name, email, password }).then(user => {
            res.json(user);
        });
    });
    
    app.get('/users/:id', app.auth.authenticate(), async (req, res) => {
        const id = parseInt(req.params.id);
    
        await Users.findByPk(id).then(user => {
            res.json(user);  
        });
    });
    
    app.put('/users/:id', app.auth.authenticate(), async (req, res) => {
        const id = parseInt(req.params.id);
    
        const { name, email, password } = req.body;
    
        await Users.findByPk(id).then(user => {
            user.update({ name, email, password }).then(newUser => {
                res.json(newUser);  
            })
        });
    });
    
    app.delete('/users/:id', app.auth.authenticate(), async (req, res) => {
        const id = parseInt(req.params.id);
    
        await Users.findByPk(id).then(user => {
            user.destroy().then(user => res.json(user));
        });
    });

}