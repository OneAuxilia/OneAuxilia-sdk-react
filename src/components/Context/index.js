import React, { useReducer, useMemo, createContext, useContext, useEffect } from "react"
import Cookies from "js-cookie"
import KEY from "./Const"
import { getSignedIn } from "../../lib/cookie"
import { apiCore } from "../../api"
import { convertDataSignIn, convertDataSignOut } from "../../lib/function"

function initialState() {
  return {
    isLoaded: true,
    userId: false,
    isSignedIn: false,
    session: {},
    user: {
      fullName: "",
      firstName: "",
      lastName: "",
      publicMetadata: {}
    },
    signUp: {
      status: false
    },
    invitations: {
      infinite: true
    },
    user_general_setting: {
      authentication_strategies: {}
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case KEY.SET_AUTH:
      return { ...state, ...action.value }
    case KEY.SET_CONFIG:
      return { ...state, ...action.value }
    case KEY.GET_USER_PROFILE:
      return { ...state, ...action.value }
    case KEY.SET_LOGIN:
      return { ...state, ...action.value }
    case KEY.LOADING:
      return { ...state, isLoaded: action.value }
    case KEY.LOG_OUT:
      convertDataSignOut()
      return { ...state, isSignedIn: false }
    default:
      throw new Error()
  }
}

const MyContext = createContext(initialState())
MyContext.displayName = "MyContext"

export function StoreProvider({ routerPush, routerReplace, ...rest }) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const setAuthStore = (value) => {
    return dispatch({ type: KEY.SET_AUTH, value })
  }
  const setConfig = (value) => {
    return dispatch({ type: KEY.SET_CONFIG, value })
  }
  const onSignOut = () => {
    dispatch({ type: KEY.LOG_OUT })
  }
  const setLoaded = (value) => {
    return dispatch({ type: KEY.LOADING, value })
  }
  const getProfile = (value) => {
    return dispatch({ type: KEY.GET_USER_PROFILE, value })
  }

  const setLogin = (value) => {
    Cookies.set("isSignedIn", true)
    return dispatch({ type: KEY.SET_LOGIN, value: convertDataSignIn(value) })
  }

  useEffect(() => {
    async function getProfile() {
      try {
        setLoaded(false)
        const { data } = await apiCore.getProfile()
        const fullName = data.first_name + " " + data.last_name
        setLogin({
          ...data,
          isSignedIn: true,
          userId: data?.id,
          fullName
        })
      } catch (error) {
        console.log(error)
        onSignOut()
      } finally {
        setLoaded(true)
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
    getConfig()
    if (getSignedIn()) getProfile()
    Cookies.set("publishableKey", rest.publishableKey)
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      setAuthStore,
      getProfile,
      setLogin,
      routerPush,
      routerReplace,
      setLoaded,
      onSignOut
    }),
    [routerPush, routerReplace, state]
  )
  useEffect(() => {
    if (state.isSignedIn) routerPush("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isSignedIn])

  console.log("______store", value)

  return <MyContext.Provider value={value} {...rest} />
}

const useStore = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useStore
