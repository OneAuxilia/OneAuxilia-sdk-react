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
  GITHUB: "github",
  MICROSOFT: "microsoft"
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
  GOOGLE: "373252863162-cs4lt52k28k9v2uhj6coagup9rkd9cec.apps.googleusercontent.com",
  FACEBOOK: "973830119962083"
}
// FB_CLIENT_SERCRET : 28e9489e04bc8076d3ee6a8b2e16f78f
export const GOOGLE_GIT = "ac56fad434a3a3c1561e"

export const emailSettingKey = {
  is_allow_sign_in: "is_allow_sign_in",
  is_need_verify_at_sign_up: "is_need_verify_at_sign_up",
  is_required: "is_required",
  is_verification_code: "is_verification_code",
  is_verification_link: "is_verification_link"
}

export const domainProxy = "https://auth-social-proxy-dev.oneauxilia.co"

export const dfAvatar =
  "https://sgp1.vultrobjects.com/oneauxilia-homepage-image/images/a1d23487-bce9-4c81-8b31-36f1ed10073b"
