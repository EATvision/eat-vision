import axios from 'axios'

export const updateMenuById = async (id, updatedMenu) => {
  const { data } = await axios.put(`/api/v2/menus/${id}`, updatedMenu)
  return data
}

export const addMenu = async (menu) => {
  const { data } = await axios.post('/api/v2/menus', menu)
  return data
}

export const removeMenu = async (menuId) => {
  const { data } = await axios.delete(`/api/v2/menus/${menuId}`)
  return data
}
