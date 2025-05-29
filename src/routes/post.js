const express = require('express');
const routes = express.Router();
const postController = require("./../controllers/PostController");

routes.get('/health-check', (req, res) => {
    res.render('layout', {
        title: "Cadastro de Dúvida",
        content: "Post/Cadastro"
    })
})


module.exports = routes;