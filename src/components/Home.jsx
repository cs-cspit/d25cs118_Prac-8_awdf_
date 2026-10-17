import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Home() {
  const { user } = useAuth()

  return (
    <section className="section section-hero">
      <div className="hero-copy">
        <p className="eyebrow">Welcome to Practical 7</p>
        <h1>
          Authentication &amp; <span className="gradient-text">Middleware</span>
        </h1>
        <p className="section-intro">
          JWT-based login and server-side input validation added to the
          full-stack Task Manager from Practical 6.
        </p>
        <p className="hero-note">
          Passwords are hashed with bcrypt before they reach MongoDB. Logging in
          returns a signed JWT (1 hour expiry) which the React app sends as{' '}
          <code>Authorization: Bearer &lt;token&gt;</code>. Every task route runs
          through the auth middleware and then the validation middleware before
          reaching the controller.
        </p>
        <p className="hero-note">
          {user ? (
            <>Logged in as <strong>{user.name}</strong>. <Link to="/tasks">Go to your tasks →</Link></>
          ) : (
            <><Link to="/login">Log in</Link> or <Link to="/register">register</Link> to manage your tasks.</>
          )}
        </p>
        <div className="feature-list">
          <p>✨ Key Features:</p>
          <ul>
            <li>POST /api/auth/register — bcrypt-hashed passwords</li>
            <li>POST /api/auth/login — signed JWT with 1h expiry</li>
            <li>GET /api/auth/me — current user from the decoded token</li>
            <li>Auth middleware protecting every /api/tasks route (401 on missing/expired token)</li>
            <li>Validation middleware: required fields, email format, password length</li>
            <li>Tasks scoped per user — you only see your own tasks</li>
            <li>Frontend logs out and redirects to /login on any 401</li>
            <li>JWT_SECRET loaded from .env, never committed</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Home
