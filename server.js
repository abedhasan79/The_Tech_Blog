//impoert required packages
const express = require('express');
const sequelize = require('./config/connection');
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