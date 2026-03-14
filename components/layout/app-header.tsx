"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bell, Search, LogOut, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { notifications } from "@/lib/mock-data"
import { isAuthenticated, logout } from "@/lib/auth"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/servers": "Servers",
  "/databases": "Databases",
  "/network": "Network",
  "/security": "Security",
  "/communications": "Communications",
  "/settings": "Settings",
}

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()

  // Hide header on public/auth pages to provide a focused login experience.
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/loader")
  ) {
    return null
  }

  const currentTitle = pageTitles[pathname] || "Dashboard"
  const unreadCount = notifications.filter((n) => !n.read).length
  const [loggedIn, setLoggedIn] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [])

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-700/50 bg-slate-950/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="text-slate-400 hover:text-slate-100" />
      <Separator orientation="vertical" className="h-5 bg-slate-700/50" />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-100">{currentTitle}</span>
        <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-[10px] font-mono">
          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
          LIVE
        </Badge>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-slate-800/60 px-3 py-1.5 border border-slate-700/50">
          <Search className="h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search systems..."
            className="w-36 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-slate-950">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        {loggedIn && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/50">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={12} className="w-64">
                <div className="px-3 py-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Compte utilisateur
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-cyan-500/20 text-cyan-300 text-sm font-bold border border-cyan-500/50">
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">Admin</div>
                      <div className="text-xs text-slate-400">admin@raxus.com</div>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={() => router.push("/profile")} className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() => router.push("/settings")} className="cursor-pointer">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Paramètres
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={() => {
                    logout()
                    router.replace("/login")
                  }}
                  className="cursor-pointer"
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 4v2M9 7h6m0 12H9m0-12a3 3 0 110-6 3 3 0 010 6z"
                    />
                  </svg>
                  Changer de compte
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={() => setLogoutDialogOpen(true)}
                  className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
              <DialogContent className="border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Se déconnecter</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Voulez-vous vraiment vous déconnecter ? Toutes les données de session seront effacées.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3">
                  <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      logout()
                      setLogoutDialogOpen(false)
                      router.replace("/login")
                    }}
                  >
                    Se déconnecter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        <Separator orientation="vertical" className="h-5 bg-slate-700/50 hidden md:block" />

        <div className="hidden md:flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-slate-800 text-cyan-400 text-xs font-bold border border-slate-700">
              CM
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-slate-400">Admin</span>
        </div>
      </div>
    </header>
  )
}
