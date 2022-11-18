import axios from 'axios'

export const updateKitchenById = async (id, updatedKitchen) => {
  const { data } = await axios.put(`/api/v2/kitchens/${id}`, updatedKitchen)
  return data
}

export const addKitchen = async (kitchen) => {
  const { data } = await axios.post('/api/v2/kitchens', kitchen)
  return data
}

export const other = () => {}
