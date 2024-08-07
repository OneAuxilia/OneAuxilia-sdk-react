import React, { useEffect, useState } from "react"
import { getSignedIn } from "../../lib/cookie"
import useStore from "../Context"
import FirstSignIn from "./FirstSignIn"
import FactorOne from "./FactorOne"
import FactorTwo from "./FactorTwo"

export default function SignIn({ children }) {
  const { routerReplace, routerPush } = useStore()
  const [step, setStep] = useState(1)

  function onChangeStep(v) {
    setStep(v)
    if (v === 1) routerReplace("/sign-in")
    if (v === 2) routerReplace("/sign-in/factor-one")
    if (v === 3) routerReplace("/sign-in/factor-two")
  }

  useEffect(() => {
    const path = window.location.pathname
    function initStep() {
      if (path.includes("factor-two")) return 3
      if (path.includes("factor-one")) return 2
      return 1
    }
    setStep(initStep())
    if (getSignedIn()) routerPush("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {step}
      {step === 1 && <FirstSignIn onChangeStep={onChangeStep} />}
      {step === 2 && <FactorOne onChangeStep={onChangeStep} />}
      {step === 3 && <FactorTwo onChangeStep={onChangeStep} />}
    </div>
  )
}
