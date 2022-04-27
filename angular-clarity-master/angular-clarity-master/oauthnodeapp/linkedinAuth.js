const passport = require('passport')

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const LINKEDIN_KEY = '78h5wqg59394ee';
const LINKEDIN_SECRET = 'i4pNtpLk1YYWSDoW';

passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: "http://localhost:5000/linkedin/callback",
    scope: ['r_emailaddress','r_liteprofile'],
}, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})
