import React, { useState } from "react"
import styles from "./styles.module.css"
import { apiCore } from "../../api"
import useStore from "../Context"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import InputName from "../InputName"
import BottomFormLogin from "../BottomFormLogin"
import TopFormLogin from "../TopFormLogin"

export default function SignUp({ children }) {
  const { setLogin, setLoaded, routerPush } = useStore()
  const [values, setValues] = useState({
    email: "thangnd@gmail.com",
    first_name: "Thang",
    last_name: "ND",
    password: "abc@123Xy",
    password_confirm: "abc@123Xy"
  })

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  async function onSignUp() {
    try {
      setLoaded(false)
      const { message } = await apiCore.signUp(values)
      // const { token, user } = data?.data
      // setLogin({
      //   ...token,
      //   ...user,
      //   userId: user?.id
      // })
      if (message) {
        setLoaded(true)
        routerPush("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const { email, password, password_confirm, first_name, last_name } = values
  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <TopFormLogin />

            <InputPhoneMail onChange={(e) => onChangeValues("email", e)} value={email} />
            <InputPassword onChange={(e) => onChangeValues("password", e)} value={password} />
            <InputPassword
              label="Confirm password"
              onChange={(e) => onChangeValues("password_confirm", e)}
              value={password_confirm}
            />
            <InputName
              onChange={(e) => onChangeValues("first_name", e)}
              label="First name"
              placeholder="First name..."
              value={first_name}
            />
            <InputName
              onChange={(e) => onChangeValues("last_name", e)}
              label="Last name"
              placeholder="Last name..."
              value={last_name}
            />

            <button className={styles.ox_button} onClick={onSignUp}>
              Continue
            </button>
          </div>
          <BottomFormLogin />
        </div>
        {children}
      </div>
    </div>
  )
}
