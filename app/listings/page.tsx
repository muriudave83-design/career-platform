"use client";

import { useEffect, useState } from "react";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);

  const [search, setSearch] =
    useState("");

  const [premiumOnly, setPremiumOnly] =
    useState(false);

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data.listings));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white px-6 py-16 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-sm font-semibold text-green-100 mb-3">
            Career Platform
          </p>

          <h1 className="text-5xl font-black leading-tight mb-4">
            Discover Top Internships
          </h1>

          <p className="text-lg text-green-50 max-w-2xl">
            Explore verified internships,
            premium opportunities, and
            career-launching roles from
            top companies across Kenya.
          </p>

          {/* SEARCH */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white text-black p-5 rounded-2xl shadow-lg border-0 outline-none text-lg"
            />
          </div>

          {/* PREMIUM FILTER */}
          <div className="mb-6 flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={premiumOnly}
              onChange={(e) =>
                setPremiumOnly(e.target.checked)
              }
            />

            <label>
              Show Premium Listings Only
            </label>
          </div>
        </div>
      </div>

      {/* LISTINGS */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Available Internships
            </h2>

            <p className="text-gray-500 mt-1">
              {listings.length} opportunities
              available
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {listings
            .filter((listing: any) => {
              const term =
                search.toLowerCase();

              const matchesSearch =
                listing.title
                  ?.toLowerCase()
                  .includes(term) ||
                listing.company
                  ?.toLowerCase()
                  .includes(term) ||
                listing.location
                  ?.toLowerCase()
                  .includes(term);

              const matchesPremium =
                !premiumOnly ||
                listing.isPremium;

              return (
                matchesSearch &&
                matchesPremium
              );
            })
            .map((listing: any) => (
              <a
                href={`/listings/${listing.id}`}
                key={listing.id}
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {listing.isPremium && (
                          <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                            PREMIUM
                          </span>
                        )}

                        {listing.isVerified && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            VERIFIED
                          </span>
                        )}

                        {listing.isUrgent && (
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {listing.title}
                      </h2>

                      <p className="text-lg font-medium text-green-700">
                        {listing.company}
                      </p>

                      <p className="text-gray-500 mt-1">
                        📍 {listing.location}
                      </p>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-700 text-2xl font-black">
                      {listing.company?.charAt(0)}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-3 flex-wrap">
                      {listing.difficulty && (
                        <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                          {listing.difficulty}
                        </span>
                      )}
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition">
                      View Details
                    </button>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
