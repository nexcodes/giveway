export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          author_id: string | null;
          content: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          published: boolean | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string | null;
          content?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          published?: boolean | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string | null;
          content?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          published?: boolean | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      prizes: {
        Row: {
          author_id: string | null;
          category: string | null;
          created_at: string;
          credit_need: number | null;
          description: string | null;
          id: string;
          image: string | null;
          participants: string[] | null;
          prize_value: number | null;
          published: boolean | null;
          time_end: string | null;
          title: string | null;
          winner: string | null;
        };
        Insert: {
          author_id?: string | null;
          category?: string | null;
          created_at?: string;
          credit_need?: number | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          participants?: string[] | null;
          prize_value?: number | null;
          published?: boolean | null;
          time_end?: string | null;
          title?: string | null;
          winner?: string | null;
        };
        Update: {
          author_id?: string | null;
          category?: string | null;
          created_at?: string;
          credit_need?: number | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          participants?: string[] | null;
          prize_value?: number | null;
          published?: boolean | null;
          time_end?: string | null;
          title?: string | null;
          winner?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          balance: number | null;
          created_at: string;
          email: string | null;
          id: string;
          image: string | null;
          isAdmin: boolean | null;
          name: string | null;
          stripe_current_period_end: number | null;
          stripe_customer_id: string | null;
          stripe_price_id: string | null;
          stripe_subscription_id: string | null;
        };
        Insert: {
          balance?: number | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          image?: string | null;
          isAdmin?: boolean | null;
          name?: string | null;
          stripe_current_period_end?: number | null;
          stripe_customer_id?: string | null;
          stripe_price_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          balance?: number | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          image?: string | null;
          isAdmin?: boolean | null;
          name?: string | null;
          stripe_current_period_end?: number | null;
          stripe_customer_id?: string | null;
          stripe_price_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
