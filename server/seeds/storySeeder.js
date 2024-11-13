const mongoose = require('mongoose');
const Story = require('../models/Story'); // Assuming you have a Story model
const Category = require('../models/Category'); // Assuming you have a Category model

const stories = [
  {
    title: 'The Future of Technology',
    content: `
      <h1>The Future of Technology</h1>
      <p>Technology is advancing at a rapid pace. In the near future, we expect to see...</p>
      <ul>
        <li>Artificial Intelligence</li>
        <li>Robotics</li>
        <li>Blockchain</li>
      </ul>
      <p>The possibilities are endless, and the world will change in exciting ways.</p>
    `,
    parentCategories: [], // Categories will be added below
  },
  {
    title: 'Health Benefits of Exercise',
    content: `
      <h1>Health Benefits of Exercise</h1>
      <p>Exercise is key to maintaining good health. Here are some of the benefits:</p>
      <ul>
        <li>Improves heart health</li>
        <li>Boosts immune system</li>
        <li>Reduces stress</li>
      </ul>
      <p>It's important to exercise regularly to stay healthy.</p>
    `,
    parentCategories: [],
  }
];

const seedStories = async () => {
  try {
    await Story.deleteMany(); // Clear existing stories
    const categories = await Category.find(); // Fetch all categories
    // Assign categories to stories
    stories[0].parentCategories = [categories[0]._id, categories[1]._id]; // For example, "Technology" and "Science"
    stories[1].parentCategories = [categories[4]._id, categories[3]._id]; // For example, "Health" and "Education"

    // Insert stories with categories
    await Story.insertMany(stories);
    console.log('Stories seeded successfully!');
  } catch (error) {
    console.error('Error seeding stories:', error);
  }
};

module.exports = seedStories;
