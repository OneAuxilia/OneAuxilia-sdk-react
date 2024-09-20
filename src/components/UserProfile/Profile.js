import React, { Fragment } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"
import { dfAvatar } from "../../lib/const"
import { Button } from "../ui"

export default function Profile({ isSignIn, step }) {
  const { email, avatar } = useStore()

  const imgAvatar = avatar || dfAvatar
  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Scurity
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Profile</div>
          <span className={styles.ox_span_avatar}>
            <img className={styles.ox_avatar} src={imgAvatar} alt="avatar" />
          </span>
        </div>
        <div className={styles.ox_row_right}>
          <Button className={styles.ox_btn}>Update profile</Button>
        </div>
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Username</div>
          <div>{email}</div>
        </div>
        <div className={styles.ox_row_right}>
          <Button className={styles.ox_btn}>Update username</Button>
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
          <Button className={styles.ox_btn}>Update username</Button>
        </div>
      </div>
    </Fragment>
  )
}

const imggg = "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
