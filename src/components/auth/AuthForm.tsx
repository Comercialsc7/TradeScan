import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AuthFormProps = {
  authMode: 'login' | 'signup'
}

export const AuthForm = ({ authMode }: AuthFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
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
          {authMode === 'login' && (
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          )}
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
        className="h-14 w-full rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background"
      >
        {authMode === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
    </form>
  )
}
