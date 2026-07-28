import { NavLink } from 'react-router-dom'
import logo from '../assets/yellow-logo.webp'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Yellow.ai" height={28} />
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => 'navbar-cta' + (isActive ? ' navbar-cta-active' : '')}
        >
          Register Product
        </NavLink>
      </div>
    </header>
  )
}
