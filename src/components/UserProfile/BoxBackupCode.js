import React, { useState } from "react"
import { Button } from "../ui"
import styles from "./styles.module.css"
import useStore from "../Context"

function download(backupCodes, application_name) {
  var element = document.createElement("a")
  let str = `These are your backup codes for test 04 account elektra14.
Store them securely and keep them secret.Each code can only be used once. \n\n\n`
  backupCodes.forEach((element) => {
    str += element + "\n"
  })

  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(str))
  element.setAttribute("download", `${application_name}_backup_codes.txt`)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default function BoxBackupCode({ backupCodes, clearBackupCode }) {
  const [copying, setCopying] = useState(false)

  function copyText() {
    setCopying(true)
    let str = ""
    backupCodes.forEach((element) => {
      str += element + ","
    })
    navigator.clipboard.writeText(str)
    setTimeout(() => {
      setCopying(false)
    }, [1000])
  }

  function printDiv() {
    var divToPrint = document.getElementById("ox_backup_code")
    var newWin = window.open("", "Print-Window")
    newWin.document.open()
    newWin.document.write(
      '<html><body onload="window.print()">' + divToPrint.innerHTML + "</body></html>"
    )
    newWin.document.close()
    setTimeout(function () {
      newWin.close()
    }, 10)
  }
  console.log({ copying })

  const { application_name } = useStore()
  return (
    <div>
      <div className={styles.ox_box_wrapper_backupcode}>
        <div id="ox_backup_code">
          <div className={styles.ox_box_backupcode_title}>Add backup code verification</div>
          <p className="ox_mb_8">
            Backup codes are now enabled. You can use one of these to sign in to your account, if
            you lose access to your authentication device. Each code can only be used once.
          </p>
          <div className={styles.ox_box_backupcode_title}>Backup codes</div>
          <p>Store them securely and keep them secret.</p>
          <div className={styles.ox_box_auth_code}>
            {backupCodes.map((i, index) => {
              return (
                <div className={styles.ox_box_backupcode_item} key={index}>
                  {i}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.ox_box_action_code}>
          <Button style={{ width: 120 }} onClick={() => download(backupCodes, application_name)}>
            <span className="ox_text_primary_700">{icDownLoad}</span>
          </Button>
          <Button style={{ width: 120 }} onClick={printDiv}>
            <span className="ox_text_primary_700">{icPrint}</span>
          </Button>
          <Button style={{ width: 120 }} onClick={copyText}>
            <span className="ox_text_primary_700">{copying ? icCheck : icCopy}</span>
          </Button>
        </div>
        <div className={styles.ox_box_backupcode_bottom}>
          <Button type="primary" onClick={clearBackupCode} style={{ width: 150 }}>
            Finish
          </Button>
        </div>
      </div>
    </div>
  )
}

const icDownLoad = (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width={14} height={14}>
    <path
      d="M1 10v1.5A1.5 1.5 0 0 0 2.5 13h9a1.5 1.5 0 0 0 1.5-1.5V10m-3-3-3 3m0 0L4 7m3 3V1"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)
const icCopy = (
  <svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={14} height={14}>
    <path
      d="M7.94 10.23v2.078a.687.687 0 0 1-.682.692h-5.91a.676.676 0 0 1-.482-.203.698.698 0 0 1-.2-.49V4.463c0-.383.306-.693.682-.693h1.137c.304 0 .609.026.909.077m4.545 6.385h2.046c.376 0 .682-.31.682-.693v-3c0-2.744-1.966-5.022-4.546-5.462A5.41 5.41 0 0 0 5.212 1H4.076a.687.687 0 0 0-.682.692v2.154m4.545 6.385H4.076a.677.677 0 0 1-.482-.203.698.698 0 0 1-.2-.49V3.846m7.273 4.077V6.77c0-.55-.216-1.079-.6-1.468a2.03 2.03 0 0 0-1.446-.609h-.909a.677.677 0 0 1-.482-.202.698.698 0 0 1-.2-.49v-.923a2.105 2.105 0 0 0-.599-1.469A2.043 2.043 0 0 0 4.985 1h-.682"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)
const icPrint = (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14" width={14} height={14}>
    <path
      d="M3.107 8.126c-.147.018-.294.038-.44.059m.44-.06c2.142-.27 4.31-.27 6.453 0m-6.453 0-.233 2.567M9.56 8.126c.147.018.293.038.44.059m-.44-.06.232 2.567.14 1.553a.697.697 0 0 1-.407.696.684.684 0 0 1-.277.059H3.419a.69.69 0 0 1-.684-.755l.14-1.553m0 0h-.667a1.37 1.37 0 0 1-.972-.405 1.39 1.39 0 0 1-.403-.98V5.435c0-.665.47-1.24 1.123-1.338.389-.059.778-.11 1.169-.152m6.666 6.748h.667a1.367 1.367 0 0 0 .972-.405 1.386 1.386 0 0 0 .403-.98V5.435c0-.665-.469-1.24-1.122-1.338-.389-.059-.779-.11-1.17-.152m0 0a29.456 29.456 0 0 0-6.416 0m6.417 0V1.692A.69.69 0 0 0 8.854 1H3.813a.69.69 0 0 0-.688.692v2.252M10 6.077h.005v.005H10v-.005Zm-1.833 0h.005v.005h-.005v-.005Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)
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
