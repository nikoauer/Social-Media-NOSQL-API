const router = require('express').Router();

const {
    getUsers,
    createUser,
    getsingleUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userControllers');
const { create } = require('../../models/user');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getsingleUser).put(updateUser).delete(deleteUser);

module.exports = router;