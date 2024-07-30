import Client from "../ClientCore"
const version = "api/v1"
const resource = version

function signIn(data) {
  return Client.post(`${resource}/sign_in_tokens/`, data)
}
function signUp(data) {
  return Client.post(`${resource}/sign_ups/`, data)
}
function getConfig() {
  return Client.get(`${resource}/environment/`)
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
function changeStatus(id, data) {
  return Client.put(`${resource}/${id}/change-status/`, data)
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
  signUp,
  getConfig,
  getProfile,
  create,
  update,
  changeStatus,
  changePassword,
  remove
}
export default api
