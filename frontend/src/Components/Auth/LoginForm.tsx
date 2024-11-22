// src/LoginForm.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'

interface FormData {
  email: string
  password: string
  role: string
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [role, setRole] = useState<string>('user') // Initialize role as 'user'
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const loginData = { ...data, role } // Add role to form data

    console.log('Logging in as:', loginData)

    // Redirect based on role
    if (role === 'owner') {
      navigate('/profile')
    } else {
      navigate('/user')
    }
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setRole(newValue) // Update role based on selected tab
  }

  return (
    <div>
      <Box
        display="flex"
        height="100vh"
        sx={{
          backgroundImage: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Paper elevation={3} style={{ padding: 20, width: '20%' }}>
            <h2>Login</h2>
            <Tabs
              value={role}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab value="user" label="User" />
              <Tab value="owner" label="Owner" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                {`You are logging in as a ${
                  role.charAt(0).toUpperCase() + role.slice(1)
                }`}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email is invalid',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
                <Typography variant="body2" style={{ marginTop: 20 }}>
                  If you don't have an account,{' '}
                  <Button onClick={handleRegister} color="primary">
                    register
                  </Button>
                </Typography>
              </div>
            </form>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default LoginForm
