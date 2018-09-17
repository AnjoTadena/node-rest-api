const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
    // response.send('Hello, World!');
    response.render('index', {
        title: 'Simple RESTFul API',
        message: 'Hello, World!'
    });
});
