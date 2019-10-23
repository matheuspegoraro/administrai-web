module.exports = app => {
    app.get('/', async (req, res) => {
        res.render('../templates/index.ejs'); 
    });

    app.get('/app/register', async (req, res) => {
        res.render('../templates/register.ejs'); 
    });

    app.get('/app/login', async (req, res) => {
        res.render('../templates/login.ejs'); 
    });
}