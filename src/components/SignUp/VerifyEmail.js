import React, { Fragment, useEffect, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import BottomFormLogin from "../BottomFormLogin"
import InputOtp from "../InputOtp"
import EmailLink from "../EmailLink"
import { emailSettingKey, stepStatus, strategieCode } from "../../lib/const"
import { getEmailSettingSignUp } from "../../lib/function"

function getOtpByParams() {
  var url = new URL(window.location.href)
  return url.searchParams.get("otp_code")
}

function getStrategy(emailSetting) {
  if (!emailSetting) return "Null"
  if (emailSetting.is_verification_code) return strategieCode.EMAIL_CODE
  return strategieCode.EMAIL_LINK
}

export default function VerifyEmail({ children }) {
  const { setLogin, setLoaded, firstSignIn, user_general_setting } = useStore()
  const emailSetting = getEmailSettingSignUp(user_general_setting?.contact)

  const strategy = getStrategy(emailSetting)
  var otp_code = getOtpByParams()
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: strategy,
        email_or_phone: firstSignIn.email,
        code: otp_code ? otp_code : otp
      }
      const { data } = await apiCore.attemptSignUp(body)
      setLogin(data)
    } catch (error) {
      console.log(error)
      setError("Incorrect code")
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
  }

  async function fetch() {
    try {
      const dataBody = {
        strategy: strategy,
        email_or_phone: firstSignIn.email
      }
      if (emailSetting.is_verification_link) {
        dataBody.redirect_url = window.location.href
        dataBody.url = window.location.href
      }
      await apiCore.prepareSignUp(dataBody)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (emailSetting?.is_need_verify_at_sign_up) {
      if (otp_code) {
        onOk(otp_code)
      } else {
        fetch()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_general_setting])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            {emailSetting.is_verification_link ? (
              <EmailLink onResend={fetch} />
            ) : (
              <Fragment>
                <InputOtp
                  onChange={onChangeOtp}
                  value={otp}
                  error={error}
                  onResend={fetch}
                  step={"sign-up"}
                  firstSignIn={firstSignIn}
                />
                <button className={styles.ox_button} onClick={onOk}>
                  Continue
                </button>
              </Fragment>
            )}
          </div>
          <BottomFormLogin isSignIn={false} />
        </div>
        {children}
      </div>
    </div>
  )
}
