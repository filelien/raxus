export const AUTH_KEY = "raxus_auth_v1"
export const INITIALIZED_KEY = "raxus_init_v1"
export const PROFILE_KEY = "raxus_profile_v1"
export const PERMISSIONS_KEY = "raxus_permissions_v1"

export function isAuthenticated() {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

export function isInitialized() {
  if (typeof window === "undefined") return false
  return localStorage.getItem(INITIALIZED_KEY) === "true"
}

export function setInitialized(initialized: boolean) {
  if (typeof window === "undefined") return
  if (initialized) {
    localStorage.setItem(INITIALIZED_KEY, "true")
  } else {
    localStorage.removeItem(INITIALIZED_KEY)
  }
}

export function login(email: string, password: string) {
  const validEmail = "admin@raxus.com"
  const validPassword = "raxus"

  if (email.trim().toLowerCase() === validEmail && password === validPassword) {
    localStorage.setItem(AUTH_KEY, "true")
    // Force re-initialization after a fresh login.
    setInitialized(false)
    return true
  }

  return false
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(INITIALIZED_KEY)
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(PERMISSIONS_KEY)
}
