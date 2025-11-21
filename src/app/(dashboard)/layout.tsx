"use client"

import { Layout } from "@/components/Layout"
import { EpikoAssistant } from "@/components/ai/EpikoAssistant"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showAssistant = pathname !== "/notifications"
  
  return (
    <Layout>
      {children}
      {showAssistant && <EpikoAssistant />}
    </Layout>
  )
}
