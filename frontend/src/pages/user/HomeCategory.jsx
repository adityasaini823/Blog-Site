import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#B0B0B0',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const categories = ['All', 'Technology', 'Programming', 'Lifestyle', 'Fitness', 'Education'];

const HomeCategory = () => (
  <>
    <Typography variant="h5" gutterBottom>
        Categories
    </Typography>
    <Item>
      <List>
        {categories.map((category) => (
          <ListItem key={category} button>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Item>
  </>
);

export default HomeCategory;
