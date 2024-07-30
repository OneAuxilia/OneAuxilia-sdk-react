import React from "react"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import IndexPage from "./routes"
import ContactPage from "./pages/ContactPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./pages/DashboardPage"
import DashboardLayout from "./layouts/dashboard-layout"
import InvoicesPage from "./pages/InvoicesPage"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/invoices", element: <InvoicesPage /> }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
