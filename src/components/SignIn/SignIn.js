import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import styles from "./styles.module.css"
import useStore from "../Context"
import { setToken, getSignedIn } from "../../lib/cookie"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import BottomFormLogin from "../BottomFormLogin"
import TopFormLogin from "../TopFormLogin"

export default function SignIn({ children }) {
  const { setLogin, setLoaded, routerPush } = useStore()
  const [name, setName] = useState("huyhq@gmail.com")
  const [password, setPassWord] = useState("abc@123Xy")

  function onChangeName(e) {
    setName(e.target.value)
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
  }

  async function onLogin() {
    try {
      const bodydata = { username: name, password }
      setLoaded(false)
      const { data } = await apiCore.signIn(bodydata)
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
    } catch (error) {
      console.log(error)
    }
  }

  async function getConfig() {
    try {
      await apiCore.getConfig()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (getSignedIn()) routerPush("/dashboard")
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <TopFormLogin />
            <InputPhoneMail onChange={onChangeName} value={name} />
            <InputPassword onChange={onChangePassword} value={password} />
            <button className={styles.ox_button} onClick={onLogin}>
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
