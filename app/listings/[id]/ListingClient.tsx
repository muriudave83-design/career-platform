"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function ListingClient({
  listing,
}: {
  listing: any;
}) {
  const id = listing.id;

  const router = useRouter();
  const { data: session } = useSession();

  // 🔥 Dynamic social proof
  const [views, setViews] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [spots, setSpots] = useState(0);

  // ⏳ Countdown timer
  const [timeLeft, setTimeLeft] = useState(600);

  // 💰 M-PESA FLOW STATE
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState<boolean | null>(null);
  const [premiumData, setPremiumData] = useState<any>(null);

  useEffect(() => {
    setViews(Math.floor(Math.random() * 150) + 50);
    setUnlocked(Math.floor(Math.random() * 30) + 10);
    setSpots(Math.floor(Math.random() * 5) + 3);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function checkAccess() {
      if (!session?.user) {
        setPaid(false);
        return;
      }

      try {
        const res = await fetch(`/api/listings/${id}/access`);

        if (!res.ok) {
          setPaid(false);
          return;
        }

        const data = await res.json();

        setPaid(data.hasAccess);
      } catch (err) {
        console.error(err);
        setPaid(false);
      }
    }

    checkAccess();
  }, [session, id]);

  useEffect(() => {
    async function fetchPremiumData() {
      if (!paid || !id) return;

      try {
        const res = await fetch(`/api/listings/${id}/premium`);

        if (!res.ok) return;

        const data = await res.json();

        setPremiumData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPremiumData();
  }, [paid, id]);

  if (!listing) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // 💳 REALISTIC M-PESA FLOW (READY FOR API INTEGRATION)
  const handleMpesaPayment = async () => {
    if (!phone || phone.length < 10) {
      alert("Enter a valid M-Pesa number");
      return;
    }

    try {
      setLoading(true);

      // 🚀 REAL STK REQUEST
        const stkRes = await fetch("/api/mpesa/stk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            listingId: id,
            phone,
            amount: 150,
        }),
        });

        const stkData = await stkRes.json();

        console.log("✅ STK DATA:", stkData);

        // Dev fallback still returns success
        if (stkData.success) {

        // Save payment
        await fetch("/api/payments", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            listingId: id,
            phone,
            amount: 150,
            }),
        });

        setLoading(false);
        setShowPayment(false);

        // Refresh entitlement
        const accessRes = await fetch(
            `/api/listings/${id}/access`
        );

        if (accessRes.ok) {
            const accessData = await accessRes.json();
            setPaid(accessData.hasAccess);
        }

        // Social proof update
        setUnlocked((prev) => prev + 1);

        } else {
        setLoading(false);
        alert("STK push failed");
        }

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-6xl mx-auto flex justify-end mb-4">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* 🔥 HEADER CARD */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">

            <h1 className="text-3xl font-bold mb-2">
              {listing.title}
            </h1>

            <p className="text-gray-600">
              {listing.company} • {listing.location}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">

              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                ✅ Verified
              </span>

              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                🔥 Urgent
              </span>

              {listing.isPremium && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  🔒 Premium
                </span>
              )}

            </div>

            {listing.isPremium && (
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>🔥 {unlocked} students unlocked this today</p>
                <p>👀 {views} people viewed this</p>

                <p className="text-red-500 animate-pulse">
                  ⏳ Only {spots} spots left
                </p>
              </div>
            )}

          </div>

          {/* 📄 DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">

            <h2 className="text-xl font-semibold mb-3">
              About this opportunity
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {listing.description}
            </p>

          </div>

          {/* 🎁 WHAT YOU'LL GET */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">

            <h2 className="text-xl font-semibold mb-4">
              What you’ll get
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Direct application link (no searching)</li>
              <li>✅ Recruiter tips & hidden requirements</li>
              <li>✅ Insider advice to stand out</li>
              <li>✅ Curated, verified opportunity</li>
            </ul>

          </div>
                    {/* 👤 WHO THIS IS FOR */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">

            <h2 className="text-xl font-semibold mb-4">
              Who this is for
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>🎓 Students looking for internships</li>
              <li>💻 Self-taught developers</li>
              <li>🚀 Junior engineers breaking into tech</li>
            </ul>

          </div>

          {/* 💡 WHY THIS IS PREMIUM */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">

            <h2 className="text-xl font-semibold mb-4">
              Why this is premium
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>🔍 Manually curated (not scraped)</li>
              <li>🛡 Verified & legit opportunities</li>
              <li>📉 Limited distribution to reduce competition</li>
            </ul>

          </div>

          {/* 🔒 LOCKED CONTENT */}
          {listing.isPremium && !paid && (
            <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 overflow-hidden">

              <h2 className="text-xl font-semibold mb-3">
                Application Tips
              </h2>

              <div className="blur-sm text-gray-700 space-y-2 select-none">
                <p>• Tailor your CV to highlight backend projects</p>
                <p>• Mention cloud platforms like Azure or AWS</p>
                <p>• Focus on API design and scalability experience</p>
                <p>• Showcase real-world problem solving</p>
              </div>

              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center text-center p-4">

                <p className="font-semibold mb-2">
                  🔒 Unlock to view full application tips
                </p>

                <button
                  onClick={() => setShowPayment(true)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Unlock Now
                </button>

              </div>

            </div>
          )}

          {/* ✅ UNLOCKED CONTENT */}
          {listing.isPremium && paid && premiumData && (
            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-semibold mb-3">
                Premium Access Unlocked
              </h2>

              <div className="space-y-4 text-gray-700">

                <div>
                  <h3 className="font-semibold">
                    Recruiter Contact
                  </h3>

                  <p>{premiumData.recruiterEmail}</p>
                  <p>{premiumData.recruiterPhone}</p>
                </div>

                <div>

                  <h3 className="font-semibold mb-2">
                    Application Tips
                  </h3>

                  <ul className="space-y-2">
                    {premiumData.tips.map(
                      (tip: string, index: number) => (
                        <li key={index}>• {tip}</li>
                      )
                    )}
                  </ul>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-6">

          {/* 💰 ACTION CARD */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 sticky top-6">

            {/* PRICE */}
            {listing.isPremium ? (
              <div className="mb-4">

                <p className="text-2xl font-bold text-green-600">
                  KSh 150
                </p>

                <p className="text-sm text-gray-500">
                  One-time unlock
                </p>

              </div>
            ) : (
              <p className="text-green-600 font-semibold mb-4">
                Free Opportunity
              </p>
            )}

            {/* APPLY / LOCK BUTTON */}
            {!listing.isPremium && (
              <a
                  href="https://google.com"
                target="_blank"
                className="block w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Apply Now
              </a>
            )}

            {listing.isPremium && !paid && (
              <button
                onClick={() => setShowPayment(true)}
                 disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
              {loading
              ? "Processing Payment..."
              : "🔒 Unlock for KSh 150"}
              </button>
            )}

            {listing.isPremium && paid && (
              <a
                href={listing.applyUrl}
                target="_blank"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                🚀 Apply Now
              </a>
            )}

            {/* TRUST SIGNALS */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>✅ Secure M-Pesa payment</p>
              <p>⚡ Instant unlock after payment</p>
              <p>🔁 No subscription</p>
            </div>

          </div>

          {/* 📊 SOCIAL PROOF */}
          {listing.isPremium && (
            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h3 className="font-semibold mb-3">
                Live activity
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p>🔥 {unlocked} people unlocked today</p>
                <p>👀 {views} total views</p>
                <p>⚡ High demand opportunity</p>
              </div>

            </div>
          )}

          {/* 🧠 URGENCY CARD */}
          {listing.isPremium && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

              <h3 className="font-semibold text-red-600 mb-2">
                ⚠️ Limited Access
              </h3>

              <p className="text-sm text-gray-700">
                To reduce competition, only a few candidates can access this listing.
              </p>

              <p className="mt-2 text-sm font-semibold text-red-500 animate-pulse">
                {spots} spots remaining
              </p>

            </div>
          )}

          {/* 💬 TESTIMONIAL */}
          <div className="bg-white rounded-2xl shadow-sm p-6">

            <p className="text-sm text-gray-700 italic">
              “I paid KSh 150 and got shortlisted in 3 days. Worth it.”
            </p>

            <p className="text-xs text-gray-500 mt-2">
              — Recent applicant
            </p>

          </div>

        </div>

        {/* ================= M-PESA MODAL ================= */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-fadeIn">
                              {/* ❌ CLOSE */}
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* 🧾 HEADER */}
              <h2 className="text-xl font-semibold mb-2">
                Unlock this opportunity
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Pay securely via M-Pesa to access full details.
              </p>

              {/* 💰 PRICE */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center">

                <p className="text-2xl font-bold text-green-600">
                  KSh 150
                </p>

                <p className="text-xs text-gray-500">
                  One-time payment • Instant access
                </p>

              </div>

              {/* 📱 PHONE INPUT */}
              <input
                type="text"
                placeholder="Enter M-Pesa number (07XXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* 💳 PAY BUTTON */}
              <button
                onClick={handleMpesaPayment}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Pay & Unlock"}
              </button>

              {/* 🔒 TRUST TEXT */}
              <p className="text-xs text-gray-500 mt-3 text-center">
                🔒 Secure payment. You will receive an M-Pesa prompt on your phone.
              </p>

            </div>

          </div>
        )}

      </div> {/* END GRID */}

      {/* ================= MOBILE STICKY CTA ================= */}
      {listing.isPremium && !paid && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden z-50">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs line-through text-gray-400">
                KSh 500
              </p>

              <p className="font-bold text-lg">
                KSh 150
              </p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold animate-pulse"
            >
              Unlock Now
            </button>

          </div>

        </div>
      )}

    </div>
  );
}