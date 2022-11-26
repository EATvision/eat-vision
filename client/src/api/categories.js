import axios from 'axios'

export const updateCategoryById = async (id, updatedCategory) => {
  const { data } = await axios.put(`/api/v2/categories/${id}`, updatedCategory)
  return data
}

export const addCategory = async (category) => {
  const { data } = await axios.post('/api/v2/categories', category)
  return data
}
