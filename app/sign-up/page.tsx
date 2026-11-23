"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { Check, Eye, EyeOff, ImagePlus, LoaderCircle, Upload } from "lucide-react"
import { authClient } from "@/lib/auth-client"

type ImageMode = "upload" | "url"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [imageMode, setImageMode] = useState<ImageMode>("upload")
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [pending, setPending] = useState(false)
  const [googlePending, setGooglePending] = useState(false)

  function validatePassword(value: string) {
    return value.length >= 6 && /[A-Z]/.test(value) && /[a-z]/.test(value)
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile images must be smaller than 2 MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageUrl(typeof reader.result === "string" ? reader.result : "")
    reader.readAsDataURL(file)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters and include one uppercase and one lowercase letter.")
      return
    }
    setPending(true)
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl.trim() || undefined,
      })
      if (result.error) {
        setError(result.error.message ?? "We couldn't create your account.")
        return
      }
      setSuccess("Account created successfully.")
      router.replace("/")
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We couldn't create your account.")
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
      setError(caught instanceof Error ? caught.message : "Google sign-up could not be started.")
      setGooglePending(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="sign-up-title">
        <div className="auth-brand"><span>SB</span><strong>SalonBook</strong></div>
        <div className="auth-heading">
          <span className="auth-eyebrow">Join SalonBook</span>
          <h1 id="sign-up-title">Create your account</h1>
          <p>Discover and book beautiful experiences near you.</p>
        </div>

        {error && <div className="auth-message auth-message-error" role="alert">{error}</div>}
        {success && <div className="auth-message auth-message-success" role="status"><Check size={17} />{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" placeholder="Your full name" required />
          </label>
          <label>
            <span>Email address</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>Password</span>
            <div className="auth-password-field">
              <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" required />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <small className={validatePassword(password) ? "auth-password-valid" : ""}>6+ characters, with uppercase and lowercase letters</small>
          </label>

          <fieldset className="auth-image-field">
            <legend>Profile image <span>Optional</span></legend>
            <div className="auth-image-tabs" role="radiogroup" aria-label="Profile image source">
              <button type="button" role="radio" aria-checked={imageMode === "upload"} className={imageMode === "upload" ? "is-active" : ""} onClick={() => setImageMode("upload")}><Upload size={16} />Upload</button>
              <button type="button" role="radio" aria-checked={imageMode === "url"} className={imageMode === "url" ? "is-active" : ""} onClick={() => setImageMode("url")}><ImagePlus size={16} />Image URL</button>
            </div>
            {imageMode === "upload" ? (
              <label className="auth-file-drop">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="Profile preview" />
                ) : <Upload size={20} />}
                <span>{imageUrl ? "Change profile image" : "Choose an image"}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
            ) : (
              <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} type="url" placeholder="https://example.com/profile.jpg" />
            )}
          </fieldset>

          <button className="auth-submit" type="submit" disabled={pending}>
            {pending ? <><LoaderCircle className="auth-spin" size={18} />Creating account…</> : "Create account"}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <button className="auth-google" type="button" onClick={handleGoogle} disabled={googlePending}>
          {googlePending ? <LoaderCircle className="auth-spin" size={18} /> : <span className="auth-google-mark">G</span>}
          Continue with Google
        </button>
        <p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p>
      </section>
    </main>
  )
}
