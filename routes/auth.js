const httpStatus = require('http-status');
const jwt = require('jwt-simple');

module.exports = app => {
    const { Users } = require('../app/models');
    const jwtSecret = require('../config/config').jwtSecret

    app.post('/login', (req, res) => {
        if(req.body.email && req.body.password) {
            const { email, password } = req.body;

            Users.findOne({where: {email}})
                .then(user => {
                    if(user.password == password) {
                        const payload = { id: user.id };

                        res.json({
                            token: jwt.encode(payload, jwtSecret)
                        });
                    } else {
                        res.sendStatus(httpStatus.UNAUTHORIZED);
                    }
                })
                .catch(() => {
                    res.sendStatus(httpStatus.UNAUTHORIZED);
                })
        } else {
            res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    })

}
