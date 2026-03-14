"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isAuthenticated, logout } from "@/lib/auth"
import { getProfile, getPermissions } from "@/lib/session"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ name: string; email: string; role: string } | null>(null)
  const [permissions, setPermissions] = useState<{ isAdmin: boolean; canViewAnalytics: boolean } | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login")
      return
    }

    setProfile(getProfile())
    setPermissions(getPermissions())
  }, [router])

  if (!profile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-sm text-slate-400">Chargement du profil…</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-10 shadow-xl">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">{profile.name}</h1>
              <p className="text-sm text-slate-400">{profile.email}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <Shield className="h-3.5 w-3.5" />
                Role: <span className="font-semibold text-slate-200">{profile.role}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                logout()
                router.replace("/login")
              }}
            >
              Déconnexion
            </Button>
            <Button
              onClick={() => {
                router.push("/dashboard")
              }}
            >
              Retour au dashboard
            </Button>
          </div>
        </div>
      </div>

      {permissions && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-100">Permissions</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <span className="font-medium text-slate-200">Admin :</span> {permissions.isAdmin ? "Oui" : "Non"}
              </li>
              <li>
                <span className="font-medium text-slate-200">Analyse :</span> {permissions.canViewAnalytics ? "Oui" : "Non"}
              </li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-100">Raccourcis</h2>
            <div className="mt-3 grid gap-2 text-sm text-slate-400">
              <Button variant="outline" size="sm" onClick={() => router.push("/settings")}>Paramètres</Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>Tableau de bord</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
