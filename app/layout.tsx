import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { AppFooter } from "@/components/layout/app-footer"
import { AppLoader } from "@/components/shared/app-loader"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "RAXUS - System Management Dashboard",
  description: "Centralized infrastructure monitoring and management platform",
}

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col`}
      >
        <AppLoader>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative z-10 flex flex-col min-h-screen">
              <AppHeader />
              <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
              <AppFooter />
            </SidebarInset>
          </SidebarProvider>
          <Analytics />
        </AppLoader>
      </body>
    </html>
  )
}
