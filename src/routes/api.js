const express = require('express');
const routes = express.Router();
const postController = require("./../controllers/PostController");

routes.get('/health-check', (req, res) => {
    res.send('OK!');
})

routes.post('/post', postController.store);
routes.get('/post', postController.details);
routes.put('/post/:id', postController.update);
routes.delete('/post/:id', postController.del);
routes.post('/post/comment/:id', postController.addComment)
routes.get('/post/types', postController.getTypes)

module.exports = routes;