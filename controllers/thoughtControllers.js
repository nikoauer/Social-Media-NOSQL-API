const { Thought, User } = require('../models/index');

module.exports = {
    // retrieves all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts =  await Thought.find();
          res.json(thoughts);  
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // this retrieves a specific thought
    async getsingleThought(req, res) {
    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

        if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
    },
    // this creates a thought 
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userId = req.params.userId;
    
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: 'User not found with this ID' });
            }
    
            res.json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
            );

        if (!updateThought) {
            res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(updateThought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //   this deletes a user by id 
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deleteThought) {
                res.status(404).json({ message: 'No thoughts with this id!' });
                }
            
            res.json({ message: 'Thought has been deleted!' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}