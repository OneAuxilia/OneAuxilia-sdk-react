import React, { useEffect, useRef, useState } from "react"
import { expireTime } from "../../lib/const"
import useStore from "../Context"
import styles from "./styles.module.css"
import global from "../../global.module.css"

export default function EmailLink({ onResend, onBack }) {
  const { firstSignIn } = useStore()
  const [count, setCount] = useState(expireTime)
  const __time = useRef()

  function onResendMail() {
    if (count < 1) {
      setCount(expireTime)
      onResend()
      countDown()
    }
  }
  function countDown() {
    __time.current = setInterval(() => {
      setCount((c) => c - 1)
    }, 1000)
  }
  useEffect(() => {
    countDown()
    return () => clearInterval(__time.current)
  }, [])

  useEffect(() => {
    if (count < 1) clearInterval(__time.current)
  }, [count])

  const __class =
    count < 1
      ? `${global.ox_btn_resend_disable} ${global.ox_btn_resend}`
      : global.ox_btn_resend_disable
  return (
    <div className="">
      <div className={styles.ox_box_header}>
        <div className={styles.ox_name_title}>Check your email</div>
        <div>
          <div className={styles.ox_sub_code}>Use the verification link sent to your email</div>
          <div className={styles.ox_email_name}>{firstSignIn?.email}</div>
          <button className={`${__class}`} onClick={onResendMail}>
            Didn't receive a link? Resend {count > 0 && <span>({count})</span>}
          </button>
        </div>
      </div>
      <div className="ox_link" onClick={onBack} style={{ textAlign: "center" }}>
        Use another method
      </div>
    </div>
  )
}
