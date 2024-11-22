import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material'

interface Restaurant {
  id?: string
  name: string
  address: string
  contactInfo: string
  hours: string
}

interface UpdateRestaurantFormProps {
  mode: 'add'
  initialData?: Restaurant
  onSubmit: (restaurant: Restaurant) => void
}

const OwnerPage: React.FC<UpdateRestaurantFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [restaurant, setRestaurant] = useState<Restaurant>(
    initialData || { name: '', address: '', contactInfo: '', hours: '' },
  )
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    // Send the data to the parent component or API
    onSubmit(restaurant)

    // Show confirmation Snackbar
    setSnackbarOpen(true)

    // Clear form if in "add" mode
    if (mode === 'add') {
      setRestaurant({ name: '', address: '', contactInfo: '', hours: '' })
    }
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {mode === 'add' ? 'Add New Restaurant' : 'Update Restaurant Details'}
      </Typography>
      <TextField
        label="Restaurant Name"
        name="name"
        value={restaurant.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={restaurant.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Info"
        name="contactInfo"
        value={restaurant.contactInfo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Hours"
        name="hours"
        value={restaurant.hours}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {mode === 'add' ? 'Add Restaurant' : 'Save Changes'}
      </Button>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={
          mode === 'add'
            ? 'Restaurant added successfully'
            : 'Restaurant updated successfully'
        }
      />
    </Box>
  )
}

export default OwnerPage
