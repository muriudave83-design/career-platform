"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Verified Internships for Students
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Find legitimate internship opportunities with tips to increase your chances of getting selected.
      </p>

      <Link
        href="/listings"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-4"
      >
        Browse Internships
      </Link>

      {session?.user ? (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
      )}
    </main>
  );
}