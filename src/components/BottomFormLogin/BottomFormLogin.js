import React from "react"
import useStore from "../Context"
import styles from "./styles.module.css"

export default function BottomFormLogin({ isSignIn, step }) {
  const { routerPush } = useStore()
  return (
    <div className={styles.ox_footer}>
      {step === 1 && (
        <div className={styles.footer_signin}>
          <div>Already have an account?</div>
          <div
            className={styles.link}
            onClick={() => routerPush(isSignIn ? "/sign-up" : "/sign-in")}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </div>
        </div>
      )}
      <div className={styles.footer_secured}>
        <div>Secured by</div>
        <div className={styles.ox_logo_bottom}>
          <img
            className={styles.logoIcon}
            alt="logo"
            src="https://edg-dev-edg-upload.s3.ap-northeast-1.amazonaws.com/images/3c55537e-f21c-4970-ac41-6bb0ced4bf78.png"
          />
          onexilia
        </div>
      </div>
    </div>
  )
}
