const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '163217152813-s0fmcrgc5l50oqmqoc2lkej16alu8i5g.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'hmm1pfDYaFtK0JUAlZBMrrTS';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})
