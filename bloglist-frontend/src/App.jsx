import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Container, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserTable from './components/UserTable'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [notification, setNotification] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchBlogsAndUsers = async () => {
      const blogs = await blogService.getAll()
      const users = await blogService.getUsers()
      setBlogs(blogs)
      setUsers(users)
    }
    fetchBlogsAndUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password')
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(
        `A new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`,
      )
      setIsError(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification('Failed to add blog')
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = (id, title, author) => {
    if (
      window.confirm(`Are you sure you want to delete ${title} by ${author}?`)
    ) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          setNotification('Blog deleted successfully')
          setIsError(false)
          setTimeout(() => setNotification(null), 5000)
        })
        .catch((error) => {
          console.error('Failed to delete the blog:', error)
          setNotification('Failed to delete the blog')
          setIsError(true)
          setTimeout(() => setNotification(null), 5000)
        })
    }
  }
  const handleLike = async () => {
    const updatedBlog = {
      ...blogs,
      likes: blogs.likes + 1,
      user: blogs.user,
    }
    try {
      const returnedBlog = await blogService.update(blogs.id, updatedBlog)
      updatedBlog(returnedBlog)
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    return (
      <div className="container my-4 p-3 border rounded shadow-sm bg-light">
        <div style={hideWhenVisible}>
          <button
            className="btn btn-primary"
            onClick={() => setBlogVisible(true)}
          >
          New Blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={createBlog} />
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setBlogVisible(false)}
          >
          Cancel
          </button>
        </div>
      </div>
    )
  }

  const userBlogsCount = users.map((u) => ({
    ...u,
    blogCount: blogs.filter((blog) => blog.user.id === u.id).length,
  }))

  if (user === null) {
    return (
      <div>
        <Notification message={notification} isError={isError} />
        <h2 className='p-4'>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
  const Blogs = ( handleDelete, handleLike ) => {
    return (
      <div className='px-3'>
        {blogForm()}
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={handleLike}/>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} isError={isError} />
      <Navbar user={user} handleLogout={handleLogout} handleLogin={handleLogin}/>
      <h2 className='p-3'>Blogs</h2>
      <Routes>
        <Route path='/' element={<Blogs handleDelete={handleDelete} handleLike={handleLike}/>}/>
        <Route path="/users" element={<UserTable users={userBlogsCount}/>} />
        <Route path="/users/:id" element={<UserBlogs />} />
        <Route path="/blogs/:id" element={<BlogView handleLike={handleLike}/>} />
      </Routes>
    </div>
  )
}

export default App
