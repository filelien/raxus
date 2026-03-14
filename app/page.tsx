"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Server,
  Database,
  Globe,
  Shield,
  Wrench,
  Lock,
  Zap,
  Eye,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Users,
  Activity,
  Clock,
  HardDrive,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAuthenticated } from "@/lib/auth"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [])

  return (
    <div className="space-y-20">
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative py-20 px-4 lg:px-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent rounded-3xl blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* INOV AFRIK Attribution */}
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 border border-cyan-500/20">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Développé par INOV AFRIK</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300">
              RAXUS — Intelligent Infrastructure & Data Systems Platform
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Plateforme avancée permettant de superviser, analyser et optimiser les infrastructures informatiques, les réseaux et les bases de données à partir d'une interface centralisée et intelligente.
            </p>
          </div>

          {/* Slogan */}
          <div className="pt-4 border-t border-slate-700/40">
            <p className="text-lg text-cyan-300 italic font-semibold">
              "Innover aujourd'hui, performer durablement."
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={loggedIn ? "/dashboard" : "/login"}>
                <Zap className="w-4 h-4" />
                Accéder à la plateforme
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="#features">
                Découvrir les fonctionnalités
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {[
              { text: "Next.js 15", color: "text-slate-300" },
              { text: "React 19", color: "text-blue-300" },
              { text: "TypeScript", color: "text-cyan-300" },
              { text: "Tailwind CSS", color: "text-emerald-300" },
              { text: "Radix UI", color: "text-purple-300" },
            ].map((tech) => (
              <span key={tech.text} className={`rounded-full bg-slate-800/40 px-4 py-2 text-sm ${tech.color} border border-slate-700/40`}>
                {tech.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: MISSION ========== */}
      <section className="max-w-4xl mx-auto px-4 lg:px-0">
        <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">Notre Mission</h2>
          <p className="text-lg text-slate-300 leading-relaxed text-center">
            RAXUS est une plateforme conçue pour aider les organisations à superviser leurs systèmes, analyser leurs performances et maintenir une infrastructure fiable grâce à une intelligence opérationnelle avancée. Nous donnons aux équipes les outils nécessaires pour prendre des décisions rapides et éclairées.
          </p>
        </div>
      </section>

      {/* ========== SECTION 3: MAIN FEATURES ========== */}
      <section id="features" className="max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">Modules Principaux</h2>
          <p className="text-slate-400 text-lg">Explorez les fonctionnalités puissantes de RAXUS</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Gestion des serveurs */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Server className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Gestion des Serveurs</h3>
            </div>
            <p className="text-slate-400">
              Supervision des performances des serveurs et analyse détaillée des ressources matérielles.
            </p>
          </div>

          {/* Monitoring bases de données */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-emerald-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Database className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Monitoring BD</h3>
            </div>
            <p className="text-slate-400">
              Suivi en temps réel des requêtes, performances et disponibilité des bases de données.
            </p>
          </div>

          {/* Analyse réseau */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-blue-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Analyse Réseau</h3>
            </div>
            <p className="text-slate-400">
              Surveillance du trafic réseau et détection automatique des anomalies.
            </p>
          </div>

          {/* Sécurité des systèmes */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-amber-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Sécurité Systèmes</h3>
            </div>
            <p className="text-slate-400">
              Gestion des accès, analyse des incidents et protection des infrastructures critiques.
            </p>
          </div>

          {/* Diagnostic intelligent */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-purple-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Diagnostic Intelligent</h3>
            </div>
            <p className="text-slate-400">
              Détection automatique des anomalies et identification des problèmes potentiels.
            </p>
          </div>

          {/* Gestion data centers */}
          <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/40 hover:bg-slate-900/60 p-8 transition-all duration-300 hover:border-indigo-500/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Data Centers</h3>
            </div>
            <p className="text-slate-400">
              Vue globale de l'infrastructure et des ressources disponibles par site.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: ARCHITECTURE TECHNIQUE ========== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">Architecture Technologique</h2>
          <p className="text-slate-400 text-lg">Infrastructure moderne et scalable</p>
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-slate-900/30 p-12">
          <div className="space-y-6">
            {/* Architecture Flow */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/40">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-100">Utilisateurs</p>
              </div>
              <ArrowRight className="w-6 h-6 text-cyan-400 hidden md:block" />
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/40">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-100">Interface RAXUS</p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-400 hidden md:block" />
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/40">
                <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-100">API & Analyse</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="flex-1" />
              <ArrowRight className="w-6 h-6 text-emerald-400 hidden md:block" />
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/40">
                <HardDrive className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-100">Infrastructure Système</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 hidden md:block" />
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/40">
                <Database className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-100">BD & Réseaux</p>
              </div>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-700/40">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-semibold text-slate-100">Analyse Temps Réel</h4>
                </div>
                <p className="text-sm text-slate-400">Monitoring en direct de vos systèmes</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-slate-100">Surveillance Intelligente</h4>
                </div>
                <p className="text-sm text-slate-400">Détection avancée des anomalies</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-semibold text-slate-100">Traitement Rapide</h4>
                </div>
                <p className="text-sm text-slate-400">Réponse optimisée aux incidents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: AVANTAGES ========== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">Pourquoi Choisir RAXUS ?</h2>
          <p className="text-slate-400 text-lg">Avantages compétitifs de notre plateforme</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Zap,
              title: "Performance",
              desc: "Surveillance en temps réel et analyse rapide des systèmes critiques.",
              color: "text-cyan-400",
              bg: "from-cyan-500/20 to-transparent",
            },
            {
              icon: Eye,
              title: "Intelligence",
              desc: "Analyse avancée des infrastructures et détection automatique des anomalies.",
              color: "text-blue-400",
              bg: "from-blue-500/20 to-transparent",
            },
            {
              icon: RefreshCw,
              title: "Centralisation",
              desc: "Toutes les ressources technologiques dans une seule interface unifiée.",
              color: "text-emerald-400",
              bg: "from-emerald-500/20 to-transparent",
            },
            {
              icon: Lock,
              title: "Fiabilité",
              desc: "Gestion sécurisée des systèmes critiques avec audit complet.",
              color: "text-amber-400",
              bg: "from-amber-500/20 to-transparent",
            },
          ].map((item, idx) => (
            <div key={idx} className={`rounded-2xl border border-slate-700/40 bg-gradient-to-br ${item.bg} bg-slate-900/40 p-8`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 6: STATISTICS ========== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-12">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Systèmes Surveillés", icon: Server },
              { value: "1000+", label: "Bases de Données", icon: Database },
              { value: "2500+", label: "Réseaux Connectés", icon: Globe },
              { value: "99.9%", label: "Disponibilité Plateforme", icon: Activity },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-3">
                <div className="flex justify-center">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {stat.value}
                </div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: SECURITY ========== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">Sécurité Avancée</h2>
          <p className="text-slate-400 text-lg">Protection complète de vos infrastructures</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lock, title: "Gestion des Accès", desc: "Contrôle granulaire des permissions" },
            { icon: AlertTriangle, title: "Audit Système", desc: "Journalisation complète des activités" },
            { icon: Clock, title: "Surveillance Incidents", desc: "Détection et alertes en temps réel" },
            { icon: Shield, title: "Protection Données", desc: "Chiffrement et sauvegarde sécurisée" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-6 text-center">
              <item.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 8: DASHBOARD PREVIEW ========== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">Tableau de Bord Professionnel</h2>
          <p className="text-slate-400 text-lg">Interface intuitive et puissante pour piloter vos systèmes</p>
        </div>

        <div className="rounded-3xl border border-slate-700/40 bg-slate-900/30 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 border-b border-slate-700/40 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">Monitoring & Analytics</h3>
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-slate-800/50 p-6">
                <div className="text-sm text-slate-400 mb-2">Utilisation CPU</div>
                <div className="text-3xl font-bold text-cyan-400">42%</div>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-5/12 bg-cyan-500" />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-6">
                <div className="text-sm text-slate-400 mb-2">Mémoire Utilisée</div>
                <div className="text-3xl font-bold text-purple-400">68%</div>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-purple-500" />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-6">
                <div className="text-sm text-slate-400 mb-2">Latence Réseau</div>
                <div className="text-3xl font-bold text-emerald-400">12ms</div>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: CTA FINAL ========== */}
      <section className="max-w-4xl mx-auto px-4 lg:px-0">
        <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-blue-500/10 p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold text-slate-100">
            Commencez à Superviser Votre Infrastructure Aujourd'hui
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Rejoignez les organisations qui font confiance à RAXUS pour une gestion optimale de leurs systèmes critiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={loggedIn ? "/dashboard" : "/login"}>
                Se Connecter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#documentation">Consulter la Documentation</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 10: INOV AFRIK BRANDING ========== */}
      <section className="max-w-4xl mx-auto px-4 lg:px-0 border-t border-slate-700/40 pt-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">IA</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-100">INOV AFRIK</h3>
            <p className="text-slate-400">Innovation & Advanced Technology</p>
            <p className="text-cyan-400 italic font-semibold">
              "Innover aujourd'hui, performer durablement."
            </p>
          </div>
          <p className="text-sm text-slate-500">
            RAXUS est une plateforme de gestion d'infrastructure conçue et développée par INOV AFRIK.<br />
            © 2026 INOV AFRIK. Tous droits réservés.
          </p>
        </div>
      </section>

      {loggedIn && (
        <section className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <p className="text-emerald-300 font-semibold">Session active</p>
            </div>
            <p className="text-sm text-emerald-400">
              Utilisez le menu latéral pour accéder aux modules de gestion avancée.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
