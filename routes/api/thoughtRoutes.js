const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getsingleThought,
    updateThought,
    deleteThought,
    postReaction,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getsingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(postReaction);

module.exports = router;



