import React, { Fragment, useEffect } from "react"
import { socialCode, stepStatus } from "../../lib/const"
import { apiCore } from "../../api"
import useStore from "../Context"

function getCodeByParams() {
  var url = new URL(window.location.href)
  return url.searchParams.get("code")
}

export default function VerifySocial({ onChangeStep }) {
  const { setFirstLogin, setLogin } = useStore()

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

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
    const provider_name = getCodeByParams()
    if (code) onLogin(socialCode.GOOGLE, provider_name)
  }, [])

  return <Fragment></Fragment>
}
