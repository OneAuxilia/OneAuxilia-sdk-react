import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor, stepStatus } from "../../lib/const"
import { getAuthMultiFactor } from "../../lib/function"
import { Button } from "../ui"
import SocialLogin from "../SocialLogin"

export default function ResetPassword({ onChangeStep }) {
  const { setLogin, setLoaded, firstSignIn, user_general_setting, setFirstLogin } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onOk() {
    try {
      setLoaded(false)
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
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
      <div>Forgot Password?</div>
      <Button onClick={onOk} loading={loading}>
        Reset your password
      </Button>
      <SocialLogin onNext={onNext} isReset={true} />
      <InputOtp onChange={onChangeOtp} value={otp} step={3} error={error} />
      <Button onClick={onOk} loading={loading}>
        Continue
      </Button>
      <button>Back</button>
    </Fragment>
  )
}
