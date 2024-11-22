import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'owner' | 'user'
}

// Mock data for users
const mockUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'owner' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
]

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState<'admin' | 'owner' | 'user'>('user')

  // Simulate fetching data by setting the initial state with mock data
  useEffect(() => {
    setUsers(mockUsers)
  }, [])

  // Handle delete user
  const handleDeleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
  }

  // Handle start edit
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewRole(user.role)
  }

  // Handle save changes
  const handleSaveChanges = () => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, role: newRole } : user,
        ),
      )
      setEditingUser(null)
    }
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Manage Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Select
                      value={newRole}
                      onChange={(e) =>
                        setNewRole(e.target.value as 'admin' | 'owner' | 'user')
                      }
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="owner">Owner</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingUser(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditUser(user)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserAdmin
