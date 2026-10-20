import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for use in Server Components, Route Handlers, and
 * Server Actions. Reads/writes the session via Next's cookie store.
 *
 * NOTE: calling `.set()` from a Server Component (not an action/handler)
 * will throw — that's expected, Next only allows cookie writes from
 * Route Handlers and Server Actions. The try/catch below lets this file
 * be safely imported from Server Components too (session refresh still
 * happens in middleware.ts).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore, middleware handles refresh.
          }
        },
      },
    }
  );
}
