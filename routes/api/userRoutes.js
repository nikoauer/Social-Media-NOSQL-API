const router = require('express').Router();

const {
    getUsers,
    createUser,
    getsingleUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriends
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getsingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriends);

module.exports = router;