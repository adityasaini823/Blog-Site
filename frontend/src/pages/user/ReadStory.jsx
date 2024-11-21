import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppNavbar from './AppNavbar'; 
import Grid from '@mui/material/Grid2';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Footer from './footer';
import HomeCategory from './HomeCategory';
import axios from 'axios';

const ReadStory = () => {
  let { id } = useParams();
  const [story, setStory] = useState('');
  
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchStory = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStory(id);
  }, [id]);

  return (
    <div style={{ padding: '10px', margin: '10px', color: '#B0B0B0', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppNavbar />
      <Toolbar />
      {isXsScreen && <Toolbar />}
      
      <Box sx={{ flex: 1, padding: 2, overflow: 'auto',width:"100vw" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs:12, md: 8 }}sx={{ backgroundColor: '#121212', textAlign: 'center' }}>
            {story ? (
              <>
                <h1>{story.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: story.content }} />
              </>
            ) : (
              <p>Story not found.</p>
            )}
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <HomeCategory />
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default ReadStory;
