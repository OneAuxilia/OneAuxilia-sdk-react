import React, { useEffect, useState } from "react"
import useComponentVisible from "../ClickOutside"
import styles from "./dropdown.module.css"

export default function Select({ content, children }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const [open, setOpen] = useState()

  function onShow(event) {
    if (!open) {
      setIsComponentVisible(true)
      setTimeout(() => {
        setOpen(true)
      }, 200)
    }
  }

  useEffect(() => {
    if (!isComponentVisible)
      setTimeout(() => {
        setOpen(false)
      }, 200)
  }, [isComponentVisible])

  return (
    <div>
      <div className={styles.ox_dropdown}>
        <div onClick={onShow}>{children}</div>
        {open && (
          <div
            ref={ref}
            className={styles.ox_dropdown_menu}
            style={{
              opacity: isComponentVisible ? 100 : 0
            }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  )
}
