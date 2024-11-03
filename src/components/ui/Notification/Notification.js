import React from "react"
import ReactDOM from "react-dom"
import styles from "./styles.module.css"

export const notification = {
  success: (message) =>
    ReactDOM.render(<SuccessNotification message={message} />, document.getElementById("root"))
}

function SuccessNotification() {
  return <div className={styles.ox_message}>dadsasa</div>
}
