import React, { useState } from "react"
import styles from "./styles.module.css"
import useStore from "../Context"

export default function TopFormLogin({ isSignIn }) {
  const { branding_customization, application_name } = useStore()
  return (
    <div className={styles.ox_header}>
      {branding_customization?.logo && (
        <div className={styles.ox_box_logo}>
          <Image src={branding_customization?.logo} alt="onauxilia" />
        </div>
      )}
      <div className={styles.ox_text_header}>
        {isSignIn ? "Sign in" : "Sign up"} to {application_name}
      </div>
      <div className={styles.ox_text_header_sub}>
        {isSignIn
          ? "Welcome back! Please sign in to continue"
          : "Welcome! Please fill in the details to get started"}
      </div>
    </div>
  )
}

function Image({ src, alt }) {
  const [loader, setLoader] = useState(false)
  function onLoad() {
    setLoader(true)
  }
  return (
    <img
      onLoad={onLoad}
      style={{ height: "2rem", opacity: loader && 1 }}
      src={src}
      alt={alt}
      className={styles.ox_logo_header}
    />
  )
}
