"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const handleLogin = async () => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

if (result?.ok) {
  const sessionRes = await fetch("/api/auth/session");
  const session = await sessionRes.json();

  if (session?.user?.role === "ADMIN") {
    router.push("/admin");
  } else {
    router.push("/listings");
  }
}
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 block mb-2 w-full"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-2 w-full"
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}