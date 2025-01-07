import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import 'bootstrap/dist/css/bootstrap.min.css'

const UserTable = () => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>
  }

  return (
    <div className="container mt-4 p-3 border rounded shadow-sm bg-light">
      <h2 className="mb-3">Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Number of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className="text-decoration-none">
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs ? user.blogs.length : 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
