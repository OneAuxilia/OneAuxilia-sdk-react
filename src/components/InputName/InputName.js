import React from "react"
import styles from "./styles.module.css"
import global from "../../global.module.css"
import { Input } from "../ui"

export default function InputName({ onChange, value, label, placeholder, error }) {
  return (
    <div className={styles.ox_input_fields_name}>
      <div className={styles.ox_label_input_name}>
        <div>{label}</div>
      </div>
      <Input value={value} placeholder={placeholder} onChange={onChange} />
      {error && <div className={global.ox_error}>{error}</div>}
    </div>
  )
}
