export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          published: boolean | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          image: string | null
          isAdmin: boolean | null
          name: string | null
          stripe_current_period_end: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          image?: string | null
          isAdmin?: boolean | null
          name?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          image?: string | null
          isAdmin?: boolean | null
          name?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
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
