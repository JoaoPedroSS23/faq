const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Login/login');
})

router.get('/register', (req, res) => {
    res.render('Login/register');
})

module.exports = router;