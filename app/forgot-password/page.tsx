"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-xl p-8">

        <h1 className="text-4xl font-black text-gray-900 mb-3">
          Forgot Password
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your account email and we'll send you a password reset link.
        </p>

        {sent ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
            <p className="text-green-700 font-medium">
              If an account exists with that email, we've sent a password reset link.
            </p>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 font-bold text-white hover:from-green-500 hover:to-emerald-400 transition-all"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
