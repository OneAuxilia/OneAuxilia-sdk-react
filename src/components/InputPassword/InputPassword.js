import React, { useState } from "react"
import styles from "./styles.module.css"
import global from "../../global.module.css"
import { Input } from "../ui"

export default function InputPassword({
  onChange,
  value,
  label = "Password",
  isReset,
  onChangeStep,
  error,
  children
}) {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.ox_input_fields_password}>
      <div className={styles.ox_label_input_password}>
        <div className={styles.ox_flex_name}>
          {label} {children}
        </div>
        <div onClick={() => onChangeStep(5)}>
          {isReset && <div className="ox_link">Forgot password?</div>}
        </div>
      </div>
      <div className={styles.ox_wapper_input}>
        <Input value={value} type={show ? "text" : "password"} onChange={onChange} />
        {error && <div className={global.ox_error}>{error}</div>}
        {value && (
          <div onClick={() => setShow((c) => !c)} className={styles.ox_btn_show}>
            <svg
              fill="rgba(0, 0, 0, 0.41)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="1.25rem"
              height="1.25rem"
              className={styles.ox_show}
            >
              <path d="M8 9.607c.421 0 .825-.17 1.123-.47a1.617 1.617 0 0 0 0-2.273 1.578 1.578 0 0 0-2.246 0 1.617 1.617 0 0 0 0 2.272c.298.302.702.471 1.123.471Z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.07 8.38a1.073 1.073 0 0 1 0-.763 6.42 6.42 0 0 1 2.334-2.99A6.302 6.302 0 0 1 8 3.5c2.704 0 5.014 1.71 5.93 4.12.094.246.093.518 0 .763a6.418 6.418 0 0 1-2.334 2.99A6.301 6.301 0 0 1 8 12.5c-2.704 0-5.013-1.71-5.93-4.12ZM10.54 8c0 .682-.267 1.336-.743 1.818A2.526 2.526 0 0 1 8 10.571c-.674 0-1.32-.27-1.796-.753A2.587 2.587 0 0 1 5.459 8c0-.682.268-1.336.745-1.818A2.525 2.525 0 0 1 8 5.429c.674 0 1.32.27 1.797.753.476.482.744 1.136.744 1.818Z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
