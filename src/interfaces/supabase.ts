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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string | null
          id: string
          item_id: string | null
          message: string
          read: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          message: string
          read?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          message?: string
          read?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_movements: {
        Row: {
          batch_id: string | null
          created_at: string | null
          id: string
          quantity: number
          reference: string | null
          type: string
          unit_cost: number | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          quantity: number
          reference?: string | null
          type: string
          unit_cost?: number | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          quantity?: number
          reference?: string | null
          type?: string
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_movements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "item_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          created_at: string | null
          document: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          document?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          document?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      issue_items: {
        Row: {
          created_at: string | null
          id: string
          issue_id: string | null
          item_id: string | null
          quantity: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue_id?: string | null
          item_id?: string | null
          quantity: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          issue_id?: string | null
          item_id?: string | null
          quantity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "issue_items_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issue_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      issues: {
        Row: {
          created_at: string | null
          id: string
          issue_code: string
          issue_date: string
          reason: string | null
          reference: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue_code: string
          issue_date?: string
          reason?: string | null
          reference?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          issue_code?: string
          issue_date?: string
          reason?: string | null
          reference?: string | null
          status?: string | null
        }
        Relationships: []
      }
      item_batches: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          item_id: string | null
          lot_code: string
          purchase_date: string
          quantity_available: number
          quantity_in: number
          unit_cost: number
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          lot_code: string
          purchase_date: string
          quantity_available: number
          quantity_in: number
          unit_cost: number
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          lot_code?: string
          purchase_date?: string
          quantity_available?: number
          quantity_in?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_batches_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          active: boolean | null
          category_id: string | null
          code: string
          cost: number | null
          created_at: string | null
          id: string
          min_stock: number | null
          name: string
          stock: number | null
          total_cost: number | null
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          code: string
          cost?: number | null
          created_at?: string | null
          id?: string
          min_stock?: number | null
          name: string
          stock?: number | null
          total_cost?: number | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          code?: string
          cost?: number | null
          created_at?: string | null
          id?: string
          min_stock?: number | null
          name?: string
          stock?: number | null
          total_cost?: number | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      production_consumptions: {
        Row: {
          batch_id: string | null
          created_at: string | null
          id: string
          item_id: string | null
          production_id: string | null
          quantity: number
          unit_cost: number
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          production_id?: string | null
          quantity: number
          unit_cost: number
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          production_id?: string | null
          quantity?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "production_consumptions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "item_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_consumptions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_consumptions_production_id_fkey"
            columns: ["production_id"]
            isOneToOne: false
            referencedRelation: "productions"
            referencedColumns: ["id"]
          },
        ]
      }
      productions: {
        Row: {
          code: string
          created_at: string | null
          customer_id: string
          description: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          customer_id: string
          description?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      receipt_items: {
        Row: {
          batch: string | null
          created_at: string | null
          id: string
          item_id: string | null
          quantity: number
          receipt_id: string | null
          unit_cost: number
          updated_at: string | null
        }
        Insert: {
          batch?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          quantity: number
          receipt_id?: string | null
          unit_cost: number
          updated_at?: string | null
        }
        Update: {
          batch?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          quantity?: number
          receipt_id?: string | null
          unit_cost?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receipt_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      receipt_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          method: string | null
          payment_date: string | null
          receipt_id: string | null
          reference_paid: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          method?: string | null
          payment_date?: string | null
          receipt_id?: string | null
          reference_paid?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          method?: string | null
          payment_date?: string | null
          receipt_id?: string | null
          reference_paid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receipt_payments_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "receipts"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          comments: string | null
          created_at: string | null
          discount: number | null
          id: string
          receipt_code: string
          receipt_date: string
          reference_document: string | null
          status: string | null
          subtotal: number
          supplier_id: string | null
          tax: number
          total: number | null
          transport: number | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          discount?: number | null
          id?: string
          receipt_code: string
          receipt_date?: string
          reference_document?: string | null
          status?: string | null
          subtotal?: number
          supplier_id?: string | null
          tax?: number
          total?: number | null
          transport?: number | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          discount?: number | null
          id?: string
          receipt_code?: string
          receipt_date?: string
          reference_document?: string | null
          status?: string | null
          subtotal?: number
          supplier_id?: string | null
          tax?: number
          total?: number | null
          transport?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "receipts_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          active: boolean | null
          address: string | null
          contact_name: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string | null
          id: string
          name: string
          symbol: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          symbol: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          symbol?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
