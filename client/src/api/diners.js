import axios from 'axios'

export const insertDiner = async (diner) => {
  const { data } = await axios.post('/api/v2/diners', diner)
  return data
}

export const updateDiner = (diner) => {
  axios.put('/api/v2/diners', diner)
}

export const fetchDinerByAuth = async () => {
  const { data } = await axios.get('/api/v2/diners/auth')
  return data
} 