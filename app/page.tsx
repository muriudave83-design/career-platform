"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("SESSION:", session);

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

            <Link
              href="/resources"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Career Guides
            </Link>

          {(session?.user as any)?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Admin
            </Link>
          )}
            <a
              href="#"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Companies
            </a>

            <Link
              href="/contact"
              className="hover:text-[#00C853] transition-all duration-300"
            >
              Contact
            </Link>
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

        <section className="py-24 px-6 bg-white">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Students Trust JoinNexiva
              </h2>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
                Students and graduates across Kenya are discovering verified internships and launching their careers through JoinNexiva.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="bg-[#f8fff9] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-green-200"></div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Brian Mwangi
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Computer Science Student
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-8">
                  “JoinNexiva helped me find my first software engineering internship in Nairobi. The platform feels modern and trustworthy.”
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8fff9] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-pink-200"></div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Mercy Atieno
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Finance Graduate
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-8">
                  “I discovered graduate trainee opportunities I couldn’t easily find elsewhere. The verified listings gave me confidence.”
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8fff9] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-green-300"></div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Kevin Kiptoo
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Marketing Student
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-8">
                  “The internship search experience is clean and easy to use. I applied to multiple opportunities directly from JoinNexiva.”
                </p>
              </div>

            </div>

          </div>

        </section>
                <section className="py-24 px-6 bg-[#f8fff9] border-t border-green-100">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Explore Internship Categories
              </h2>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-8">
                Discover internship and graduate opportunities across Kenya in technology, finance, marketing, design, business, and more.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Category Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-6">
                  💻
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Software Engineering
                </h3>

                <p className="text-gray-600 leading-7">
                  Explore software development, web engineering, and IT internship opportunities.
                </p>

              </div>

              {/* Category Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl mb-6">
                  📈
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Marketing
                </h3>

                <p className="text-gray-600 leading-7">
                  Discover digital marketing, social media, and brand strategy internships.
                </p>

              </div>

              {/* Category Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-6">
                  💰
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Finance
                </h3>

                <p className="text-gray-600 leading-7">
                  Find finance, accounting, and graduate trainee opportunities across Kenya.
                </p>

              </div>

              {/* Category Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl mb-6">
                  🎨
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Design
                </h3>

                <p className="text-gray-600 leading-7">
                  Explore UI/UX, graphic design, and creative internship opportunities.
                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="py-24 px-6 bg-white border-t border-green-100">

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            {/* Left Content */}
            <div>

              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Why JoinNexiva
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                Built for Students & Graduates Looking for Real Opportunities
              </h2>

              <p className="text-gray-600 text-lg leading-8 mb-10">
                JoinNexiva helps students and graduates across Kenya discover verified internships, industrial attachments, graduate trainee programs, and entry-level career opportunities from trusted companies.
              </p>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-xl">
                    ✅
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Verified Opportunities
                    </h3>

                    <p className="text-gray-600 leading-7">
                      We focus on quality internship listings from trusted employers and organizations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-xl">
                    🚀
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Career-Focused Platform
                    </h3>

                    <p className="text-gray-600 leading-7">
                      Built specifically for students, graduates, and early-career professionals in Kenya.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-xl">
                    🌍
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      Opportunities Across Kenya
                    </h3>

                    <p className="text-gray-600 leading-7">
                      Explore internships and graduate programs from companies across multiple industries and cities.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Card */}
            <div className="relative">

              <div className="bg-[linear-gradient(to_bottom_right,#ffffff,#f6fff7,#ecfff1)] rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-green-100">

                <div className="grid grid-cols-2 gap-6">

                  <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h3 className="text-4xl font-black text-gray-900 mb-2">
                      150+
                    </h3>

                    <p className="text-gray-600">
                      Verified Opportunities
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h3 className="text-4xl font-black text-gray-900 mb-2">
                      5K+
                    </h3>

                    <p className="text-gray-600">
                      Student Applications
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h3 className="text-4xl font-black text-gray-900 mb-2">
                      50+
                    </h3>

                    <p className="text-gray-600">
                      Hiring Companies
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h3 className="text-4xl font-black text-gray-900 mb-2">
                      24/7
                    </h3>

                    <p className="text-gray-600">
                      Career Access
                    </p>
                  </div>

                </div>

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

        {/* DYNAMIC HYBRID SECTION */}
        <section className="py-24 px-6 bg-[#f8fff9] border-t border-green-100">

          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

            {/* LEFT LARGE PANEL */}
            <div className="lg:col-span-2 bg-white rounded-[32px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-green-100">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <p className="text-[#00C853] font-semibold mb-2">
                    Latest Opportunities
                  </p>

                  <h2 className="text-3xl font-bold text-[#111827]">
                    Trending Internships
                  </h2>
                </div>

                <Link
                  href="/listings"
                  className="text-pink-500 font-semibold hover:text-pink-600 transition"
                >
                  View All →
                </Link>

              </div>

              <div className="space-y-5">

                {/* Opportunity */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f8fff9] hover:bg-green-50 transition-all duration-300">

                  <div>
                    <h3 className="font-bold text-[#111827]">
                      Software Engineering Intern
                    </h3>

                    <p className="text-gray-500">
                      Safaricom • Nairobi
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    Verified
                  </span>

                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f8fff9] hover:bg-green-50 transition-all duration-300">

                  <div>
                    <h3 className="font-bold text-[#111827]">
                      Marketing Intern
                    </h3>

                    <p className="text-gray-500">
                      NCBA • Hybrid
                    </p>
                  </div>

                  <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-semibold">
                    New
                  </span>

                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f8fff9] hover:bg-green-50 transition-all duration-300">

                  <div>
                    <h3 className="font-bold text-[#111827]">
                      Finance Graduate Trainee
                    </h3>

                    <p className="text-gray-500">
                      Equity Bank • Nairobi
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    Verified
                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">

              {/* VIDEO CARD */}
              <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-green-100">

                <div className="aspect-video bg-gray-200">

                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Career Tips"
                    allowFullScreen
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-[#111827] mb-3">
                    Career Tips & Internship Advice
                  </h3>

                  <p className="text-gray-600 leading-7">
                    Learn how to improve your CV, prepare for interviews, and stand out to recruiters.
                  </p>

                </div>

              </div>

              {/* COMPANIES */}
              <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-green-100">

                <p className="text-[#00C853] font-semibold mb-4">
                  Trusted Companies
                </p>

                <div className="flex flex-wrap gap-3">

                  <span className="bg-[#f8fff9] px-4 py-2 rounded-xl font-semibold text-gray-700">
                    Safaricom
                  </span>

                  <span className="bg-[#f8fff9] px-4 py-2 rounded-xl font-semibold text-gray-700">
                    KCB
                  </span>

                  <span className="bg-[#f8fff9] px-4 py-2 rounded-xl font-semibold text-gray-700">
                    Equity
                  </span>

                  <span className="bg-[#f8fff9] px-4 py-2 rounded-xl font-semibold text-gray-700">
                    Microsoft
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FINAL CTA */}
        <section className="py-28 px-6 relative overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#00C853,#00E676)]"></div>

          {/* Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 blur-3xl rounded-full"></div>

          <div className="relative max-w-5xl mx-auto text-center text-white">

            <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-8">
              Start Your Career Journey
            </span>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8">
              Discover Verified Internships & Graduate Opportunities Across Kenya
            </h2>

            <p className="text-white/90 text-xl leading-9 max-w-3xl mx-auto mb-12">
              Join thousands of ambitious students and graduates using JoinNexiva to find internships, industrial attachments, and early-career opportunities from trusted companies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

              <a
                href="/register"
                className="bg-pink-500 hover:bg-pink-600 transition-all duration-300 hover:scale-[1.02] px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl"
              >
                Get Started
              </a>

              <a
                href="/listings"
                className="bg-white text-green-700 hover:bg-green-50 transition-all duration-300 px-10 py-5 rounded-2xl text-lg font-bold"
              >
                Browse Internships
              </a>

            </div>

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

                <Link
                    href="/resources"
                    className="block hover:text-[#00C853] transition-all duration-300"
                  >
                    Career Guides
                  </Link>

                  {session?.user && (
                    <Link
                      href="/admin"
                      className="block hover:text-[#00C853] transition-all duration-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}

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
                  href="https://www.linkedin.com/in/join-nexiva-a147b2412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#00C853] transition"
                >
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/joinnexiva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#00C853] transition"
                >
                  Instagram
                </a>

                <a
                  href="https://www.tiktok.com/@joinnexiva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#00C853] transition"
                >
                  TikTok
                </a>

                <a
                  href="/contact"
                  className="block hover:text-[#00C853] transition"
                >
                  Contact Us
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