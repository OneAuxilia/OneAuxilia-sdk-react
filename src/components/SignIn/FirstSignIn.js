import React, { Fragment, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import BottomFormLogin from "../BottomFormLogin"
import TopFormLogin from "../TopFormLogin"
import { strategieCode, stepStatus } from "../../lib/const"
import { getAuthStrategies } from "../../lib/function"
import SocialLogin from "../SocialLogin"

export default function FirstSignIn({ children, onChangeStep }) {
  const { setFirstLogin, setLoaded, user_general_setting, setLogin } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)

  const [name, setName] = useState("")
  const [password, setPassWord] = useState("")
  const [error, setError] = useState("")

  function onChangeName(e) {
    setName(e.target.value)
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
  }

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

  async function onOk() {
    try {
      const bodydata = { username: name }
      setLoaded(false)
      if (strategies[0] === strategieCode.PASSWORD) {
        bodydata.password = password
      }
      const { data } = await apiCore.signIn(bodydata)
      //next step
      onNext(data)
      setLoaded(true)
    } catch (error) {
      setError(error?.error)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <Fragment>
              <TopFormLogin />
              <SocialLogin onNext={onNext} />
              {error && <div className={styles.ox_error}>{error}</div>}
              <InputPhoneMail onChange={onChangeName} value={name} />
              {strategies[0] === strategieCode.PASSWORD && (
                <InputPassword onChange={onChangePassword} value={password} />
              )}
            </Fragment>
            <button className={styles.ox_button} onClick={onOk}>
              Continue
            </button>
          </div>
          <BottomFormLogin isSignIn={true} step={1} />
        </div>
        {children}
      </div>
    </div>
  )
}
