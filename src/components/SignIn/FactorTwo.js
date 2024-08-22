import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor, stepStatus } from "../../lib/const"
import { getAuthMultiFactor } from "../../lib/function"
import { Button } from "../ui"

export default function FactorTwo({ children }) {
  const { setLogin, setLoaded, firstSignIn, user_general_setting } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: firstSignIn.second_factor_type,
        email_or_phone: firstSignIn.email,
        code: otp
      }
      const { data } = await apiCore.attemptSecondfactor5(body)
      if (data?.user?.status === stepStatus.COMPLETED) {
        setLogin(data)
      }
    } catch (error) {
      setError("Incorrect code")
      console.log(error)
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
  }

  useEffect(() => {
    async function fetch() {
      try {
        const dataBody = {
          strategy: firstSignIn.second_factor_type,
          email_or_phone: firstSignIn.email
        }
        await apiCore.prepareSecondfactor4(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }

    if (
      firstSignIn.second_factor_type &&
      firstSignIn.second_factor_type !== authCodeMultiFactor.AUTH_CODE
    )
      fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auMultiFactors])

  return (
    <Fragment>
      <InputOtp onChange={onChangeOtp} value={otp} step={3} error={error} />
      <Button onClick={onOk}>Continue</Button>
    </Fragment>
  )
}
