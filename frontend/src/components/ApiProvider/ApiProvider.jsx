import {useMemo, useState} from "react";
import ApiContext from "../../contexts/ApiContext";
import Api from "../../utils/Api";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ApiProvider({ children }) {
  const [apiToken, setApiToken] = useState(localStorage.getItem('userToken') || null)
  const api = useMemo(function () {
    return new Api({ baseUrl: apiUrl, token: apiToken })
  }, [apiToken, apiUrl])

  const setApiTokenWithLocal = (token) => {
    localStorage.setItem('userToken', token)
    setApiToken(token)
  }

  return (
    <ApiContext.Provider value={{apiToken, setApiToken: setApiTokenWithLocal, api}}>
      {children}
    </ApiContext.Provider>
  )
}