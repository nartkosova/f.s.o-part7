/* eslint-disable linebreak-style */
import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

const Navbar = ({ user, handleLogout, handleLogin }) => {
  const navbarStyle = {
    backgroundColor: 'lightgrey',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div style={navbarStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navbar
