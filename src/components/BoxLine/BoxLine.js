import React from "react"
import styles from "./styles.module.css"

export default function BoxLine({ text }) {
  return (
    <div className={styles.ox_box_line}>
      <div className={styles.ox_line}></div>
      <div className={styles.ox_or}>{text}</div>
      <div className={styles.ox_line}></div>
    </div>
  )
}
