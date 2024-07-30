import React, { useReducer, useMemo, createContext, useContext, useEffect } from "react"
import Cookies from "js-cookie"
import KEY from "./Const"
import { getToken } from "../../lib/cookie"
import { apiCore } from "../../api"

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
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case KEY.SET_AUTH:
      return { ...state, ...action.value }
    case KEY.GET_USER_PROFILE:
      return { ...state, ...action.value }
    case KEY.SET_LOGIN:
      return { ...state, ...action.value }
    case KEY.LOADING:
      return { ...state, isLoaded: action.value }
    case KEY.LOG_OUT:
      return initialState()
    default:
      throw new Error()
  }
}

const MyContext = createContext(initialState())
MyContext.displayName = "MyContext"

export function StoreProvider({ routerPush, routerReplace, ...rest }) {
  Cookies.set("publishableKey", rest.publishableKey)
  const [state, dispatch] = useReducer(reducer, initialState())

  const setAuthStore = (value) => {
    return dispatch({ type: KEY.SET_AUTH, value })
  }
  const onSignOut = () => {
    dispatch({ type: KEY.LOG_OUT })
  }
  const setLoading = (value) => {
    return dispatch({ type: KEY.LOADING, value })
  }
  const getProfile = (value) => {
    return dispatch({ type: KEY.GET_USER_PROFILE, value })
  }

  const setLogin = (value) => {
    return dispatch({ type: KEY.SET_LOGIN, value })
  }

  useEffect(() => {
    async function get() {
      try {
        const res = await apiCore.getProfile()
      } catch (error) {
        console.log(error)
      }
    }

    if (getToken()) get()
  }, [])
  const value = useMemo(
    () => ({
      ...state,
      setAuthStore,
      getProfile,
      setLogin,
      routerPush,
      routerReplace,
      setLoading,
      onSignOut
    }),
    [routerPush, routerReplace, state]
  )
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
