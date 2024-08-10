import * as React from "react"
import { useAuth } from "oneauxilia-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function DashboardLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in")
    }
  }, [isLoaded, navigate, isSignedIn])

  if (!isLoaded) return "Loading..."

  return <Outlet />
}
