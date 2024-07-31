import React from "react"
import styles from "./styles.module.css"

const logo =
  "https://edg-dev-edg-upload.s3.ap-northeast-1.amazonaws.com/images/3c55537e-f21c-4970-ac41-6bb0ced4bf78.png"
export default function TopFormLogin() {
  return (
    <div className={styles.ox_header}>
      <div className={styles.ox_box_logo}>
        <img src={logo} alt="xxx" className={styles.ox_logo_header} />
        oneauxilia
      </div>
      <div className={styles.ox_text_header}>Sign in to Oneauxilia</div>
      <div className={styles.ox_text_header_sub}>Welcome back! Please sign in to continue</div>
    </div>
  )
}
