import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = React.createContext(null)

const fakeAuth = () => new Promise((resolve) => {
  setTimeout(() => resolve('2342f2f1d131rf12'), 250)
})

const getToken = () => {
  const tokenString = localStorage.getItem('token')
  // const userToken = JSON.parse(tokenString)
  // return userToken?.token
  return tokenString
}

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [token, setToken] = React.useState(getToken())

  const handleLogin = async () => {
    const recievedToken = await fakeAuth()

    setToken(recievedToken)
    localStorage.setItem('token', JSON.stringify(recievedToken))

    const origin = location.state?.from?.pathname || 'customers/overview'
    navigate(origin)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const value = React.useMemo(() => ({
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }), [token, handleLogin, handleLogout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)

export default AuthProvider
