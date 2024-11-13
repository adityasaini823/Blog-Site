const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to another Category
    default: null, // Null if it's a top-level category
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
