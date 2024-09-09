import { authStrategies } from "./const"
import Cookies from "js-cookie"

export function getAuthStrategies(auStrategies) {
  let strategies = []
  if (auStrategies) strategies = authStrategies?.filter((i) => auStrategies[i].is_enable)
  return strategies
}

export function getEmailSettingSignUp(contact) {
  try {
    if (contact.email.is_enable) return contact.email.setting
  } catch (error) {
    return {}
  }
}

export function getAuthMultiFactor(auMultiFactor) {
  let multiFactor = []
  if (auMultiFactor) multiFactor = auMultiFactor?.filter((i) => i.is_enable)
  return multiFactor.map((i) => i.type)
}

export function convertDataSignIn({ token, user }) {
  if (!user?.id) {
    Cookies.set("isSignedIn", false)
    return { isSignedIn: false }
  }
  Cookies.set("isSignedIn", true)
  if (token?.session_id) Cookies.set("session_id", token?.session_id)
  return {
    ...user,
    ...token,
    fullName: user.first_name + " " + user.last_name,
    userId: user.id,
    isSignedIn: true,
    isLoaded: true
  }
}

export function convertDataSignOut() {
  Cookies.set("isSignedIn", false)
  Cookies.remove("session_id")
  return {
    isSignedIn: false,
    userId: false,
    isLoaded: true
  }
}

export function convertDataFirstLogin(data) {
  let initFirstSignIn = {
    email: data.email,
    second_factor_type: data?.second_factor_type
  }
  Cookies.set("firstSignIn", JSON.stringify(initFirstSignIn))
  return initFirstSignIn
}

export function hexToRgba(hex, alpha) {
  if (!hex?.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    return null
  }

  hex = hex.replace(/^#/, "")
  let r, g, b
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16)
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16)
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16)
  } else {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function settingTheme({ color }) {
  try {
    const colorPrimary700 = color
    const color600 = hexToRgba(colorPrimary700, 0.7)
    // const color400 = hexToRgba(colorPrimary700, 0.4)
    document.documentElement.style.setProperty("--color-primary-700", colorPrimary700)
    document.documentElement.style.setProperty("--color-primary-600", color600)
    // document.documentElement.style.setProperty("--color-primary-400", color400)
  } catch (error) {
    console.log(error)
  }
}

export function getOtpByParams() {
  var url = new URL(window.location.href)
  return [url.searchParams.get("otp_code"), url.searchParams.get("email")]
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
export function capitalizeTxt(txt) {
  if (!txt) return ""
  return txt.charAt(0).toUpperCase() + txt.slice(1) //or if you want lowercase the rest txt.slice(1).toLowerCase();
}
export function hasNumber(str) {
  return /\d/.test(str)
}
export function hasLowercase(str) {
  return /(?=.*[a-z])/.test(str)
}
export function hasUppercase(str) {
  return /(?=.*[A-Z])/.test(str)
}
export function hasSpecial(str) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(str)
}
