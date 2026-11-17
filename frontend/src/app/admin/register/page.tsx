"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import "./Register.css";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 12) {
      setError("Password must contain at least 12 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = await authService.register({
        fullName,
        email,
        password,
      });

      setSuccess(result.message);

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-icon">
          <ShieldCheck size={28} />
        </div>

        <p className="admin-auth-eyebrow">ADMINISTRATION</p>

        <h1>Create Admin Account</h1>

        <form onSubmit={handleRegister}>
          <div className="admin-auth-form-grid">
            <div className="admin-auth-form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="admin-auth-form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="admin-auth-form-group">
              <label>Password</label>
              <div className="admin-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 12 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={12}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="admin-auth-form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && <div className="admin-auth-error">{error}</div>}

          {success && <div className="admin-auth-success">{success}</div>}

          <button
            type="submit"
            className="admin-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="admin-spinner" />
                Creating Account...
              </>
            ) : (
              "Create Administrator"
            )}
          </button>
        </form>

        <p className="admin-auth-footer">
          Already have an account? <Link href="/admin/login">Sign In</Link>
        </p>

        <div className="admin-auth-security">
          <ShieldCheck size={15} />
          Secure administrator registration
        </div>
      </div>
    </main>
  );
}
