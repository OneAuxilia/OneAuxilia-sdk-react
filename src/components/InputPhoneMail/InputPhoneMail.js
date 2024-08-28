import React from "react"
import styles from "./styles.module.css"
import { Input } from "../ui"

export default function InputPhoneMail({ onChange, value }) {
  return (
    <div className={styles.ox_input_fields_email}>
      <div className={styles.ox_label_input_email}>
        <div className={styles.ox_label_email}>Email address</div>
        {/* <div>Phone</div> */}
      </div>
      <Input value={value} onChange={onChange} />
    </div>
  )
}
