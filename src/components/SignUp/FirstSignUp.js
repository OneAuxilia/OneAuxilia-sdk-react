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
import styles from "./styles.module.css"
import SocialLogin from "../SocialLogin"

export default function FirstSignUp({ onChangeStep }) {
  const { user_general_setting, setLoaded, setFirstLogin, routerPush, setLogin } = useStore()
  const emailSetting = getEmailSettingSignUp(user_general_setting?.contact)
  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })
  const [loading, setLoading] = useState(false)

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
  }

  async function onSignUp() {
    try {
      setLoaded(false)
      setLoading(true)
      const { data } = await apiCore.signUp(values)
      if (data?.status === stepStatus.COMPLETED) {
        routerPush("/sign-in")
      } else {
        if (emailSetting.is_need_verify_at_sign_up) {
          setFirstLogin({ user: data })
          onChangeStep(2)
        }
      }
    } catch (error) {
      console.log(error)
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
          value={first_name}
        />
        <InputName
          onChange={(e) => onChangeValues("last_name", e)}
          label="Last name"
          value={last_name}
        />
      </div>
      <InputPhoneMail onChange={(e) => onChangeValues("email", e)} value={email} />
      <InputPassword onChange={(e) => onChangeValues("password", e)} value={password} />
      <InputPassword
        label="Confirm password"
        onChange={(e) => onChangeValues("password_confirm", e)}
        value={password_confirm}
      />
      <div className="ox_mb_8"></div>
      <Button onClick={onSignUp} loading={loading} type="primary">
        Continue
      </Button>
    </Fragment>
  )
}
