import React from "react"
import global from "../../global.module.css"

export default function Button({ children, ...rest }) {
  return (
    <button className={global.ox_button} {...rest}>
      {children}
    </button>
  )
}
