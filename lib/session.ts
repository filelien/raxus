import { isInitialized, setInitialized, PROFILE_KEY, PERMISSIONS_KEY } from "./auth"

export type UserProfile = {
  name: string
  email: string
  role: "admin" | "user"
  avatarInitials: string
}

export type UserPermissions = {
  isAdmin: boolean
  canManageUsers: boolean
  canViewAnalytics: boolean
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserProfile
  } catch {
    return null
  }
}

export function getPermissions(): UserPermissions | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(PERMISSIONS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserPermissions
  } catch {
    return null
  }
}

export async function initializeSession(onStep?: (message: string) => void) {
  if (typeof window === "undefined") return

  if (isInitialized()) {
    onStep?.("Session déjà initialisée")
    return
  }

  const steps: Array<{ label: string; duration: number; run: () => Promise<void> }> = [
    {
      label: "Vérification du token",
      duration: 250,
      run: async () => {
        onStep?.("Vérification du token")
        await delay(250)
      },
    },
    {
      label: "Chargement du profil",
      duration: 300,
      run: async () => {
        onStep?.("Chargement du profil")
        await delay(350)
        const profile: UserProfile = {
          name: "Administrateur",
          email: "admin@raxus.com",
          role: "admin",
          avatarInitials: "AD",
        }
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
      },
    },
    {
      label: "Chargement des permissions",
      duration: 250,
      run: async () => {
        onStep?.("Chargement des permissions")
        await delay(250)
        const permissions: UserPermissions = {
          isAdmin: true,
          canManageUsers: true,
          canViewAnalytics: true,
        }
        localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions))
      },
    },
    {
      label: "Chargement des données principales",
      duration: 400,
      run: async () => {
        onStep?.("Chargement des données principales")
        await delay(400)
      },
    },
  ]

  for (const step of steps) {
    await step.run()
  }

  setInitialized(true)
  onStep?.("Prêt")
}
