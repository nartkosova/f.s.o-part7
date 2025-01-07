import axios from 'axios'
const baseUrl = '/api/blogs'
const userBaseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

const getUsers = async () => {
  const response = await axios.get(userBaseUrl)
  return response.data
}
const getBlogsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${userBaseUrl}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs for user:', error)
    throw error
  }
}
const getBlogsById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs for user:', error)
    throw error
  }
}

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
  getUsers,
  getBlogsByUserId,
  getBlogsById
}
