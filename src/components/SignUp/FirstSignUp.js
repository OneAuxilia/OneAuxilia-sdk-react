import React, { Fragment, useEffect, useRef, useState } from "react"
import { apiCore } from "../../api"
import useStore from "../Context"
import InputPhoneMail from "../InputPhoneMail"
import InputPassword from "../InputPassword"
import InputName from "../InputName"
import TopFormLogin from "../TopFormLogin"
import {
  capitalizeTxt,
  getEmailSettingSignUp,
  hasLowercase,
  hasNumber,
  hasSpecial,
  hasUppercase,
  validateEmail
} from "../../lib/function"
import { stepStatus } from "../../lib/const"
import { Button } from "../ui"
import SocialLogin from "../SocialLogin"
import styles from "./styles.module.css"
import global from "../../global.module.css"
import ErrorBox from "../ErrorBox"
import { icCheck, icError } from "../../lib/icons"
import Tooltip from "../Tooltip"

export default function FirstSignUp({ onChangeStep }) {
  const { user_general_setting, setFirstLogin, routerPush, setLogin } = useStore()
  const emailSetting = getEmailSettingSignUp(user_general_setting?.contact)
  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })
  const [errorValues, setErrorValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  })
  const [errors, setErrors] = useState([{ er: "", check: false }])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const isMounter = useRef(true)

  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }

  function onNext(data) {
    if (data?.user?.status === stepStatus.COMPLETED) {
      setLogin(data)
    } else {
      setFirstLogin(data.user)
    }
    if (data?.user?.status === stepStatus.FIRST_FACTOR) onChangeStep(2)
  }

  function checkValidate() {
    const { password } = values
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
      password_min_length: "Min length " + password_min_length
    }
    const newErrors = []
    if (uppercase_letter_required) {
      newErrors.push({ er: erMs.uppercase_letter_required, check: hasUppercase(password) })
    }
    if (lowercase_letter_required) {
      newErrors.push({ er: erMs.lowercase_letter_required, check: hasLowercase(password) })
    }
    if (numbers_required) {
      newErrors.push({ er: erMs.numbers_required, check: hasNumber(password) })
    }
    if (password_max_length) {
      newErrors.push({
        er: erMs.password_max_length,
        check: !password || password.length > password_max_length ? false : true
      })
    }
    if (password_min_length) {
      newErrors.push({
        er: erMs.password_min_length,
        check: !password || password.length < password_min_length ? false : true
      })
    }
    if (allow_special_character) {
      newErrors.push({ er: erMs.allow_special_character, check: hasSpecial(password) })
    }
    setErrors(newErrors)

    let newError = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: ""
    }
    if (!values.email) newError.email = "Require email address"
    if (!validateEmail(values.email)) newError.email = "Email is valid"
    if (!values.first_name) newError.first_name = "Require first name"
    if (!values.last_name) newError.last_name = "Require last name"
    if (!values.password) newError.password = "Require password"
    if (!values.password_confirm) newError.password_confirm = "Require confirm password"
    if (values.password_confirm && values.password_confirm !== values.password)
      newError.password_confirm = "Require password match confirm password"
    if (!isMounter.current) setErrorValues(newError)
  }

  async function onSignUp() {
    try {
      isMounter.current = false
      if (
        error.email ||
        error.first_name ||
        error.last_name ||
        error.password ||
        error.password_confirm
      ) {
        return
      }
      if (
        !values.email ||
        !values.first_name ||
        !values.last_name ||
        !values.password ||
        !values.password_confirm
      ) {
        checkValidate()
      }

      if (errors.find((i) => !i.check)) return
      setLoading(true)
      const { data } = await apiCore.signUp(values)
      if (data?.status === stepStatus.COMPLETED) {
        routerPush("/sign-in")
      } else {
        if (emailSetting.is_need_verify_at_sign_up) {
          setFirstLogin(data)
          onChangeStep(2)
        }
      }
    } catch (error) {
      console.log(error)
      setError(capitalizeTxt(error?.error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkValidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const { email, password, password_confirm, first_name, last_name } = values
  return (
    <Fragment>
      <TopFormLogin isSignIn={false} />
      <SocialLogin onNext={onNext} isShowOrText={true} />
      <div className={styles.ox_fullname}>
        <InputName
          onChange={(e) => onChangeValues("first_name", e)}
          label="First name"
          error={errorValues.first_name}
          value={first_name}
        />
        <InputName
          onChange={(e) => onChangeValues("last_name", e)}
          label="Last name"
          error={errorValues.last_name}
          value={last_name}
        />
      </div>
      <InputPhoneMail
        onChange={(e) => onChangeValues("email", e)}
        value={email}
        error={errorValues.email}
      />
      <InputPassword
        onChange={(e) => onChangeValues("password", e)}
        value={password}
        error={errorValues.password}
      >
        {errors?.length > 0 && (
          <Tooltip>
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
          </Tooltip>
        )}
      </InputPassword>
      <InputPassword
        label="Confirm password"
        onChange={(e) => onChangeValues("password_confirm", e)}
        value={password_confirm}
        error={errorValues.password_confirm}
      />
      <ErrorBox error={error} />

      <div className="ox_mb_8"></div>

      <Button onClick={onSignUp} loading={loading} type="primary">
        Continue
      </Button>
    </Fragment>
  )
}
