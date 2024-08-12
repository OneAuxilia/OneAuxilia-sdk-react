import React from "react"
import { GOOGLE_CLIENT_KEY, GOOGLE_GIT } from "../../lib/const"
import GitHubLogin from "react-github-login"
import GoogleLogin from "react-google-login"

export default function LoginSocial() {
  function responseGoogle(params) {}
  function onSuccess(params) {}
  function onFailure(params) {}
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="col-span-1">
        <GitHubLogin
          clientId={GOOGLE_GIT}
          onSuccess={onSuccess}
          onFailure={onFailure}
          icon={true}
          className="w-full"
          buttonText={
            <div className="w-full">
              <button className="w-full">{icGit} GitHub</button>
            </div>
          }
        />
      </div>
      <div className="col-span-1">
        <GoogleLogin
          clientId={GOOGLE_CLIENT_KEY}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={() => (
            <div>
              <button className="w-full">{icGoogle} Google</button>
            </div>
          )}
        />
      </div>
    </div>
  )
}

const icGoogle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height="19.5"
    viewBox="0 0 600 600"
    width="19.5"
  >
    <path
      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
      fill="#4285f4"
    />
    <path
      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
      fill="#34a853"
    />
    <path
      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
      fill="#fbbc04"
    />
    <path
      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
      fill="#ea4335"
    />
  </svg>
)

const icGit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height="19.5"
    viewBox="0 0 1024 1024"
    width="19.5"
  >
    <path
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      fill="#1B1F23"
      fillRule="evenodd"
      transform="scale(64)"
    />
  </svg>
)
