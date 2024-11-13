const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedCategories = require('./seeds/categorySeeder');
const seedStories = require('./seeds/storySeeder');

dotenv.config();
const connectDB = require('./db'); // Database connection file

const seedDatabase = async () => {
  try {
    await connectDB(); // Connect to the database
    await seedCategories(); // Seed categories
    await seedStories(); // Seed stories
    console.log('Database seeded successfully!');
    process.exit(); // Exit after seeding
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
