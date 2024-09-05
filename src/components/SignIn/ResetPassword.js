import React, { Fragment, useRef, useState } from "react"
import useStore from "../Context"
import { stepStatus, strategieCode } from "../../lib/const"
import { getAuthStrategies, getOtpByParams } from "../../lib/function"
import { Button } from "../ui"
import SocialLogin from "../SocialLogin"
import styles from "./resetpass.module.css"
import BoxLine from "../BoxLine/BoxLine"
import InputPhoneMail from "../InputPhoneMail"
import FormResetPassword from "./FormResetPassword"
import FactorOneResetPassword from "./FactorOneResetPassword"

export default function ResetPassword({ onChangeStep }) {
  const { setLogin, user_general_setting, setFirstLogin } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)
  const [stepReset, setStepReset] = useState(1)
  const [name, setName] = useState()
  const __initStrategie = useRef()

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

  function onChangeStepReset(stepIndex, strategie) {
    __initStrategie.current = strategie
    setStepReset(stepIndex)
  }

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onBack() {
    onChangeStep(1)
  }

  return (
    <Fragment>
      {stepReset === 1 && (
        <Fragment>
          <div className={styles.ox_fogot}>Forgot Password?</div>
          <InputPhoneMail onChange={onChangeName} value={name} />
          <div className={styles.ox_mb_4}>
            <Button disabled={!name} onClick={() => onChangeStepReset(2, false)} type="primary">
              Reset your password
            </Button>
          </div>
          <BoxLine text="Or, sign in with another method" />
          <SocialLogin onNext={onNext} isReset={true} />

          {strategies.find((i) => i === strategieCode.EMAIL_LINK) && (
            <div className="ox_mb_2">
              <Button
                disabled={!name}
                onClick={() => onChangeStepReset(2, strategieCode.EMAIL_LINK)}
              >
                Email link {name}
              </Button>
            </div>
          )}
          {strategies.find((i) => i === strategieCode.EMAIL_CODE) && (
            <div className={styles.ox_mb_4}>
              <Button
                disabled={!name}
                onClick={() => onChangeStepReset(2, strategieCode.EMAIL_CODE)}
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
      {stepReset === 2 && (
        <FactorOneResetPassword
          initEmail={name}
          initStrategie={__initStrategie.current}
          onChangeStep={onChangeStep}
          onChangeStepReset={() => onChangeStepReset(3)}
          isResetForm={!__initStrategie.current}
        />
      )}
      {stepReset === 3 && <FormResetPassword onChangeStep={onChangeStep} />}
    </Fragment>
  )
}
//thang1681991@gmail.com
