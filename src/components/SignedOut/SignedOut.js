import React from "react"
import useStore from "../Context"

export default function SignedOut({ children }) {
  const { userId } = useStore()

  return <div>{!userId && <button>{children}</button>}</div>
}
