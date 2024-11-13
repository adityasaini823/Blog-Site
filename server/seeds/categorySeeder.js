const mongoose = require('mongoose');
const Category = require('../models/Category'); // Assuming you have a Category model

const categories = [
  { title: 'Technology' },
  { title: 'Science' },
  { title: 'Lifestyle' },
  { title: 'Education' },
  { title: 'Health' },
  { title: 'Entertainment' }
];

const seedCategories = async () => {
  try {
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categories); // Insert new categories
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

module.exports = seedCategories;
