const express = require('express');
const router = express.Router();

const { doLogin } = require('../helpers/dologin');
const { products } = require('../helpers/products')

let popstatus = false;
let response, user;

//--------------------------LOGIN PAGE------------------------//

router.get("/", (req, res) => {
    if (req.session.isAuth) {
        res.redirect('/index')
    } else {
        res.render('login', { popstatus })
        popstatus = false
    }
})


router.post("/", (req, res) => {
    response = {} = doLogin(req.body).then((response) => {
        if (!response.status) {
            popstatus = true;
            res.redirect('/')
        }
        else {
            user = response.user
            req.session.isAuth = true
            popstatus = false
            res.redirect('/index')
        }
    })
})


//--------------------------INDEX PAGE------------------------//

router.get('/index', (req, res) => {
    if (!req.session.isAuth) {
        res.redirect('/')
    } else {
        res.render('index', { products, user })
    }
})

router.post('/index', (req, res) => {
    req.session.destroy()
    res.redirect('/')

})



module.exports = router;