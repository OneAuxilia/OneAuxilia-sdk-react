import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputOtp from "../InputOtp"
import EmailLink from "../EmailLink"
import { stepStatus, strategieCode } from "../../lib/const"
import { getOtpByParams } from "../../lib/function"
import { Button } from "../ui"

export default function FactorOneResetPassword({
  onChangeStep,
  initStrategie,
  isResetForm,
  onChangeStepReset
}) {
  const { firstSignIn, user_general_setting, setLogin } = useStore()
  var [otp_code, email] = getOtpByParams()
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const strategie = initStrategie ? initStrategie : strategieCode.EMAIL_CODE

  async function onOk() {
    try {
      setLoading(true)
      const body = {
        strategy: strategie,
        email_or_phone: email || firstSignIn.email,
        code: otp_code ? otp_code : otp
      }
      const { data } = await apiCore.attemptFirstfactor3(body)
      if (isResetForm) {
        onChangeStepReset()
      } else {
        if (data?.user?.status === stepStatus.COMPLETED) {
          setLogin(data)
        } else {
          onChangeStep(3)
        }
      }
    } catch (error) {
      console.log(error)
      setError("Incorrect code")
    } finally {
      setLoading(false)
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
  }

  async function fetch() {
    try {
      const dataBody = {
        strategy: strategie,
        email_or_phone: firstSignIn.email
      }
      if (strategie === strategieCode.EMAIL_LINK) {
        dataBody.redirect_url = window.location.origin + "/sign-in/factor-one"
        dataBody.url = window.location.origin + "/sign-in/factor-one"
      }
      await apiCore.prepareFirstfactor2(dataBody)
    } catch (error) {
      console.log({ error })
    }
  }

  function onBack() {
    onChangeStep(1)
  }
  useEffect(() => {
    if (otp_code) {
      onOk(otp_code)
    } else {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_general_setting])

  console.log("isResetForm", isResetForm)
  return (
    <Fragment>
      {strategie === strategieCode.EMAIL_LINK ? (
        <EmailLink onResend={fetch} />
      ) : (
        <Fragment>
          <InputOtp
            onChange={onChangeOtp}
            value={otp}
            error={error}
            onResend={fetch}
            step={2}
            strategie={strategie}
            firstSignIn={firstSignIn}
          />
          <div className="ox_mb_8"></div>
          <Button type="primary" onClick={onOk} loading={loading} isIconNext={true}>
            Continue
          </Button>
          <div className="ox_mb_4"></div>
          <div className="ox_link" onClick={onBack}>
            Back
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
