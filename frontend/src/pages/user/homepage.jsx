import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CardContent, Typography, Button, Paper,Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import AppNavbar from './AppNavbar'; // Import the new component
import Grid from '@mui/material/Grid2'; // Correct import for Grid v2
import HomeCategory from './HomeCategory';
import Footer from './footer';
const dummyStories = [
  { id: 1, title: 'React Basics', categories: ['Technology', 'Programming'], content: 'This is a story about React Basics.' },
  { id: 2, title: 'Advanced Programming', categories: ['Programming'], content: 'This story covers advanced programming topics.' },
  { id: 3, title: 'Healthy Living', categories: ['Lifestyle'], content: 'Tips for healthy living and well-being.' },
  { id: 4, title: 'Workout Tips', categories: ['Fitness'], content: 'Workout tips for a better physique.' },
  { id: 5, title: 'Online Learning', categories: ['Education', 'Technology'], content: 'How to make the most of online learning.' },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#B0B0B0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const Homepage = () => {
  const navigate = useNavigate();
  
  const handleReadMore = (story) => {
    navigate(`/story/${story.id}`);
  };
  return (
    <>
      <AppNavbar />
      <Toolbar />
      <Box sx={{ width: '100vw', padding: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs:12 ,sm:8}}>
            <Typography variant="h4" gutterBottom>
              All Stories
            </Typography>
            {dummyStories.map((story) => (
              <Item key={story.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.grey">
                    {story.content.length > 100
                      ? `${story.content.substring(0, 100)}...`
                      : story.content}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ color: '#FFC107' }}
                    onClick={() => handleReadMore(story)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Item>
            ))}
          </Grid>
          <Grid size={{ xs:12 ,sm:4}}>
            <HomeCategory />
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </>
  );
};

export default Homepage;
