import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import ReactQuill from 'react-quill'; // Rich text editor
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [parentCategory, setParentCategory] = useState([]);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const { id } = useParams(); // For determining add/edit mode
  const navigate = useNavigate();

  // Fetch categories for the dropdown
  useEffect(() => {
    fetch('http://localhost:3000/admins/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Fetch story data if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/admins/story/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setParentCategory(data.parentCategories.map((cat) => cat._id)|| []);
          setContent(data.content || '');
        })
        .catch((error) => console.error('Error fetching story:', error));
    }
  }, [id]);

  const handleSubmit = async () => {
    const url = id
      ? `http://localhost:3000/admins/story/${id}`
      : 'http://localhost:3000/admins/story/create';

    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, parentCategory, content }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Story ${id ? 'updated' : 'added'} successfully:`, data.story);
        setTitle('');
        setParentCategory([]);
        setContent('');
        navigate('/admins/stories', {
          state: { message: `Story ${id ? 'updated' : 'created'} successfully!` },
        });
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
        {id ? 'Edit Story' : 'Add New Story'}
      </Typography>
      <TextField
        fullWidth
        label="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Parent Category</InputLabel>
        <Select
          value={parentCategory || []}
          onChange={(e) => setParentCategory(e.target.value)}
          label="Parent Category"
          multiple
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="subtitle1" mt={2} mb={1}>
        Content
      </Typography>
      <ReactQuill theme="snow" value={content} onChange={setContent} />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {id ? 'Update Story' : 'Add Story'}
      </Button>
    </Box>
  );
};

export default AddStory;
