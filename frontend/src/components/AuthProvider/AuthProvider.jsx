import {useEffect, useMemo, useState} from "react";
import useApi from "../../hooks/useApi";
import AuthContext from "../../contexts/AuthContext";

export default function AuthProvider({ children }) {
  const { api, apiToken, setApiToken } = useApi()

  const [user, setUser] = useState()
  const isAuthenticated = !!apiToken
  const isLoading = useMemo(() => isAuthenticated && !user, [isAuthenticated, user])

  useEffect(() => {
    if (apiToken) {
      api.getCurrentUser()
        .then((user) => {
          setUser(user)
        })
        .catch(logout)
    }
  }, [apiToken])

  function logout() {
    localStorage.setItem('userToken', '')
    setApiToken(null)
    setUser(undefined)
  }

  function login(token) {
    localStorage.setItem('userToken', token)
    setApiToken(token)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}