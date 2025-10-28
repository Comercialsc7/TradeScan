import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const Index = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
          PayApp
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Simple, Smart, Secure Payments.
        </p>
      </div>

      <div className="relative flex h-12 items-center justify-center rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        <label className="z-10 flex h-full w-1/2 cursor-pointer items-center justify-center rounded-lg px-2 text-center transition-colors duration-200 ease-in-out">
          <input
            type="radio"
            name="auth-mode"
            value="login"
            className="peer sr-only"
            checked={authMode === 'login'}
            onChange={() => setAuthMode('login')}
          />
          <span
            className={cn(
              'text-sm font-medium text-slate-500 dark:text-slate-400',
              {
                'text-checked-toggle-foreground': authMode === 'login',
              },
            )}
          >
            Log In
          </span>
        </label>
        <label className="z-10 flex h-full w-1/2 cursor-pointer items-center justify-center rounded-lg px-2 text-center transition-colors duration-200 ease-in-out">
          <input
            type="radio"
            name="auth-mode"
            value="signup"
            className="peer sr-only"
            checked={authMode === 'signup'}
            onChange={() => setAuthMode('signup')}
          />
          <span
            className={cn(
              'text-sm font-medium text-slate-500 dark:text-slate-400',
              {
                'text-checked-toggle-foreground': authMode === 'signup',
              },
            )}
          >
            Sign Up
          </span>
        </label>
        <div
          className={cn(
            'absolute left-1 top-1 h-10 w-[calc(50%-0.25rem)] rounded-lg bg-checked-toggle-background shadow-sm transition-transform duration-200 ease-in-out',
            { 'translate-x-0': authMode === 'login' },
            { 'translate-x-full': authMode === 'signup' },
          )}
        />
      </div>

      <form className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-800 dark:text-white">
            Email Address
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-14 w-full rounded-lg border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-800 dark:text-white">
              Password
            </p>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className="h-14 w-full rounded-l-lg rounded-r-none border-r-0 border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="h-14 w-auto rounded-l-none rounded-r-lg border border-slate-300 bg-white px-4 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              {passwordVisible ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-background-dark"
        >
          Log In
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" />
        <span className="text-sm text-slate-500 dark:text-slate-400">
          or continue with
        </span>
        <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-300 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <img
            src="https://img.usecurling.com/i?q=google&color=multicolor"
            alt="Google"
            className="mr-2 h-5 w-5"
          />
          Google
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-300 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <img
            src="https://img.usecurling.com/i?q=facebook&color=multicolor"
            alt="Facebook"
            className="mr-2 h-5 w-5"
          />
          Facebook
        </Button>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        By continuing, you agree to our{' '}
        <Link to="/terms" className="font-medium text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          to="/privacy"
          className="font-medium text-primary hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

export default Index
