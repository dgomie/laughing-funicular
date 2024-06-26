const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .lean();

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
  
      // Find the user by ID and update their thoughts array
      const user = await User.findByIdAndUpdate(
        req.body.userId, // The ID of the user to update
        { $push: { thoughts: thought._id } }, // Add the ID of the new thought to the user's thoughts array
        { new: true, runValidators: true } // Return the updated user and run the schema validators
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
  
      res.json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' })
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body, 
        { new: true, runValidators: true } 
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' });
      }
  
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      console.log(thought)

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' })
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
//   // Remove reaction from a thought
  async removeReaction(req, res) {
    try {

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {_id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
