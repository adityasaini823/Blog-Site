const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const Category = require('../models/Category');

// Category Routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory', 'title'); // Only populate the title
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id); // Fetch category by ID
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

router.post('/categories/create', async (req, res) => {
  try {
    const { title, parentCategory } = req.body;
    const newCategory = new Category({ title, parentCategory });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id); // Delete category by ID
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, parentCategory } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, parentCategory },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// Story Routes
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().populate('parentCategories', 'title'); // Fetch all stories with populated categories
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error: error.message });
  }
});

router.get('/story/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id).populate('parentCategories', 'title');
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching story', error: error.message });
  }
});

router.post('/story/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const parentCategories=req.body.parentCategory

    if (!title || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newStory = new Story({ title, parentCategories, content });
    await newStory.save();
    res.status(201).json({ message: 'Story created successfully', story: newStory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating story', error: error.message });
  }
});

router.put('/story/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const parentCategories=req.body.parentCategory
    console.log(parentCategories);
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { title, parentCategories, content },
      { new: true, runValidators: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(200).json({ message: 'Story updated successfully', story: updatedStory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating story', error: error.message });
  }
});

router.delete('/story/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStory = await Story.findByIdAndDelete(id); // Delete story by ID
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story', error: error.message });
  }
});

module.exports = router;
