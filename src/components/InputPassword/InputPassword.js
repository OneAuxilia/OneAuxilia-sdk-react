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
          <div>{label}</div> {children}
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
            {show ? icOpen : icClose}
          </div>
        )}
      </div>
    </div>
  )
}

const icOpen = (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={styles.ox_show}
  >
    <path d="M8 9.607c.421 0 .825-.17 1.123-.47a1.617 1.617 0 0 0 0-2.273 1.578 1.578 0 0 0-2.246 0 1.617 1.617 0 0 0 0 2.272c.298.302.702.471 1.123.471Z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.07 8.38a1.073 1.073 0 0 1 0-.763 6.42 6.42 0 0 1 2.334-2.99A6.302 6.302 0 0 1 8 3.5c2.704 0 5.014 1.71 5.93 4.12.094.246.093.518 0 .763a6.418 6.418 0 0 1-2.334 2.99A6.301 6.301 0 0 1 8 12.5c-2.704 0-5.013-1.71-5.93-4.12ZM10.54 8c0 .682-.267 1.336-.743 1.818A2.526 2.526 0 0 1 8 10.571c-.674 0-1.32-.27-1.796-.753A2.587 2.587 0 0 1 5.459 8c0-.682.268-1.336.745-1.818A2.525 2.525 0 0 1 8 5.429c.674 0 1.32.27 1.797.753.476.482.744 1.136.744 1.818Z"
    ></path>
  </svg>
)
const icClose = (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={styles.ox_show}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.732 3.126a.48.48 0 0 0-.662.011.465.465 0 0 0-.012.651l9.211 9.063a.477.477 0 0 0 .527.115.479.479 0 0 0 .263-.26.46.46 0 0 0-.117-.518l-1.108-1.09A6.278 6.278 0 0 0 13.93 8.36a1.016 1.016 0 0 0 0-.74 6.27 6.27 0 0 0-2.333-2.909A6.428 6.428 0 0 0 8 3.613a6.407 6.407 0 0 0-3.014.747L3.732 3.126Zm2.84 2.794.694.682a1.61 1.61 0 0 1 1.858.28A1.54 1.54 0 0 1 9.41 8.71l.693.683a2.47 2.47 0 0 0-.304-3.174 2.573 2.573 0 0 0-3.226-.3Z"
    ></path>
    <path d="m8.476 10.445 1.602 1.576a6.437 6.437 0 0 1-2.077.342c-2.705 0-5.014-1.662-5.931-4.006a1.016 1.016 0 0 1 0-.741c.31-.79.78-1.51 1.382-2.115l2.052 2.02c-.078.4-.054.813.067 1.203.122.39.34.744.632 1.033a2.58 2.58 0 0 0 2.272.688Z"></path>
  </svg>
)
