/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import useStore from '../Context'
import logo from './avatar.png'
const domain = 'https://core-api-dev.oneauxilia.co'
const headers = {
  'Content-Type': 'application/json',
  'Tenant-Header': 'ins_ZA67hkwyslHH',
  'Template-Slug': '1'
}

export default function SignIn({ children }) {
  const { setLogin, setLoading, userId, routerPush } = useStore()
  const [name, setName] = useState('huyhq@gmail.com')
  const [password, setPassWord] = useState('abc@123Xy')

  function onChangeName(e) {
    setName(e.target.value)
  }
  function onChangePassword(e) {
    setPassWord(e.target.value)
  }

  async function onLogin() {
    try {
      const url = `${domain}/api/v1/sign_in_tokens/`
      const bodydata = { username: name, password }
      const headers = {
        'Content-Type': 'application/json',
        'Tenant-Header': 'ins_ZA67hkwyslHH'
      }
      setLoading(false)
      const { data } = await axios.post(url, bodydata, { headers: headers })
      const { token, user } = data?.data
      const fullName = user.first_name + ' ' +user.last_name
      setLogin({
        ...token,
        ...user,
        userId: user?.id,
        fullName
      })
      setLoading(true)
      routerPush('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  async function getConfig() {
    await axios.get(`${domain}/api/v1/environment/`, {
      headers: headers
    })
  }

  useEffect(() => {
    getConfig()
  }, [])
  console.log('useStore()', useStore())

  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>
            <div className={styles.ox_header}>
              <div className={styles.ox_text_header}>Sign in to App</div>
              <div className={styles.ox_text_header_sub}>
                Welcome back! Please sign in to continue
              </div>
            </div>

            <div className={styles.ox_input_fields_name}>
              <div className={styles.ox_label_input_name}>
                <div className={styles.ox_label_email}>Email</div>
                <div>Phone</div>
              </div>

              <input
                className={styles.ox_input}
                value={name}
                placeholder="Email..."
                onChange={onChangeName}
              />
            </div>

            <div className={styles.ox_input_fields_password}>
              <div className={styles.ox_label_input_name}>
                <div className={styles.ox_label_email}>Password</div>
              </div>
              <input
                className={styles.ox_input}
                value={name}
                type="password"
                placeholder="Email..."
                onChange={onChangePassword}
              />
            </div>

            <button className={styles.ox_button} onClick={onLogin}>
              Continue
            </button>
          </div>
          <div className={styles.ox_footer}>
            <div className={styles.footer_signin}>
              <div>Already have an account?</div>
              <div
                className={styles.link}
                onClick={() => routerPush('/sign-up')}
              >
                Sign up
              </div>
            </div>
            <div className={styles.footer_secured}>
              <div>Secured by</div>
              <div>
                <img src='/avatar.png' /> Onxilia11
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
