import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session) redirect("/dashboard")
  return <main></main>
}
