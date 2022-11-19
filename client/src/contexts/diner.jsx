import { fetchDinerByAuth, insertDiner } from 'api/diners'
import axios from 'axios'
import React from 'react'
import { defaultFilters } from 'utils/filters'

const dinerUserContext = React.createContext()

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export function ProvideDinerUser({ children }) {
  const dinerUser = useProvideDinerUser()
  return (
    <dinerUserContext.Provider value={dinerUser}>
      {children}
    </dinerUserContext.Provider>
  )
}

export const useDinerUser = () => {
  return React.useContext(dinerUserContext)
}

function useProvideDinerUser() {
  const [user, setUser] = React.useState({ filters: defaultFilters })
  const [token, setToken] = React.useState(null)

  const updateToken = (token) => {
    if (token) {
      setToken(token)
      setAuthToken(token)
    } else {
      setToken()
    }
  }

  const signup = async (diner) => {
    const insertedDinerUser = await insertDiner(diner)
    setUser(insertedDinerUser)
  }

  const signin = async () => {
    try {
      const user = await fetchDinerByAuth()
      setUser(user)
      return { user }
    } catch (error) {
      return { error }
    }
  }

  const signout = () => {
    return setUser(false)
  }

  const setFilters = (filters) => {
    setUser((currUser) => ({ ...currUser, filters }))
  }

  return {
    user,
    token,
    updateToken,
    signup,
    signin,
    signout,
    setFilters,
  }
}
