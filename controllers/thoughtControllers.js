const { Thought, User } = require('../models/index');

module.exports = {
    // retrieves all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts =  await Thought.find();
          res.json(thoughts);  
        } catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    },
    // this retrieves a specific thought
    async getsingleThought(req, res) {
    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v').populate("reactions");

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
            const username = req.body.username;
    
            const user = await User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
    
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'Thought created, but no user with this ID' });
              }
        
              res.json({ message: 'Thought created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //update a users thoughts
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
    //   this deletes a user by id (needs FIXING!!!!!!!!!!)
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
    },
// This adds a reaction to a thought
    async postReaction ({ params, body}, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                { $addToSet: {reactions: body}},
                { new: true, runValidators: true }
                )
            if(!reaction) {
                res.status(404).json({ message: 'No thoughts with this id!' });
            }
            res.json(reaction);
        } catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    },
    // this deletes reactions of a thought
    async deleteReaction ({ params, body }, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: {reactions: body} },
                { runValidators: true, new: true }
                )
                if(!deleteReaction) {
                    res.status(404).json({ message: 'No thoughts with this id!' });
                }
                res.json(deleteReaction);
        } catch (error) {
            console.status(500).json(error)
            console.log(error)
        }
    }
}