//impoert required packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');


const PORT = process.env.PORT || 3001;

const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log('listening'));
})