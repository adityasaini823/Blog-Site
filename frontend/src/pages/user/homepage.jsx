import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CardContent, Typography, Button, Paper, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import AppNavbar from './AppNavbar'; // Import the new component
import Grid from '@mui/material/Grid2'; // Correct import for Grid v2
import HomeCategory from './HomeCategory';
import Footer from './footer';
import axios from 'axios';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#B0B0B0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const Homepage = () => {
  const navigate = useNavigate();
  const [stories,setStories]=useState([]);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stories');
        const stories = response.data;
        // console.log(stories);
        setStories(stories);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStories();
  }, []);
  const extractPlainText = (content) => {
    // Replace this logic depending on the format of story.content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content; // If it's HTML
    return tempElement.textContent || tempElement.innerText || '';
  };
  const handleReadMore = (_id) => {
    // console.log(typeo(_id));
    navigate(`/story/${_id}`);
  };
  return (
    <>
      <AppNavbar />
      <Toolbar />
      <Box sx={{ width: '100vw', padding: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="h4" gutterBottom>
              All Stories
            </Typography>
            {stories.map((story) => (
              <Item key={story.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.grey">
                  {extractPlainText(story.content).length > 100
                    ? `${extractPlainText(story.content).substring(0, 250)}...`
                    : extractPlainText(story.content)}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ color: '#FFC107' }}
                    onClick={() => handleReadMore(story._id)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Item>
            ))}
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <HomeCategory />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Homepage;
