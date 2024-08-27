import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"
import { apiCore } from "../../api"

import QRCode from "react-qr-code"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor } from "../../lib/const"

//<div className={styles.ox_}>Profile</div>

function getAuthMultiFactor(auMultiFactor) {
  let multiFactor = []
  if (auMultiFactor) multiFactor = auMultiFactor?.filter((i) => i.is_enable)
  return multiFactor
}

export default function Security({ isSignIn, step }) {
  const {
    userId,
    user_general_setting,
    second_factor_type,
    setConfig,
    second_factor_verification
  } = useStore()
  const auMultiFactors = getAuthMultiFactor(user_general_setting.multi_factors.methods)
  const [qrCode, setQrCode] = useState()
  const [stepVerify, setStepVerify] = useState(1)
  const [otp, setOtp] = useState("")
  const [factorType, setFactorType] = useState()

  async function addTo2fa() {
    try {
      const bodydata = {
        strategy: factorType
      }
      const { data } = await apiCore.genFactorSecretkey(userId, bodydata)
      const { email, secret_key } = data
      const code = `otpauth://totp/Example:${email}?secret=${secret_key}&issuer=Example`
      setQrCode(code)
    } catch (error) {
      console.log(error)
    }
  }
  async function onRemove() {
    try {
      const bodydata = {
        strategy: "none"
      }
      await apiCore.genFactorSecretkey(userId, bodydata)
      setQrCode()
      setStepVerify(1)
      setConfig({ second_factor_type: "none" })
    } catch (error) {
      console.log(error)
    }
  }

  async function onConfirm() {
    try {
      await apiCore.validAuthProfile({
        user_id: userId,
        code: otp,
        strategy: factorType
      })
      setQrCode()
      setStepVerify(1)
      setConfig({ second_factor_type: factorType })
    } catch (error) {
      console.log(error)
    }
  }

  function onResend(params) {}

  function onChangeOtp(v) {
    setOtp(v)
  }

  function onClickContinue() {
    setStepVerify(2)
    try {
    } catch (error) {
      console.log(error)
    }
  }
  // console.log({ auMultiFactors })
  console.log({ qrCode })
  // onClick = { addTo2fa }

  function onChange(e) {
    setFactorType(e.target.value)
    // if (e.target.value) addTo2fa(e.target.value)
  }

  useEffect(() => {
    if (factorType) addTo2fa(factorType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factorType])
  console.log("factorType", factorType)

  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Scurity
      </div>
      <div className={styles.ox_row}>
        <div className={styles.ox_row_left}>Password</div>
        <div className={styles.ox_row_right}>
          <button className={styles.ox_btn}>Set password</button>
        </div>
      </div>
      {auMultiFactors.length > 0 && (
        <div className={styles.ox_row_to2fa}>
          <div style={{ marginBottom: "0.5rem" }}>Two-step verificatio</div>

          <div className={styles.ox_row_rig1ht}>
            {second_factor_type === "none" ? (
              <div>
                {qrCode ? (
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                      Add authenticator application
                    </div>
                    <p style={{ fontSize: 14 }}>
                      Set up a new sign-in method in your authenticator app and scan the following
                      QR code to link it to your account.
                    </p>

                    {stepVerify === 1 && factorType === authCodeMultiFactor.AUTH_CODE ? (
                      <div className={styles.ox_box_qr}>
                        <QRCode style={{ width: 200, height: 200 }} value={qrCode} />
                      </div>
                    ) : (
                      <div>
                        <InputOtp
                          onChange={onChangeOtp}
                          value={otp}
                          isProfile={true}
                          onResend={onResend}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <button onClick={onConfirm} className={styles.ox_btn}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                    {stepVerify === 1 && factorType === authCodeMultiFactor.AUTH_CODE && (
                      <div className={styles.ox_continue}>
                        <a>Can’t scan QR code?</a>
                        <button className={styles.ox_btn} onClick={onClickContinue}>
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className={styles.ox_btn_add_2fa}>
                    <select onChange={onChange} className={styles.ox_btn_add_2fa}>
                      <option className={styles.ox_option} value="">
                        Add two-step verification
                      </option>
                      <option className={styles.ox_option} value="auth_code">
                        Authenticator application
                      </option>
                    </select>
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.ox_box_action}>
                <div>
                  {icKey} Authenticator application [{second_factor_verification?.strategy}]
                </div>
                <div>
                  <button className={styles.ox_btn_remove} onClick={onRemove}>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.ox_row_end}>
        <div className={styles.ox_row_left}>Active devices</div>
        <div className={styles.ox_row_right}>Chrome 127.0.0.0</div>
      </div>
    </Fragment>
  )
}

const icKey = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
    />
  </svg>
)
