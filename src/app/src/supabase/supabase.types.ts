export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'WON' | 'LOST';
export type NotificationChannel = 'email' | 'whatsapp';
export type NotificationStatus = 'sent' | 'failed';

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          phone: string | null;
          status: LeadStatus;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          status?: LeadStatus;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          status?: LeadStatus;
          notes?: string | null;
        };
      };
      lead_notifications: {
        Row: {
          id: string;
          lead_id: string;
          channel: NotificationChannel;
          status: NotificationStatus;
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          channel: NotificationChannel;
          status: NotificationStatus;
          error?: string | null;
          created_at?: string;
        };
        Update: Record<string, never>;
      };
    };
  };
}

export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
