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

export default function FirstSignUp({ onChangeStep }) {
  const { user_general_setting, setLoaded, setFirstLogin, routerPush } = useStore()
  const emailSetting = getEmailSettingSignUp(user_general_setting?.contact)
  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  async function onSignUp() {
    try {
      setLoaded(false)
      const { data } = await apiCore.signUp(values)
      if (data?.status === stepStatus.COMPLETED) {
        routerPush("/sign-in")
      } else {
        if (emailSetting.is_need_verify_at_sign_up) {
          onChangeStep(2)
          setFirstLogin({ user: data })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const { email, password, password_confirm, first_name, last_name } = values
  return (
    <Fragment>
      <TopFormLogin isSignIn={false} />
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
      <Button onClick={onSignUp}>Continue</Button>
    </Fragment>
  )
}
