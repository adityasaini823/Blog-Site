import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Paper, Modal, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', parentId: '' });
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpenCategoryModal = (category) => {
    setSelectedCategory(category);
    setNewCategory(category ? { ...category } : { name: '', parentId: '' });
    setOpenCategoryModal(true);
  };

  const handleCloseModal = () => {
    setNewCategory({ name: '', parentId: '' });
    setOpenCategoryModal(false);
  };

  const handleSaveCategory = async () => {
    if (newCategory.name) {
      try {
        if (selectedCategory) {
          // Update existing category
          await axios.put(`/api/categories/${selectedCategory._id}`, {
            title: newCategory.name,
            parentCategory: newCategory.parentId || null,
          });
        } else {
          // Add new category
          await axios.post('/api/categories/create', {
            title: newCategory.name,
            parentCategory: newCategory.parentId || null,
          });
        }
        handleCloseModal();
        fetchCategories();
      } catch (error) {
        console.error('Error saving category:', error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Box sx={{ p: 3, width: '100%', height: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Story Categories</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenCategoryModal(null)}>
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
                  <IconButton color="primary" onClick={() => handleOpenCategoryModal(category)}>
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

      {/* Category Modal */}
      <Modal open={openCategoryModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>{selectedCategory ? 'Edit Category' : 'Add Category'}</Typography>
          <TextField
            fullWidth
            label="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={newCategory.parentId}
              onChange={(e) => setNewCategory({ ...newCategory, parentId: e.target.value })}
              input={<OutlinedInput label="Parent Category" />}
            >
              <MenuItem value="">None</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSaveCategory}>
              Save Category
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Categories;
