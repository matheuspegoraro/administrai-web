const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = app => {

    const { Users } = require('./app/models');
    const opts = {};

    opts.secretOrKey = require('./config/config').jwtSecret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(opts, (payload, done) => {
        Users.findByPk(payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
    });
    
    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', require('./config/config').jwtSession)
    }
}