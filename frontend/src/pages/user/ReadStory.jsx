import React from 'react';
import { useParams } from 'react-router-dom';
import AppNavbar from './AppNavbar'; 
import Grid  from '@mui/material/Grid2';
import { Box,Toolbar,useMediaQuery, useTheme} from '@mui/material';
import Footer from './footer';
import HomeCategory from './HomeCategory';
const dummyStories = [
  { id: 1, title: 'React Basics', content: 'This is a story about React Basics.' },
  { id: 2, title: 'Advanced Programming', content: 'This story covers advanced programming topics.' },
  { id: 3, title: 'Healthy Living', content: 'Tips for healthy living and well-being.' },
  { id: 4, title: 'Workout Tips', content: 'Workout tips for a better physique.' },
  { id: 5, title: 'Online Learning', content: 'How to make the most of online learning.' },
];


const ReadStory = () => {
  const { id } = useParams();
  const story = dummyStories.find((story) => story.id === parseInt(id, 10));
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div  style={{ padding: '10px',margin:'10px', color: '#B0B0B0' }}>
      <AppNavbar />
      <Toolbar />
      {isXsScreen && <Toolbar />}
      <Box sx={{ width: '100vw',height:'85vh', padding: 2 }}>
            <Grid container spacing={2}>
             
            <Grid size={{ xs:12 ,sm:8}} sx={{ backgroundColor: '#121212', textAlign: 'center',}}>
            {story ? (
                <>
                <h1>{story.title}</h1>
                <p>{story.content}</p>
                </>
            ) : (
                <p>Story not found.</p>
            )}
            </Grid>
            
            <Grid size={{ xs:12 ,sm:4}}>
                <HomeCategory />
            </Grid>
            
            </Grid>
        </Box>
      <Footer/>
    </div>
  );
};

export default ReadStory;
