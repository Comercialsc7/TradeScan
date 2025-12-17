import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'Por favor, insira um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'Por favor, insira um e-mail válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

export const manualEntrySchema = z.object({
  barcode: z
    .string()
    .min(1, { message: 'O código de barras é obrigatório' })
    .regex(/^[0-9]+$/, {
      message: 'O código de barras deve conter apenas números',
    })
    .length(13, { message: 'O código de barras deve ter 13 dígitos' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>
export type ManualEntrySchema = z.infer<typeof manualEntrySchema>
