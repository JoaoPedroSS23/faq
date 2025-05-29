const express = require('express');
const routes = express.Router();
const postController = require("./../controllers/PostController");

routes.get('/cadastro', (req, res) => {
    res.render('layout', {
        title: "Cadastro de Dúvida",
        content: "Post/Cadastro"
    })
})

routes.get('/', (req, res) => {
    res.render('layout', {
        title: "Cadastro de Dúvida",
        content: "Post/index"
    })
})


module.exports = routes;