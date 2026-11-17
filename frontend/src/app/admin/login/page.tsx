"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";
import { Loader2, ShieldCheck, Eye, EyeOff, LockKeyhole } from "lucide-react";
import "./Login.css";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await authService.login({
        email: email.trim(),
        password,
      });

      sessionStorage.setItem("adminToken", result.token);
      sessionStorage.setItem("adminUser", JSON.stringify(result.admin));

      const redirect = searchParams.get("redirect");

      // Only allow redirects to internal admin pages.
      const destination =
        redirect && redirect.startsWith("/admin/") && !redirect.startsWith("//")
          ? redirect
          : "/admin/dashboard";

      router.replace(destination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-icon">
          <ShieldCheck size={28} />
        </div>

        <div className="admin-auth-heading">
          <span className="admin-auth-eyebrow">ADMINISTRATION</span>
          <h1>Welcome Back</h1>
          <p>Sign in to access your administration dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-auth-form-grid admin-login-form-grid">
            <div className="admin-auth-form-group admin-login-full-width">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-auth-form-group admin-login-full-width">
              <label htmlFor="password">Password</label>

              <div className="admin-password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="admin-auth-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="admin-auth-spinner" />
                Signing In...
              </>
            ) : (
              <>
                <LockKeyhole size={17} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="admin-auth-footer">
          <span>Don't have an administrator account?</span>
          <Link href="/admin/register">Create Account</Link>
        </div>

        <div className="admin-auth-security">
          <ShieldCheck size={15} />
          <span>Secure Administrator Access</span>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="admin-auth-page">
          <div className="admin-auth-card">
            <Loader2 size={24} className="admin-auth-spinner" />
            <p>Loading sign-in page...</p>
          </div>
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
