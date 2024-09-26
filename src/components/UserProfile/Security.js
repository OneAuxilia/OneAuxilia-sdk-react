import React, { Fragment, useEffect, useState } from "react"
import useStore from "../Context"
import styles from "./styles.module.css"
import { apiCore } from "../../api"
import QRCode from "react-qr-code"
import InputOtp from "../InputOtp"
import { authCodeMultiFactor } from "../../lib/const"
import Dropdown from "../Dropdown"
import { Button } from "../ui"
import BoxBackupCode from "./BoxBackupCode"
import BoxChangePassword from "./BoxChangePassword"

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
  const [backupCodes, setBackupCodes] = useState([])

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
      const { data } = await apiCore.regenerateCode()
      setBackupCodes(Object.keys(data.recovery_codes))
    } catch (error) {
      console.log(error)
    }
  }

  async function onRegenerate() {
    try {
      const { data } = await apiCore.regenerateCode()
      setBackupCodes(Object.keys(data.recovery_codes))
    } catch (error) {
      console.log(error)
    }
  }

  // async function onConfirmBackupCode() {
  //   try {

  //     apiCore.verifyBackupCode({
  //       recovery_code: '',
  //       email_or_phone: email
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
  function clearBackupCode() {
    setBackupCodes([])
  }
  function onChange(v) {
    setFactorType(v)
    // if (e.target.value) addTo2fa(e.target.value)
  }

  useEffect(() => {
    if (factorType) addTo2fa(factorType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factorType])

  // console.log("factorType", second_factor_verification)
  // console.log("auMultiFactors", auMultiFactors)

  return (
    <Fragment>
      <div className={styles.ox_row} style={{ fontSize: 18, fontWeight: 700 }}>
        Scurity
      </div>
      <BoxChangePassword />
      {auMultiFactors.length > 0 && (
        <div className={styles.ox_row_to2fa}>
          <div style={{ marginBottom: "0.5rem" }} className={styles.ox_row_left}>
            Two-step verification
          </div>

          <div className={styles.ox_row_right}>
            {second_factor_type === "none" ? (
              <div>
                {qrCode ? (
                  <div className={styles.ox_box_wrapper_backupcode}>
                    <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                      Add authenticator application
                    </div>
                    <p>
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
                        <div className="ox_mb_4"></div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <Button type="primary" onClick={onConfirm} style={{ width: 150 }}>
                            Confirm
                          </Button>
                        </div>
                      </div>
                    )}
                    {stepVerify === 1 && factorType === authCodeMultiFactor.AUTH_CODE && (
                      <div className={styles.ox_continue}>
                        <a>Can’t scan QR code?</a>
                        <Button style={{ width: 150 }} onClick={onClickContinue}>
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Dropdown
                      content={
                        <div
                          className={styles.ox_btn_content_2fa}
                          onClick={() => onChange("auth_code")}
                        >
                          Authenticator application
                        </div>
                      }
                    >
                      <div className={styles.ox_btn_add_2fa}>
                        {icPlus} Add two-step verification
                      </div>
                    </Dropdown>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className={styles.ox_box_action}>
                  {second_factor_verification?.strategy === authCodeMultiFactor.AUTH_CODE && (
                    <div className={styles.ox_name_second_factor}>
                      <div>Authenticator application</div>
                    </div>
                  )}
                  <div>
                    <button
                      style={{ color: "#ef4444" }}
                      className={styles.ox_btn_action}
                      onClick={onRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {auMultiFactors.find((i) => i.type === authCodeMultiFactor.BACKUP_CODE) && (
                  <div>
                    <div className={styles.ox_box_action}>
                      {second_factor_verification?.strategy === authCodeMultiFactor.AUTH_CODE && (
                        <div className={styles.ox_name_second_factor}>
                          <div>Backup codes</div>
                        </div>
                      )}
                      <div>
                        <button className={styles.ox_btn_action} onClick={onRegenerate}>
                          Regenerate
                        </button>
                      </div>
                    </div>
                    {backupCodes?.length > 0 && (
                      <BoxBackupCode backupCodes={backupCodes} clearBackupCode={clearBackupCode} />
                    )}
                  </div>
                )}
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
    width={14}
    height={14}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
    />
  </svg>
)
const icPlus = (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={14}
    height={14}
  >
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 1 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"></path>
  </svg>
)
