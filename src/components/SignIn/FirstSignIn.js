import React, { Fragment, useEffect, useState } from "react"
import Cookies from "js-cookie"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import BottomFormLogin from "../BottomFormLogin"
import TopFormLogin from "../TopFormLogin"
import { signInSetting, stepStatus } from "../../lib/const"

export default function FirstSignIn({ children, onChangeStep }) {
  const { setLogin, setLoaded, isSignedIn, routerPush, user_general_setting } = useStore()
  const { authentication_strategies } = user_general_setting
  const [name, setName] = useState("thangnd1@gmail.com")
  const [password, setPassWord] = useState("abc@123X")

  function onChangeName(e) {
    setName(e.target.value)
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
  }
  function onSignIn(data) {
    const { user } = data
    setLogin({ firstSignIn: { email: user.email, phone: user.phone } })
    setLoaded(true)
  }

  async function onOk() {
    try {
      const bodydata = { username: name }
      setLoaded(false)
      if (authentication_strategies[signInSetting.PASSWORD]?.is_enable) {
        bodydata.password = password
      }
      const { data } = await apiCore.signIn(bodydata)
      onSignIn(data)
      if (data?.user?.status === stepStatus.COMPLETED) routerPush("/dashboard")
      if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSignedIn) routerPush("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <Fragment>
              <TopFormLogin />
              <InputPhoneMail onChange={onChangeName} value={name} />
              {authentication_strategies[signInSetting.PASSWORD]?.is_enable && (
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
