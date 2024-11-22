// RestaurantPage2.tsx
import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
  Snackbar,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { RestaurantData } from '../types/restaurant.type'

const mockRestaurants: RestaurantData[] = [
  {
    id: 1,
    name: 'Italian Delight',
    street: '123 Sample St',
    street2: '',
    city: 'Sample City',
    state: 'Sample State',
    zipCode: '12345',
    country: 'US',
    contactInfo: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    description: 'A cozy place for delicious Italian food.',
    categories: ['Italian', 'Pizza'],
    photos: [
      'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2023/10/beacon_restaurants-2.jpg',
      'https://cdn.prod.website-files.com/61bcac7b8c69b74b8d5c2b99/654a38bfe3bf7526c162fce0_2%20(15).png',
    ],
  },
  {
    id: 2,
    name: 'Dessert Haven',
    street: '456 Sweet St',
    street2: '',
    city: 'Dessert City',
    state: 'Sweet State',
    zipCode: '67890',
    country: 'US',
    contactInfo: '987-654-3210',
    hours: '10:00 AM - 10:00 PM',
    description: 'Best place for delicious desserts.',
    categories: ['Desserts', 'Bakery'],
    photos: [
      'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2023/10/beacon_restaurants-2.jpg',
      'https://cdn.prod.website-files.com/61bcac7b8c69b74b8d5c2b99/654a38bfe3bf7526c162fce0_2%20(15).png',
    ],
  },
]

const RestaurantPage2: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(
    mockRestaurants,
  )
  const [
    selectedRestaurant,
    setSelectedRestaurant,
  ] = useState<RestaurantData | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleAddNewRestaurant = () => {
    setSelectedRestaurant(null)
    setIsFormVisible(true)
  }

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant)
    setIsFormVisible(true)
  }

  const handleSaveRestaurant = (data: RestaurantData) => {
    if (data.id) {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((rest) => (rest.id === data.id ? data : rest)),
      )
    } else {
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        { ...data, id: prevRestaurants.length + 1 },
      ])
    }
    setIsFormVisible(false)
    setSnackbarOpen(true)
  }

  const handleDeleteRestaurant = (restaurantId: number) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((r) => r.id !== restaurantId),
    )
  }

  // Handle file uploads by converting files to URLs and adding to photos array
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedRestaurant) {
      const newPhotoUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      )

      // Ensure photos is an array before updating
      setSelectedRestaurant((prev) =>
        prev
          ? { ...prev, photos: [...(prev.photos || []), ...newPhotoUrls] }
          : prev,
      )
    }
  }

  // Remove photo by index
  const handleRemovePhoto = (index: number) => {
    setSelectedRestaurant((prev) =>
      prev
        ? {
            ...prev,
            photos: prev.photos
              ? prev.photos.filter((_, i) => i !== index)
              : [],
          }
        : prev,
    )
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNewRestaurant}
        sx={{ mb: 3 }}
      >
        Add New Restaurant
      </Button>

      <List>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{restaurant.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {restaurant.street}, {restaurant.city},{' '}
                {restaurant.state}
              </Typography>
              <Typography variant="body2">{restaurant.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditRestaurant(restaurant)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteRestaurant(restaurant.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>

      {/* Add/Edit Restaurant Form Dialog */}
      <Dialog
        open={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Restaurant Name"
              value={selectedRestaurant?.name || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, name: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="Contact Info"
              value={selectedRestaurant?.contactInfo || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, contactInfo: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="Hours"
              value={selectedRestaurant?.hours || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, hours: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="Description"
              value={selectedRestaurant?.description || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, description: e.target.value },
                )
              }
              fullWidth
              multiline
              rows={4}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Address Information</Typography>
            <TextField
              label="Street Address"
              value={selectedRestaurant?.street || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, street: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="City"
              value={selectedRestaurant?.city || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, city: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="State"
              value={selectedRestaurant?.state || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, state: e.target.value },
                )
              }
              fullWidth
            />
            <TextField
              label="Zip Code"
              value={selectedRestaurant?.zipCode || ''}
              onChange={(e) =>
                setSelectedRestaurant(
                  (prev) => prev && { ...prev, zipCode: e.target.value },
                )
              }
              fullWidth
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Photos</Typography>
            <Button variant="contained" component="label">
              Upload Photos
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {selectedRestaurant?.photos?.map((photo, index) => (
                <Box
                  key={index}
                  sx={{ position: 'relative', width: 100, height: 100 }}
                >
                  <img
                    src={photo}
                    alt={`Restaurant photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemovePhoto(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'white',
                      padding: '2px',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setIsFormVisible(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleSaveRestaurant(selectedRestaurant as RestaurantData)
            }
          >
            Save Changes
          </Button>
        </Box>
      </Dialog>

      {/* Snackbar for confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Restaurant details saved successfully"
      />
    </Box>
  )
}

export default RestaurantPage2
