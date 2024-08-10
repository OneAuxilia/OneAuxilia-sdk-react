import React from "react"
import useStore from "../Context"
import Security from "./Security"
import styles from "./styles.module.css"

//<div className={styles.ox_}>Profile</div>
export default function UserProfile({ isSignIn, step }) {
  const { routerPush } = useStore()
  return (
    <div className={styles.ox_footer}>
      <Security />
    </div>
  )
}
