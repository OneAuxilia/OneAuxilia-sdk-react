import { getPublishableKey } from "../lib/cookie"
import getInstanceAxios from "./request"
const intansce = getPublishableKey()
const baseDomain = `https:/${intansce}.oneauxilia.tech`
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
