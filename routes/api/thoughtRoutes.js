const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getsingleThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getsingleThought).put(updateThought).delete(deleteThought);

module.exports = router;



