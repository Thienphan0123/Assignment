
const express = require('express'), 
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModels'),
    bodyParser = require('body-parser');
mongoose.Promise - global.Promise;
mongoose.connect('mongodb://localhost/restfulapi');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
const routes = require('./api/routes/todoListRoute'); 
routes(app);
app.listen(port);
console.log('todo list RESTful API server started on:' + port);