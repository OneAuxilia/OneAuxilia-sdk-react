import React, { Fragment } from "react"
import { useAuth, SignedIn, UserButton } from "oneauxilia-react"
import styles from "./styles.module.css"

export default function Layout() {
  const { userId, isLoaded } = useAuth()
  return (
    <Fragment>
      {userId && isLoaded && (
        <header className={styles.ox_header}>
          <div>Logo</div>
          <div className="flex">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
      )}
    </Fragment>
  )
}
