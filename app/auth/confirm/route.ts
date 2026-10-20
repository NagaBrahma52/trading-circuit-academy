import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

/** Confirm the email, clear the temporary confirmation session, and send the user to login. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const supabase = await createClient();

  let confirmationError = true;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    confirmationError = Boolean(error);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    confirmationError = Boolean(error);
  }

  if (confirmationError) redirect("/login?error=confirmation-failed");

  // Confirmation can establish a session. Sign out so middleware doesn't send
  // the newly confirmed user straight to the dashboard; they should log in explicitly.
  await supabase.auth.signOut();
  redirect("/login?confirmed=1");
}
