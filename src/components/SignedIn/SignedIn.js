import React from "react"
import useStore from "../Context"

export default function SignedIn({ children }) {
  const { isSignedIn } = useStore()
  return <div>{isSignedIn && children}</div>
}
