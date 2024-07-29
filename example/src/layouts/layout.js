import React, { Fragment } from 'react'
import {
  useAuth,
  SignedIn,
  SignedOut,
  UserButton
} from '@oneauxilia/oneauxilia-react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export default function Layout(params) {
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
