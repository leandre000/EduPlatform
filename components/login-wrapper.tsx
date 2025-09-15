"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import LoginPageContent from "./login-content"

function LoginPageWithSearchParams() {
  const searchParams = useSearchParams()
  return <LoginPageContent searchParams={searchParams} />
}

export default function LoginWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageWithSearchParams />
    </Suspense>
  )
}
