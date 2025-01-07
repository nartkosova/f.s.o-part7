import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Blog = ({ blog, updateBlog, handleDelete, handleLike }) => {
  const { id } = useParams
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggle = () => {
    setVisible(!visible)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
            {blog.title} <span className="text-muted">by {blog.author}</span>
          </Link>
        </h5>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  updateBlog: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default Blog
