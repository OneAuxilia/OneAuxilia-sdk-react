import React from "react"
import styles from "./styles.module.css"

export default function InputPhoneMail({ onChange, value }) {
  return (
    <div className={styles.ox_input_fields_email}>
      <div className={styles.ox_label_input_email}>
        <div className={styles.ox_label_email}>Email</div>
        <div>Phone</div>
      </div>
      <input className={styles.ox_input} value={value} placeholder="Email..." onChange={onChange} />
    </div>
  )
}
