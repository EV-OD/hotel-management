// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import './styles/globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar';
import useAuth from './hooks/auth';
import Page from './pages/Test';


// Layout Component to Wrap Routes with Navbar
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar/>
    <main>{children}</main>
  </SidebarProvider>
)

function App(): JSX.Element {
  const {isUserLoggedIn} =  useAuth()
  if (isUserLoggedIn()) {
    return (
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes>
      </Router>
    )
  }

  return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
  )
}

export default App
