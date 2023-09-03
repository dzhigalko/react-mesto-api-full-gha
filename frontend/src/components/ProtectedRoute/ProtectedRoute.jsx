import {Navigate} from "react-router-dom";

export default function ProtectedRoute({redirectPath, isAuthenticated, isLoading, children}) {
  if (isLoading) {
    return (<></>)
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace/>
  }

  return children
}