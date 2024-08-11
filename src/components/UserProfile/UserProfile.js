import React, { useState } from "react"
import useStore from "../Context"
import Security from "./Security"
import styles from "./styles.module.css"
import Profile from "./Profile"

//<div className={styles.ox_}>Profile</div>
export default function UserProfile({ isSignIn, step }) {
  const [tab, setTab] = useState(1)
  const { routerPush } = useStore()

  const cl1 = tab === 1 ? styles.ox_btn_li_active : ""
  const cl2 = tab === 2 ? styles.ox_btn_li_active : ""
  return (
    <div className={styles.ox_user_profile}>
      <div className={styles.ox_user_profile_left}>
        <div className={styles.ox_user_profile_left_title}>Account</div>
        <div className={styles.ox_user_profile_left_sub}>Manage your account info.</div>

        <div className={styles.ox_user_profile_left_action}>
          <div>
            <button onClick={() => setTab(1)} className={`${styles.ox_btn_li} ${cl1}`}>
              {icUser} Profile
            </button>
          </div>
          <div>
            <button onClick={() => setTab(2)} className={`${styles.ox_btn_li} ${cl2}`}>
              {icSe} Security
            </button>
          </div>
        </div>
      </div>
      <div className={styles.ox_container}>{tab === 1 ? <Profile /> : <Security />}</div>
    </div>
  )
}
const icSe = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </svg>
)

const icUser = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
)
