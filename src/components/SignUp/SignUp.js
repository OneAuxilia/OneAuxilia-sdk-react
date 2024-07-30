import React, { useState } from "react"
import styles from "./styles.module.css"
import { apiCore } from "../../api"
import useStore from "../Context"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import InputName from "../InputName"


export default function SignUp({ children }) {
  const { setLogin, setLoaded, routerPush } = useStore()
  const [values, setValues] = useState({
    email: "thangnd@gmail.com",
    first_name: 'Thang',
    last_name: 'ND',
    password: 'abc@123Xy',
    password_confirm: 'abc@123Xy'
  })
  // const [password, setPassWord] = useState("abc@123Xy")

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
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
            <div className={styles.ox_header}>
              <div className={styles.ox_text_header}>Create your account</div>
              <div className={styles.ox_text_header_sub}>
                Welcome! Please fill in the details to get started.
              </div>
            </div>

            <InputPhoneMail
              onChange={(e) => onChangeValues('email', e)}
              value={email}
            />
            <InputPassword
              onChange={(e) => onChangeValues('password' ,e)}
              value={password}
            />
            <InputPassword
              label="Confirm password"
              onChange={(e) => onChangeValues('password_confirm', e)}
              value={password_confirm}
            />
            <InputName
              onChange={(e) => onChangeValues('first_name', e)}
              label="First name"
              placeholder="First name..."
              value={first_name}
            />
            <InputName
              onChange={(e) => onChangeValues('last_name' ,e )}
              label="Last name"
              placeholder="Last name..."
              value={last_name}
            />

            <button className={styles.ox_button} onClick={onSignUp}>
              Continue
            </button>
          </div>
          <div className={styles.ox_footer}>
            <div className={styles.footer_signin}>
              <div>Already have an account?</div>
              <div className={styles.link} onClick={() => routerPush("/sign-in")}>
                Sign in
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
