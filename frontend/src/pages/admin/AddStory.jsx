import React, { useState } from 'react';
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

const categories = ['Technology', 'Programming', 'Lifestyle', 'Fitness', 'Education'];

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/admins/story/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, parentCategory, content }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Story added successfully:', data.story);
        // Optionally clear form fields after successful submission
        setTitle('');
        setParentCategory('');
        setContent('');
      } else {
        console.error('Error adding story:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" mb={3}>
        Add New Story
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
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          label="Parent Category"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
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
        Submit Story
      </Button>
    </Box>
  );
};

export default AddStory;
