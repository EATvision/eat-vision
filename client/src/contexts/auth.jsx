import React, { createContext, useCallback, useContext } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const { data, isValidating, mutate } = useSWR('/api/users/login')

  const login = useCallback(
    async (username, password) => {
      try {
        const { data } = await axios.post('/api/users/login', {
          username,
          password,
        })
        mutate(data)
        return data
      } catch (error) {
        console.log('Could not login')
      }
    },
    [mutate]
  )

  const logout = useCallback(async () => {
    try {
      const { data } = await axios.post('/api/users/logout')
      mutate(data)
      return data
    } catch (error) {
      console.log('Could not logout.')
    }
  }, [mutate])

  const value = {
    isAuth: data?.authenticated,
    currentUser: data?.user,
    isLoading: isValidating && !data,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
