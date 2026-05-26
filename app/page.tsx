"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>

            <h1 className="text-white font-bold text-2xl tracking-tight">
              JoinNexiva
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-pink-400 transition">
              Home
            </a>

            <a href="/listings" className="hover:text-pink-400 transition">
              Internships
            </a>

            <a href="#" className="hover:text-pink-400 transition">
              Career Tips
            </a>

            <a href="#" className="hover:text-pink-400 transition">
              Companies
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            {!session?.user ? (
              <>
                <a
                  href="/login"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  Login
                </a>

                <a
                  href="/register"
                  className="bg-pink-500 hover:bg-pink-600 transition px-5 py-2 rounded-xl text-sm font-semibold text-white"
                >
                  Get Started
                </a>
              </>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-pink-500 hover:bg-pink-600 transition px-5 py-2 rounded-xl text-sm font-semibold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-white text-black overflow-hidden pt-24">
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-pink-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-40">
            <div className="max-w-4xl">
              
              <div className="inline-block bg-pink-500/20 border border-pink-500/30 text-pink-200 px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur">
                🇰🇪 Kenya’s Modern Internship Platform
              </div>

              <h1 className="text-5xl md:text-7xl leading-tight font-black mb-8">
                Find Verified Internships That Actually Launch Careers
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl">
                Join Kenya’s modern internship platform connecting ambitious students and graduates with verified opportunities from trusted companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/listings"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-pink-500/20 hover:scale-105 text-center"
                >
                  Browse Internships
                </Link>

                {!session?.user ? (
                  <Link
                    href="/signup"
                    className="border border-white/20 hover:border-pink-500 px-8 py-4 rounded-2xl text-white transition-all duration-300 hover:bg-white/5 text-center"
                  >
                    Create Free Account
                  </Link>
                ) : (
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="border border-white/20 hover:border-pink-500 px-8 py-4 rounded-2xl text-white transition-all duration-300 hover:bg-white/5"
                  >
                    Logout
                  </button>
                )}
              </div>

              <div className="mt-14 flex flex-wrap gap-6 text-sm text-gray-300">
                <div>✅ Verified Listings</div>
                <div>✅ Trusted Recruiters</div>
                <div>✅ Student Friendly</div>
                <div>✅ Fast Applications</div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
              <h2 className="text-5xl font-black text-pink-500 mb-3">
                100+
              </h2>

              <p className="text-gray-600 text-lg">
                Internship Opportunities
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
              <h2 className="text-5xl font-black text-pink-500 mb-3">
                Trusted
              </h2>

              <p className="text-gray-600 text-lg">
                Verified Companies & Recruiters
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
              <h2 className="text-5xl font-black text-pink-500 mb-3">
                Career Growth
              </h2>

              <p className="text-gray-600 text-lg">
                Built for Students & Graduates
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Why Students Choose JoinNexiva
              </h2>

              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                We simplify internship discovery and connect ambitious students with real opportunities that accelerate career growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-6">🚀</div>

                <h3 className="text-2xl font-bold mb-4">
                  Premium Opportunities
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Access high-quality internships and exclusive opportunities from leading employers across Kenya.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-6">🛡️</div>

                <h3 className="text-2xl font-bold mb-4">
                  Verified Listings
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  We reduce internship scams by reviewing and verifying opportunities before publishing them.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-6">💡</div>

                <h3 className="text-2xl font-bold mb-4">
                  Career Guidance
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Get practical career insights, internship strategies, and application tips that improve success rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-gradient-to-r from-black via-gray-900 to-pink-900 py-28 text-white">
          <div className="max-w-5xl mx-auto text-center px-6">
            
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Ready To Start Your Career Journey?
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join ambitious students and graduates discovering verified internship opportunities across Kenya.
            </p>

            <Link
              href="/listings"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-pink-500/20 transition-all duration-300 hover:scale-105"
            >
              Explore Internships
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}