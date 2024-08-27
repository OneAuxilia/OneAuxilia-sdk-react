import React from "react"
import btn from "./styles.module.css"

export default function Button({ children, ...rest }) {
  return (
    <button className={btn.ox_button} {...rest}>
      {children}
      <svg width="0.625rem" height="0.625rem">
        <path
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
        ></path>
      </svg>
    </button>
  )
}
