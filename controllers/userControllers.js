const { User, Thought } = require('../models');

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
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // this retrieves a specific user
      async getsingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
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
    }
};