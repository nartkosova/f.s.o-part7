/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'

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
    <div className="container mt-4 p-3 border rounded shadow-sm bg-light">
      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="d-block mb-3 text-primary">
        {blog.url}
      </a>
      <p className="mb-2">
        {blog.likes} likes{' '}
        <button onClick={handleLike} className="btn btn-outline-primary btn-sm ms-2">
          like
        </button>
      </p>
      <p className="text-muted">
        added by {blog.user ? blog.user.name : 'Unknown user'}
      </p>
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
