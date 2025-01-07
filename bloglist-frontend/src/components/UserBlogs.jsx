import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

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
    <div>
      <h2>{user.name}’s Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
