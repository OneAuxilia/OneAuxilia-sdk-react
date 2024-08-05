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

export default function SignIn({ children }) {
  const { setLogin, setLoaded, routerPush } = useStore()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState()
  const [name, setName] = useState("huyhq@gmail.com")
  const [password, setPassWord] = useState("abc@123Xy")
  const [type, setType] = useState("none")

  function onChangeName(e) {
    setName(e.target.value)
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
  }
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
  async function onLogin() {
    try {
      const bodydata = { username: name, password }
      setLoaded(false)
      const { data } = await apiCore.signIn(bodydata)
      const { user } = data
      if (type === "none") {
        onSignIn(data)
      } else {
        onGenCode(user.second_factor_type)
        setStep(step + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function onOk() {
    if (step === 1) {
      onLogin()
    }
    if (step === 2) {
      onVerifyCode()
    }
  }

  async function onVerifyCode(type) {
    try {
      const body = {
        auth_type: type,
        email_or_phone: name,
        code: otp
      }
      const { data } = await apiCore.verifyCode(body)
      onSignIn(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function onGenCode(type) {
    try {
      const body = {
        auth_type: type,
        email_or_phone: name
      }
      const res = await apiCore.genCode(body)
    } catch (error) {
      console.log(error)
    }
  }
  function onChangeType(e) {
    setType(e.target.value)
  }
  function onChangeStep(value) {
    setStep(value)
  }

  function onChangeOtp(value) {
    console.log({ value })
    setOtp(value)
  }

  useEffect(() => {
    if (getSignedIn()) routerPush("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            {step === 1 && (
              <Fragment>
                <TopFormLogin />
                <InputPhoneMail onChange={onChangeName} value={name} />
                <InputPassword onChange={onChangePassword} value={password} />
              </Fragment>
            )}
            {step === 2 && <InputOtp onChange={onChangeOtp} value={otp} />}
            <button className={styles.ox_button} onClick={onOk}>
              Continue
            </button>
            <select onChange={onChangeType} value={type}>
              <option value="email">email</option>
              <option value="auth_code">auth_code</option>
              <option value="sms">sms</option>
              <option value="none">none</option>
            </select>
          </div>
          <BottomFormLogin isSignIn={true} step={step} />
        </div>
        {children}
      </div>
    </div>
  )
}
