import NavbarClient from "./NavbarClient";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/profile";

/** Server-render the current session/profile so the homepage shows the correct auth state immediately. */
export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const profile = user ? await getCurrentProfile() : null;

  return (
    <NavbarClient
      currentUser={user ? {
        name: profile?.full_name ?? user.user_metadata?.full_name ?? null,
        email: user.email ?? "",
        role: profile?.role === "admin" ? "admin" : "user",
      } : null}
    />
  );
}
