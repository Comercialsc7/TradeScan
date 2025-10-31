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
          cidade: string | null
          cnpj: string | null
          codigo: string
          created_at: string
          endereco: string | null
          id: string
          nome: string
          razao_social: string | null
          rede: string | null
          segmento: string | null
          telefone: string | null
        }
        Insert: {
          cidade?: string | null
          cnpj?: string | null
          codigo: string
          created_at?: string
          endereco?: string | null
          id?: string
          nome: string
          razao_social?: string | null
          rede?: string | null
          segmento?: string | null
          telefone?: string | null
        }
        Update: {
          cidade?: string | null
          cnpj?: string | null
          codigo?: string
          created_at?: string
          endereco?: string | null
          id?: string
          nome?: string
          razao_social?: string | null
          rede?: string | null
          segmento?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          base_cost: number
          brand: string | null
          descricao: string | null
          ean: string
          id: string
          nome: string
          sku: string
        }
        Insert: {
          base_cost?: number
          brand?: string | null
          descricao?: string | null
          ean: string
          id?: string
          nome: string
          sku: string
        }
        Update: {
          base_cost?: number
          brand?: string | null
          descricao?: string | null
          ean?: string
          id?: string
          nome?: string
          sku?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean
          is_approved: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean
          is_approved?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean
          is_approved?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      vendas: {
        Row: {
          CGO: string | null
          CLIENTE: string
          cliente_id: string | null
          created_at: string
          DATA_FATURAMENTO: string | null
          DATA_INCLUSAO: string
          EMBALAGEM: string | null
          FORNECEDOR: string | null
          id: string
          NRO_NFE: string | null
          NRO_PEDIDO: string
          PRODUTO: string
          produto_id: string | null
          QTDE_EMB: number | null
          QTDE_EMBALAGEM: number | null
          QTDE_FORMA_EMBALAGEM: number | null
          SITUACAO: string | null
          VALOR: number
          VENDEDOR: string | null
        }
        Insert: {
          CGO?: string | null
          CLIENTE: string
          cliente_id?: string | null
          created_at?: string
          DATA_FATURAMENTO?: string | null
          DATA_INCLUSAO?: string
          EMBALAGEM?: string | null
          FORNECEDOR?: string | null
          id?: string
          NRO_NFE?: string | null
          NRO_PEDIDO: string
          PRODUTO: string
          produto_id?: string | null
          QTDE_EMB?: number | null
          QTDE_EMBALAGEM?: number | null
          QTDE_FORMA_EMBALAGEM?: number | null
          SITUACAO?: string | null
          VALOR: number
          VENDEDOR?: string | null
        }
        Update: {
          CGO?: string | null
          CLIENTE?: string
          cliente_id?: string | null
          created_at?: string
          DATA_FATURAMENTO?: string | null
          DATA_INCLUSAO?: string
          EMBALAGEM?: string | null
          FORNECEDOR?: string | null
          id?: string
          NRO_NFE?: string | null
          NRO_PEDIDO?: string
          PRODUTO?: string
          produto_id?: string | null
          QTDE_EMB?: number | null
          QTDE_EMBALAGEM?: number | null
          QTDE_FORMA_EMBALAGEM?: number | null
          SITUACAO?: string | null
          VALOR?: number
          VENDEDOR?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'vendas_cliente_id_fkey'
            columns: ['cliente_id']
            isOneToOne: false
            referencedRelation: 'clientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'vendas_produto_id_fkey'
            columns: ['produto_id']
            isOneToOne: false
            referencedRelation: 'produtos'
            referencedColumns: ['id']
          },
        ]
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
