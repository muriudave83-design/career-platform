"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.8)]"></div>

            <h1 className="text-white font-bold text-3xl tracking-tight">
              JoinNexiva
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
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
          <div className="flex items-center gap-4">
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
                  className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-2xl text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
                >
                  Get Started
                </a>
              </>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-2xl text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gradient-to-b from-[#050816] via-black to-[#050816] text-white overflow-hidden pt-28">

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          {/* Glow Effects */}
          <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-pink-500/15 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full"></div>

          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {/* LEFT SIDE */}
            <div>

              <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur">
                🇰🇪 Kenya’s Modern Internship Platform
              </div>

              <h1 className="text-5xl md:text-7xl leading-tight font-black mb-8">
                Find Verified Internships That Actually Launch Careers
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                Join Kenya’s premium internship and graduate opportunities platform connecting ambitious students with verified employers across Kenya.
              </p>

              {/* SEARCH BAR */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex items-center gap-3 mb-10 max-w-2xl shadow-2xl">
                <input
                  type="text"
                  placeholder="Search internships, companies, or skills..."
                  className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-500 px-3"
                />

                <button className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-xl font-semibold text-white">
                  Search
                </button>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-5 mb-14">
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

              {/* TRUST STATS */}
              <div className="flex flex-wrap gap-8 text-sm text-gray-400">
                <div>✅ Verified Listings</div>
                <div>✅ Trusted Recruiters</div>
                <div>✅ Student Friendly</div>
                <div>✅ Fast Applications</div>
              </div>

              {/* TRUSTED COMPANIES */}
              <div className="mt-12">
                <p className="text-gray-500 text-sm mb-5">
                  STUDENTS APPLYING TO OPPORTUNITIES FROM
                </p>

                <div className="flex flex-wrap gap-6 text-gray-300 font-semibold">
                  <span>Safaricom</span>
                  <span>Equity Bank</span>
                  <span>KCB</span>
                  <span>Microsoft</span>
                  <span>Google</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative hidden lg:flex justify-center">

              {/* Glow */}
              <div className="absolute w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-[420px] shadow-2xl">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">
                      Featured Internship
                    </p>

                    <h3 className="text-white text-2xl font-bold">
                      Software Engineering Intern
                    </h3>
                  </div>

                  <div className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    Premium
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm">Company</p>
                    <p className="text-white font-semibold">Safaricom</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-semibold">
                      Nairobi, Kenya
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm">Salary</p>
                    <p className="text-white font-semibold">
                      KSh 25,000/month
                    </p>
                  </div>

                </div>

                <button className="w-full mt-8 bg-pink-500 hover:bg-pink-600 transition py-4 rounded-2xl font-semibold text-white">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED INTERNSHIPS */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Featured Internships in Kenya
            </h2>

            <p className="text-gray-400 mb-14 max-w-2xl text-lg">
              Explore verified internship and graduate opportunities from leading companies across Kenya.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* CARD 1 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      Data Analyst Intern
                    </h3>

                    <p className="text-gray-400">
                      Safaricom
                    </p>
                  </div>

                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-300 text-sm mb-6">
                  <p>📍 Nairobi, Kenya</p>
                  <p>💰 KSh 30,000/month</p>
                  <p>🕒 Full Time Internship</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

              {/* CARD 2 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      Software Engineer Intern
                    </h3>

                    <p className="text-gray-400">
                      Microsoft
                    </p>
                  </div>

                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-300 text-sm mb-6">
                  <p>📍 Hybrid - Nairobi</p>
                  <p>💰 Competitive</p>
                  <p>🕒 Graduate Internship</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

              {/* CARD 3 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      Finance Graduate Trainee
                    </h3>

                    <p className="text-gray-400">
                      Equity Bank
                    </p>
                  </div>

                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-300 text-sm mb-6">
                  <p>📍 Nairobi, Kenya</p>
                  <p>💰 KSh 45,000/month</p>
                  <p>🕒 Graduate Program</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                How JoinNexiva Works
              </h2>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover opportunities, connect with verified employers, and launch your career faster.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-lg">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl mx-auto mb-6">
                  1
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Create Account
                </h3>

                <p className="text-gray-400">
                  Sign up for free and build your student or graduate profile in minutes.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-lg">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl mx-auto mb-6">
                  2
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Browse Opportunities
                </h3>

                <p className="text-gray-400">
                  Explore verified internships, graduate trainee programs, and industrial attachments.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-lg">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl mx-auto mb-6">
                  3
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Apply Directly
                </h3>

                <p className="text-gray-400">
                  Submit applications quickly and connect with trusted recruiters across Kenya.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Student Success Stories
              </h2>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Students and graduates using JoinNexiva are discovering real opportunities faster.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
                <p className="text-gray-300 leading-relaxed mb-6">
                  “I found my first software internship through JoinNexiva after struggling for months on other platforms.”
                </p>

                <div>
                  <h4 className="font-bold text-white">
                    Brian M.
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Computer Science Student
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
                <p className="text-gray-300 leading-relaxed mb-6">
                  “The verified listings gave me confidence applying because many internship scams exist online.”
                </p>

                <div>
                  <h4 className="font-bold text-white">
                    Sharon K.
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Finance Graduate
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
                <p className="text-gray-300 leading-relaxed mb-6">
                  “Clean interface, real opportunities, and fast applications. This platform feels premium.”
                </p>

                <div>
                  <h4 className="font-bold text-white">
                    Kevin O.
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Marketing Student
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Why Students Choose JoinNexiva
              </h2>

              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                We simplify internship discovery and connect ambitious students with verified opportunities that accelerate career growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 rounded-3xl p-10">
                <div className="text-5xl mb-6">🚀</div>

                <h3 className="text-2xl font-bold mb-4">
                  Premium Opportunities
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  Access high-quality internships and exclusive opportunities from leading employers across Kenya.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 rounded-3xl p-10">
                <div className="text-5xl mb-6">🛡️</div>

                <h3 className="text-2xl font-bold mb-4">
                  Verified Listings
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  We reduce internship scams by reviewing and verifying opportunities before publishing them.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 rounded-3xl p-10">
                <div className="text-5xl mb-6">💡</div>

                <h3 className="text-2xl font-bold mb-4">
                  Career Guidance
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  Get practical career insights, internship strategies, and application tips that improve success rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO SECTION */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Find Internship Opportunities Across Kenya
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg">
              JoinNexiva helps students and graduates discover internships in Kenya, graduate trainee programs, industrial attachments, student jobs, and career opportunities from trusted employers. Whether you are searching for software engineering internships, finance graduate programs, marketing internships, or entry-level career opportunities, JoinNexiva connects ambitious talent with verified companies across Kenya.
            </p>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-28 text-white">
          <div className="max-w-5xl mx-auto text-center px-6">
            
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Ready To Start Your Career Journey?
            </h2>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
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

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

            <div>
              <h3 className="text-2xl font-bold mb-4">
                JoinNexiva
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Kenya’s modern internship and graduate opportunities platform built for ambitious students and graduates.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">
                Platform
              </h4>

              <div className="space-y-3 text-gray-400">
                <a href="#" className="block hover:text-pink-400 transition">
                  About
                </a>

                <a href="/listings" className="block hover:text-pink-400 transition">
                  Internships
                </a>

                <a href="#" className="block hover:text-pink-400 transition">
                  Companies
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">
                Legal
              </h4>

              <div className="space-y-3 text-gray-400">
                <a href="#" className="block hover:text-pink-400 transition">
                  Privacy Policy
                </a>

                <a href="#" className="block hover:text-pink-400 transition">
                  Terms & Conditions
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">
                Connect
              </h4>

              <div className="space-y-3 text-gray-400">
                <a href="#" className="block hover:text-pink-400 transition">
                  LinkedIn
                </a>

                <a href="#" className="block hover:text-pink-400 transition">
                  Twitter
                </a>

                <a href="#" className="block hover:text-pink-400 transition">
                  Contact
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
            © 2026 JoinNexiva. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}