import Client from "../ClientCore"
const version = "api/v1"
const resource = version

function signIn(data) {
  return Client.post(`${resource}/sign_in_tokens/`, data)
}
function signInSocial(data) {
  return Client.post(`${resource}/sign_in_tokens/social/`, data)
}
function signUp(data) {
  return Client.post(`${resource}/sign_ups/`, data)
}
function signOut(session_id) {
  return Client.post(`${resource}/${session_id}/sign_outs/`)
}
function prepareFirstfactor2(data) {
  //strategy email_or_phone
  return Client.post(`${resource}/prepare_first_factor`, data)
}
function attemptFirstfactor3(data) {
  //strategy email_or_phone code
  return Client.post(`${resource}/attempt_first_factor`, data)
}
function prepareSecondfactor4(data) {
  //strategy email_or_phone
  return Client.post(`${resource}/prepare_second_factor`, data)
}
function attemptSecondfactor5(data) {
  // strategy email_or_phone code
  return Client.post(`${resource}/attempt_second_factor`, data)
}
function genFactorSecretkey(user_id, data) {
  // strategy email_or_phone code
  return Client.put(`${resource}/auth/update_secret_key/${user_id}/`, data)
}

function genCode(data) {
  return Client.post(`${resource}/generate/`, data)
}
function validAuthProfile(data) {
  return Client.post(`${resource}/auth/validate/`, data)
}
function validSignIn(data) {
  return Client.post(`${resource}/auth/validate/sign_ins`, data)
}
function recoveryCode(data) {
  return Client.post(`${resource}/auth/regenerate_recovery_codes/`, data)
}
function verifyCode(data) {
  return Client.post(`${resource}/verify/`, data)
}
function update2Fa(user_id, data) {
  return Client.post(`${resource}/auth/update_secret_key/${user_id}`, data)
}
function validCode(data) {
  return Client.post(`${resource}/auth/valid_recovery_codes/`, data)
}
function getConfig() {
  return Client.get(`${resource}/environment/`)
}
function devBrowser() {
  return Client.post(`${resource}/dev_browser/`)
}
function gets(params) {
  return Client.get(`${resource}/`, { params })
}
function getProfile(id) {
  return Client.get(`${resource}/members/view_profiles/`)
}
function create(data) {
  return Client.post(`${resource}/`, data)
}
function update(id, data) {
  return Client.put(`${resource}/${id}/`, data)
}
function changePassword(id, data) {
  return Client.put(`${resource}/${id}/change-password/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/${id}/`)
}

const api = {
  gets,
  signIn,
  signInSocial,
  prepareFirstfactor2,
  attemptFirstfactor3,
  prepareSecondfactor4,
  attemptSecondfactor5,
  genFactorSecretkey,
  signUp,
  signOut,
  genCode,
  verifyCode,
  validSignIn,
  getConfig,
  devBrowser,
  getProfile,
  create,
  update,
  update2Fa,
  validCode,
  validAuthProfile,
  recoveryCode,
  changePassword,
  remove
}
export default api
