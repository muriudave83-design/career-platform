"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              🇰🇪 Kenya’s Next Generation Career Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Launch Your Career With Verified Internships
            </h1>

            <p className="text-lg md:text-2xl text-green-50 mb-10 leading-relaxed">
              Discover premium internships, graduate programs, and career-launching opportunities from trusted companies across Kenya.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/listings"
                className="bg-white text-green-700 hover:bg-green-50 transition-all px-8 py-4 rounded-2xl text-lg font-bold shadow-xl"
              >
                Browse Opportunities
              </Link>

              {!session?.user ? (
                <Link
                  href="/signup"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black transition-all px-8 py-4 rounded-2xl text-lg font-bold shadow-xl"
                >
                  Create Free Account
                </Link>
              ) : (
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="bg-black/20 backdrop-blur hover:bg-black/30 transition-all px-8 py-4 rounded-2xl text-lg font-bold border border-white/20"
                >
                  Logout
                </button>
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-green-100">
              <div>✅ Verified Listings</div>
              <div>✅ Premium Opportunities</div>
              <div>✅ Student Friendly</div>
              <div>✅ Fast Applications</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">
            <h2 className="text-4xl font-extrabold text-green-600 mb-2">
              100+
            </h2>
            <p className="text-gray-600 text-lg">
              Internship Opportunities
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">
            <h2 className="text-4xl font-extrabold text-green-600 mb-2">
              Trusted
            </h2>
            <p className="text-gray-600 text-lg">
              Verified Companies & Recruiters
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">
            <h2 className="text-4xl font-extrabold text-green-600 mb-2">
              Career Growth
            </h2>
            <p className="text-gray-600 text-lg">
              Built for Students & Graduates
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">
              Why Students Choose JoinNexiva
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We simplify internship discovery and help students connect with real career opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🚀</div>

              <h3 className="text-2xl font-bold mb-3">
                Premium Opportunities
              </h3>

              <p className="text-gray-600">
                Access high-quality internships and exclusive opportunities from top employers.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🛡️</div>

              <h3 className="text-2xl font-bold mb-3">
                Verified Listings
              </h3>

              <p className="text-gray-600">
                We help reduce fake internship scams by verifying opportunities before publishing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition">
              <div className="text-5xl mb-4">💡</div>

              <h3 className="text-2xl font-bold mb-3">
                Career Tips
              </h3>

              <p className="text-gray-600">
                Improve your application success with smart career guidance and internship insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 py-24 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-extrabold mb-6">
            Ready to Start Your Career Journey?
          </h2>

          <p className="text-xl text-green-100 mb-10">
            Join thousands of ambitious students discovering real opportunities across Kenya.
          </p>

          <Link
            href="/listings"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl transition"
          >
            Explore Internships
          </Link>
        </div>
      </section>
    </main>
  );
}