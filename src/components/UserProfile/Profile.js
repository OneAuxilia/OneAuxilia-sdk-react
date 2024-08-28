import React, { Fragment } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"

export default function Profile({ isSignIn, step }) {
  const { email } = useStore()

  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Scurity
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Profile</div>
          <span className={styles.ox_span_avatar}>
            <img className={styles.ox_avatar} src={imggg} alt="avatar" />
          </span>
        </div>
        <div className={styles.ox_row_right}>
          <button className={styles.ox_btn}>Update profile</button>
        </div>
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Username</div>
          <div>{email}</div>
        </div>
        <div className={styles.ox_row_right}>
          <button className={styles.ox_btn}>Update username</button>
        </div>
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Email addresses</div>
          <div>
            {email} <span>Primary</span>
          </div>
        </div>
        <div className={styles.ox_row_right}>
          <button className={styles.ox_btn}>Update username</button>
        </div>
      </div>
    </Fragment>
  )
}

const imggg = "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
