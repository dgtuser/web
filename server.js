const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
const connectToMongoDB = require('./database/connection'); 
const path = require('path'); 
const routes = require('./routes/routes'); 
const session = require('express-session'); 
const User = require('./models/users'); 
const MongoDBStore = require('connect-mongodb-session')(session); 
require('dotenv').config(); 
const bcrypt = require('bcryptjs'); 

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, 
    collection: 'sessions' 
});

app.use(session({
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store 
}));

app.use('/css', express.static(__dirname, + '/public/css')); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 

app.use('/css', express.static(__dirname + '/public/css')); 
app.use('/img/avatars', express.static(__dirname + '/public/img/avatars')); 
app.use('/img', express.static(__dirname + '/public/img')); 
app.use('/uploads', express.static(__dirname + '/public/uploads')); 
app.use('/js', express.static(__dirname + '/public/js')); 

app.use('/', routes); 

async function start() {
    const uri = await connectToMongoDB(); 
    console.log(uri); 
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000'); 
    });
}

start(); 
