import { fetchDinerByAuth, insertDiner, updateDiner } from 'api/diners'
import axios from 'axios'
import React from 'react'
import { defaultFilters } from 'utils/filters'

const dinerUserContext = React.createContext()

const defaultUser = {
  defaultFilters,
}

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

  const signup = async () => {
    const insertedDinerUser = await insertDiner(user)
    setUser(insertedDinerUser)
  }

  const signin = async () => {
    try {
      const { data: user } = await fetchDinerByAuth()
      if (!user) {
        return { user: null, error: null }
      }
      return setUser(user)
    } catch (error) {
      return { error }
    }
  }

  const signout = () => {
    updateToken(null)
    return setUser(defaultUser)
  }

  const setFilters = (filters) => {
    setUser((currUser) => ({ ...currUser, filters }))
  }

  const saveDiner = async () => {
    if (token) {
      await updateDiner(user)
    }
  }

  return {
    user,
    token,
    updateToken,
    signup,
    signin,
    signout,
    setFilters,
    saveDiner,
  }
}
