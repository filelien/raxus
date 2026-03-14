"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppFooter() {
  const pathname = usePathname()

  // Show footer only on the home page
  if (pathname !== "/") {
    return null
  }

  return (
    <footer className="border-t border-slate-700/40 bg-slate-950/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white text-sm">
                IA
              </div>
              <div>
                <p className="font-semibold text-slate-100">INOV AFRIK</p>
                <p className="text-xs text-slate-400">Innovation & Technology</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic">
              "Innover aujourd'hui, performer durablement."
            </p>
            <p className="text-xs text-slate-500">
              © 2026 INOV AFRIK. Tous droits réservés.
            </p>
          </div>

          {/* Product Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-100 text-sm">Produit</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/servers" className="hover:text-cyan-400 transition-colors">
                  Serveurs
                </Link>
              </li>
              <li>
                <Link href="/databases" className="hover:text-cyan-400 transition-colors">
                  Bases de données
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-cyan-400 transition-colors">
                  Sécurité
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-100 text-sm">Ressources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#documentation" className="hover:text-cyan-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-cyan-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-100 text-sm">À propos</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  À propos de nous
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-cyan-400 transition-colors">
                  Conditions
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-cyan-400 transition-colors">
                  Carrières
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Développé par <span className="font-semibold text-slate-300">INOV AFRIK</span>
            </p>
            <p className="text-xs text-slate-500">
              RAXUS Platform v1.0 • Infrastructure Management System
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
