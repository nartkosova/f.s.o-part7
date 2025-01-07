import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

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
    <div style={blogStyle}>
      <div className="blog-header">
        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
        {/* <button onClick={toggle}>{visible ? 'hide' : 'view'}</button> */}
      </div>
      {visible && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user ? blog.user.name : 'Unknown user'}</p>
          <button
            onClick={() => handleDelete(blog.id, blog.title, blog.author)}
          >
            delete
          </button>
        </div>
      )}
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
