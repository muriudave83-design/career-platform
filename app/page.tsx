"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00C853] shadow-[0_0_20px_rgba(0,200,83,0.5)]"></div>

            <h1 className="text-[#111827] font-black text-3xl tracking-tight">
              JoinNexiva
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-10 text-base font-medium text-gray-600">
            <a
              href="#"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Home
            </a>

            <a
              href="/listings"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Internships
            </a>

            <a
              href="#"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Career Tips
            </a>

            <a
              href="#"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Companies
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {!session?.user ? (
              <>
                <a
                  href="/login"
                  className="text-base text-gray-600 hover:text-[#111827] transition-all duration-300"
                >
                  Login
                </a>

                <a
                  href="/register"
                  className="bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl px-6 py-3 rounded-2xl text-sm font-semibold text-white"
                >
                  Get Started
                </a>
              </>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl px-6 py-3 rounded-2xl text-sm font-semibold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-white text-[#111827] overflow-hidden pt-28">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden min-h-screen flex items-center bg-[linear-gradient(to_bottom_right,#ffffff,#f6fff7,#ecfff1)]">

          {/* SAFARICOM GLOWS */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/40 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/50 blur-3xl rounded-full"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE */}
            <div>

              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-[#C8E6C9] text-[#00A63E] px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
                🇰🇪 Kenya’s Modern Internship Platform
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-8 text-[#111827]">
                Find Verified Internships That Actually Launch Careers
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-8 mb-12 max-w-2xl">
                Join Kenya’s modern internship and graduate opportunities
                platform connecting ambitious students with verified employers
                across Kenya.
              </p>

              {/* SEARCH BAR */}
              <div className="bg-white border border-gray-200 rounded-3xl p-3 flex flex-col sm:flex-row items-center gap-3 mb-10 max-w-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <input
                  type="text"
                  placeholder="Search internships, companies, or skills..."
                  className="bg-transparent outline-none flex-1 w-full text-[#111827] placeholder:text-gray-400 px-4 py-3"
                />

                <button className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl px-8 py-4 rounded-2xl font-semibold text-white">
                  Search
                </button>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-5 mb-14">

                <Link
                  href="/listings"
                  className="bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl text-white px-8 py-4 rounded-2xl font-semibold text-center"
                >
                  Browse Internships
                </Link>

                {!session?.user ? (
                  <Link
                    href="/signup"
                    className="border border-gray-300 hover:border-[#00C853] px-8 py-4 rounded-2xl text-[#111827] transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-xl text-center"
                  >
                    Create Free Account
                  </Link>
                ) : (
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="border border-gray-300 hover:border-[#00C853] px-8 py-4 rounded-2xl text-[#111827] transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-xl"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* TRUST STATS */}
              <div className="flex flex-wrap gap-8 text-sm text-gray-600 font-medium">

                <div className="flex items-center gap-2">
                  <span className="text-[#00C853]">✓</span>
                  Verified Listings
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#00C853]">✓</span>
                  Trusted Recruiters
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#00C853]">✓</span>
                  Student Friendly
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#00C853]">✓</span>
                  Fast Applications
                </div>
              </div>

              {/* TRUSTED COMPANIES */}
              <div className="mt-16">
                <p className="text-gray-500 text-sm mb-6 font-semibold tracking-wide">
                  STUDENTS APPLYING TO OPPORTUNITIES FROM
                </p>

                <div className="flex flex-wrap items-center gap-8 text-gray-400 font-black text-2xl">
                  <span className="hover:text-gray-700 transition-all duration-300">
                    Safaricom
                  </span>

                  <span className="hover:text-gray-700 transition-all duration-300">
                    Equity
                  </span>

                  <span className="hover:text-gray-700 transition-all duration-300">
                    KCB
                  </span>

                  <span className="hover:text-gray-700 transition-all duration-300">
                    Microsoft
                  </span>

                  <span className="hover:text-gray-700 transition-all duration-300">
                    Google
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative hidden lg:flex justify-center">

              <div className="relative flex justify-center">

                <img
                  src="/students-hero.avif"
                  alt="Students collaborating"
                  className="w-[520px] h-[620px] object-cover rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />

                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 w-[320px] shadow-2xl border border-gray-100">

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">
                      Software Engineering Intern
                    </h3>

                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                      Verified
                    </span>
                  </div>

                  <p className="text-gray-500 mb-5">
                    Safaricom • Nairobi
                  </p>

                  <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] py-3 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED INTERNSHIPS */}
        <section className="py-24 px-6 bg-white border-t border-green-100">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Featured Internships in Kenya
            </h2>

            <p className="text-gray-600 leading-8 mb-14 max-w-2xl text-lg">
              Explore verified internship and graduate opportunities from
              leading companies across Kenya.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* CARD 1 */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#00C853]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[#111827] text-xl font-bold">
                      Data Analyst Intern
                    </h3>

                    <p className="text-gray-500">
                      Safaricom
                    </p>
                  </div>

                  <span className="bg-[#E8F5E9] text-[#00A63E] px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 text-sm mb-6">
                  <p>📍 Nairobi, Kenya</p>
                  <p>💰 KSh 30,000/month</p>
                  <p>🕒 Full Time Internship</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

              {/* CARD 2 */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#00C853]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[#111827] text-xl font-bold">
                      Software Engineer Intern
                    </h3>

                    <p className="text-gray-500">
                      Microsoft
                    </p>
                  </div>

                  <span className="bg-[#E8F5E9] text-[#00A63E] px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 text-sm mb-6">
                  <p>📍 Hybrid - Nairobi</p>
                  <p>💰 Competitive</p>
                  <p>🕒 Graduate Internship</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

              {/* CARD 3 */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#00C853]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[#111827] text-xl font-bold">
                      Finance Graduate Trainee
                    </h3>

                    <p className="text-gray-500">
                      Equity Bank
                    </p>
                  </div>

                  <span className="bg-[#E8F5E9] text-[#00A63E] px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 text-sm mb-6">
                  <p>📍 Nairobi, Kenya</p>
                  <p>💰 KSh 45,000/month</p>
                  <p>🕒 Graduate Program</p>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl py-3 rounded-2xl font-semibold text-white">
                  View Opportunity
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 px-6 bg-[#FBFFFC] border-t border-green-100">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#111827]">
                How JoinNexiva Works
              </h2>

              <p className="text-gray-600 text-lg leading-8 max-w-2xl mx-auto">
                Discover opportunities, connect with verified employers,
                and launch your career faster.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#00C853] flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#111827]">
                  Create Account
                </h3>

                <p className="text-gray-600 leading-8">
                  Sign up for free and build your student or graduate profile
                  in minutes.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#00C853] flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#111827]">
                  Browse Opportunities
                </h3>

                <p className="text-gray-600 leading-8">
                  Explore verified internships, graduate trainee programs,
                  and industrial attachments.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#00C853] flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#111827]">
                  Apply Directly
                </h3>

                <p className="text-gray-600 leading-8">
                  Submit applications quickly and connect with trusted recruiters.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-[linear-gradient(to_bottom_right,#00C853,#00A63E)] text-white border-t border-green-100 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full"></div>

          <div className="max-w-5xl mx-auto text-center px-6 relative">

            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-8">
              Ready To Start Your Career Journey?
            </h2>

            <p className="text-xl text-white/90 leading-8 mb-12 max-w-3xl mx-auto">
              Join ambitious students and graduates discovering verified
              internship opportunities across Kenya.
            </p>

            <Link
              href="/listings"
              className="inline-block bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl text-white px-10 py-5 rounded-2xl text-xl font-bold"
            >
              Explore Internships
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-green-100 py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

            <div>
              <h3 className="text-2xl font-black mb-4 text-[#111827]">
                JoinNexiva
              </h3>

              <p className="text-gray-600 leading-8">
                Kenya’s modern internship and graduate opportunities platform
                built for ambitious students and graduates.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#111827] mb-4">
                Platform
              </h4>

              <div className="space-y-3 text-gray-600">
                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  About
                </a>

                <a
                  href="/listings"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Internships
                </a>

                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Companies
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#111827] mb-4">
                Legal
              </h4>

              <div className="space-y-3 text-gray-600">
                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#111827] mb-4">
                Connect
              </h4>

              <div className="space-y-3 text-gray-600">
                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Twitter
                </a>

                <a
                  href="#"
                  className="block hover:text-[#00C853] transition-all duration-300"
                >
                  Contact
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-green-100 mt-12 pt-8 text-center text-gray-500 text-sm">
            © 2026 JoinNexiva. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}