import axios from 'axios'

export const updateDishById = async (id, updatedDish) => {
  const { data } = await axios.put(`/api/v2/dishes/${id}`, updatedDish)
  return data
}

export const addDish = async (dish) => {
  const { data } = await axios.post('/api/v2/dishes', dish)
  return data
}

export const removeDish = async (dishId) => {
  const { data } = await axios.delete(`/api/v2/dishes/${dishId}`)
  return data
}
