import React, { Fragment } from "react"
import styles from "./styles.module.css"

export default function ErrorBox({ error }) {
  return <Fragment>{error && <div className={styles.ox_error_border}>{error}</div>}</Fragment>
}
