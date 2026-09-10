import { createClient } from "@supabase/supabase-js";
import type { Insight } from "./types";

/* ═══════════════════════════════════════════════════════════════════
   Build-time reader.

   `next build` runs Server Components once, at build, to emit static
   HTML. This client is what the public insight pages use to bake the
   published posts into that HTML for SEO. It uses the anon key and can
   therefore only ever see rows the "published insights are public"
   policy exposes.

   Because the output is a static export, a post created after a build
   only gets its own HTML file on the next deploy. Existing pages still
   refresh their content in the browser — see PublicInsight.
   ═══════════════════════════════════════════════════════════════════ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Published insights, newest first. Returns `[]` when Supabase is not
 * configured or unreachable so a build never fails on a missing key.
 */
export async function fetchPublishedInsights(): Promise<Insight[]> {
  if (!url || !anonKey) return [];

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.warn(`[insights] build-time fetch failed: ${error.message}`);
      return [];
    }
    return (data ?? []) as Insight[];
  } catch (err) {
    console.warn(`[insights] build-time fetch threw: ${String(err)}`);
    return [];
  }
}
