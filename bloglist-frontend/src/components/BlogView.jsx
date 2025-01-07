/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const BlogView = ({ handleLike }) => {
  const { id } = useParams()
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getBlogsById(id),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading blog: {error.message}</div>
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div className="blog-details">
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user ? blog.user.name : 'Unknown user'}</p>
    </div>
  )
}

BlogView.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default BlogView
