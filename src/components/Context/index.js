import React, { useReducer, useMemo, createContext, useContext, useEffect } from "react"
import Cookies from "js-cookie"
import KEY from "./Const"
import { getFirstSignIn, getJWT, getSignedIn } from "../../lib/cookie"
import { apiCore } from "../../api"
import {
  convertDataFirstLogin,
  convertDataSignIn,
  convertDataSignOut,
  settingTheme
} from "../../lib/function"

function initialState(props) {
  const isSignedIn = getSignedIn()
  return {
    isLoaded: isSignedIn ? false : true,
    userId: false,
    isSignedIn,
    user: {
      fullName: "",
      firstName: "",
      lastName: ""
    },
    signUp: {
      status: false
    },
    invitations: {
      infinite: true
    },
    configLoaded: false,
    user_general_setting: {
      authentication_strategies: false,
      multi_factors: {
        methods: false
      }
    },
    firstSignIn: getFirstSignIn(),
    ...props
  }
}

function reducer(state, action) {
  switch (action.type) {
    case KEY.SET_AUTH:
      return { ...state, ...action.value }
    case KEY.SET_CONFIG:
      return { ...state, ...action.value, configLoaded: true }
    case KEY.GET_USER_PROFILE:
      return { ...state, ...action.value }
    case KEY.SET_LOGIN:
      return { ...state, ...action.value }
    case KEY.LOADING:
      return { ...state, isLoaded: action.value }
    case KEY.FIRST_LOGIN:
      return {
        ...state,
        firstSignIn: { ...state.firstSignIn, ...action.value }
      }
    case KEY.LOG_OUT:
      return { ...state, ...action.value }
    default:
      throw new Error()
  }
}

const OneAuxiliaContext = createContext(initialState())
OneAuxiliaContext.displayName = "onauxilia"

export function StoreProvider({ routerPush, routerReplace, ...rest }) {
  const [state, dispatch] = useReducer(reducer, initialState(rest))

  const setAuthStore = (value) => {
    return dispatch({ type: KEY.SET_AUTH, value })
  }
  const setConfig = (value) => {
    if (value?.branding_customization) settingTheme(value.branding_customization)
    return dispatch({ type: KEY.SET_CONFIG, value })
  }
  const onSignOut = () => {
    dispatch({ type: KEY.LOG_OUT, value: convertDataSignOut() })
  }
  const setLoaded = (value) => {
    return dispatch({ type: KEY.LOADING, value })
  }
  const getProfile = (value) => {
    return dispatch({ type: KEY.GET_USER_PROFILE, value })
  }

  const setFirstLogin = (value) => {
    return dispatch({ type: KEY.FIRST_LOGIN, value: convertDataFirstLogin(value) })
  }
  const setLogin = (value) => {
    return dispatch({ type: KEY.SET_LOGIN, value: convertDataSignIn(value) })
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await apiCore.getProfile()
        setLogin({ user: data })
      } catch (error) {
        console.log(error)
        onSignOut()
      } finally {
      }
    }

    if (state.isSignedIn) getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isSignedIn])

  useEffect(() => {
    Cookies.set("publishableKey", rest.publishableKey)
    async function getDev() {
      try {
        const { data } = await apiCore.devBrowser()
        Cookies.set("OneAuxilia-DB-JWT", data?.token)
        getConfig()
      } catch (error) {
        console.log(error)
      }
    }

    async function getConfig() {
      try {
        const { data } = await apiCore.getConfig()
        setConfig(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (getJWT()) {
      getConfig()
    } else {
      getDev()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      setAuthStore,
      getProfile,
      setLogin,
      setConfig,
      routerPush,
      routerReplace,
      setLoaded,
      onSignOut,
      setFirstLogin
    }),
    [routerPush, routerReplace, state]
  )

  console.log("______store", value)
  return <OneAuxiliaContext.Provider value={value} {...rest} />
}

const useStore = () => {
  const context = useContext(OneAuxiliaContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useStore
