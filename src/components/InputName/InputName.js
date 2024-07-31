import React from "react"
import styles from "./styles.module.css"

export default function InputName({ onChange, value, label, placeholder }) {
  return (
    <div className={styles.ox_input_fields_name}>
      <div className={styles.ox_label_input_name}>
        <div>{label}</div>
      </div>
      <input
        className={styles.ox_input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
