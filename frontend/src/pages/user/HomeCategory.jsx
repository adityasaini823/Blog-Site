import React, { useEffect,useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#B0B0B0',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const HomeCategory = () => {
  const [categories,setCategories]=useState([]);
  useEffect(()=>{
    const fetchCategories=async ()=>{
      try{
      const response=await axios.get('http://localhost:3000/categories');
      const categories=response.data;
      // console.log(categories);
      setCategories(categories);
      }catch(err){
        console.log(err);
      }
    }
    fetchCategories();
  },[]);
  return (
    <div>
    <Typography variant="h5" gutterBottom>
        Categories
    </Typography>
    <Item>
      <List>
        {categories.map((category) => (
          <ListItem key={category._id} button>
            <ListItemText primary={category.title} />
          </ListItem>
        ))}
      </List>
    </Item>
    </div>)
}

export default HomeCategory;
