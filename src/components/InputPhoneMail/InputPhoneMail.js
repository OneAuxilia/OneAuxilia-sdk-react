import React from "react"
import styles from "./styles.module.css"
import { Input } from "../ui"
import global from "../../global.module.css"

export default function InputPhoneMail({ onChange, value, error }) {
  return (
    <div className={styles.ox_input_fields_email}>
      <div className={styles.ox_label_input_email}>
        <div className={styles.ox_label_email}>Email address</div>
        {/* <div>Phone</div> */}
      </div>
      <Input value={value} onChange={onChange} />
      {error && <div className={global.ox_error}>{error}</div>}
    </div>
  )
}
