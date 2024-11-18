import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material'; // For showing a success message
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper,Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear the message from location state to avoid showing it again on page reload
      navigate(location.pathname, { replace: true });
    }
    fetchCategories();
  }, [location, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admins/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admins/categories/${id}`);
      navigate('/admins/categories', {
        state: { message: 'Category deleted successfully!' },
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Box sx={{ p: 3, width: '100%', height: '100vh' }}>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Story Categories</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/admins/add-category')}>
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category._id}</TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.parentCategory?.title || 'None'}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary" 
                    onClick={() => navigate(`/admins/edit-category/${category._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCategory(category._id)}>
                    <Delete />
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

export default Categories;
