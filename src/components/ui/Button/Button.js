import React from "react"
import btn from "./styles.module.css"

export default function Button({ children, ...rest }) {
  return (
    <button className={btn.ox_button} {...rest}>
      {children}
    </button>
  )
}
