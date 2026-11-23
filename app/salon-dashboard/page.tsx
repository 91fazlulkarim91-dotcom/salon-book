"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const allowedRoles = ["salon", "owner", "professional"]

export default function SalonDashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const role = session?.user.role?.toLowerCase()

  useEffect(() => {
    if (!isPending && (!session || !role || !allowedRoles.includes(role))) {
      router.replace("/")
    }
  }, [isPending, role, router, session])

  if (isPending || !session || !role || !allowedRoles.includes(role)) return null

  return (
    <main className="role-page">
      <section>
        <span className="role-page-eyebrow">Salon workspace</span>
        <h1>Salon dashboard</h1>
        <p>Manage appointments, services, staff, and client bookings.</p>
        <Link href="/">Return to SalonBook</Link>
      </section>
    </main>
  )
}
