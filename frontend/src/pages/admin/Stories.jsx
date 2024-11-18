import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Chip,
  Alert
} from '@mui/material';
import axios from 'axios';
import { Edit, Delete, ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admins/stories'); // Adjust the endpoint as needed
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleDeleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admins/stories/${id}`);
      setStories((prevStories) => prevStories.filter((story) => story.id !== id));
      setMessage('Story deleted successfully.');
    } catch (error) {
      console.error('Error deleting story:', error);
      setMessage('Failed to delete story.');
    }
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <Typography variant="h4">All Stories</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/admins/add-story')}>
          Add Story
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStories.map((story) => (
              <TableRow key={story._id}>
                <TableCell>{story._id}</TableCell>
                <TableCell>{story.title}</TableCell>
                <TableCell>

                  {Array.isArray(story.parentCategories) && story.parentCategories.length > 0 ? (
                    story.parentCategories.map((category) => (
                      <Chip key={category._id} label={category.title} sx={{ margin: 0.5 }} />
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Categories
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => navigate(`/admins/edit-story/${story._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteStory(story._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => navigate(`/admins/view-story/${story._id}`)}>
                    <ReadMore />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Stories;
