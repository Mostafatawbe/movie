'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResetPasswordPage() {
  const [show, setShow] = useState(false)

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Your new password must be different from previously used passwords."
      footer={
        <>
          Remembered it?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={show ? 'text' : 'password'}
              placeholder="At least 8 characters"
              className="px-9"
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="confirm" type={show ? 'text' : 'password'} placeholder="••••••••" className="pl-9" required />
          </div>
        </div>

        <Button type="submit" className="mt-1 h-11 w-full text-sm" render={<Link href="/login" />}>
          Update password
        </Button>
      </form>
    </AuthShell>
  )
}
