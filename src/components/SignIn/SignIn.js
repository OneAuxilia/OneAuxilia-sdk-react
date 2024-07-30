import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import styles from "./styles.module.css"
import useStore from "../Context"
import { setToken, getSignedIn } from "../../lib/cookie"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"

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
      Cookies.set('userId', user?.id)
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
      console.log(error);
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
            <div className={styles.ox_header}>
              <div className={styles.ox_text_header}>Sign in to App</div>
              <div className={styles.ox_text_header_sub}>
                Welcome back! Please sign in to continue
              </div>
            </div>
            <InputPhoneMail onChange={onChangeName} value={name} />
            <InputPassword onChange={onChangePassword} value={password} />
            <button className={styles.ox_button} onClick={onLogin}>
              Continue
            </button>
          </div>
          <div className={styles.ox_footer}>
            <div className={styles.footer_signin}>
              <div>Already have an account?</div>
              <div className={styles.link} onClick={() => routerPush("/sign-up")}>
                Sign up
              </div>
            </div>
            <div className={styles.footer_secured}>
              <div>Secured by</div>
              <div>
                <img
                  className={styles.logoIcon}
                  alt="logo"
                  src="https://edg-dev-edg-upload.s3.ap-northeast-1.amazonaws.com/images/3c55537e-f21c-4970-ac41-6bb0ced4bf78.png"
                />
                nxilia
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
