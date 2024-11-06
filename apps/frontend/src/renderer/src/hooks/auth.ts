import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  email: string
  // Add other user properties as needed
}

interface AuthState {
  user: User | null
  token: string | null
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isUserLoggedIn: () => boolean
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  // Signup function
  signup: async (email, password) => {
    try {
      const response = await axios.post<{ user: User; token: string }>('/api/signup', {
        email,
        password
      })
      const { user, token } = response.data

      // Save token and user info in local storage
      localStorage.setItem('token', token)
      set({ user, token })
    } catch (error) {
      console.error('Signup error:', error)
    }
  },

  // Login function
  login: async (email, password) => {
    try {
      const response = await axios.post<{ user: User; token: string }>('/api/login', {
        email,
        password
      })
      const { user, token } = response.data

      // Save token and user info in local storage
      localStorage.setItem('token', token)
      set({ user, token })
    } catch (error) {
      console.error('Login error:', error)
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },

  // Check if the user is logged in by verifying token presence
  isUserLoggedIn: () => {
    const token = localStorage.getItem('token')
    return !!token
  }
}))

export default useAuth
