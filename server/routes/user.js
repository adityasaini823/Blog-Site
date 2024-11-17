const express = require('express');
const Category = require('../models/Category');
const Story = require('../models/Story');
const router = express.Router();

// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get all stories (ordered by most recent)
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }); // Sort stories by createdAt, descending (most recent first)
    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a specific story by ID
router.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get stories by category ID (ordered by most recent)
router.get('/categories/:id', async (req, res) => {
  try {
    const stories = await Story.find({ parentCategories: req.params.id })
      .sort({ createdAt: -1 })  // Sort by createdAt descending (most recent first)
      .populate('parentCategories', 'title');
    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories by category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { category, title, content } = req.query;
    let query = {};

    // Search by category if provided
    if (category) {
      query.parentCategories = { $regex: category, $options: 'i' }; // Case-insensitive search for category
    }

    // Search by title if provided
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
    }

    // Search by content if provided
    if (content) {
      query.content = { $regex: content, $options: 'i' }; // Case-insensitive search for content
    }

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })  // Sort by createdAt descending (most recent first)
      .populate('parentCategories', 'title');  // Populate category title

    if (stories.length === 0) {
      return res.status(404).json({ message: 'No stories found matching the search criteria' });
    }

    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
