const express = require('express');
const session = require('express-session')
const passport = require('passport');
require('./googleAuth')
require('./linkedinAuth')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

let user;
const app = express();
app.use(session({secret: 'cats'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google"> Authenticate with google</a> </br>' +
        '<a href="/auth/linkedin"> Authenticate with linkedin</a> </br>');
});
app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)
app.get('/auth/linkedin', (req, res) => {
    res.redirect("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78h5wqg59394ee&scope=r_liteprofile%20r_emailaddress&state=987654321&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flinkedin%2Fcallback")
})

app.get('/protected', isLoggedIn, (req, res) => {

    user = req.user;
    res.redirect("http://localhost:4200/#/google1")
});

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    }))
app.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        state: '',
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
    // (req, res) => {
    //     res.send('SUCCESS');
    // }
)

app.get('/auth/failure', (req, res) => {
        res.send('something went wrong');
    }
)

app.get('/getUser', (req, res) => {
        res.send(user);
    }
)

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
})

app.listen(5000, () => console.log('listening on 5000'));
