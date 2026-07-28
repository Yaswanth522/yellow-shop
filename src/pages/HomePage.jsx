import { Link } from 'react-router-dom'
import './HomePage.css'

const CATEGORIES = [
  { icon: '🔊', name: 'Electronics', blurb: 'Speakers, headphones & smart devices' },
  { icon: '🏠', name: 'Home Appliances', blurb: 'Everyday essentials for the home' },
  { icon: '⌚', name: 'Wearables', blurb: 'Watches, trackers & accessories' },
  { icon: '🧩', name: 'Software & Apps', blurb: 'Licenses, subscriptions & tools' },
]

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Yellow</h1>
        <p>
          Quality products for everyday life — and a simple way to register
          them for support and warranty coverage.
        </p>
        <Link to="/register" className="hero-cta">
          Register a Product
        </Link>
      </section>

      <section className="categories">
        <h2>Shop by category</h2>
        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <div className="category-card" key={category.name}>
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-register">
        <h2>Why register your product?</h2>
        <ul>
          <li>Faster access to warranty and support</li>
          <li>Important safety and recall notifications</li>
          <li>Personalized tips for getting the most out of your product</li>
        </ul>
        <Link to="/register" className="why-register-cta">
          Get started
        </Link>
      </section>
    </div>
  )
}
