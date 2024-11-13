import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Paper, Modal, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Dummy categories data
const dummyCategories = [
  { id: 1, name: 'Technology', parentId: null },
  { id: 2, name: 'Lifestyle', parentId: null },
  { id: 3, name: 'Health', parentId: null },
  { id: 4, name: 'Education', parentId: null },
];

const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', parentId: '' });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenCategoryModal = (category) => {
    setSelectedCategory(category);
    setNewCategory(category ? { ...category } : { name: '', parentId: '' });
    setOpenCategoryModal(true);
  };

  const handleCloseModal = () => {
    setNewCategory({ name: '', parentId: '' });
    setOpenCategoryModal(false);
  };

  const handleSaveCategory = () => {
    if (newCategory.name) {
      if (selectedCategory) {
        const updatedCategories = categories.map((category) =>
          category.id === selectedCategory.id ? { ...category, ...newCategory } : category
        );
        setCategories(updatedCategories);
      } else {
        const newCategoryData = { ...newCategory, id: Date.now() };
        setCategories([...categories, newCategoryData]);
      }
      handleCloseModal();
    }
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
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
              <TableCell>Parent ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.parentId || 'None'}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenCategoryModal(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCategory(category.id)}>
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
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
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
