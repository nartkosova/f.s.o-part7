import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import 'bootstrap/dist/css/bootstrap.min.css'

const UserBlogs = () => {
  const { id } = useParams()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userBlogs', id],
    queryFn: () => blogService.getBlogsByUserId(id),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading blogs: {error.message}</div>
  }

  if (!user.blogs || user.blogs.length === 0) {
    return <div>No blogs found</div>
  }

  return (
    <div className="container mt-4 p-3 border rounded shadow-sm bg-light">
      <h2 className="mb-3">{user.name}’s Blogs</h2>
      <ul className="list-group">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="list-group-item">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
