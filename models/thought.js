const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReactionSchema = require('./reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
       // get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
    },
        id: false,
  });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;