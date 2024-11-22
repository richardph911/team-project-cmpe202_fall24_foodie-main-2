import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import DeleteIcon from '@mui/icons-material/Delete'

type Role = 'user' | 'owner' | 'admin'

interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
  contactInfo?: string
  businessName?: string
  restaurantName?: string
  restaurantAddress?: string
  restaurantContactInfo?: string
  hours?: string
  description?: string
  photos?: string[]
}

const initialUserData: UserProfile = {
  id: '1',
  name: 'John F',
  email: 'johndoe@example.com',
  role: 'owner',
  contactInfo: '123-456-7890',
  businessName: 'John’s Café',
  restaurantName: 'John’s Café',
  restaurantAddress: '123 Main St',
  restaurantContactInfo: '123-456-7890',
  hours: '9am - 9pm',
  description: 'A cozy café with a variety of coffees and pastries.',
  photos: [
    'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2023/10/beacon_restaurants-2.jpg',
    'https://cdn.prod.website-files.com/61bcac7b8c69b74b8d5c2b99/654a38bfe3bf7526c162fce0_2%20(15).png',
  ],
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile>(initialUserData)
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  // Check if userData has changed from initialUserData
  useEffect(() => {
    const hasChanges =
      JSON.stringify(userData) !== JSON.stringify(initialUserData)
    setIsChanged(hasChanges)
  }, [userData])

  // Handler for TextField inputs
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handler for Select inputs (role change)
  const handleSelectChange = (e: SelectChangeEvent<Role>) => {
    const { value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      role: value as Role,
    }))
  }

  // Handler for adding a new photo file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhotoFile(e.target.files[0])
    }
  }

  // Handler for adding a photo
  const handleAddPhoto = () => {
    if (newPhotoFile) {
      const photoUrl = URL.createObjectURL(newPhotoFile)
      setUserData((prevData) => ({
        ...prevData,
        photos: [...(prevData.photos || []), photoUrl],
      }))
      setNewPhotoFile(null)
    }
  }

  // Handler for removing a photo
  const handleRemovePhoto = (index: number) => {
    setUserData((prevData) => ({
      ...prevData,
      photos: prevData.photos?.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    console.log('Updated user data:', userData)
    setSnackbarOpen(true)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />

      <Select
        label="Role"
        name="role"
        value={userData.role}
        onChange={handleSelectChange}
        fullWidth
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="owner">Owner</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>

      {userData.role === 'owner' && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Restaurant Information</Typography>
          <TextField
            label="Restaurant Name"
            name="restaurantName"
            value={userData.restaurantName || ''}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="restaurantAddress"
            value={userData.restaurantAddress || ''}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Info"
            name="restaurantContactInfo"
            value={userData.restaurantContactInfo || ''}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hours"
            name="hours"
            value={userData.hours || ''}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={userData.description || ''}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Photos</Typography>
            <Button variant="contained" component="label">
              Select Photo
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPhoto}
              disabled={!newPhotoFile}
              sx={{ mt: 1, ml: 2 }}
            >
              Add Photo
            </Button>

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {userData.photos?.map((url, index) => (
                <Box
                  key={index}
                  sx={{ position: 'relative', width: '100px', height: '100px' }}
                >
                  <img
                    src={url}
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
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isChanged} // Disable button if no changes
        sx={{ mt: 2 }}
      >
        Save Changes
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Profile updated successfully"
      />
    </Box>
  )
}

export default ProfilePage
