import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import TopFormLogin from "../TopFormLogin"
import { strategieCode, stepStatus } from "../../lib/const"
import { getAuthStrategies, validateEmail } from "../../lib/function"
import SocialLogin from "../SocialLogin"
import { Button } from "../ui"
import ErrorBox from "../ErrorBox"

function getParams() {
  var url = new URL(window.location.href)
  return url.searchParams.get("provider_name")
}

export default function FirstSignIn({ children, onChangeStep }) {
  const { setFirstLogin, setLoaded, user_general_setting, setLogin } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)
  const isPassword = strategies[0] === strategieCode.PASSWORD
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassWord] = useState("")
  const [error, setError] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  function onChangeName(e) {
    const { value } = e.target
    if (!value || validateEmail(value)) {
      setErrorEmail("")
    } else {
      setErrorEmail("Invalid email")
    }
    setName(e.target.value)
  }

  function onChangePassword(e) {
    setPassWord(e.target.value)
  }

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data?.user)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

  async function onOk() {
    try {
      let newErrorEmail = "",
        newErrorPass = ""
      if (!name) newErrorEmail = "Please input your email address"
      if (isPassword && !password) newErrorPass = "Please input your password"
      setErrorEmail(newErrorEmail)
      if (isPassword) setErrorPassword(newErrorPass)
      if (newErrorEmail || newErrorPass) return
      setLoading(true)
      const bodydata = { username: name }
      setLoaded(false)
      if (strategies[0] === strategieCode.PASSWORD) {
        bodydata.password = password
      }
      const { data } = await apiCore.signIn(bodydata)
      onNext(data)
    } catch (error) {
      setError(error?.error)
    } finally {
      setLoaded(true)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (error) setError("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, name])

  useEffect(() => {
    const provider_name = getParams()
    if (provider_name) setError(`You did not grant access to your ${provider_name} account`)
  }, [])

  return (
    <Fragment>
      <TopFormLogin isSignIn={true} />
      <SocialLogin onNext={onNext} isShowOrText={true} />
      <ErrorBox error={error} />
      <InputPhoneMail onChange={onChangeName} value={name} error={errorEmail} />
      {strategies[0] === strategieCode.PASSWORD && (
        <InputPassword
          onChangeStep={onChangeStep}
          isReset={true}
          onChange={onChangePassword}
          error={errorPassword}
          value={password}
        />
      )}
      <div className="ox_mb_8"></div>
      <Button onClick={onOk} type="primary" isSubmit={true} loading={loading} isIconNext={true}>
        Continue
      </Button>
    </Fragment>
  )
}
