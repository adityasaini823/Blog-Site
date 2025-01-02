import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CardContent, Typography, Button, Paper, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import AppNavbar from './AppNavbar';
import Grid from '@mui/material/Grid2'; 
import HomeCategory from './HomeCategory';
import Footer from './footer';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#B0B0B0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stories, setStories] = useState([]);
  const [category,setCategory]=useState(location.state.category);

  useEffect(() => {
    // Fetch stories when location.state is updated or when it's empty
    console.log(location.state);
    if (location.state?.stories) {
      setStories(location.state.stories);
    } else {
      const fetchStories = async () => {
        try {
          const response = await axios.get('http://localhost:3000/stories');
          setStories(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStories();
    }
  }, [location.state]); // Watch for changes in location.state

  const extractPlainText = (content) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const handleReadMore = (_id) => {
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
              {category} Stories
            </Typography>
            {stories.length === 0 ? (
                <Typography variant="h6" component="div" gutterBottom>
                  No stories available.
                </Typography>
              ) : (stories.map((story) => (
              <Item key={story._id} sx={{ mb: 2 }}>
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
            )))}
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
