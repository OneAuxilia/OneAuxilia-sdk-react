import * as React from "react"
import { useAuth } from "oneauxilia-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in")
    }
    console.log(userId, isLoaded)
  }, [isLoaded, navigate, userId])

  if (!isLoaded) return "Loading..."

  return <Outlet />
}
