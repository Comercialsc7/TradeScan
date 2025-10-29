import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

type AuthFormProps = {
  authMode: 'login' | 'signup'
}

export const AuthForm = ({ authMode }: AuthFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Mock authentication logic
    login()
    navigate('/dashboard')
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <p className="mb-2 text-sm font-medium text-slate-800 dark:text-white">
          Endereço de E-mail
        </p>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          className="h-14 w-full rounded-lg border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          defaultValue="user@payapp.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-800 dark:text-white">
            Senha
          </p>
          {authMode === 'login' && (
            <Link
              to="/?mode=login&forgot=true"
              className="text-sm font-medium text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          )}
        </div>
        <div className="flex">
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Digite sua senha"
            className="h-14 w-full rounded-l-lg rounded-r-none border-r-0 border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            defaultValue="password123"
            required
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="h-14 w-auto rounded-l-none rounded-r-lg border border-slate-300 bg-white px-4 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
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
        {authMode === 'login' ? 'Entrar' : 'Cadastrar'}
      </Button>
    </form>
  )
}
