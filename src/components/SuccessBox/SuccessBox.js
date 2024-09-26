import React, { Fragment } from "react"
import styles from "./styles.module.css"

export default function SuccessBox({ message }) {
  return <Fragment>{message && <div className={styles.ox_success_border}>{message}</div>}</Fragment>
}
