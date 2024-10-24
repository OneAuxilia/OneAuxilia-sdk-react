import React from "react"
import { SignedIn, UserButton } from "@oneauxilia/oneauxilia-react"
import styles from "./styles.module.css"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div>
      <header className={styles.ox_header}>
        <div>Logo</div>
        <div className="flex">
          <SignedIn>
            <UserButton pathSetting="/user" />
          </SignedIn>
        </div>
      </header>

      <main
        style={{
          padding: "2rem"
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
