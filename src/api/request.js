import axios from "axios"
import { getJWT, getPublishableKey, getTenantHeader, removeJWT } from "../lib/cookie"

const isLocal = window.location.origin === "http://localhost:3000"
export default function getInstanceAxios(baseAPI) {
  const instance = axios.create({
    withCredentials: true,
    baseURL: baseAPI
  })

  instance.interceptors.request.use(
    async function (config) {
      try {
        config.headers = {
          Accept: "application/json",
          "Content-Type": "application/json"
        }

        if (getPublishableKey()) {
          config.headers["publisher-Key"] = getPublishableKey()
        }
        if (getJWT()) config.headers["OneAuxilia-DB-JWT"] = `Oneauxilia ${getJWT()}`
        if (isLocal) {
          // config.headers.mode = "development"
          config.headers["Tenant-Header"] = getTenantHeader()
        }
        // const access_token = getToken()
        // if (access_token) config.headers["Authorization"] = `Bearer ${access_token}`
        return config
      } catch (e) {
        console.log(e)
      }
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      try {
        if (response.status >= 200 && response.status < 300) return response.data
        return Promise.reject(response.data)
      } catch (error) {
        return Promise.reject(error?.response?.data)
      }
    },
    function (error) {
      if (error.response.status === 401) {
        removeJWT()
        window.location.reload()
      }
      return Promise.reject(error?.response?.data)
    }
  )
  return instance
}
