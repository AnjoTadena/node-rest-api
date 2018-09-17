
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

app.post('/api/courses', (request, response) => {
    
    const course = {
        id: courses.length + 1,
        name: request.body.name
    };

    courses.push(course);

    response.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
