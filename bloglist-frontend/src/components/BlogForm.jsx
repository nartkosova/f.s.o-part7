import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    console.log({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            data-testid="title"
            value={newTitle}
            onChange={handleTitleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input
            data-testid="author"
            value={newAuthor}
            onChange={handleAuthorChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL:</label>
          <input
            data-testid="url"
            value={newUrl}
            onChange={handleUrlChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
        Save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
