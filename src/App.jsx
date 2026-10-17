import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthProvider from './context/AuthProvider'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <footer className="app-footer">
            <p>Practical 7 — Authentication &amp; Middleware Pipeline &bull; AWDF &bull; D25CS118</p>
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
