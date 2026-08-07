'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  return (
    <AuthShell
      title="Reset your password"
      subtitle={sent ? undefined : 'Enter your email and we will send you a reset link.'}
      footer={
        <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border bg-card/50 p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-primary" />
          <p className="mt-3 font-medium">Check your inbox</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address. It may take a few minutes to arrive.
          </p>
          <Button variant="secondary" className="mt-4 w-full" render={<Link href="/reset-password" />}>
            I have a reset link
          </Button>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" className="pl-9" required />
            </div>
          </div>
          <Button type="submit" className="h-11 w-full text-sm">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
