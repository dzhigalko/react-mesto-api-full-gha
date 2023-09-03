import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Index from "./Index/Index";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PageLayout from "./PageLayout/PageLayout";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import fail from "../images/fail.svg";
import useAuth from "../hooks/useAuth";

export default function App() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const [infoTooltipState, setInfoTooltipState] = useState({
    isOpen: false,
    icon: fail,
    text: "Что-то пошло не так! Попробуйте ещё раз."
  })

  function handleSignIn({ token }) {
    login(token)
  }

  function handleInfoTooltipOpen(icon, text) {
    setInfoTooltipState({
      isOpen: true,
      icon: icon,
      text: text
    })
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout/>}>
            <Route path="/sign-in" element={<Login onSignIn={handleSignIn} onError={handleInfoTooltipOpen}/>}/>
            <Route path="/sign-up" element={<Register onError={handleInfoTooltipOpen} onSuccess={handleInfoTooltipOpen}/>}/>
            <Route index path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} redirectPath={"/sign-in"}>
                <Index/>
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Route>
        </Routes>

        <InfoTooltip isOpen={infoTooltipState.isOpen} icon={infoTooltipState.icon}
                     text={infoTooltipState.text}
                     onClose={() => setInfoTooltipState({...infoTooltipState, isOpen: false})}/>
      </BrowserRouter>
  )
}