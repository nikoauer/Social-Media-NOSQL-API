const { User } = require('../models/index');

module.exports = {
    // this gets all the users 
    async getUsers(req, res) {
        try {
          const users =  await User.find();
          res.json(users);  
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // this creates a user 
    async createUser(req, res) {
        try {
          const userData = await User.create(req.body);
          res.json(userData);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      // this retrieves a specific user
      async getsingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v').populate("friends");
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      // this post request updates a user
      async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updateUser) {
                res.status(404).json({ message: 'No user with this id!' });
              }
              res.json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
      },
    //   this deletes a user by id 
    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

            if (!deleteUser) {
                res.status(404).json({ message: 'No user with this id!' });
              }
            
            res.json({ message: 'User has been deleted!' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //this will add a new friend
    async addNewFriend({ params }, res) {
      try {      
        const addfriend = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { runValidators: true, new: true }
      )
      console.log(addfriend)
          if (!addfriend) {
            res.status(404).json({ message: "No user with this id" });
            return;
          }
          res.json(addfriend);
        } catch (error){
          logDivider()
          console.log(error)
            res.status(500).json(error);
      }
    },
    //this will delete a friend from a userID
    async deleteFriends ({ params }, res) {
      try {
      const deleteFriend = await User.findOneAndUpdate(
        { _id: params.userId},
        { $pull: {friends: params.friendId} },
        { runValidators: true, new: true }
        )
        console.log(deleteFriend);
        if(!deleteFriend) {
          res.status(500).json({ message: "friend not found to be deleted!"})
        }
        res.json(deleteFriend)
      } catch (error) {
        res.status(500).json(error)
        console.log(error)
      }
    }
  }

