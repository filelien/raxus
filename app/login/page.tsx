"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { login, isAuthenticated, isInitialized } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) return

    // If already authenticated, keep users in sync with initialization state.
    if (!isInitialized()) {
      router.replace("/loader")
    } else {
      router.replace("/dashboard")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!login(email, password)) {
      setError("Adresse e-mail ou mot de passe incorrect")
      return
    }

    // Redirect to the loader which will prepare the dashboard data.
    router.replace("/loader")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-purple-500/30 blur-3xl" />
        <div className="absolute left-10 top-48 h-72 w-72 rounded-full bg-gradient-to-r from-fuchsia-500/40 via-pink-500/20 to-transparent blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border border-slate-700/50 bg-slate-950/70 p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Connexion à RAXUS</h1>
          <p className="max-w-sm text-sm text-slate-400">
            Entrez vos identifiants pour accéder à la plateforme de supervision et contrôle d’infrastructure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-400">Adresse e-mail</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <Mail className="h-4 w-4 text-slate-500" />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Administrator's mail"
                type="email"
                autoComplete="username"
                className="bg-transparent text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400">Mot de passe</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <Lock className="h-4 w-4 text-slate-500" />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="raxus"
                type="password"
                autoComplete="current-password"
                className="bg-transparent text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <Button type="submit" className="w-full">
            Se connecter
          </Button>

          <div className="text-xs text-slate-500">
            Utilisez <span className="font-semibold text-slate-200"></span> / <span className="font-semibold text-slate-200"></span>
          </div>
        </form>
      </Card>
    </div>
  )
}
