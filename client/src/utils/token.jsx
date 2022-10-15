import axios from 'axios'

export const getToken = () => localStorage.getItem('token')
export const clearToken = () => localStorage.clearItem('token')
export const setToken = (token) => localStorage.setItem('token', token)

export const getTokenExp = () => localStorage.getItem('tokenExp')
export const clearTokenExp = () => localStorage.clearItem('tokenExp')
export const setTokenExp = (tokenExp) => localStorage.setItem('tokenExp', tokenExp)

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else { delete axios.defaults.headers.common.Authorization }
}

export const updateToken = (token, tokenExp) => {
  if (token) {
    setToken(token)
    setTokenExp(tokenExp)
    setAuthToken(token)
  } else {
    clearToken()
    clearTokenExp()
  }
}

export default {
  getToken,
  clearToken,
  setToken,
  updateToken,
}
