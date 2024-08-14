import React, { Fragment, useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import { strategieCode } from "../../lib/const"
import useStore from "../Context"

export default function EmailLink({ step, strategie, onResend }) {
  const { firstSignIn } = useStore()
  const [count, setCount] = useState(8)
  const __time = useRef()

  function onResendMail() {
    setCount(8)
    onResend()
    countDown()
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
      ? `${styles.ox_btn_resend_disable} ${styles.ox_btn_resend}`
      : styles.ox_btn_resend_disable
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
      <button className={styles.ox_btn_link}>Use another method</button>
    </div>
  )
}
