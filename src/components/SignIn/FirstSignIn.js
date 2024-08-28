import React, { Fragment, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import TopFormLogin from "../TopFormLogin"
import { strategieCode, stepStatus } from "../../lib/const"
import { getAuthStrategies } from "../../lib/function"
import SocialLogin from "../SocialLogin"
import global from "../../global.module.css"
import { Button } from "../ui"

export default function FirstSignIn({ children, onChangeStep }) {
  const { setFirstLogin, setLoaded, user_general_setting, setLogin } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <TopFormLogin isSignIn={true} />
      <SocialLogin onNext={onNext} />
      {error && <div className={global.ox_error}>{error}</div>}
      <InputPhoneMail onChange={onChangeName} value={name} />
      {strategies[0] === strategieCode.PASSWORD && (
        <InputPassword onChange={onChangePassword} value={password} />
      )}

      <Button onClick={onOk} loading={loading}>
        Continue
      </Button>
    </Fragment>
  )
}
