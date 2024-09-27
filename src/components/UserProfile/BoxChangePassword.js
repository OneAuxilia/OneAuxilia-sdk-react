import React, { Fragment, useEffect, useRef, useState } from "react"
import { Button } from "../ui"
import useStore from "../Context"
import {
  capitalizeTxt,
  hasLowercase,
  hasNumber,
  hasSpecial,
  hasUppercase
} from "../../lib/function"
import { apiCore } from "../../api"
import InputPassword from "../InputPassword"
import { icError } from "../../lib/icons"
import styles from "./styles.module.css"
import global from "../../global.module.css"
import SuccessBox from "../SuccessBox"

export default function BoxChangePassword() {
  const { user_general_setting, is_set_password } = useStore()
  const [values, setValues] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: ""
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [errors, setError] = useState([{ er: "", check: false }])
  const [errorValues, setErrorValues] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: ""
  })
  const isMounter = useRef(true)

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  function checkValidate() {
    const { new_password, new_password_confirm, old_password } = values
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

    let newErrorValues = {
      old_password: "",
      new_password: "",
      new_password_confirm: ""
    }
    if (is_set_password && !old_password) newErrorValues.old_password = "Require old password"
    if (!new_password) newErrorValues.new_password = "Require password"
    if (!new_password_confirm) newErrorValues.new_password_confirm = "Require confirm password"
    if (new_password_confirm && new_password_confirm !== new_password)
      newErrorValues.new_password_confirm = "Require password match confirm password"
    if (!isMounter.current) setErrorValues(newErrorValues)
  }

  async function onOk() {
    try {
      isMounter.current = false

      if (
        (is_set_password && !values.old_password) ||
        !values.new_password ||
        !values.new_password_confirm
      ) {
        checkValidate()
        return
      }

      if (errors.find((i) => !i.check)) {
        checkValidate()
        return
      }

      setLoading(true)
      if (is_set_password) {
        await apiCore.changePassword(values)
      } else {
        await apiCore.resetchangePassword(values)
      }

      setLoadingSuccess(true)
      setTimeout(() => {
        setLoadingSuccess(false)
      }, [1500])
      // onChangeStep(1)
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

  function onCancel() {
    setOpen(false)
  }

  useEffect(() => {
    if (loadingSuccess)
      setTimeout(() => {
        onCancel()
      }, [2000])
  }, [loadingSuccess])

  useEffect(() => {
    checkValidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const { old_password, new_password, new_password_confirm } = values
  return (
    <div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>Password</div>
        <div className={styles.ox_row_right}>
          {open ? (
            <div className={styles.ox_box_wrapper_backupcode}>
              <Fragment>
                <div className="ox_title_form">Update password</div>
                <div className="ox_mb_4"></div>
                {is_set_password && (
                  <InputPassword
                    style={{ width: "100%" }}
                    error={errorValues.old_password}
                    label="Current password"
                    onChange={(e) => onChangeValues("old_password", e)}
                    value={old_password}
                  />
                )}
                <InputPassword
                  error={errorValues.new_password}
                  label="New password"
                  onChange={(e) => onChangeValues("new_password", e)}
                  value={new_password}
                />
                <InputPassword
                  error={errorValues.new_password_confirm}
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
                {loadingSuccess && <SuccessBox message={"Success"} />}
                <div className="ox_mb_6"></div>

                <div className={styles.ox_box_btn_change_password}>
                  <Button type="text" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button onClick={onOk} loading={loading} type="primary" isSubmit={true}>
                    Save
                  </Button>
                </div>
              </Fragment>
            </div>
          ) : (
            <Fragment>
              <div className={styles.ox_icon_password}>••••••••••</div>
              <Button
                type="text"
                onClick={() => setOpen(true)}
                className={styles.ox_btn}
                style={{ width: 150 }}
              >
                {is_set_password ? "Change password" : "Set password"}
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

const icCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width={14}
    height={14}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)
