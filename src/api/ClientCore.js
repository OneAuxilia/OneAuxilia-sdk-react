import { getPublishableKey } from "../lib/cookie"
import getInstanceAxios from "./request"
const baseURL = window.location.origin

function getDomain() {
  const key = getPublishableKey()
  if (key && key?.includes("pk_prod")) {
    const { host } = window.location
    return window.location.origin.replace(host, `oneauxilia.${host}`)
  }
  return baseURL === "http://localhost:3000" ? "https://core-api-dev.oneauxilia.co" : baseURL
}

export default getInstanceAxios(getDomain())
