import React from "react"
import OTPInput from "react-otp-input"
import styles from "./styles.module.css"

export default function InputOtp({ value, onChange }) {
  return (
    <div className="flex justify-center">
      <div className={styles.ox_name_code}>Verify your phone</div>
      <div className={styles.ox_sub_code}>Enter the verification code sent to your phone</div>
      <OTPInput
        containerStyle={{ width: "100%", justifyContent: "center", padding: "1rem 0px" }}
        value={value}
        onChange={onChange}
        numInputs={6}
        inputStyle={styles.ox_input}
        renderSeparator={<div className={styles.otp_space}></div>}
        renderInput={(props) => <input style={{ width: "2rem" }} {...props} />}
      />
      <div className={styles.ox_link}>Didn't receive a code? Resend</div>
    </div>
  )
}
