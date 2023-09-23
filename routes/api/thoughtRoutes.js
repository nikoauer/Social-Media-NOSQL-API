const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getsingleThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getsingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;



