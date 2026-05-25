"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminPage() {

    const { data: session } =
    useSession();

  const [listings, setListings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editedTitle, setEditedTitle] =
    useState("");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    applyUrl: "",
    difficulty: "",
    tips: "",
    isPremium: false,
    isVerified: false,
    isUrgent: false,
  });

  if (
  session?.user?.email !==
  "brianwanyoike17@gmail.com"
) {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      Access Denied
    </div>
  );
}

  async function fetchData() {
    const listingsRes = await fetch("/api/listings");
    const listingsData = await listingsRes.json();

    setListings(listingsData.listings || []);

    const paymentsRes = await fetch("/api/admin/payments");
    const paymentsData = await paymentsRes.json();

    setPayments(paymentsData.payments || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function createListing(e: any) {
    e.preventDefault();

    await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Listing created");

    setForm({
      title: "",
      company: "",
      location: "",
      description: "",
      applyUrl: "",
      difficulty: "",
      tips: "",
      isPremium: false,
      isVerified: false,
      isUrgent: false,
    });

    fetchData();
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 border-b border-green-200 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              JoinNexiva.com
            </h1>

            <p className="text-green-100 text-sm mt-1">
              Admin Recruiter Console
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/15 border border-white/20 px-4 py-2 rounded-2xl text-white text-sm font-medium backdrop-blur-md">
              Admin Access
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* CREATE LISTING */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Create Listing
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Publish premium internship opportunities
              </p>
            </div>

            <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-2xl text-sm font-medium w-fit">
              Recruiter Tools
            </div>
          </div>

          <form
            onSubmit={createListing}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Job Title
                </label>

                <input
                  placeholder="Frontend Engineering Intern"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Company
                </label>

                <input
                  placeholder="Safaricom"
                  value={form.company}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      company: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Location
                </label>

                <input
                  placeholder="Nairobi, Kenya"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Apply URL
                </label>

                <input
                  placeholder="https://..."
                  value={form.applyUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      applyUrl: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 font-medium">
                Description
              </label>

              <textarea
                placeholder="Describe the opportunity..."
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 min-h-[140px] transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Difficulty
                </label>

                <input
                  placeholder="Beginner / Intermediate / Advanced"
                  value={form.difficulty}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">
                  Tips
                </label>

                <textarea
                  placeholder="Application tips..."
                  value={form.tips}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tips: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 min-h-[140px] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 cursor-pointer hover:border-green-400 transition">
                <input
                  type="checkbox"
                  checked={form.isPremium}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isPremium: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-green-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Premium Listing
                  </p>

                  <p className="text-xs text-gray-500">
                    Paid unlock required
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 cursor-pointer hover:border-green-400 transition">
                <input
                  type="checkbox"
                  checked={form.isVerified}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isVerified: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-green-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Verified
                  </p>

                  <p className="text-xs text-gray-500">
                    Trusted recruiter
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 cursor-pointer hover:border-green-400 transition">
                <input
                  type="checkbox"
                  checked={form.isUrgent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isUrgent: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-green-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Urgent
                  </p>

                  <p className="text-xs text-gray-500">
                    Highlight priority
                  </p>
                </div>
              </label>
            </div>

            <button className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold px-7 py-3 rounded-2xl transition shadow-lg shadow-green-500/20">
              Create Listing
            </button>
          </form>
        </div>

        {/* PAYMENTS */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Payments
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Premium unlock transactions
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium w-fit">
              Revenue Tracking
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {payments.map((payment: any) => (
              <div
                key={payment.id}
                className="bg-white border border-gray-200 hover:border-green-300 rounded-3xl p-6 transition shadow-sm"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {payment.listing?.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Premium Unlock
                    </p>
                  </div>

                  <div className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    {payment.status}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">
                      User
                    </span>

                    <span className="font-medium text-gray-900">
                      {payment.user?.email}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">
                      Amount
                    </span>

                    <span className="font-semibold text-green-700">
                      KSh {payment.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Status
                    </span>

                    <span className="capitalize text-gray-900">
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LISTINGS */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Listings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Manage active opportunities
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium w-fit">
              Live Marketplace
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {listings.map((listing: any) => (
              <div
                key={listing.id}
                className="bg-white border border-gray-200 hover:border-green-300 rounded-3xl p-6 transition shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editingId === listing.id ? (
                      <input
                        value={editedTitle}
                        onChange={(e) =>
                          setEditedTitle(
                            e.target.value
                          )
                        }
                        className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none rounded-2xl px-4 py-3 text-gray-900 text-xl font-bold transition"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold leading-tight text-gray-900">
                        {listing.title}
                      </h3>
                    )}

                    <p className="text-gray-700 mt-3 font-medium">
                      {listing.company}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {listing.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {listing.isPremium ? (
                        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Premium Listing
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          Free Listing
                        </div>
                      )}

                      {listing.isVerified && (
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          Verified
                        </div>
                      )}

                      {listing.isUrgent && (
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          Urgent
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await fetch(
                        `/api/listings/${listing.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type":
                              "application/json",
                          },
                          body: JSON.stringify({
                            isPremium:
                              !listing.isPremium,
                          }),
                        }
                      );

                      fetchData();
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-semibold px-4 py-2 rounded-2xl transition whitespace-nowrap shadow-md"
                  >
                    Toggle Premium
                  </button>
                </div>

                {editingId === listing.id && (
                  <div className="mt-5 flex items-center gap-3">
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-2 rounded-xl text-sm font-medium">
                      Editing Mode
                    </div>

                    <button
                      onClick={async () => {
                        await fetch(
                          `/api/listings/${listing.id}`,
                          {
                            method: "PATCH",
                            headers: {
                              "Content-Type":
                                "application/json",
                            },
                            body: JSON.stringify({
                              title: editedTitle,
                            }),
                          }
                        );

                        setEditingId(null);

                        fetchData();
                      }}
                      className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Save
                    </button>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingId(listing.id);
                      setEditedTitle(
                        listing.title
                      );
                    }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-4 py-2 rounded-xl transition"
                  >
                    Edit Listing
                  </button>

                  <button
                    onClick={async () => {
                      await fetch(
                        `/api/listings/${listing.id}`,
                        {
                          method: "DELETE",
                        }
                      );

                      fetchData();
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-xl transition"
                  >
                    Delete Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}