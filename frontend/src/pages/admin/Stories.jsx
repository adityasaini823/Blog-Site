import React, { useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete, ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // For navigation to Add Story page

const dummyStories = [
  { id: 1, title: 'React Basics', categories: ['Technology', 'Programming'], content: 'This is a story about React Basics.' },
  { id: 2, title: 'Advanced Programming', categories: ['Programming'], content: 'This story covers advanced programming topics.' },
  { id: 3, title: 'Healthy Living', categories: ['Lifestyle'], content: 'Tips for healthy living and well-being.' },
  { id: 4, title: 'Workout Tips', categories: ['Fitness'], content: 'Workout tips for a better physique.' },
  { id: 5, title: 'Online Learning', categories: ['Education', 'Technology'], content: 'How to make the most of online learning.' },
];

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredStories = dummyStories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
              <TableRow key={story.id}>
                <TableCell>{story.id}</TableCell>
                <TableCell>{story.title}</TableCell>
                <TableCell>
                  {story.categories.map((category) => (
                    <Chip key={category} label={category} sx={{ margin: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                  <IconButton color="info">
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
