const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')

loginrouter = require('./routes/login-out')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 * 10 }
}))
app.use((req, res, next) => {
    res.set(
        "Cache-control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use('/',loginrouter)
app.use('/index',loginrouter)
app.listen(4000, () => console.log('server started'))


module.exports = app;       