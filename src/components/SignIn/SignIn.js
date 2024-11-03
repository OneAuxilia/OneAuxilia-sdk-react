import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import FirstSignIn from "./FirstSignIn"
import FactorOne from "./FactorOne"
import FactorTwo from "./FactorTwo"
import VerifySocial from "./VerifySocial"
import ResetPassword from "./ResetPassword"
import { LayoutSignIn } from "../ui"
import FormResetPassword from "./FormResetPassword"

function initStep() {
  const path = window.location.pathname
  if (path.includes("reset-password-confirm")) return 6
  if (path.includes("reset-password")) return 5
  if (path.includes("verify")) return 4
  if (path.includes("factor-two")) return 3
  if (path.includes("factor-one")) return 2
  return 1
}

export default function SignIn({ children, afterSignInUrl = "/dashboard" }) {
  const { routerReplace, routerPush, isSignedIn, configLoaded } = useStore()
  const [step, setStep] = useState(initStep())

  function onChangeStep(v) {
    setStep(v)
    if (v === 1) routerReplace("/sign-in")
    if (v === 2) routerReplace("/sign-in/factor-one")
    if (v === 3) routerReplace("/sign-in/factor-two")
    if (v === 4) routerReplace("/sign-in/verify")
    if (v === 5) routerReplace("/sign-in/reset-password")
    if (v === 6) routerReplace("/sign-in/reset-password-confirm")
  }

  useEffect(() => {
    if (isSignedIn) routerPush(afterSignInUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div>
      {configLoaded && (
        <Fragment>
          {step === 4 && <VerifySocial onChangeStep={onChangeStep} onBack={() => setStep(1)} />}
          {step !== 4 && (
            <LayoutSignIn step={step} isSignIn={true}>
              {step === 1 && <FirstSignIn onChangeStep={onChangeStep} />}
              {step === 2 && <FactorOne onChangeStep={onChangeStep} />}
              {step === 3 && <FactorTwo onChangeStep={onChangeStep} />}
              {step === 5 && <ResetPassword onChangeStep={onChangeStep} />}
              {step === 6 && <FormResetPassword onChangeStep={onChangeStep} />}
            </LayoutSignIn>
          )}
        </Fragment>
      )}
    </div>
  )
}
