import { useState } from 'react'

function Contact() {
  const [isVisible, setIsVisible] = useState(true)
  const [message, setMessage] = useState('')

  return (
    <section className="section section-contact">
      <h2>Contact &amp; Learn More</h2>
      <p className="section-intro">Full-stack architecture breakdown and interactive contact form.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <button type="button" className="btn-edit" onClick={() => setIsVisible((value) => !value)}>
          {isVisible ? 'Hide contact details' : 'Show contact details'}
        </button>

        {isVisible && (
          <div className="contact-card" style={{ marginTop: '1rem' }}>
            <p className="contact-email" style={{ fontWeight: 'bold', color: 'var(--primary-light)', marginBottom: '1rem' }}>
              hello@example.com
            </p>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label htmlFor="message">Your message</label>
              <input
                id="message"
                className="form-input"
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your message here"
              />
            </div>
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
              Preview: {message || 'Start typing...'}
            </p>
          </div>
        )}
      </div>

      <div className="contact-card">
        <h3>About This Project</h3>
        <p><strong>Course:</strong> Advanced Web Development Fundamentals (AWDF)</p>
        <p><strong>Practical:</strong> 7 — Authentication and Middleware Pipeline (JWT + bcrypt)</p>
        <p><strong>Tech Stack:</strong> React 19, React Router 7, Vite 8, Node.js, Express 5, MongoDB, Mongoose 8, bcryptjs, jsonwebtoken, dotenv</p>

        <h3 style={{ marginTop: '30px' }}>Key Learning Outcomes</h3>
        <ul>
          <li>Hash passwords with bcrypt before saving the User document</li>
          <li>Sign a JWT on login and verify it in an auth middleware</li>
          <li>Protect every task route; return 401 for missing/invalid/expired tokens</li>
          <li>Validate and sanitize input on the server before it reaches MongoDB</li>
          <li>Return every error as consistent JSON: {'{ error, status }'}</li>
          <li>Keep JWT_SECRET in .env (excluded via .gitignore)</li>
          <li>Attach the token from one central api.js and handle 401 on the frontend</li>
        </ul>

        <h3 style={{ marginTop: '30px' }}>Architecture</h3>
        <div className="arch-flow">
          <span className="arch-badge">React (Vite :5173)</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">Vite Proxy /api/*</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">Express (:5000)</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">Auth middleware (JWT)</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">Validation middleware</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">Mongoose ODM</span>
          <span className="arch-arrow">→</span>
          <span className="arch-badge">MongoDB</span>
        </div>

        <h3 style={{ marginTop: '30px' }}>Get Started</h3>
        <p>1. Start MongoDB locally</p>
        <p>2. Copy <code>.env.example</code> to <code>.env</code> and set JWT_SECRET, then run <code>npm run server</code> (Express on port 5000)</p>
        <p>3. Run <code>npm run dev</code> (Vite on port 5173)</p>
        <p>4. Register, log in, then visit the <strong>Tasks</strong> page!</p>
      </div>
    </section>
  )
}

export default Contact
