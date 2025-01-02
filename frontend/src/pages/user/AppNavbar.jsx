import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Select, MenuItem, InputBase, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { categoriesState } from '../recoil/categoriesState'; // Adjust the import path for your atom
import { useNavigate } from 'react-router-dom';
const SearchBar = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper || '#121212',
  padding: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(2),
  flex: 1,
}));

const AppNavbar = () => {
  const navigate=useNavigate();
  const [searchQuery, setSearchQuery] = useState({ category: '', title: '', content: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = useRecoilValue(categoriesState);
  async function handleSelect(id,categoryTitle){
    try {
      const response = await axios.get(`http://localhost:3000/categories/${id}`);
      navigate('/', { state: { stories: response.data,title:categoryTitle } });
    } catch (error) {
      console.error('Error fetching category stories:', error);
    }

  }
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: {
          ...searchQuery,
          category: selectedCategory === 'All' ? '' : selectedCategory,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#0A0A0A' }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: { xs: 0, sm: 1 },
            color: 'grey',
            width: { xs: '95%', sm: '15%' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Story Hub
        </Typography>

        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minWidth: 100,
            height: '30px',
            backgroundColor: 'background.paper',
            borderRadius: 1,
            padding: '4px 8px',
            width: { xs: '95%', sm: 'auto' },
          }}
        >
          <Typography variant="body1" sx={{ color: 'grey', marginRight: 1 }}>
            Category:
          </Typography>
          <Select
            value={selectedCategory}
            // onChange={(e) => handleSelect(e)}
            selec
            displayEmpty
            sx={{
              flex: 1,
              color: 'grey',
              '& .MuiSelect-icon': {
                color: 'grey',
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: { xs: '95%', sm: 'auto' },
            marginTop: { xs: 1, sm: 0 },
          }}
        >
          <SearchBar
            placeholder="Search stories..."
            value={searchQuery.title}
            onChange={(e) => setSearchQuery({ ...searchQuery, title: e.target.value })}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFC107',
              color: '#121212',
              '&:hover': {
                backgroundColor: '#FFB300',
              },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
