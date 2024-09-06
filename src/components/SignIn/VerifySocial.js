import React, { Fragment, useEffect } from "react"
import { stepStatus } from "../../lib/const"
import { apiCore } from "../../api"
import useStore from "../Context"

function getParams() {
  var url = new URL(window.location.href)
  return [url.searchParams.get("code"), url.searchParams.get("provider_name")]
}

export default function VerifySocial({ onChangeStep, onBack }) {
  const { setFirstLogin, setLogin, routerReplace } = useStore()

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data?.user)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
    if (data?.user?.status === stepStatus.SECOND_FACTOR) onChangeStep(3)
  }

  async function onLogin(provider_name, provider_code) {
    try {
      const { data } = await apiCore.signInSocial({
        provider_name,
        provider_code
      })
      onNext(data)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    const [code, provider_name] = getParams()
    console.log("code", code)

    if (code && code !== "null") {
      onLogin(provider_name, code)
    } else {
      routerReplace(`/sign-in?provider_name=${provider_name}`)
      onBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Fragment></Fragment>
}
