const express = require('express');
const routes = express.Router();
const postController = require("./../controllers/PostController");

routes.get('/health-check', (req, res) => {
    res.send('OK!');
})

routes.get('/post', postController.details);
routes.post('/post', postController.store);
routes.put('/post/:id', postController.update);
routes.delete('/post/:id', postController.update);

module.exports = routes;