import { authStrategies } from "./const"
import Cookies from "js-cookie"
const res = {
  account_portal_setting: {
    page: {
      "create-tenant": {
        path: "create-tenant",
        subdomain: "accounts"
      },
      "sign-in": {
        path: "sign-in",
        subdomain: "accounts"
      },
      "sign-up": {
        path: "sign-in",
        subdomain: "accounts"
      },
      "tenant-profile": {
        path: "tenant",
        subdomain: "accounts"
      },
      "user-profile": {
        path: "user",
        subdomain: "accounts"
      }
    },
    redirect: {
      "after-create-tenant": {
        path: ""
      },
      "after-leave-tenant": {
        path: ""
      },
      "after-sign-in": {
        path: ""
      },
      "after-sign-up": {
        path: ""
      },
      "click-logo": {
        path: "",
        subdomain: "accounts"
      }
    },
    theme: {
      "background-color": "#FFFFFF",
      "primary-color": "#6C47FF"
    }
  },
  avatar_customization: {
    tenant: {
      background: {
        colors: ["#6C47FF"],
        type: "marble"
      },
      foreground: {
        color: "#FFFFFF",
        type: "silhouette"
      },
      icon: "tenant.png"
    },
    user: {
      background: {
        colors: ["#6C47FF"],
        type: "marble"
      },
      foreground: {
        color: "#FFFFFF",
        type: "silhouette"
      },
      icon: "user.png"
    }
  },
  general_customization: {
    additional_setting: {},
    path: {
      component: {
        after_sign_out: {
          is_user_on_account_portal: true,
          path: ""
        },
        sign_in: {
          is_user_on_account_portal: true,
          path: ""
        },
        sign_up: {
          is_user_on_account_portal: true,
          path: ""
        }
      },
      development_host: "",
      home: ""
    }
  },
  social_connections: {
    providers: [
      {
        auth_provider: "google",
        is_enable: true,
        order: 1
      },
      {
        auth_provider: "facebook",
        is_enable: false,
        order: 2
      },
      {
        auth_provider: "apple",
        is_enable: false,
        order: 3
      },
      {
        auth_provider: "github",
        is_enable: false,
        order: 4
      },
      {
        auth_provider: "microsoft",
        is_enable: false,
        order: 5
      }
    ]
  },
  tenant_setting: {
    is_enable: false,
    setting: {
      limited_member: 5,
      user_initial_role: "org:admin",
      user_relation: "CASCADE"
    }
  },
  user_general_setting: {
    authentication_strategies: {
      email_verification_code: {
        is_enable: true,
        setting: {}
      },
      email_verification_link: {
        is_enable: true,
        setting: {
          is_verification_link_required_same_device: true
        }
      },
      passkey: {
        is_enable: true,
        setting: {}
      },
      password: {
        is_enable: true,
        setting: {
          allow_special_character: true,
          alphabetic_letter_required: true,
          lowercase_letter_required: true,
          numbers_required: true,
          password_enforce_history: 3,
          password_max_length: 20,
          password_min_length: 7,
          special_symbol_required: true
        }
      },
      sms_verification_code: {
        is_enable: true,
        setting: {}
      }
    },
    contact: {
      email: {
        is_enable: true,
        setting: {
          is_allow_sign_in: true,
          is_need_verify_at_sign_up: true,
          is_required: true,
          is_verification_code: true,
          is_verification_link: false
        }
      },
      phone_number: {
        is_enable: false,
        setting: {}
      }
    },
    multi_factors: {
      methods: [
        {
          description: "Send the user an one-time verification code via SMS",
          is_enable: false,
          name: "SMS verification code",
          order: 1,
          type: "sms"
        },
        {
          description:
            "Require the user to retrieve a time-based authentication code from a service such as Google Authenticator",
          is_enable: true,
          name: "Authenticator application",
          order: 2,
          type: "auth_code"
        },
        {
          description: "Generate a list of unique codes a user can save and use once",
          is_enable: true,
          name: "Backup codes",
          order: 3,
          type: "email"
        }
      ]
    },
    permission: {
      is_allow_user_create_organization: true,
      is_allow_user_delete_account: true
    },
    personal: {
      name: {
        is_enable: true,
        setting: {
          is_must_provider_in_sign_up: false
        }
      }
    },
    username: {
      username: {
        is_enable: false,
        setting: {
          is_allow_sign_in: true,
          is_required: true
        }
      }
    }
  }
}

export function getAuthStrategies(au_strategies) {
  let strategies = []
  if (!au_strategies) strategies = authStrategies?.filter((i) => au_strategies[i].is_enable)
  return strategies
}

export function convertDataSignIn({ token, user }) {
  if (!user?.id) {
    Cookies.set("isSignedIn", false)
    return { isSignedIn: false }
  }
  Cookies.set("isSignedIn", true)
  return {
    ...user,
    ...token,
    fullName: user.first_name + " " + user.last_name,
    userId: user.id,
    isSignedIn: true,
    isLoaded: true
  }
}

export function convertDataSignOut() {
  Cookies.remove("publishableKey")
  Cookies.remove("__session")
  Cookies.remove("__one_auxilia_session_id")
}
