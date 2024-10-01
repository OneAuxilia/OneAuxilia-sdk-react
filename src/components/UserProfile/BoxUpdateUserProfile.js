import React, { Fragment, useEffect, useRef, useState } from "react"
import InputName from "../InputName"
import SuccessBox from "../SuccessBox"
import { capitalizeTxt } from "../../lib/function"
import { apiCore } from "../../api"
import UploadAvatar from "./UploadAvatar"
import { Button } from "../ui"
import ErrorBox from "../ErrorBox"
import styles from "./styles.module.css"
import useStore from "../Context"

export default function BoxUpdateUserProfile({ fullName }) {
  const { avatar, setConfig, first_name, last_name } = useStore()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [values, setValues] = useState({
    first_name: first_name,
    last_name: last_name,
    avatar: avatar
  })

  const [errorValues, setErrorValues] = useState({
    first_name: "",
    last_name: ""
  })
  const [error, setError] = useState("")
  const isMounter = useRef(true)

  async function onOk() {
    try {
      isMounter.current = false
      if (!values.first_name || !values.last_name) {
        checkValidate()
        return
      }
      setLoading(true)
      await apiCore.udateProfile(values)
      setConfig({
        first_name: values.first_name,
        last_name: values.last_name,
        fullName: values.first_name + " " + values.last_name,
        avatar: values.avatar
      })
      setLoadingSuccess(true)
      setTimeout(() => {
        setLoadingSuccess(false)
        onCancel()
      }, [1000])
    } catch (error) {
      console.log(error)
      setError(capitalizeTxt(error?.error))
    } finally {
      setLoading(false)
    }
  }

  function checkValidate() {
    const { first_name, last_name } = values

    let newErrorValues = {
      first_name: "",
      last_name: ""
    }
    if (!first_name) newErrorValues.first_name = "Require first name"
    if (!last_name) newErrorValues.last_name = "Require last name"
    if (!isMounter.current) setErrorValues(newErrorValues)
  }

  function onCancel() {
    setOpen(false)
  }
  function onChangeValues(key, e) {
    setValues({ ...values, [key]: e.target.value })
  }
  function onChangeAvatar(v) {
    setValues({ ...values, avatar: v })
  }

  useEffect(() => {
    setValues({
      first_name: first_name,
      last_name: last_name,
      avatar: avatar
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first_name])

  return (
    <div className={styles.ox_row}>
      <div className={styles.ox_row_left}>
        <div className={styles.ox_profile}>Profile</div>
      </div>
      {open ? (
        <Fragment>
          <div className={styles.ox_box_wrapper_backupcode}>
            <div className={styles.ox_title_form}>Update profile</div>
            <UploadAvatar value={avatar} onChange={onChangeAvatar} />
            <div className="ox_mb_6"></div>
            <InputName
              onChange={(e) => onChangeValues("first_name", e)}
              label="First name"
              error={errorValues.first_name}
              value={values.first_name}
            />
            <InputName
              onChange={(e) => onChangeValues("last_name", e)}
              label="Last name"
              error={errorValues.last_name}
              value={values.last_name}
            />
            <div className="ox_mb_6"></div>

            {loadingSuccess && <SuccessBox message={"Success"} />}
            <ErrorBox error={error} />

            <div className={styles.ox_box_btn_change_password}>
              <Button type="text" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onOk} loading={loading} type="primary" isSubmit={true}>
                Save
              </Button>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className={styles.ox_row_right}>
          <div className={styles.ox_box_name_avatar}>
            <span className={styles.ox_span_avatar}>
              <img className={styles.ox_avatar} src={avatar} alt="avatar" />
            </span>
            {fullName}
          </div>

          <Button
            loading={loading}
            className={styles.ox_btn}
            onClick={() => setOpen(true)}
            style={{ width: 150 }}
          >
            Update profile
          </Button>
        </div>
      )}
    </div>
  )
}
