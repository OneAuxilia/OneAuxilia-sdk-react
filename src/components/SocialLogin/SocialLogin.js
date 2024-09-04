import React, { Fragment, useEffect } from "react"
import { socialCode } from "../../lib/const"
import useStore from "../Context"
import { apiCore } from "../../api"
import GoogleLoginBox from "./GoogleLoginBox"
import FacebookLoginBox from "./FacebookLoginBox"
import styles from "./styles.module.css"
import BoxLine from "../BoxLine/BoxLine"

function getCodeByParams() {
  var url = new URL(window.location.href)
  return url.searchParams.get("code")
}

export default function LoginSocial({ onNext, isShowOrText }) {
  const { social_connections } = useStore()

  async function onLogin(key, token) {
    try {
      const { data } = await apiCore.signInSocial({
        provider_name: key,
        provider_access_token: token
      })
      onNext(data)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    const code = getCodeByParams()
    if (code) onLogin(socialCode.GOOGLE, code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listSocial = social_connections?.providers?.filter((i) => i.is_enable) || []

  const isFullName = listSocial?.length < 2
  return (
    <Fragment>
      {listSocial.length > 0 && (
        <Fragment>
          <div className={styles.ox_row_social_login}>
            {listSocial.map(({ auth_provider }, key) => {
              return (
                <Fragment key={key}>
                  {auth_provider === socialCode.FACEBOOK && (
                    <FacebookLoginBox onLogin={onLogin} isFullName={isFullName} />
                  )}
                  {auth_provider === socialCode.GOOGLE && (
                    <GoogleLoginBox onLogin={onLogin} isFullName={isFullName} />
                  )}
                </Fragment>
              )
            })}
          </div>
          {isShowOrText && <BoxLine text="or" />}
        </Fragment>
      )}
    </Fragment>
  )
}
