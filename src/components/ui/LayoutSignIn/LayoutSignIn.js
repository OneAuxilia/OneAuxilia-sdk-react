import React from "react"
import styles from "./styles.module.css"
import useStore from "../../Context"

export default function LayoutSignIn({ children, step, isSignIn, ...rest }) {
  const { routerPush } = useStore()
  return (
    <div className={styles.pageContainer}>
      <div className={styles.componentContainer}>
        <div className={styles.oxBox}>
          <div className={styles.ox_form}>{children}</div>
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
              <div className={styles.ox_logo_bottom}>{icLogo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const icLogo = (
  <svg width="100" height="16" viewBox="0 0 100 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1768_36358)">
      <path
        d="M13.0746 3.51042L9.30426 1.37946C8.18531 0.748512 6.81095 0.748512 5.692 1.37946L1.92163 3.51042C0.802682 4.14137 0.121582 5.30804 0.121582 6.55804V10.8199C0.121582 12.0818 0.802682 13.2485 1.92163 13.8795L4.56089 15.3676C4.74333 15.4747 4.98658 15.3676 5.02307 15.1533L5.42443 12.7485C5.44875 12.5938 5.37578 12.4271 5.22983 12.3438C3.91628 11.5699 3.05274 10.1295 3.12572 8.49851C3.22302 6.28423 5.08388 4.48661 7.35826 4.41518C9.83941 4.34375 11.8705 6.28423 11.8705 8.68899C11.8705 10.2247 11.0435 11.5818 9.79076 12.3318C9.64481 12.4152 9.57184 12.5818 9.60832 12.7366L10.034 15.1176C10.0705 15.3318 10.3137 15.439 10.4962 15.3318L13.0746 13.8795C14.1936 13.2485 14.8747 12.0818 14.8747 10.8199V6.55804C14.8747 5.30804 14.1814 4.14137 13.0746 3.51042Z"
        fill="black"
      />
      <path
        d="M9.49936 8.48609C9.62099 9.72418 8.56279 10.7718 7.29781 10.6408C6.36125 10.5456 5.59496 9.80751 5.49766 8.89085C5.36386 7.64085 6.43423 6.60513 7.6992 6.72418C8.64793 6.81942 9.40205 7.55751 9.49936 8.48609Z"
        fill="url(#paint0_linear_1768_36358)"
      />
      <path
        d="M17.0151 15.2978V5.42876H19.399V6.50019C20.1409 5.72638 21.2355 5.23828 22.4274 5.23828C24.7626 5.23828 26.3803 6.85733 26.3803 9.35733V15.2978H23.9964V9.85733C23.9964 8.20257 23.1085 7.42876 21.8436 7.42876C20.4693 7.42876 19.399 8.41685 19.399 9.97638V15.3097H17.0151V15.2978Z"
        fill="black"
      />
      <path
        d="M33.2522 5.23828C36.1103 5.23828 38.0685 7.2859 38.0685 10.2264C38.0685 10.5954 38.0077 11.0121 37.9712 11.4049H30.4669C30.8683 12.6311 31.9994 13.3811 33.4954 13.3811C34.4684 13.3811 35.3928 13.0478 36.0009 12.393L37.509 13.8692C36.536 14.9169 35.1252 15.4883 33.4711 15.4883C30.4305 15.4883 28.1074 13.2621 28.1074 10.3573C28.1074 7.45257 30.321 5.23828 33.2522 5.23828ZM30.4305 9.59542H35.8306C35.6238 8.19066 34.5657 7.32161 33.2157 7.32161C31.817 7.33352 30.6251 8.23828 30.4305 9.59542Z"
        fill="black"
      />
      <path
        d="M38.4697 15.2961L43.9915 1.09375H46.5943L52.116 15.2961H49.5498L48.4065 12.3557H42.1793L41.036 15.2961H38.4697ZM47.5673 10.0342L45.305 4.2128L43.0307 10.0342H47.5673Z"
        fill="black"
      />
      <path
        d="M55.3028 5.42969V10.8702C55.3028 12.513 56.1907 13.2987 57.4556 13.2987C58.8299 13.2987 59.9002 12.2868 59.9002 10.7511V5.42969H62.2841V15.2987H59.9002V14.2273C59.1583 15.0011 58.0637 15.4892 56.8718 15.4892C54.5366 15.4892 52.9189 13.8702 52.9189 11.3702V5.42969H55.3028Z"
        fill="black"
      />
      <path
        d="M63.6099 15.2987L67.587 10.1916L63.9018 5.44159H66.8694L69.0708 8.23921L71.2722 5.42969H74.2399L70.5425 10.1916L74.5196 15.2987H71.5398L69.083 12.144L66.6018 15.2987H63.6099Z"
        fill="black"
      />
      <path
        d="M77.0369 0.894531C77.8275 0.894531 78.4478 1.52548 78.4478 2.27548C78.4478 3.04929 77.8275 3.68025 77.0369 3.68025C76.2463 3.68025 75.626 3.04929 75.626 2.27548C75.626 1.52548 76.2463 0.894531 77.0369 0.894531ZM75.8449 15.2993V5.43025H78.2289V15.2993H75.8449Z"
        fill="black"
      />
      <path d="M82.948 15.2976H80.564V0.5H82.948V15.2976Z" fill="black" />
      <path
        d="M86.4754 0.894531C87.266 0.894531 87.8863 1.52548 87.8863 2.27548C87.8863 3.04929 87.266 3.68025 86.4754 3.68025C85.6848 3.68025 85.0645 3.04929 85.0645 2.27548C85.0645 1.52548 85.6848 0.894531 86.4754 0.894531ZM85.2834 15.2993V5.43025H87.6674V15.2993H85.2834Z"
        fill="black"
      />
      <path
        d="M94.3928 5.23828C95.6577 5.23828 96.8375 5.89304 97.4943 6.65495V5.42876H99.8781V15.2978H97.4943V14.0359C96.8253 14.8454 95.6577 15.5002 94.3928 15.5002C91.5103 15.5002 89.394 13.1907 89.394 10.3692C89.394 7.54781 91.5103 5.23828 94.3928 5.23828ZM91.7657 10.3692C91.7657 11.9049 93.055 13.1669 94.6239 13.1669C96.1929 13.1669 97.4821 11.9049 97.4821 10.3692C97.4821 8.83352 96.1929 7.57161 94.6239 7.57161C93.0671 7.55971 91.7657 8.82161 91.7657 10.3692Z"
        fill="black"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1768_36358"
        x1="5.46274"
        y1="8.68174"
        x2="9.52184"
        y2="8.68174"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A900FF" />
        <stop offset="1" stopColor="#8C06F9" />
      </linearGradient>
      <clipPath id="clip0_1768_36358">
        <rect width="100" height="15" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)
