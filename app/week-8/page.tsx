"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <section className="w-full rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Shopping List App</h1>

          {!user ? (
            <div className="space-y-4">
              <p className="text-slate-700">Sign in with GitHub to continue to your shopping list.</p>
              <button
                type="button"
                onClick={handleSignIn}
                className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
              >
                Sign in with GitHub
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-700">
                Welcome, {user.displayName ?? "User"} ({user.email})
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/week-8/shopping-list"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  Go to Shopping List
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-900 transition hover:bg-slate-300"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
