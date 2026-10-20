"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { login, signup, type AuthState } from "./actions";

const initialState: AuthState = { error: null };

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const justSignedUp = searchParams.get("checkEmail") === "1";
  const emailConfirmed = searchParams.get("confirmed") === "1";
  const confirmationFailed = searchParams.get("error") === "confirmation-failed";

  const [mode, setMode] = useState<"login" | "signup">(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [loginState, loginAction] = useFormState(login, initialState);
  const [signupState, signupAction] = useFormState(signup, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-circuit-bg px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-circuit-border bg-circuit-card p-8">
        <a href="/" className="mb-8 block text-center font-display text-lg font-bold text-white">
          Trading Circuit <span className="text-circuit-green">Academy</span>
        </a>

        <div className="mb-6 flex rounded-lg border border-circuit-border p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-circuit-green text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-circuit-green text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            Sign up
          </button>
        </div>

        {justSignedUp && (
          <p role="status" className="mb-5 rounded-lg border border-circuit-green/25 bg-circuit-green/5 px-4 py-3 text-sm leading-6 text-white/80">
            <strong className="block text-circuit-green">Please confirm your email</strong>
            We sent you a confirmation link. Open it to verify your email, then return here to log in.
          </p>
        )}
        {emailConfirmed && (
          <p role="status" className="mb-5 rounded-lg border border-circuit-green/25 bg-circuit-green/5 px-4 py-3 text-sm leading-6 text-white/80">
            <strong className="block text-circuit-green">Email confirmed successfully</strong>
            Your email is verified. Please log in to continue.
          </p>
        )}
        {confirmationFailed && (
          <p role="alert" className="mb-5 rounded-lg border border-rose-400/25 bg-rose-400/5 px-4 py-3 text-sm leading-6 text-rose-200">
            This confirmation link is invalid or expired. Request a new confirmation email or try signing up again.
          </p>
        )}

        {mode === "login" ? (
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Field label="Email" name="email" type="email" />
            <Field label="Password" name="password" type="password" />

            {loginState?.error && <ErrorText message={loginState.error} />}

            <SubmitButton idleLabel="Log in" pendingLabel="Logging in..." />
          </form>
        ) : (
          <form action={signupAction} className="space-y-4">
            <Field label="Full name" name="fullName" type="text" />
            <Field label="Email" name="email" type="email" />
            <Field label="Password" name="password" type="password" />

            {signupState?.error && <ErrorText message={signupState.error} />}

            <SubmitButton idleLabel="Create account" pendingLabel="Creating account..." />
          </form>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-medium text-white/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-md border border-white/15 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-circuit-green focus:outline-none"
      />
    </label>
  );
}

function ErrorText({ message }: { message: string }) {
  return <p className="text-xs font-medium text-rose-400">{message}</p>;
}

function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-circuit-green py-3 text-sm font-semibold text-black transition hover:bg-circuit-green-dark disabled:opacity-60"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}
