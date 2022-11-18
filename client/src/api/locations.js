import axios from 'axios'

export const addLocation = async (location) => {
  const { data } = await axios.post('/api/v2/locations', location)
  return data
}

export const other = () => {}
