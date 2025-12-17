// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string
          apelido: string | null
          atividade: string | null
          bairro: string | null
          cidade: string | null
          cnpj: string | null
          datageracaonf: string | null
          dataproximavisita: string | null
          diavisita: string | null
          end: string | null
          equipe: string | null
          nomerazao: string | null
          nroequipe: number | null
          periodvisita: string | null
          rede: string | null
          seqpessoa: number | null
          sequenciavisita: number | null
          vend: number | null
          vlremaberto: number | null
          created_at: string
        }
        Insert: {
          id?: string
          apelido?: string | null
          atividade?: string | null
          bairro?: string | null
          cidade?: string | null
          cnpj?: string | null
          datageracaonf?: string | null
          dataproximavisita?: string | null
          diavisita?: string | null
          end?: string | null
          equipe?: string | null
          nomerazao?: string | null
          nroequipe?: number | null
          periodvisita?: string | null
          rede?: string | null
          seqpessoa?: number | null
          sequenciavisita?: number | null
          vend?: number | null
          vlremaberto?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          apelido?: string | null
          atividade?: string | null
          bairro?: string | null
          cidade?: string | null
          cnpj?: string | null
          datageracaonf?: string | null
          dataproximavisita?: string | null
          diavisita?: string | null
          end?: string | null
          equipe?: string | null
          nomerazao?: string | null
          nroequipe?: number | null
          periodvisita?: string | null
          rede?: string | null
          seqpessoa?: number | null
          sequenciavisita?: number | null
          vend?: number | null
          vlremaberto?: number | null
          created_at?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          id: string
          desccompleta: string | null
          codbarras: number | null
          seqproduto: number | null
          descreduzida: string | null
        }
        Insert: {
          id?: string
          desccompleta?: string | null
          codbarras?: number | null
          seqproduto?: number | null
          descreduzida?: string | null
        }
        Update: {
          id?: string
          desccompleta?: string | null
          codbarras?: number | null
          seqproduto?: number | null
          descreduzida?: string | null
        }
        Relationships: []
      }
      vendedor: {
        Row: {
          id: number
          created_at: string
          apelido: string | null
          nrorepresentante: number | null
        }
        Insert: {
          id?: number
          created_at?: string
          apelido?: string | null
          nrorepresentante?: number | null
        }
        Update: {
          id?: number
          created_at?: string
          apelido?: string | null
          nrorepresentante?: number | null
        }
        Relationships: []
      }
      vendas: {
        Row: {
          id: string
          nropedvenda: string | null
          dtainclusao: string | null
          numerodf: string | null
          dtageracaonf: string | null
          nrorepitem: number | null
          percmargemitem: number | null
          vlrembtabpreco: number | null
          qtdembalagem: number | null
          qtdatendida: number | null
          seqpessoa: number | null
          seqproduto: number | null
        }
        Insert: {
          id?: string
          nropedvenda?: string | null
          dtainclusao?: string | null
          numerodf?: string | null
          dtageracaonf?: string | null
          nrorepitem?: number | null
          percmargemitem?: number | null
          vlrembtabpreco?: number | null
          qtdembalagem?: number | null
          qtdatendida?: number | null
          seqpessoa?: number | null
          seqproduto?: number | null
        }
        Update: {
          id?: string
          nropedvenda?: string | null
          dtainclusao?: string | null
          numerodf?: string | null
          dtageracaonf?: string | null
          nrorepitem?: number | null
          percmargemitem?: number | null
          vlrembtabpreco?: number | null
          qtdembalagem?: number | null
          qtdatendida?: number | null
          seqpessoa?: number | null
          seqproduto?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          is_approved: boolean | null
          is_admin: boolean | null
          created_at: string | null
          updated_at: string | null
          name: string | null
        }
        Insert: {
          id: string
          email?: string | null
          is_approved?: boolean | null
          is_admin?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          name?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          is_approved?: boolean | null
          is_admin?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
    DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
    DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema['Enums']
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema['CompositeTypes']
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
