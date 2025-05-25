require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./src/config/config');

let port = process.env.PORT || 3000;

const routesApi = require('./src/routes/api');
app.use('/v1/api', routesApi);

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})