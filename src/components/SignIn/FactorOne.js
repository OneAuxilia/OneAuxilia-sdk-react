import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import BottomFormLogin from "../BottomFormLogin"
import InputOtp from "../InputOtp"
import { stepStatus } from "../../lib/const"
import { getAuthStrategies } from "../../lib/function"

export default function FactorOne({ children, onChangeStep }) {
  const { setLogin, routerPush, setLoaded, firstSignIn, user_general_setting } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)

  const [otp, setOtp] = useState()
  const [error, setError] = useState("")

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: strategies[0],
        email_or_phone: firstSignIn.email,
        code: otp
      }
      const { data } = await apiCore.attemptFirstfactor3(body)
      if (data?.user?.status === stepStatus.COMPLETED) {
        setLogin(data)
      } else {
        onChangeStep(3)
      }
    } catch (error) {
      console.log(error)
      setError("Incorrect code")
    }
  }

  function onChangeOtp(value) {
    setOtp(value)
  }

  useEffect(() => {
    async function fetch() {
      try {
        const dataBody = {
          strategy: strategies[0],
          email_or_phone: firstSignIn.email
        }
        await apiCore.prepareFirstfactor2(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }
    if (strategies.length > 0) fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_general_setting])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <InputOtp
              onChange={onChangeOtp}
              value={otp}
              error={error}
              onResend={onOk}
              step={2}
              strategie={strategies[0]}
              firstSignIn={firstSignIn}
            />
            <button className={styles.ox_button} onClick={onOk}>
              Continue
            </button>
          </div>
          <BottomFormLogin isSignIn={true} />
        </div>
        {children}
      </div>
    </div>
  )
}
