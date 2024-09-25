import React, { useEffect } from "react"
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import { OneAuxiliaProvider } from "oneauxilia-react"
import "oneauxilia-react/dist/index.css"
import { useAuth } from "oneauxilia-react"
import ContactPage from "../pages/ContactPage"
import PageProfile from "../pages/PageProfile"
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"
import DashboardPage from "../pages/DashboardPage"
import Layout from "../layouts/layout"

const PUBLISHABLE_KEY = "pk_dev_aW5zX2E5aGJpa3p2MHg1eQ=="
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function ProtectedRoutes() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in")
    }
  }, [isLoaded, navigate, isSignedIn])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function RootLayoutOneAuxilia() {
  const navigate = useNavigate()
  return (
    <OneAuxiliaProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Outlet />
    </OneAuxiliaProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayoutOneAuxilia />,
    children: [
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <ProtectedRoutes />,
        path: "/",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/user", element: <PageProfile /> }
        ]
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
