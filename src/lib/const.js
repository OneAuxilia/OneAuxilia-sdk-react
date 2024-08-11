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
