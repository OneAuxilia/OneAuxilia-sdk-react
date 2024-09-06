import React, { Fragment } from "react"
import { domainProxy, socialCode } from "../../lib/const"
import styles from "./styles.module.css"

export default function MicrosoftLoginBox({ view }) {
  function onClick() {
    let url = new URL(domainProxy)
    const callback_url = `${window.location.origin}/sign-in/verify`
    url.search = new URLSearchParams({
      provider_name: socialCode.MICROSOFT,
      callback_url
    })
    window.location.href = url.href
  }

  return (
    <button className={styles.ox_social_login} onClick={onClick}>
      {view === "icon" && icon}
      {view === "full" && <Fragment>{icon} Continue with Microsoft</Fragment>}
      {view === "base" && <Fragment>{icon} Microsoft</Fragment>}
    </button>
  )
}

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16" viewBox="0 0 20 20" width="16">
    <path d="M0 0H20V20H0V0Z" fill="#F3F3F3" />
    <path d="M0.869629 0.869568H9.56528V9.56522H0.869629V0.869568Z" fill="#F35325" />
    <path d="M10.4348 0.869568H19.1305V9.56522H10.4348V0.869568Z" fill="#81BC06" />
    <path d="M0.869629 10.4348H9.56528V19.1304H0.869629V10.4348Z" fill="#05A6F0" />
    <path d="M10.4348 10.4348H19.1305V19.1304H10.4348V10.4348Z" fill="#FFBA08" />
  </svg>
)
