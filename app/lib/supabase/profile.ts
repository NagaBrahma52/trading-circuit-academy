import { createClient } from "./server";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
};

/** Returns the logged-in user's profile row (with role), or null if signed out. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .single();

  return data as Profile | null;
}
