
const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55
    }
}));

router.get('/', async (request, response) => {
    
    const genres = await Genre.find().sort('name');
    
    response.send(genres);
});

router.get('/:id', async (request, response) => {

    const genre = await Genre.findById({id: request.params.id});

    if (genre) return response.send(genre);
    
    return response.status(404).send('The genre with the given ID could not be found.');
});

router.post('/', async (request, response) => {
    
    try {
        
        let genre = new Genre({ name: request.body.name });

        genre = await genre.save();

        return response.send(genre);

    } catch (error) {
        return response.status(404).send(error.message);
    }
});

router.put('/:id', async (request, response) => {

    // const { error } = validateGenre(request.body);

    if (! genre) return response.status(404).send('The genre with the given ID could not be found.');

    const genre = await Genre.findByIdAndUpdate(request.params.id, {
        name: 'New update genre'
    }, {
        new: true
    });

    response.send(genre);
});

router.delete('/:id', async (request, response) => {
    
    const genre = await Genre.findByIdAndRemove(request.params.id);

    if (! genre) return response.status(404).send('The genre with the given ID could not be found.');

    response.send(genre);
});

module.exports = router;
