// AddEditRestaurantForm.tsx
import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { RestaurantData } from '../types/restaurant.type'

interface AddEditRestaurantFormProps {
  initialData?: RestaurantData
  onSave: (data: RestaurantData) => void
}

const AddEditRestaurantForm: React.FC<AddEditRestaurantFormProps> = ({
  initialData,
  onSave,
}) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantData>(
    initialData || {
      id: 0,
      name: '',
      street: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      contactInfo: '',
      hours: '',
      description: '',
      categories: [],
      photos: [],
    },
  )

  useEffect(() => {
    if (initialData) {
      setRestaurantData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(restaurantData)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5">
        {initialData ? 'Edit Restaurant' : 'Add New Restaurant'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Restaurant Name"
          name="name"
          value={restaurantData.name}
          onChange={(e) =>
            setRestaurantData({ ...restaurantData, name: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={restaurantData.description}
          onChange={(e) =>
            setRestaurantData({
              ...restaurantData,
              description: e.target.value,
            })
          }
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        {/* Additional form fields */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          {initialData ? 'Update Restaurant' : 'Add Restaurant'}
        </Button>
      </form>
    </Box>
  )
}

export default AddEditRestaurantForm
