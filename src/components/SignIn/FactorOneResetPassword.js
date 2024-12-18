import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputOtp from "../InputOtp"
import EmailLink from "../EmailLink"
import { stepStatus, strategieCode } from "../../lib/const"
import { getOtpByParams } from "../../lib/function"
import { Button } from "../ui"
import resetpass from "./resetpass.module.css"

export default function FactorOneResetPassword({ onChangeStep, isResetForm, onBack }) {
  const { firstSignIn, setLogin } = useStore()
  var [otp_code, emailCode] = getOtpByParams()
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")
  const [errorEmail, setErrorEmail] = useState()
  const [loading, setLoading] = useState(false)

  async function onOk() {
    try {
      setLoading(true)
      const body = {
        strategy: firstSignIn.second_factor_type,
        email_or_phone: emailCode || firstSignIn.email,
        code: otp_code ? otp_code : otp
      }
      const { data } = await apiCore.attemptFirstfactor3(body)
      if (isResetForm) {
        onChangeStep(6)
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
        strategy: firstSignIn.second_factor_type,
        email_or_phone: firstSignIn.email
      }
      if (firstSignIn.second_factor_type === strategieCode.EMAIL_LINK) {
        dataBody.redirect_url = window.location.origin + "/sign-in/factor-one"
        dataBody.url = window.location.origin + "/sign-in/factor-one"
      }
      await apiCore.prepareFirstfactor2(dataBody)
    } catch (error) {
      setErrorEmail(error?.error)
      console.log({ error })
    }
  }

  useEffect(() => {
    if (otp_code) {
      onOk(otp_code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSignIn])

  console.log("isResetForm", errorEmail)
  return (
    <Fragment>
      {firstSignIn.second_factor_type === strategieCode.EMAIL_LINK ? (
        <EmailLink onResend={fetch} onBack={onBack} />
      ) : (
        <Fragment>
          {errorEmail ? (
            <div className={resetpass.ox_email_not_exist}>{errorEmail}</div>
          ) : (
            <InputOtp
              onChange={onChangeOtp}
              value={otp}
              error={error}
              onResend={fetch}
              step={2}
              strategie={firstSignIn.second_factor_type}
              firstSignIn={firstSignIn}
            />
          )}
          <div className="ox_mb_8"></div>
          <Button
            type="primary"
            onClick={onOk}
            disabled={errorEmail}
            loading={loading}
            isIconNext={true}
            isSubmit={true}
          >
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
