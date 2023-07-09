import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode
}

const layoyt = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")
  return <>{children}</>
}

export default layoyt
