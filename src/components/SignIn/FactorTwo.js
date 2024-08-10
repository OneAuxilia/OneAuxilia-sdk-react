import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"
import { setToken } from "../../lib/cookie"
import { apiCore } from "../../api"
import BottomFormLogin from "../BottomFormLogin"
import InputOtp from "../InputOtp"
import { stepStatus } from "../../lib/const"
import { getAuthStrategies } from "../../lib/function"

export default function FactorTwo({ children, onChangeStep }) {
  const { setLogin, setLoaded, routerPush, firstSignIn, user_general_setting } = useStore()
  const strategies = getAuthStrategies(user_general_setting.authentication_strategies)
  const [otp, setOtp] = useState()

  function onSignIn(data) {
    const { token, user } = data
    const fullName = user.first_name + " " + user.last_name
    setLogin({
      ...token,
      ...user,
      isSignedIn: true,
      userId: user?.id,
      fullName
    })
    setToken(token.session_token)
  }

  async function onOk() {
    try {
      setLoaded(false)
      const body = {
        strategy: "email",
        email_or_phone: firstSignIn.email,
        code: otp
      }
      const { data } = await apiCore.attemptSecondfactor5(body)
      if (data?.user?.status === stepStatus.COMPLETED) {
        onSignIn(data)
      }
    } catch (error) {
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
          strategy: "email",
          email_or_phone: firstSignIn.email
        }
        await apiCore.prepareSecondfactor4(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <InputOtp onChange={onChangeOtp} value={otp} />
            <button className={styles.ox_button} onClick={onOk} step={3}>
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
