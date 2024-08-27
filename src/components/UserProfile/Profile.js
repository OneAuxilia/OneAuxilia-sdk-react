import React, { Fragment, useState } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"
import { apiCore } from "../../api"
import { getAuthMultiFactor } from "../../lib/function"
import QRCode from "react-qr-code"

//<div className={styles.ox_}>Profile</div>
export default function Profile({ isSignIn, step }) {
  const { userId, user_general_setting, email } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)

  const [loading, setLoading] = useState()

  // console.log({ auMultiFactors })

  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Scurity
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>
          <div className={styles.ox_profile}>Profile</div>
          <span className={styles.ox_span_avatar}>
            <img className={styles.ox_avatar} src={imggg} alt="xx" />
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

const icKey = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
    />
  </svg>
)

const imggg = "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
