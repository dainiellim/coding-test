'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const errorHandler = require('./src/middleware/errorHandler');

(async () => {
    const mongoServer = await MongoMemoryServer.create();
    console.log(mongoServer.getUri());
    await mongoose.connect(mongoServer.getUri(), { dbName: "sm-db" });
    console.log('Connected to MongoDB');
})();

app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

app.use(errorHandler);

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
