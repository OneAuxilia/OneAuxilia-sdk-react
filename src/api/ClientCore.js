// import { getPublishableKey } from "../lib/cookie"
import getInstanceAxios from "./request"
// const intansce = getPublishableKey()
const baseURL = window.location.origin
const baseDomain = `${baseURL}/`

export default getInstanceAxios(baseDomain)
