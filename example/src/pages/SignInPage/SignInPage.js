import React from "react"
import { SignIn } from "@oneauxilia/oneauxilia-react"

export default function SignInPage() {
  return (
    <div className="bg_login">
      <SignIn path="/sign-in" />
    </div>
  )
}
