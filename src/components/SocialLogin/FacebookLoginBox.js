import React, { Fragment } from "react"
import { domainProxy, socialCode } from "../../lib/const"
import styles from "./styles.module.css"

export default function FacebookLoginBox({ setting, view }) {
  function onClick() {
    let url = new URL(domainProxy)
    const callback_url = `${window.location.origin}/sign-in/verify`

    if (setting?.client_id) {
      const objParams = {
        access_type: "offline",
        prompt: "consent",
        client_id: setting?.client_id,
        redirect_uri: callback_url,
        scope: "email profile openid",
        response_type: "code",
        state: socialCode.FACEBOOK
      }
      let url = new URL("https://www.facebook.com/v13.0/dialog/oauth")
      url.search = new URLSearchParams(objParams)
      window.location.href = url.href
    } else {
      url.search = new URLSearchParams({
        provider_name: socialCode.FACEBOOK,
        callback_url
      })
      window.location.href = url.href
    }
  }

  return (
    <button className={styles.ox_social_login} onClick={onClick}>
      {view === "icon" && icon}
      {view === "full" && <Fragment>{icon} Continue with Facebook</Fragment>}
      {view === "base" && <Fragment>{icon} Facebook</Fragment>}
    </button>
  )
}

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18"
    height="18"
    viewBox="0 0 48 48"
  >
    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
    <path
      fill="#fff"
      d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
    ></path>
  </svg>
)
