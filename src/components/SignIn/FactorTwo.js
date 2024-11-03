import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import { apiCore } from "../../api"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor, stepStatus } from "../../lib/const"
import { getAuthMultiFactor } from "../../lib/function"
import { Button, Input } from "../ui"
import global from "../../global.module.css"
import InputName from "../InputName"

export default function FactorTwo({ children }) {
  const { setLogin, setLoaded, firstSignIn, user_general_setting } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [method, setMethod] = useState("auth_code")
  const [value, setValue] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onOk() {
    if (!value) {
      setError(`Require field`)
      return
    }
    try {
      setLoaded(false)
      setLoading(true)

      let data = {}
      if (method === "auth_code") {
        const body = {
          strategy: firstSignIn.second_factor_type,
          email_or_phone: firstSignIn.email,
          code: value
        }
        const res = await apiCore.attemptSecondfactor5(body)
        data = res.data
      } else {
        const body = {
          email_or_phone: firstSignIn.email,
          recovery_code: value
        }
        const res = await apiCore.verifyBackupCode(body)
        data = res.data
      }

      if (data?.user?.status === stepStatus.COMPLETED) {
        setLogin(data)
      }
    } catch (error) {
      setError("Incorrect code")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function onChangeValue(value) {
    if (value && error) setError("")
    setValue(value)
  }

  function onChangeMethod(v) {
    setMethod(v)
  }

  function onUseAnother() {
    setValue("")
    if (error) setError("")
    onChangeMethod("select")
  }

  useEffect(() => {
    async function fetch() {
      try {
        const dataBody = {
          strategy: firstSignIn.second_factor_type,
          email_or_phone: firstSignIn.email
        }
        await apiCore.prepareSecondfactor4(dataBody)
      } catch (error) {
        console.log({ error })
      }
    }

    if (
      firstSignIn.second_factor_type &&
      firstSignIn.second_factor_type !== authCodeMultiFactor.AUTH_CODE
    )
      fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auMultiFactors])
  // console.log({ auMultiFactors })

  return (
    <Fragment>
      {method === "auth_code" && (
        <Fragment>
          <InputOtp onChange={onChangeValue} value={value} step={3} error={error} />
          <div className="ox_mb_6"></div>
          <Button type="primary" onClick={onOk} loading={loading} isSubmit={true}>
            Continue
          </Button>
          <div className="ox_mb_4"></div>
          {auMultiFactors?.find((i) => i === "email") && (
            <div className="ox_link" onClick={onUseAnother} style={{ textAlign: "center" }}>
              Use another method
            </div>
          )}
        </Fragment>
      )}
      {method === "backup_code" && (
        <Fragment>
          <div className={global.ox_name_title}>Use another method</div>
          <div className="ox_mb_6"></div>
          <div className={global.ox_name_sub}>
            Your backup code is the one you got when setting up two-step authentication
          </div>
          <div className="ox_mb_6"></div>

          <InputName
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
            label="Backup code"
            error={error}
          />
          <div className="ox_mb_6"></div>
          <Button type="primary" onClick={onOk} loading={loading} isSubmit={true}>
            Continue
          </Button>
          <div className="ox_mb_4"></div>
          <div className="ox_link" onClick={onUseAnother} style={{ textAlign: "center" }}>
            Use another method
          </div>
        </Fragment>
      )}
      {method === "select" && (
        <Fragment>
          <div className={global.ox_name_title}>Use another method</div>
          <div className="ox_mb_6"></div>
          <div className={global.ox_name_sub}>
            Facing issues? You can use any of these methods to sign in.
          </div>
          <div className="ox_mb_8"></div>
          <Button onClick={() => onChangeMethod("auth_code")}>Use your authenticator app</Button>
          <div className="ox_mb_4"></div>
          <Button onClick={() => onChangeMethod("backup_code")}>Use a backup code</Button>
          <div className="ox_mb_4"></div>
          {/* <div
            className="ox_link"
            onClick={() => onChangeMethod("select")}
            style={{ textAlign: "center" }}
          >
           Back
          </div> */}
        </Fragment>
      )}
    </Fragment>
  )
}
