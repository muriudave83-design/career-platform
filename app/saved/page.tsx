"use client";

import { useEffect, useState } from "react";

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const userId = "cmolcc7jy0000ystoavfjxo7f";

  useEffect(() => {
    async function fetchBookmarks() {
      const res = await fetch(`/api/bookmarks/${userId}`);
      const data = await res.json();
      setBookmarks(data.bookmarks);
    }

    fetchBookmarks();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Saved Internships
      </h1>

      {bookmarks.length === 0 && (
        <p className="text-gray-500">
          No saved internships yet.
        </p>
      )}

      {bookmarks.map((b) => (
        <a key={b.id} href={`/listings/${b.listing.id}`}>
          <div className="border p-4 mb-3 rounded hover:bg-gray-50 cursor-pointer">
            <h2 className="font-semibold">{b.listing.title}</h2>
            <p>{b.listing.company}</p>
            <p className="text-sm text-gray-500">
              {b.listing.location}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
