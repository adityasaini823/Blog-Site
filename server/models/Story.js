const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  parentCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
      required: true,
    },
  ],
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
