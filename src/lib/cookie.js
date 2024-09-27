import Cookies from "js-cookie"

export function getPublishableKey() {
  let key = Cookies.get("publisher-Key")
  return key ? key : false
}
export function getTenantHeader() {
  return Cookies.get("tenantHeader")
}
export function getJWT() {
  return Cookies.get("OneAuxilia-DB-JWT")
}
export function removeJWT() {
  return Cookies.remove("OneAuxilia-DB-JWT")
}
export function setToken(accessToken) {
  return Cookies.set("accessToken", accessToken)
}
export function getToken() {
  return Cookies.get("accessToken")
}
export function getSessionId() {
  return Cookies.get("session_id")
}
export function setSignIn(accessToken) {
  return Cookies.set("accessToken", accessToken)
}
export function getSignedIn() {
  try {
    const isSignedIn = Cookies.get("isSignedIn")
    return JSON.parse(isSignedIn)
  } catch (error) {
    return false
  }
}

export function getFirstSignIn() {
  try {
    const firstSignIn = Cookies.get("firstSignIn")
    return JSON.parse(firstSignIn)
  } catch (error) {
    return {}
  }
}
