import { fetchDinerByAuth, insertDiner } from 'api/diners'
import axios from 'axios'
import React from 'react'
<<<<<<< HEAD

const dinerUserContext = React.createContext()

=======
import { defaultFilters, doesUserHaveFilters } from 'utils/filters'

const dinerUserContext = React.createContext()

const defaultUser = {
  filters: defaultFilters,
}

>>>>>>> c51ec48 (fix signin and signup)
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
  const [user, setUser] = React.useState(null)
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
<<<<<<< HEAD
      const user = await fetchDinerByAuth()
      setUser(user)
      return { user }
=======
      const { data: fetchedUser } = await fetchDinerByAuth()
      if (!fetchedUser) {
        return { user: null, error: null }
      }

      const updatedUser = doesUserHaveFilters(user.filters)
        ? { ...fetchedUser, filters: user.filters }
        : fetchedUser

      setUser(updatedUser)
      return { user: updatedUser, error: null }
>>>>>>> c51ec48 (fix signin and signup)
    } catch (error) {
      return { error }
    }
  }

  const signout = () => {
<<<<<<< HEAD
    return setUser(false)
=======
    updateToken(null)
    setUser(defaultUser)
  }

  const setFilters = (filters) => {
    setUser((currUser) => ({ ...currUser, filters }))
  }

  const saveDiner = async () => {
    if (token) {
      await updateDiner(user)
    }
>>>>>>> c51ec48 (fix signin and signup)
  }

  return {
    user,
    token,
    updateToken,
    signup,
    signin,
    signout,
  }
}
