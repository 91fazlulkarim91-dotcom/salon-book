"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"

function getRoleDestination(role?: string | null) {
  const normalizedRole = role?.toLowerCase() ?? "user"
  if (normalizedRole === "admin") return "/admin"
  if (normalizedRole === "salon" || normalizedRole === "owner" || normalizedRole === "professional") return "/salon-dashboard"
  return "/"
}

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)
  const [googlePending, setGooglePending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setPending(true)
    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      })
      if (result.error) {
        setError(result.error.message ?? "Email or password is incorrect.")
        return
      }
      const session = await authClient.getSession()
      const role = session.data?.user.role
      const destination = getRoleDestination(role)
      router.replace(destination)
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We couldn't sign you in.")
    } finally {
      setPending(false)
    }
  }

  async function handleGoogle() {
    setError("")
    setGooglePending(true)
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Google sign-in could not be started.")
      setGooglePending(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-signin" aria-labelledby="sign-in-title">
        <div className="auth-brand"><span>SB</span><strong>SalonBook</strong></div>
        <div className="auth-heading">
          <span className="auth-eyebrow">Welcome back</span>
          <h1 id="sign-in-title">Sign in to your account</h1>
          <p>Continue booking your next favorite experience.</p>
        </div>

        {error && <div className="auth-message auth-message-error" role="alert">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email address</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>Password</span>
            <div className="auth-password-field">
              <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button className="auth-submit" type="submit" disabled={pending}>
            {pending ? <><LoaderCircle className="auth-spin" size={18} />Signing in…</> : "Sign in"}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <button className="auth-google" type="button" onClick={handleGoogle} disabled={googlePending}>
          {googlePending ? <LoaderCircle className="auth-spin" size={18} /> : <span className="auth-google-mark">G</span>}
          Continue with Google
        </button>
        <p className="auth-switch">New to SalonBook? <Link href="/sign-up">Create an account</Link></p>
      </section>
    </main>
  )
}
