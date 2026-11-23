import { authClient } from "@/lib/auth-client"

export async function serverApiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.")

  const { data, error } = await authClient.token()
  if (error || !data?.token) {
    throw new Error(error?.message ?? "Sign in to continue.")
  }

  const headers = new Headers(init.headers)
  headers.set("Authorization", `Bearer ${data.token}`)
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(new URL(path.replace(/^\//, ""), `${apiUrl.replace(/\/+$/, "")}/`), {
    ...init,
    headers,
  })
  const result = await response.json() as { message?: string } & T
  if (!response.ok) {
    throw new Error(result.message ?? `API request failed (${response.status}).`)
  }

  return result
}
