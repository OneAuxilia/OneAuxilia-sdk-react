import React, { Fragment, useEffect, useState } from "react"
import Cookies from "js-cookie"
import styles from "./styles.module.css"
import useStore from "../Context"
import { setToken, getSignedIn } from "../../lib/cookie"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import BottomFormLogin from "../BottomFormLogin"
import TopFormLogin from "../TopFormLogin"
import InputOtp from "../InputOtp"
import { signInSetting, stepStatus } from "../../lib/const"

const typeFactor = {
  NONE: "NONE",
  SMS: "sms",
  AUTHENTICATOR: "authenticator"
}

export default function FactorOne({ children, onChangeStep }) {
  const { setLogin, setLoaded, routerPush, firstSignIn, user_general_setting } = useStore()
  const { multi_factors } = user_general_setting
  const [otp, setOtp] = useState()

  const [config, setConfig] = useState({ type: signInSetting.PASSWORD, factor: typeFactor.NONE })
  const { type, factor } = config

  function onSignIn(data) {
    const { token, user } = data
    const fullName = user.first_name + " " + user.last_name
    setLogin({
      ...token,
      ...user,
      isSignedIn: true,
      userId: user?.id,
      fullName
    })
    setToken(token.session_token)
    Cookies.set("userId", user?.id)
    setLoaded(true)
    routerPush("/dashboard")
  }

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: "email_verification_code",
        email_or_phone: firstSignIn.email,
        code: otp
      }
      const { data } = await apiCore.attemptFirstfactor3(body)
      if (data?.user?.status === stepStatus.COMPLETED) {
        onSignIn(data)
      } else {
        onChangeStep(3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
  }

  useEffect(() => {
    async function fetch() {
      try {
        const dataBody = {
          strategy: "email_verification_code",
          email_or_phone: firstSignIn.email
        }
        const { data } = await apiCore.prepareFirstfactor2(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }
    fetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <InputOtp onChange={onChangeOtp} value={otp} />
            <button className={styles.ox_button} onClick={onOk}>
              Continue
            </button>
          </div>
          <BottomFormLogin isSignIn={true} />
        </div>
        {children}
      </div>
    </div>
  )
}
