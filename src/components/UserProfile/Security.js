import React, { useState } from "react"
import useStore from "../Context"
import styles from "./security.module.css"
import { apiCore } from "../../api"
import { getAuthMultiFactor } from "../../lib/function"
import QRCode from "react-qr-code"

//<div className={styles.ox_}>Profile</div>
export default function Security({ isSignIn, step }) {
  const { userId, user_general_setting } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [qrCode, setQrCode] = useState()

  async function addTo2fa() {
    try {
      const bodydata = {
        strategy: auMultiFactors[0]
      }
      const { data } = await apiCore.genFactorSecretkey(userId, bodydata)
      debugger
      const { email, secret_key } = data
      const code = `otpauth://totp/Example:${email}?secret=${secret_key}&issuer=Example`
      setQrCode(code)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log({ auMultiFactors })

  return (
    <div className={styles.ox_container}>
      <div className={styles.ox_row}>Security</div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>Password</div>
        <div className={styles.ox_row_right}>
          <button>Set password</button>
        </div>
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>Two-step verificatio</div>
        <div className={styles.ox_row_right}>
          <button className={styles.ox_btn_add_2fa} onClick={addTo2fa}>
            Add two-step verification
          </button>
        </div>
      </div>
      <div className={styles.ox_row_end}>
        <div className={styles.ox_row_left}>Active devices</div>
        <div className={styles.ox_row_right}>Chrome 127.0.0.0</div>
      </div>
      <div className={styles.ox_box_qr}>
        <div>{qrCode}</div>
        {qrCode && <QRCode value={qrCode} />}
      </div>
    </div>
  )
}
