import axios from "axios"
import { getJWT, getPublishableKey, getToken } from "../lib/cookie"

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
          "Content-Type": "application/json",
          "Tenant-Header": getPublishableKey(),
          "OneAuxilia-DB-JWT": `Oneauxilia ${getJWT()}`
        }
        if (window.location.origin === "http://localhost:3000") config.headers.mode = "development"
        const access_token = getToken()
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

  instance.interceptors.response.use(function (response) {
    try {
      if (response.status >= 200 && response.status < 300) return response.data
      return Promise.reject(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return instance
}
