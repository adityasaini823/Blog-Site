import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]); // Fetch from backend
  const { id } = useParams(); // Get the category ID from the route

  useEffect(() => {
    // Fetch all categories for parent category selection
    fetch('http://localhost:3000/admins/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch existing category details for editing
      fetch(`http://localhost:3000/admins/categories/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setParentCategory(data.parentCategory || '');
        })
        .catch((error) => console.error('Error fetching category:', error));
    }
  }, [id]);

  const handleSubmit = async () => {
    const url = id 
      ? `http://localhost:3000/admins/categories/${id}` 
      : 'http://localhost:3000/admins/categories/create';

    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, parentCategory }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Category ${id ? 'updated' : 'added'} successfully:`, data.category);
        setTitle('');
        setParentCategory('');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" mb={3}>
        {id ? 'Edit Category' : 'Add New Category'}
      </Typography>
      <TextField
        fullWidth
        label="Category Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Parent Category</InputLabel>
        <Select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          label="Parent Category"
        >
          <MenuItem value="">None</MenuItem> {/* For top-level category */}
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {id ? 'Update Category' : 'Add Category'}
      </Button>
    </Box>
  );
};

export default AddCategory;
