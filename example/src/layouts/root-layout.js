import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { OneAuxiliaProvider } from "oneauxilia-react"
import "oneauxilia-react/dist/index.css"
import Layout from "./layout"

const PUBLISHABLE_KEY =
  window.location.origin === "http://localhost:3000" ? "ins_ea9wlcu6ajvf" : "ins_pXqIOEBZi5Rc"

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

export default function RootLayout() {
  const navigate = useNavigate()
  return (
    <OneAuxiliaProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Layout />
      <main
        style={{
          padding: "2rem"
        }}
      >
        <Outlet />
      </main>
    </OneAuxiliaProvider>
  )
}
