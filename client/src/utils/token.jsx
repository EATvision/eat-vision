import axios from 'axios'

export const getToken = () => localStorage.getItem('token')
export const clearToken = () => localStorage.removeItem('token')
export const setToken = (token) => localStorage.setItem('token', token)

export const getTokenExp = () => localStorage.getItem('tokenExp')
export const clearTokenExp = () => localStorage.removeItem('tokenExp')
export const setTokenExp = (tokenExp) =>
  localStorage.setItem('tokenExp', tokenExp)

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export const clearTokenData = () => {
  clearToken()
  clearTokenExp()
}

export const updateToken = (token, tokenExp) => {
  if (token) {
    setToken(token)
    setTokenExp(tokenExp)
    setAuthToken(token)
  } else {
    clearTokenData()
  }
}

export default {
  getToken,
  clearTokenData,
  updateToken,
}
