import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import BottomFormLogin from "../BottomFormLogin"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor, stepStatus } from "../../lib/const"
import { getAuthMultiFactor } from "../../lib/function"

export default function FactorTwo({ children, onChangeStep }) {
  const { setLogin, setLoaded, firstSignIn, user_general_setting } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [otp, setOtp] = useState()
  const [error, setError] = useState("")

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: auMultiFactors[0],
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
          strategy: auMultiFactors[0],
          email_or_phone: firstSignIn.email
        }
        await apiCore.prepareSecondfactor4(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }

    if (auMultiFactors.length > 0 && auMultiFactors[0] !== authCodeMultiFactor.AUTH_CODE) fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auMultiFactors])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <InputOtp onChange={onChangeOtp} value={otp} step={3} error={error} />
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
