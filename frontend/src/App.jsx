import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Homepage from './pages/user/homepage';
import AdminDashboard from './pages/admin/AdminDasboard';
import Categories from './pages/admin/Categories';
import Stories from './pages/admin/Stories';
import ReadStory from './pages/user/ReadStory';
import AddStory from './pages/admin/AddStory';
import AddCategory from './pages/admin/addCategory';
const theme = createTheme(); // Define the theme here

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admins" element={<AdminDashboard />}>
            <Route path="stories" element={<Stories />} />
            <Route path="categories" element={<Categories />} />
            <Route path="add-story" element={<AddStory />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="edit-category/:id" element={<AddCategory />} />
            <Route path="edit-story/:id" element={<AddStory />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/story/:id" element={<ReadStory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
