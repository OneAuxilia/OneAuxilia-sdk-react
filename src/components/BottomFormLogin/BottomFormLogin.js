import React from "react"
import useStore from "../Context"
import styles from "./styles.module.css"

export default function BottomFormLogin({ isSignIn, step }) {
  const { routerPush } = useStore()
  return (
    <div className={styles.ox_footer}>
      {step === 1 && (
        <div className={styles.footer_signin}>
          <div>Already have an account?</div>
          <div
            className={styles.link}
            onClick={() => routerPush(isSignIn ? "/sign-up" : "/sign-in")}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </div>
        </div>
      )}
      <div className={styles.footer_secured}>
        <div>Secured by</div>
        <div className={styles.ox_logo_bottom}>{icLogo} onexilia</div>
      </div>
    </div>
  )
}
const icLogo = (
  <svg width="16" height="16" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30.5619 7.17014L21.9843 2.19792C19.4387 0.725694 16.3121 0.725694 13.7665 2.19792L5.18886 7.17014C2.64325 8.64236 1.09375 11.3646 1.09375 14.2813V24.2257C1.09375 27.1701 2.64325 29.8924 5.18886 31.3646L11.1932 34.8368C11.6082 35.0868 12.1616 34.8368 12.2446 34.3368L13.1577 28.7257C13.2131 28.3646 13.047 27.9757 12.715 27.7813C9.72669 25.9757 7.76214 22.6146 7.92816 18.809C8.14951 13.6424 12.383 9.44792 17.5572 9.28125C23.2018 9.11458 27.8226 13.6424 27.8226 19.2535C27.8226 22.8368 25.9411 26.0035 23.0911 27.7535C22.7591 27.9479 22.5931 28.3368 22.6761 28.6979L23.6445 34.2535C23.7275 34.7535 24.2809 35.0035 24.696 34.7535L30.5619 31.3646C33.1076 29.8924 34.6571 27.1701 34.6571 24.2257V14.2813C34.6571 11.3646 33.0799 8.64236 30.5619 7.17014Z"
      fill="#0E2026"
    />
    <path
      d="M22.428 18.7813C22.7047 21.6702 20.2973 24.1147 17.4195 23.8091C15.2888 23.5869 13.5455 21.8647 13.3241 19.7258C13.0197 16.8091 15.4548 14.3924 18.3326 14.6702C20.491 14.8924 22.2066 16.6147 22.428 18.7813Z"
      fill="url(#paint0_linear_2805_8015)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2805_8015"
        x1="13.2447"
        y1="19.2379"
        x2="22.4791"
        y2="19.2379"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A900FF" />
        <stop offset="1" stopColor="#8C06F9" />
      </linearGradient>
    </defs>
  </svg>
)
