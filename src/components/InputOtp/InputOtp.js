import React, { Fragment, useEffect, useRef, useState } from "react"
import OTPInput from "react-otp-input"
import styles from "./styles.module.css"
import { expireTime, strategieCode } from "../../lib/const"

export default function InputOtp({
  value,
  onChange,
  error,
  onResend,
  step,
  strategie,
  firstSignIn
}) {
  const [count, setCount] = useState(expireTime)
  const __time = useRef()

  function onResendMail() {
    setCount(expireTime)
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
        {step === 2 && (
          <Fragment>
            <div>
              <div className={styles.ox_name_title}>Check your email</div>
              {strategie === strategieCode.EMAIL_CODE && (
                <div>
                  <div className={styles.ox_info_signin}>to continue to {firstSignIn?.appName}</div>
                  <div className={styles.ox_email_name}>{firstSignIn?.email}</div>
                </div>
              )}
            </div>
          </Fragment>
        )}
        {step === 3 && <div className={styles.ox_name_title}>Two-step verification</div>}
        {step === "sign-up" && (
          <div>
            <div className={styles.ox_name_title}>Verify your email</div>
            <div className={styles.ox_info_signin}>
              Enter the verification code sent to your email
            </div>
            <div className={styles.ox_email_name}>{firstSignIn?.email}</div>
          </div>
        )}
      </div>
      {step === 3 && (
        <div className={styles.ox_sub_code}>
          {strategie === strategieCode.EMAIL_CODE &&
            "Enter the verification code sent to your email"}
          To continue, please enter the verification code generated by your authenticator app
        </div>
      )}
      <OTPInput
        containerStyle={styles.ox_otp_container}
        value={value}
        onChange={onChange}
        numInputs={6}
        inputStyle={error ? styles.ox_input_error : styles.ox_input}
        renderSeparator={<div className={styles.otp_space}></div>}
        renderInput={(props) => <input {...props} />}
      />
      <div className={styles.ox_error}>{error && error}</div>

      <div className={styles.ox_box_link}>
        <button className={__class} onClick={onResendMail}>
          Didn't receive a code? Resend {count > 0 && <span>({count})</span>}
        </button>
      </div>
    </div>
  )
}
