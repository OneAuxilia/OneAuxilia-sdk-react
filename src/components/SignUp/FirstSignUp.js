import React, { Fragment, useState } from "react"
import { apiCore } from "../../api"
import useStore from "../Context"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import InputName from "../InputName"
import TopFormLogin from "../TopFormLogin"
import { getEmailSettingSignUp } from "../../lib/function"
import { stepStatus } from "../../lib/const"
import { Button } from "../ui"
import SocialLogin from "../SocialLogin"
import styles from "./styles.module.css"
import ErrorBox from "../ErrorBox"

export default function FirstSignUp({ onChangeStep }) {
  const { user_general_setting, setFirstLogin, routerPush, setLogin } = useStore()
  const emailSetting = getEmailSettingSignUp(user_general_setting?.contact)
  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })
  const [errorValues, setErrorValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data.user)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
  }

  async function onSignUp() {
    try {
      let newError = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: ""
      }
      if (!values.email) newError.email = "Require email address"
      if (!values.first_name) newError.first_name = "Require first name"
      if (!values.last_name) newError.last_name = "Require last name"
      if (!values.password) newError.password = "Require password"
      if (!values.password_confirm) newError.password_confirm = "Require confirm password"
      if (values.password_confirm && values.password_confirm !== values.password)
        newError.password_confirm = "Require password match confirm password"
      setErrorValues(newError)
      if (
        newError.email ||
        newError.first_name ||
        newError.last_name ||
        newError.password ||
        newError.password_confirm
      ) {
        return
      }

      setLoading(true)
      const { data } = await apiCore.signUp(values)
      if (data?.status === stepStatus.COMPLETED) {
        routerPush("/sign-in")
      } else {
        if (emailSetting.is_need_verify_at_sign_up) {
          setFirstLogin(data)
          onChangeStep(2)
        }
      }
    } catch (error) {
      console.log(error)
      setError(error?.error)
    } finally {
      setLoading(false)
    }
  }
  const { email, password, password_confirm, first_name, last_name } = values
  return (
    <Fragment>
      <TopFormLogin isSignIn={false} />
      <SocialLogin onNext={onNext} isShowOrText={true} />
      <div className={styles.ox_fullname}>
        <InputName
          onChange={(e) => onChangeValues("first_name", e)}
          label="First name"
          error={errorValues.first_name}
          value={first_name}
        />
        <InputName
          onChange={(e) => onChangeValues("last_name", e)}
          label="Last name"
          error={errorValues.last_name}
          value={last_name}
        />
      </div>
      <InputPhoneMail
        onChange={(e) => onChangeValues("email", e)}
        value={email}
        error={errorValues.email}
      />
      <InputPassword
        onChange={(e) => onChangeValues("password", e)}
        value={password}
        error={errorValues.password}
      />
      <InputPassword
        label="Confirm password"
        onChange={(e) => onChangeValues("password_confirm", e)}
        value={password_confirm}
        error={errorValues.password_confirm}
      />
      <ErrorBox error={error} />
      <div className="ox_mb_8"></div>

      <Button onClick={onSignUp} loading={loading} type="primary">
        Continue
      </Button>
    </Fragment>
  )
}
