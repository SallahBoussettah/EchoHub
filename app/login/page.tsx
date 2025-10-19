"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    console.log("Login:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-black mb-3 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back
            </h1>
            <p className="text-[var(--color-muted-ink)]">
              Sign in to your EchoHub account
            </p>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:border-[var(--color-accent)] transition-all mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-line)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-surface)] text-[var(--color-muted-ink)]">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[var(--color-ink)] mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-ink)]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[var(--color-ink)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-ink)]" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--color-line)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                <span className="text-[var(--color-muted-ink)]">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[var(--color-accent)] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              <span>Sign in</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[var(--color-muted-ink)] mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[var(--color-accent)] hover:underline font-semibold"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
