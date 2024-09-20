import React from "react"
import styles from "./styles.module.css"
import useStore from "../../Context"
import { icLogo } from "../../../lib/icons"

export default function LayoutSignIn({ children, step, isSignIn, ...rest }) {
  const { routerPush } = useStore()
  return (
    <div className={styles.ox_component_container}>
      <div className={styles.oxBox}>
        <div className={styles.ox_form}>{children}</div>
        <div className={styles.ox_footer}>
          {step === 1 && (
            <div className={styles.footer_signin}>
              <div>Already have an account?</div>
              <div
                className="ox_link"
                onClick={() => routerPush(isSignIn ? "/sign-up" : "/sign-in")}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </div>
            </div>
          )}
          <div className={styles.footer_secured}>
            <div>Secured by</div>
            <div className={styles.ox_logo_bottom}>{icLogo}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
