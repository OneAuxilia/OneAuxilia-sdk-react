export const expireTime = 60

export const strategieCode = {
  PASSWORD: "password",
  EMAIL_LINK: "email_verification_link",
  EMAIL_CODE: "email_verification_code",
  SMS: "sms_verification_code",
  PASSKEY: "passkey"
}

export const authStrategies = [
  "password",
  "email_verification_code",
  "email_verification_link",
  "sms_verification_code",
  "passkey"
]

export const socialCode = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  LINKEDIN: "linkedin",
  GITHUB: "github"
}

export const authCodeMultiFactor = {
  AUTH_CODE: "auth_code",
  EMAIL: "email",
  SMS: "sms",
  NONE: "none"
}
export const authMultiFactor = ["auth_code", "email", "sms"]
export const stepStatus = {
  FIRST_FACTOR: "needs_first_factor",
  SECOND_FACTOR: "needs_second_factor",
  COMPLETED: "completed"
}
export const socialClientKey = {
  [socialCode.GOOGLE]: "373252863162-cs4lt52k28k9v2uhj6coagup9rkd9cec.apps.googleusercontent.com",
  [socialCode.FACEBOOK]: "973830119962083"
}
// FB_CLIENT_SERCRET : 28e9489e04bc8076d3ee6a8b2e16f78f
export const GOOGLE_GIT = "ac56fad434a3a3c1561e"
