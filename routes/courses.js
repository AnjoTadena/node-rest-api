
const express = require('express');

const router = express.Router();

// Joi Class
const Joi = require('joi'); // returns a class

const validateCourse = (request) => {
    
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(request.name, schema);
};

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
];


router.get('/', (request, response) => {
    response.send([1, 2, 3]);
});

router.get('/:id', (request, response) => {
    // const id = request.params.id;

    // response.send(request.params);
    // response.send(request.query);
    const course = courses.find((course) => course.id === parseInt(request.params.id));

    if (! course) return response.status(404).send(`The course with the given ID is not found.`);

    response.send(course);
});

// Never trust clients inputs
// that's why we need to validate
router.post('/', (request, response) => {
    
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

    if (error) return response.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: request.body.name
    };

    courses.push(course);

    response.send(course);
});

router.put('/:id', (request, response) => {

    const course = courses.find((course) => course.id === parseInt(request.param.id));

    if (! course) return response.status(404).send(`The course with the given ID is not found.`);
    
    // const validate = validateCourse(request.body);
    
    // Object destructuring
    const { error } = validateCourse(request.body);

    if (error) return response.status(400).send(error.details[0].message);
    
    course.name = request.body.name;

    response.send(coures);
});

router.delete('/:id', (request, response) => {
    
    const course = courses.find((course) => course.id === parseInt(request.param.id));

    if (! course) response.status(404).send(`The course with the given ID is not found.`);
    
    const courseIndex = courses.indexOf(course);

    coures.splice(courseIndex, 1);

    response.send(course);
});

module.exports = router;
