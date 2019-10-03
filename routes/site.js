module.exports = app => {
    app.get('/', async (req, res) => {
        res.render('../templates/index.ejs'); 
    });
}