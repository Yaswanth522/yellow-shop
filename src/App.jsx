import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import './App.css'

function App() {
  return (
    <div className="page">
      <Navbar />

      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <footer className="page-footer">
        <p>© {new Date().getFullYear()} Yellow. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
