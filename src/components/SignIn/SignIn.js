import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import FirstSignIn from "./FirstSignIn"
import FactorOne from "./FactorOne"
import FactorTwo from "./FactorTwo"
import VerifySocial from "./VerifySocial"
import { LayoutSignIn } from "../ui"

function initStep() {
  const path = window.location.pathname
  if (path.includes("verify")) return 4
  if (path.includes("factor-two")) return 3
  if (path.includes("factor-one")) return 2
  return 1
}

export default function SignIn({ children }) {
  const { routerReplace, routerPush, isSignedIn, configLoaded } = useStore()
  const [step, setStep] = useState(initStep())

  function onChangeStep(v) {
    setStep(v)
    if (v === 1) routerReplace("/sign-in")
    if (v === 2) routerReplace("/sign-in/factor-one")
    if (v === 3) routerReplace("/sign-in/factor-two")
    if (v === 4) routerReplace("/sign-in/verify")
  }

  useEffect(() => {
    if (isSignedIn) routerPush("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div>
      {configLoaded && (
        <LayoutSignIn step={step} isSignIn={true}>
          {step === 1 && <FirstSignIn onChangeStep={onChangeStep} />}
          {step === 2 && <FactorOne onChangeStep={onChangeStep} />}
          {step === 3 && <FactorTwo onChangeStep={onChangeStep} />}
          {step === 4 && <VerifySocial onChangeStep={onChangeStep} />}
        </LayoutSignIn>
      )}
    </div>
  )
}
