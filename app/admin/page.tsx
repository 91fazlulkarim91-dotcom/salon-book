"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function AdminPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && (!session || session.user.role?.toLowerCase() !== "admin")) {
      router.replace("/")
    }
  }, [isPending, router, session])

  if (isPending || !session || session.user.role?.toLowerCase() !== "admin") return null

  return (
    <main className="role-page">
      <section>
        <span className="role-page-eyebrow">Administrator</span>
        <h1>Admin dashboard</h1>
        <p>Manage users, salons, bookings, and platform settings.</p>
        <Link href="/">Return to SalonBook</Link>
      </section>
    </main>
  )
}
