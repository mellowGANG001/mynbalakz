export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attraction_branches: {
        Row: {
          attraction_id: string
          branch_id: string
        }
        Insert: {
          attraction_id: string
          branch_id: string
        }
        Update: {
          attraction_id?: string
          branch_id?: string
        }
        Relationships: []
      }
      attractions: {
        Row: {
          created_at: string | null
          description_kk: string | null
          description_ru: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          lottie_animation_url: string | null
          name_kk: string
          name_ru: string
          points_reward: number | null
          qr_code_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_kk?: string | null
          description_ru?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          lottie_animation_url?: string | null
          name_kk: string
          name_ru: string
          points_reward?: number | null
          qr_code_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_kk?: string | null
          description_ru?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          lottie_animation_url?: string | null
          name_kk?: string
          name_ru?: string
          points_reward?: number | null
          qr_code_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      branches: {
        Row: {
          address: string
          city: string
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_open: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          updated_at: string | null
          working_hours: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          working_hours?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          working_hours?: string | null
        }
        Relationships: []
      }
      promos: {
        Row: {
          created_at: string | null
          description: string
          discount: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          title: string
          updated_at: string | null
          valid_until: string
        }
        Insert: {
          created_at?: string | null
          description: string
          discount?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          valid_until: string
        }
        Update: {
          created_at?: string | null
          description?: string
          discount?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          valid_until?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tariffs: {
        Row: {
          age_range: string | null
          created_at: string | null
          description: string | null
          duration: string
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          price: number
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          duration: string
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          price: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_categories: {
        Row: {
          created_at: string | null
          emoji: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          emoji: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_popular: boolean | null
          name: string
          price: number
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_popular?: boolean | null
          name: string
          price: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_popular?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string | null
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

// Convenience types
export type Branch = Database["public"]["Tables"]["branches"]["Row"]
export type Promo = Database["public"]["Tables"]["promos"]["Row"]
export type News = Database["public"]["Tables"]["news"]["Row"]
export type Tariff = Database["public"]["Tables"]["tariffs"]["Row"]
export type Attraction = Database["public"]["Tables"]["attractions"]["Row"]
export type MenuCategory = Database["public"]["Tables"]["menu_categories"]["Row"]
export type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"]
