import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0A0A0A',
        color: '#B0B0B0',
        padding: { xs: 2, sm: 3 },
        textAlign: 'center',
        mt: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FFC107' }}>
            Story Hub
          </Typography>
          <Typography variant="body2">
            Your go-to platform for captivating stories and insights.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FFC107' }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
          </Box>
          <Box>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
          </Box>
          <Box>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FFC107' }}>
            Follow Us
          </Typography>
          <Box>
            <Link href="https://twitter.com" color="inherit" underline="hover" target="_blank">
              Twitter
            </Link>
          </Box>
          <Box>
            <Link href="https://facebook.com" color="inherit" underline="hover" target="_blank">
              Facebook
            </Link>
          </Box>
          <Box>
            <Link href="https://instagram.com" color="inherit" underline="hover" target="_blank">
              Instagram
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        &copy; {new Date().getFullYear()} Story Hub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
