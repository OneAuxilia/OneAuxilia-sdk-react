import React, { Fragment, useState } from "react"
import useStore from "../Context"
import { stepStatus, strategieCode } from "../../lib/const"
import { getAuthStrategies, validateEmail } from "../../lib/function"
import { Button } from "../ui"
import SocialLogin from "../SocialLogin"
import styles from "./resetpass.module.css"
import BoxLine from "../BoxLine/BoxLine"
import InputPhoneMail from "../InputPhoneMail"
import FormResetPassword from "./FormResetPassword"
import FactorOneResetPassword from "./FactorOneResetPassword"
import { apiCore } from "../../api"
//thang1681991@gmail.com

export default function ResetPassword({ onChangeStep }) {
  const { setLogin, user_general_setting, setFirstLogin } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)
  const [stepReset, setStepReset] = useState(1)
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data?.user)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

  function onChange(stepIndex, strategie) {
    if (error) return
    if (!name) {
      setError("Require email address")
      return
    }
    fetch(strategie, stepIndex)
  }

  function onChangeName(e) {
    const { value } = e.target
    let newError = ""
    if (!value) {
      newError = "Require email address"
    }
    if (value && !validateEmail(value)) {
      newError = "Email is invalid"
    }
    setError(newError)
    setName(e.target.value)
  }

  function onBack() {
    onChangeStep(1)
  }

  async function fetch(strategie, stepIndex) {
    try {
      const dataBody = {
        strategy: strategie,
        email_or_phone: name
      }
      if (strategie === strategieCode.EMAIL_LINK) {
        dataBody.redirect_url = window.location.origin + "/sign-in/factor-one"
        dataBody.url = window.location.origin + "/sign-in/factor-one"
      }
      await apiCore.prepareFirstfactor2(dataBody)
      setFirstLogin({ second_factor_type: strategie, email: name })
      setStepReset(stepIndex)
    } catch (error) {
      setError(error?.error)
      console.log({ error })
    }
  }

  return (
    <Fragment>
      {stepReset === 1 && (
        <Fragment>
          <div className={styles.ox_fogot}>Forgot Password?</div>
          <InputPhoneMail onChange={onChangeName} value={name} error={error} />
          <div className={styles.ox_mb_4}>
            <Button
              isSubmit={true}
              onClick={() => onChange(4, strategieCode.EMAIL_CODE)}
              type="primary"
            >
              Reset your password
            </Button>
          </div>
          <BoxLine text="Or sign in with another method" />
          <SocialLogin onNext={onNext} isReset={true} />

          {strategies.find((i) => i === strategieCode.EMAIL_LINK) && (
            <div className="ox_mb_2">
              <Button
                disabled={!name || error}
                onClick={() => onChange(2, strategieCode.EMAIL_LINK)}
              >
                Email link {name}
              </Button>
            </div>
          )}
          {strategies.find((i) => i === strategieCode.EMAIL_CODE) && (
            <div className={styles.ox_mb_4}>
              <Button
                disabled={!name || error}
                onClick={() => onChange(2, strategieCode.EMAIL_CODE)}
              >
                Email code to {name}
              </Button>
            </div>
          )}

          <div className="ox_mb_4"></div>
          <div className={`${styles.ox_back} ox_link`} onClick={onBack}>
            Back
          </div>
        </Fragment>
      )}
      {(stepReset === 2 || stepReset === 4) && (
        <FactorOneResetPassword
          initEmail={name}
          onChangeStep={onChangeStep}
          onBack={() => setStepReset(1)}
          // onChangeStepReset={() => setStepReset(3)}
          isResetForm={stepReset === 4}
        />
      )}
      {stepReset === 3 && <FormResetPassword onChangeStep={onChangeStep} />}
    </Fragment>
  )
}
//thang1681991@gmail.com
