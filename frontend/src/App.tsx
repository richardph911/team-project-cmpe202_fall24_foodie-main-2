import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './Components/Auth/LoginForm'
import RegisterForm from './Components/Auth/RegisterForm'
import Home from './Components/Home/Home'
import SearchPage from './pages/search'
import RestaurantPage from './pages/restaurant'
import AdminPage from './Components/User/AdminPage'
import OwnerPage from './Components/User/OwnerPage'
import UserPage from './Components/User/UserPage'
import './App.css'
import ProfilePage from './Components/User/ProfilePage'
import AddEditRestaurantForm from './Components/Restaurant/AddEditRestaurantForm'
import RestaurantPage2 from './Components/Restaurant/RestaurantPage'
import MapSearch from './Components/Search/MapSearch'

const mockRestaurantData = {
  id: 6,
  name: 'Sample Restaurant',
  street: '123 Sample St',
  city: 'Sample City',
  state: 'Sample State',
  zipCode: '12345',
  country: 'US',
  contactInfo: '123-456-7890',
  hours: '9:00 AM - 9:00 PM',
  description: 'A cozy restaurant with a variety of delicious dishes.',
  photos: [
    'https://icons-for-free.com/iff/png/512/picture-131964753123729067.png',
    'https://png.pngtree.com/png-vector/20190121/ourmid/pngtree-vector-picture-icon-png-image_332931.jpg',
  ],
  categories: ['Desserts', 'Bakery'],
  rating: 1,
  price: 4,
  lat: 37.3402,
  lng: -121.8855,
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchGoogle" element={<MapSearch />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/restaurants" element={<RestaurantPage2 />} />
        <Route
          path="/addnewrestaurant"
          element={
            <AddEditRestaurantForm
              onSave={(data) => console.log('Add restaurant', data)}
            />
          }
        />
        <Route
          path="/editrestaurant"
          element={
            <AddEditRestaurantForm
              onSave={(data) => console.log('Edit restaurant', data)}
              initialData={mockRestaurantData}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route
          path="/owner/*"
          element={
            <OwnerPage
              mode="add"
              onSubmit={(data) => console.log('Add restaurant', data)}
            />
          }
        />
        <Route path="/user/*" element={<UserPage />} />
      </Routes>
    </Router>
  )
}

export default App
