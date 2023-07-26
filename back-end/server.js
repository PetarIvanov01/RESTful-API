const express = require('express');
const expressConfig = require('./config/express');
const databeseConfig = require('./config/db');
const routesConfig = require('./config/routes');

const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;


start();
async function start() {

    const app = express();

    expressConfig(app);
    await databeseConfig(app);
    routesConfig(app);


    app.listen(port, () => console.log(`Server run on port ${port}`));
}
