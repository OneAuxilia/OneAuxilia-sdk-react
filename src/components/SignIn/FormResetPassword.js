import React, { Fragment, useState } from "react"
import { apiCore } from "../../api"
import InputPassword from "../InputPassword"
import { Button } from "../ui"
import styles from "./resetpass.module.css"

export default function FormResetPassword({ onChangeStep }) {
  const [values, setValues] = useState({
    new_password: "",
    new_password_confirm: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    new_password: "",
    new_password_confirm: ""
  })

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  async function onOk() {
    if (values.new_password !== values.new_password_confirm) {
      setError({
        ...error,
        new_password_confirm: "Passwords don't match"
      })
      return
    }
    // if (values.new_password !== values.new_password_confirm) {
    //   setError({
    //     ...error,
    //     new_password_confirm: "Passwords don't match"
    //   })
    //   return
    // }
    try {
      setLoading(true)
      await apiCore.resetchangePassword(values)
      onChangeStep(1)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function onBack() {
    onChangeStep(1)
  }

  const { new_password, new_password_confirm } = values
  return (
    <Fragment>
      <div className="ox_title_form">Set new password</div>
      <div className="ox_mb_8"></div>
      <InputPassword
        error={error?.new_password}
        label="New password"
        onChange={(e) => onChangeValues("new_password", e)}
        value={new_password}
      />

      <InputPassword
        error={error?.new_password_confirm}
        label="Confirm password"
        onChange={(e) => onChangeValues("new_password_confirm", e)}
        value={new_password_confirm}
      />

      <div className="ox_mb_8"></div>
      <Button onClick={onOk} loading={loading} type="primary">
        Reset Password
      </Button>

      <div className="ox_mb_4"></div>
      <div className={`${styles.ox_back} ox_link`} onClick={onBack}>
        Back
      </div>
    </Fragment>
  )
}
