import React, { useRef, useState } from "react"
import styles from "./styles.module.css"
import axios from "axios"
import { Button } from "../ui"
import { dfAvatar } from "../../lib/const"

export default function UploadAvatar({ value, onChange }) {
  const [file, setFile] = useState(value)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const refInput = useRef()

  async function onChangeFile(event) {
    try {
      setLoading(true)
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("file", file)
      if (file.size / 1024 / 1024 > 2) {
        setError("File size less than 2m")
        return
      }

      const { data } = await axios.post(
        "https://upload-api-dev.oneauxilia.co/api/upload/image",
        formData
      )
      if (error) setError("")
      setFile(data?.image)
      onChange(data?.image)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  function onRemove() {
    setFile(undefined)
    onChange("")
  }
  function onClick() {
    refInput.current.click()
  }

  return (
    <div>
      <div className={styles.ox_box_btn_change_password}>
        <span className={styles.ox_span_avatar}>
          <img className={styles.ox_avatar} src={file ? file : dfAvatar} alt="avatar" />
        </span>

        <div>
          <input style={{ display: "none" }} ref={refInput} type="file" onChange={onChangeFile} />
          <div className={styles.ox_action_avatar}>
            <Button onClick={onClick} style={{ width: 120 }} loading={loading}>
              Upload
            </Button>
            {file && (
              <Button type="text" onClick={onRemove} style={{ width: 120, color: "#ef4444" }}>
                Remove
              </Button>
            )}
          </div>

          <div>Recommended size 1:1, up to 2MB</div>
        </div>
      </div>
    </div>
  )
}
