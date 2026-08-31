export const environment = {
  production: false,
  // Für lokale Entwicklung: eigenes Supabase-Projekt oder dieselben
  // Werte wie in Production, da der anon key ohnehin öffentlich im
  // Browser-Bundle landet (siehe README, Sicherheitshinweis).
  supabaseUrl: 'https://xxxxxxxxxxxx.supabase.co',
  supabaseAnonKey: 'your-anon-key'
};
