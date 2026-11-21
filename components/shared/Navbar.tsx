"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, Scissors, UserRound, X } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [logoutError, setLogoutError] = useState("")
  const [logoutPending, setLogoutPending] = useState(false)
  const user = session?.user

  async function handleLogout() {
    setLogoutError("")
    setLogoutPending(true)
    try {
      const result = await authClient.signOut()
      if (result.error) {
        setLogoutError(result.error.message ?? "Could not log out. Please try again.")
        return
      }
      setProfileOpen(false)
      setMenuOpen(false)
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Could not log out. Please try again.")
    } finally {
      setLogoutPending(false)
    }
  }

  return (
    <header className="salon-navbar">
      <div className="salon-navbar-inner">
        <Link className="salon-brand" href="/" aria-label="SalonBook home">
          <span className="salon-brand-mark"><Scissors size={17} strokeWidth={2.2} /></span>
          <span>Salon<span className="salon-brand-accent">Book</span></span>
        </Link>

        <button
          className="salon-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="salon-primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
          <span>Menu</span>
        </button>

        <nav
          id="salon-primary-navigation"
          className={`salon-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)}>Browse services</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          {!isPending && !user && (
            <div className="salon-mobile-auth">
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link className="salon-mobile-signup" href="/sign-up" onClick={() => setMenuOpen(false)}>Sign up</Link>
            </div>
          )}
          {!isPending && user && (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button className="salon-menu-logout" type="button" onClick={handleLogout} disabled={logoutPending}>
                {logoutPending ? "Logging out…" : "Log out"}
              </button>
              {logoutError && <p className="salon-logout-error" role="alert">{logoutError}</p>}
            </>
          )}
        </nav>

        <div className={`salon-navbar-actions${user ? " is-authenticated" : ""}`}>
          {!isPending && !user && (
            <>
              <Link className="salon-signin" href="/sign-in">Sign in</Link>
              <Link className="salon-signup" href="/sign-up">Sign up</Link>
            </>
          )}
          {!isPending && user && (
            <div className="salon-profile">
              <button
                type="button"
                className="salon-profile-trigger"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => {
                  setProfileOpen((open) => !open)
                  setLogoutError("")
                }}
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="salon-avatar" src={user.image} alt="" />
                ) : (
                  <span className="salon-avatar salon-avatar-placeholder"><UserRound size={17} /></span>
                )}
                <span className="salon-user-name">{user.name || "My account"}</span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="salon-profile-menu" role="menu">
                  <div className="salon-profile-heading">
                    <span className="salon-profile-greeting">Signed in as</span>
                    <strong>{user.name || user.email}</strong>
                  </div>
                  <Link href="/dashboard" role="menuitem" onClick={() => setProfileOpen(false)}>Dashboard</Link>
                  {logoutError && <p className="salon-logout-error" role="alert">{logoutError}</p>}
                  <button type="button" role="menuitem" onClick={handleLogout} disabled={logoutPending}>
                    {logoutPending ? "Logging out…" : "Log out"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
