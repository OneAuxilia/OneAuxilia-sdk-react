import Cookies from "js-cookie"

export function getPublishableKey() {
  return Cookies.get("publishableKey")
}
export function setToken(accessToken) {
  return Cookies.set("accessToken", accessToken)
}
export function getToken() {
  return Cookies.get("accessToken")
}
export function getSessionId() {
  return Cookies.get("__one_auxilia_session_id")
}
export function setSignIn(accessToken) {
  return Cookies.set("accessToken", accessToken)
}
export function getSignedIn() {
  return Cookies.get("isSignedIn") || false
}
