import React from 'react';
import { useRecoilValue } from 'recoil';
import { categoriesState } from '../recoil/categoriesState';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomeCategory = () => {
  const navigate = useNavigate();
  const categories = useRecoilValue(categoriesState);

  const handleCategoryClick = async (id,categoryTitle) => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/${id}`);
      navigate('/', { state: { stories: response.data,category:categoryTitle } });
    } catch (error) {
      console.error('Error fetching category stories:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category._id}
            sx={{ cursor: 'pointer' }}
            button
            onClick={() => handleCategoryClick(category._id,category.title)}
          >
            <ListItemText primary={category.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HomeCategory;
