"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/listings");
      }
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white p-16">
        <div className="max-w-xl">
          <h1 className="text-6xl font-black tracking-tight">
            JoinNexiva
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-green-50">
            Verified internships, graduate trainee programs,
            industrial attachments and career opportunities
            across Kenya.
          </p>

          <div className="mt-10 space-y-4 text-lg">
            <div>✓ Verified Recruiters</div>
            <div>✓ Premium Opportunities</div>
            <div>✓ Career Resources</div>
            <div>✓ Graduate Programs</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to continue
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-2xl border border-gray-200 px-4 py-4 pr-14 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}