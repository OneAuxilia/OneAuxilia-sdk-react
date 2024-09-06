import React, { useEffect, useState } from "react"
import useComponentVisible from "./ClickOutside"
import styles from "./styles.module.css"
import useStore from "../Context"
import { apiCore } from "../../api"
import { getSessionId } from "../../lib/cookie"
import { icLogo } from "../../lib/icons"

export default function UserButton({ list, pathSetting, isModal = false }) {
  const { onSignOut, fullName, email, routerPush, avatar } = useStore()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const [open, setOpen] = useState(false)

  function onShow() {
    if (!open) {
      setIsComponentVisible(true)
      setTimeout(() => {
        setOpen(true)
      }, 100)
    }
  }

  function handleSetting() {
    if (!isModal && pathSetting) {
      routerPush(pathSetting)
      setIsComponentVisible(false)
    }
  }

  async function onLogOut() {
    try {
      await apiCore.signOut(getSessionId())
      onSignOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isComponentVisible)
      setTimeout(() => {
        setOpen(false)
      }, 100)
  }, [isComponentVisible])

  return (
    <div>
      <div className="text-dark-500 cursor-pointer font-bold py-2" onClick={onShow}>
        <img alt="avatar" className={styles.ox_avatar} src={avatar} />
      </div>
      <div ref={ref}>
        {open && (
          <div
            className={styles.ox_dropdown}
            style={{
              opacity: isComponentVisible ? 100 : 0
            }}
          >
            <div className={styles.ox_ul}>
              <button className={styles.ox_dropdown_li_user}>
                <div className={styles.ox_user}>
                  <div>
                    <img className={styles.ox_avatar} alt="avatar" src={avatar} />
                  </div>
                  <div className={styles.ox_user_name_email}>
                    <div className={styles.ox_user_name}>{fullName}</div>
                    <div>{email}</div>
                  </div>
                </div>
              </button>
              <button className={styles.ox_dropdown_li} onClick={handleSetting}>
                <div>{icSetting}</div>
                Setting
              </button>
              <button onClick={onLogOut} className={styles.ox_dropdown_li}>
                <div>{icLogout}</div>
                Sign out
              </button>
            </div>
            <div className={styles.ox_dropdown_secured}>Secured by {icLogo}</div>
          </div>
        )}
      </div>
    </div>
  )
}
const icLogout = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={styles.size6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
    />
  </svg>
)

const icSetting = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={styles.size6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)
