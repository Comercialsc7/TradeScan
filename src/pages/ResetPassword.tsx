import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A confirmação deve ter pelo menos 6 caracteres' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifyingFlow, setIsVerifyingFlow] = useState(true)
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const hashParams = useMemo(
    () => new URLSearchParams(window.location.hash.replace(/^#/, '')),
    [],
  )

  useEffect(() => {
    document.title = 'Redefinir Senha - TradeScan'
  }, [])

  useEffect(() => {
    const hasRecoveryHash =
      hashParams.get('type') === 'recovery' &&
      Boolean(hashParams.get('access_token')) &&
      Boolean(hashParams.get('refresh_token'))

    if (hasRecoveryHash) {
      setIsRecoveryFlow(true)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryFlow(true)
      }
    })

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!session && !hasRecoveryHash) {
          setIsRecoveryFlow(false)
        }
      })
      .finally(() => {
        setIsVerifyingFlow(false)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [hashParams])

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handleInvalidAccess = () => {
    toast({
      variant: 'destructive',
      title: 'Acesso inválido',
      description:
        'Esta página é exclusiva para links de redefinição enviados por e-mail.',
    })
    navigate('/auth?mode=login', { replace: true })
  }

  const onSubmit = async (values: ResetPasswordSchema) => {
    if (!isRecoveryFlow) {
      handleInvalidAccess()
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      })

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Falha ao redefinir senha',
          description: error.message || 'Não foi possível atualizar a senha.',
        })
        return
      }

      toast({
        title: 'Senha redefinida com sucesso',
        description: 'Entre novamente com sua nova senha.',
      })

      await supabase.auth.signOut()
      navigate('/auth?mode=login', { replace: true })
    } catch (_error) {
      toast({
        variant: 'destructive',
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao atualizar sua senha.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isVerifyingFlow) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isRecoveryFlow) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          Link inválido ou expirado
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Solicite uma nova recuperação de senha para continuar.
        </p>
        <Button
          className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90"
          onClick={() => navigate('/auth?mode=login', { replace: true })}
        >
          Voltar para login
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            TradeScan
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Redefina sua senha com segurança.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-white">
                    Nova senha
                  </FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Digite sua nova senha"
                        className="h-14 w-full rounded-l-lg rounded-r-none border-r-0 border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        {...field}
                      />
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-white">
                    Confirmar nova senha
                  </FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        placeholder="Confirme sua nova senha"
                        className="h-14 w-full rounded-l-lg rounded-r-none border-r-0 border-slate-300 bg-white text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      className="h-14 w-auto rounded-l-none rounded-r-lg border border-slate-300 bg-white px-4 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-14 w-full rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redefinindo...
                </>
              ) : (
                'Redefinir senha'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default ResetPasswordPage
