const connectToMongoDB = require('./database/connection');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routes = require('./routes/routes'); 
app.use('/', routes);

