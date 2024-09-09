import React, { Fragment, useEffect, useState } from "react"
import { apiCore } from "../../api"
import InputPassword from "../InputPassword"
import { Button } from "../ui"
import styles from "./resetpass.module.css"
import global from "../../global.module.css"
import useStore from "../Context"
import {
  capitalizeTxt,
  hasLowercase,
  hasNumber,
  hasSpecial,
  hasUppercase
} from "../../lib/function"
import { icCheck, icError } from "../../lib/icons"

export default function FormResetPassword({ onChangeStep }) {
  const { user_general_setting } = useStore()
  const [values, setValues] = useState({
    new_password: "",
    new_password_confirm: ""
  })

  const [loading, setLoading] = useState(false)
  const [errors, setError] = useState([{ er: "", check: false }])

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  function checkValidate() {
    const { new_password, new_password_confirm } = values
    const setting = user_general_setting?.authentication_strategies?.password?.setting || {}
    const {
      allow_special_character,
      uppercase_letter_required,
      lowercase_letter_required,
      numbers_required,
      password_max_length,
      password_min_length
    } = setting
    const erMs = {
      uppercase_letter_required: "Require at least 1 uppercase character",
      lowercase_letter_required: "Require at least 1 lowercase character",
      numbers_required: "Require at least 1 number",
      allow_special_character: `Require at least 1 special characters include: [!@#$%^&*(),.?":{ }|<>]`,
      password_max_length: "Max length " + password_max_length,
      password_min_length: "Min length " + password_min_length,
      new_password_confirm: "Require confirm password",
      match: `Require password match confirm password`
    }
    const newError = []
    if (uppercase_letter_required) {
      newError.push({ er: erMs.uppercase_letter_required, check: hasUppercase(new_password) })
    }
    if (lowercase_letter_required) {
      newError.push({ er: erMs.lowercase_letter_required, check: hasLowercase(new_password) })
    }
    if (numbers_required) {
      newError.push({ er: erMs.numbers_required, check: hasNumber(new_password) })
    }
    if (password_max_length) {
      newError.push({
        er: erMs.password_max_length,
        check: !new_password || new_password.length > password_max_length ? false : true
      })
    }
    if (password_min_length) {
      newError.push({
        er: erMs.password_min_length,
        check: !new_password || new_password.length < password_min_length ? false : true
      })
    }
    if (allow_special_character) {
      newError.push({ er: erMs.allow_special_character, check: hasSpecial(new_password) })
    }
    if (new_password && !new_password_confirm) {
      newError.push({ er: erMs.new_password_confirm, check: false })
    }
    if (new_password && new_password_confirm) {
      newError.push({ er: erMs.match, check: new_password === new_password_confirm })
    }
    setError(newError)
    if (newError.length > 0) return
  }

  async function onOk() {
    if (errors.find((i) => !i.check)) return
    try {
      setLoading(true)
      await apiCore.resetchangePassword(values)
      onChangeStep(1)
    } catch (error) {
      console.log(error)

      let newErrors = [...errors]
      newErrors.push({
        er: capitalizeTxt(error?.error),
        check: false
      })
      setError(newErrors)
    } finally {
      setLoading(false)
    }
  }

  function onBack() {
    onChangeStep(1)
  }

  useEffect(() => {
    checkValidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const disableBtn = errors.find((i) => !i.check)
  const { new_password, new_password_confirm } = values
  return (
    <Fragment>
      <div className="ox_title_form">Set new password</div>
      <div className="ox_mb_8"></div>
      <InputPassword
        error={false}
        label="New password"
        onChange={(e) => onChangeValues("new_password", e)}
        value={new_password}
      />

      <InputPassword
        error={false}
        label="Confirm password"
        onChange={(e) => onChangeValues("new_password_confirm", e)}
        value={new_password_confirm}
      />

      {errors?.length > 0 && (
        <div className={global.ox_errors}>
          {errors?.map((item, index) => {
            return (
              <div className={global.ox_item_error} key={index}>
                <Fragment>
                  {item.check ? (
                    <div className={global.ox_ic_check}>{icCheck}</div>
                  ) : (
                    <div className={global.ox_ic_error}>{icError}</div>
                  )}
                </Fragment>

                <div>{item.er}</div>
              </div>
            )
          })}
        </div>
      )}
      <div className="ox_mb_8"></div>
      <Button onClick={onOk} loading={loading} type="primary" disabled={disableBtn}>
        Reset Password
      </Button>

      <div className="ox_mb_4"></div>
      <div className={`${styles.ox_back} ox_link`} onClick={onBack}>
        Back
      </div>
    </Fragment>
  )
}
