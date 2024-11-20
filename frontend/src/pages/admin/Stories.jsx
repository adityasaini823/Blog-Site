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
  styled,
  Alert,
  InputBase ,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';
import { Edit, Delete, ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border:'1px solid black',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
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
    const confirmDelete = window.confirm('Are you sure you want to delete this story?');
  if (!confirmDelete) return;
    try {

      await axios.delete(`http://localhost:3000/admins/story/${id}`);
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
        <Search onChange={(e)=>setSearchQuery(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
