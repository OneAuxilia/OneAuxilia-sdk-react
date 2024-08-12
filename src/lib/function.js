import { authStrategies } from "./const"
import Cookies from "js-cookie"

export function getAuthStrategies(auStrategies) {
  let strategies = []
  if (auStrategies) strategies = authStrategies?.filter((i) => auStrategies[i].is_enable)
  return strategies
}

export function getAuthMultiFactor(auMultiFactor) {
  let multiFactor = []
  if (auMultiFactor) multiFactor = auMultiFactor?.filter((i) => i.is_enable)
  return multiFactor.map((i) => i.type)
}

export function convertDataSignIn({ token, user }) {
  if (!user?.id) {
    Cookies.set("isSignedIn", false)
    return { isSignedIn: false }
  }
  Cookies.set("isSignedIn", true)
  return {
    ...user,
    ...token,
    fullName: user.first_name + " " + user.last_name,
    userId: user.id,
    isSignedIn: true,
    isLoaded: true
  }
}

export function convertDataSignOut() {
  Cookies.set("isSignedIn", false)
  return {
    isSignedIn: false,
    userId: false,
    isLoaded: true
  }
}

export function convertDataFirstLogin({ user }) {
  let initFirstSignIn = {
    email: user.email,
    phone: user.phone,
    username: user.username,
    appName: "App test"
  }
  Cookies.set("firstSignIn", JSON.stringify(initFirstSignIn))
  return initFirstSignIn
}
