import React, { Fragment } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"
import { Button } from "../ui"
import BoxUpdateUserProfile from "./BoxUpdateUserProfile"

export default function Profile() {
  const { email } = useStore()

  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Profile details
      </div>
      <BoxUpdateUserProfile />

      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Username</div>
        </div>
        <div className={styles.ox_row_right}>
          <div>{email}</div>
        </div>
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Email address</div>
        </div>
        <div className={styles.ox_row_right}>{email}</div>
      </div>
    </Fragment>
  )
}
