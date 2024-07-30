/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { setToken } from "../../lib/cookie"
import { apiCore } from "../../api"
import avatar from "./avatar.png"

export default function SignIn({ children }) {
  const { setLogin, setLoading, routerPush } = useStore()
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
      setLoading(false)
      const { data } = await apiCore.signIn(bodydata)
      const { token, user } = data
      const fullName = user.first_name + " " + user.last_name
      setToken(token.session_token)
      setLogin({
        ...token,
        ...user,
        userId: user?.id,
        fullName
      })
      setLoading(true)
      routerPush("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  async function getConfig() {
    await apiCore.getConfig()
  }
  async function get() {
    try {
      const res = await apiCore.getProfile()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get()
    getConfig()
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
            <div className={styles.ox_input_fields_name}>
              <div className={styles.ox_label_input_name}>
                <div className={styles.ox_label_email}>Email</div>
                <div>Phone</div>
              </div>
              <input
                className={styles.ox_input}
                value={name}
                placeholder="Email..."
                onChange={onChangeName}
              />
            </div>
            <div className={styles.ox_input_fields_password}>
              <div className={styles.ox_label_input_name}>
                <div className={styles.ox_label_email}>Password</div>
              </div>
              <input
                className={styles.ox_input}
                value={name}
                type="password"
                placeholder="Email..."
                onChange={onChangePassword}
              />
            </div>
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
