/* ============================================================
   CLOUD-EINSTELLUNGEN (Supabase)
   Beide Werte stehen im Supabase-Dashboard unter
   Project Settings → API. Der anon-Key darf öffentlich sein,
   die Daten schützt die Row-Level-Security (supabase/schema.sql).
   Bleiben die Werte leer, ist Login und Sync ausgeschaltet und
   die App speichert wie bisher nur lokal.
   ============================================================ */
const SUPABASE_URL = "https://kgtmbitxnlayztjhwlrp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PIAwoeC1YH0c0AhG4lh3wg_UONIFL4_";
