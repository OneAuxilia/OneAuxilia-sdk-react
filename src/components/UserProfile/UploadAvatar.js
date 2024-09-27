import React, { useRef, useState } from "react"
import styles from "./styles.module.css"
import axios from "axios"
import { Button } from "../ui"

export default function UploadAvatar({ value, onChange }) {
  const [file, setFile] = useState(value)
  const refInput = useRef()
  async function onChangeFile(event) {
    const formData = new FormData()
    formData.append("file", event.target.files[0])
    const { data } = await axios.post(
      "https://upload-api-dev.oneauxilia.co/api/upload/image",
      formData
    )
    setFile(data?.image)
  }
  function onRemove() {
    onChange("")
  }
  function onClick() {
    refInput.current.click()
  }

  return (
    <div>
      <div className={styles.ox_box_btn_change_password}>
        <span className={styles.ox_span_avatar}>
          <img className={styles.ox_avatar} src={file} alt="avatar" />
        </span>

        <div>
          <input style={{ display: "none" }} ref={refInput} type="file" onChange={onChangeFile} />
          <div className={styles.ox_action_avatar}>
            <Button onClick={onClick} style={{ width: 120 }}>
              Upload
            </Button>
            <Button type="text" onClick={onRemove} style={{ width: 120, color: "#ef4444" }}>
              Remove
            </Button>
          </div>

          <div>Recommended size 1:1, up to 10MB</div>
        </div>
      </div>
    </div>
  )
}
