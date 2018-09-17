// Joi Class
const Joi = require('joi'); // returns a class

const express = require('express');

const app = express();

// Enable middleware for request pipeline
app.use(express.json());

// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
    {
        id: 1,
        name: 'Civil Engineering'
    },
    {
        id: 2,
        name: 'Mechanical Engineering'
    },
    {
        id: 3,
        name: 'Chemical Engineering'
    },
    {
        id: 4,
        name: 'Electrical Engineering'
    },
    {
        id: 5,
        name: 'Information Technology'
    },
    {
        id: 6,
        name: 'Agricultural Engineering'
    }
]

app.get('/', (request, response) => {
    response.send('Hello, World!');
});

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3]);
});

app.get('/api/courses/:id', (request, response) => {
    // const id = request.params.id;

    // response.send(request.params);
    // response.send(request.query);
    const course = courses.find((course) => course.id === parseInt(request.params.id));

    if (! course) response.status(404).send(`The course with the given ID is not found.`);

    response.send(course);
});

// Never trust clients inputs
// that's why we need to validate
app.post('/api/courses', (request, response) => {
    
    // const name = request.body.name;

    // Validation here
    // if (! name || name.length < 3) {
    //     response.status(400).send('Name is required and should be a minimum 3 characters.');
    // }

    // Validation using Joi
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(request.body, schema);

    const { error } = validateCourse(request.body);

    if (error) {
        
        response.status(400).send(error.details[0].message);
        
        return;
    }

    const course = {
        id: courses.length + 1,
        name: request.body.name
    };

    courses.push(course);

    response.send(course);
});

app.put('/api/courses/:id', (request, response) => {

    const course = courses.find((course) => course.id === parseInt(request.param.id));

    if (! course) response.status(404).send(`The course with the given ID is not found.`);
    
    // const validate = validateCourse(request.body);
    
    // Object destructuring
    const { error } = validateCourse(request.body);

    if (error) {
        
        response.status(400).send(error.details[0].message);
        
        return;
    }
    
    course.name = request.body.name;

    response.send(coures);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));


const validateCourse = (request) => {
    
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(request.name, schema);
};
