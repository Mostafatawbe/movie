'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false)

  return (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a verification link to your inbox. Click it to activate your account."
      footer={
        <>
          Wrong address?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up again
          </Link>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <MailCheck className="size-8" />
        </span>
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or resend the verification email below.
        </p>
        <Button
          className="w-full"
          variant={resent ? 'secondary' : 'default'}
          onClick={() => setResent(true)}
          disabled={resent}
        >
          {resent ? 'Verification email sent' : 'Resend verification email'}
        </Button>
        <Button variant="ghost" className="w-full" render={<Link href="/login" />}>
          Back to sign in
        </Button>
      </div>
    </AuthShell>
  )
}
