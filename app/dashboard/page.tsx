"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) return
    if (!session) {
      router.replace("/sign-in")
      return
    }
    const role = session.user.role?.toLowerCase() ?? "user"
    if (role === "admin") router.replace("/admin")
    else if (role === "salon" || role === "owner" || role === "professional") router.replace("/salon-dashboard")
    else router.replace("/")
  }, [isPending, router, session])

  return (
    <main className="auth-loading" role="status">
      <LoaderCircle className="auth-spin" size={28} />
      <span>Opening your dashboard…</span>
    </main>
  )
}
