"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function resetPassword() {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      }
    );

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMessage(data.error);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-xl p-8">

        <h1 className="text-4xl font-black mb-3">
          Reset Password
        </h1>

        <p className="text-gray-500 mb-8">
          Choose a new password.
        </p>

        <div className="space-y-5">

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 pr-14"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff />
              ) : (
                <Eye />
              )}
            </button>

          </div>

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 pr-14"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff />
              ) : (
                <Eye />
              )}
            </button>

          </div>

          {message && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-600">
              {message}
            </div>
          )}

          <button
            onClick={resetPassword}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 font-bold text-white"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </div>
    </main>
  );
}