require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', 'src/views');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

require('./src/config/config');

let port = process.env.PORT || 3000;

const routesApi = require('./src/routes/api');

const routesPost = require('./src/routes/post');

// -> Rotas da api
app.use('/v1/api', routesApi);

// -> Rotas views
app.use('/Post', routesPost);


app.listen(port, () => {
    console.log(`Server running in: http://localhost:${port}`)
})