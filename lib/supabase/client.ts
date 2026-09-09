"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════════════════
   Browser Supabase client.

   The site ships as a static export, so there is no server to hold a
   secret — every call here runs in the visitor's browser with the anon
   key. That key is public by design; Row Level Security in
   supabase/schema.sql is what actually protects the data.

   NEVER put the service-role key in this file or any NEXT_PUBLIC_ var.
   ═══════════════════════════════════════════════════════════════════ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when the project has been pointed at a Supabase instance. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let cached: SupabaseClient | null = null;

/**
 * Returns the shared browser client, or `null` when the environment
 * variables are absent. Callers render a configuration notice rather
 * than crashing, which keeps the marketing site building on a machine
 * that has no Supabase credentials.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!cached) {
    cached = createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return cached;
}

/** URL of a deployed Edge Function, e.g. `send-contact-reply`. */
export function functionUrl(name: string): string {
  return `${url}/functions/v1/${name}`;
}
