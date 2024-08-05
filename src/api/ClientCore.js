// import { getPublishableKey } from "../lib/cookie"
import getInstanceAxios from "./request"
// const intansce = getPublishableKey()
const baseURL = window.location.origin
const baseDomain =
  baseURL === "http://localhost:3000" ? "https://core-api-dev.oneauxilia.co" : baseURL

export default getInstanceAxios(baseDomain)
