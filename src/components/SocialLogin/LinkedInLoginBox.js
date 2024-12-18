import React, { Fragment } from "react"
import { domainProxy, socialCode } from "../../lib/const"
import styles from "./styles.module.css"

export default function LinkedInLoginBox({ view, setting }) {
  function onClick() {
    let url = new URL(domainProxy)
    const callback_url = `${window.location.origin}/sign-in/verify`

    if (setting?.client_id) {
      const objParams = {
        access_type: "offline",
        prompt: "consent",
        client_id: setting?.client_id,
        redirect_uri: callback_url,
        scope: "openid profile email",
        response_type: "code",
        state: socialCode.LINKEDIN
      }
      let url = new URL("https://www.linkedin.com/oauth/v2/authorization")
      url.search = new URLSearchParams(objParams)
      window.location.href = url.href
    } else {
      url.search = new URLSearchParams({
        provider_name: socialCode.LINKEDIN,
        callback_url
      })
      window.location.href = url.href
    }
  }

  return (
    <button className={styles.ox_social_login} onClick={onClick}>
      {view === "icon" && icon}
      {view === "full" && <Fragment>{icon} Continue with LinkedIn</Fragment>}
      {view === "base" && <Fragment>{icon} LinkedIn</Fragment>}
    </button>
  )
}

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16" viewBox="0 0 20 20" width="16">
    <path
      d="M17.0413 17.0414H14.0778V12.4006C14.0778 11.2939 14.0581 9.86929 12.5366 9.86929C10.9931 9.86929 10.7569 11.075 10.7569 12.32V17.0411H7.79353V7.49759H10.6384V8.80179H10.6783C11.2575 7.81141 12.3385 7.21768 13.4852 7.26026C16.4887 7.26026 17.0425 9.23584 17.0425 11.806L17.0413 17.0414ZM4.44979 6.19303C3.50637 6.19303 2.7297 5.41681 2.7297 4.47339C2.7297 3.52998 3.50602 2.75366 4.44943 2.75366C5.39276 2.75366 6.16898 3.5298 6.16916 4.47304C6.16916 5.41627 5.39303 6.19294 4.44979 6.19303ZM5.93147 17.0414H2.96498V7.49759H5.93147V17.0414ZM18.5186 0.00168495H1.47578C0.675762 -0.00735025 0.00975086 0.643183 0 1.4432V18.5568C0.00939303 19.3572 0.675315 20.0085 1.47578 19.9999H18.5186C19.321 20.01 19.9893 19.3588 20 18.5568V1.44204C19.9893 0.64032 19.3201 -0.0101241 18.5186 0.000431868V0.00168495Z"
      fill="#0A66C2"
    />
  </svg>
)
