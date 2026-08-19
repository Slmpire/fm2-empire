// ============================================================
// FM2 EMPIRE — ADMIN LOGIN PAGE
// Supabase email + password auth.
// Only users who exist in Supabase Auth AND have a record
// in the admin_users table can log in.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("redirectTo") ?? "/admin/dashboard";

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#111111",
    border: "1px solid #2A2A2A",
    borderRadius: "8px",
    color: "#F5F5F0",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#080808", fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: "16px",
              padding: "2.5rem",
            }}
          >
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                  color: "#F5F5F0",
                }}
              >
                FM2 <span style={{ color: "#C9A84C" }}>Empire</span>
              </p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.813rem", color: "#888880" }}>
                Admin Panel — Team Access Only
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(192,57,43,0.1)",
                  border: "1px solid rgba(192,57,43,0.3)",
                  borderRadius: "8px",
                  marginBottom: "1.25rem",
                  fontSize: "0.813rem",
                  color: "#C0392B",
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#F5F5F0" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#F5F5F0" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{ ...inputStyle, paddingRight: "3rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    style={{
                      position: "absolute",
                      right: "0.875rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#888880",
                      padding: 0,
                      display: "flex",
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: "0.875rem",
                  backgroundColor: isLoading ? "#888880" : "#C9A84C",
                  color: "#080808",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

          </div>
        </div>
      </body>
    </html>
  );
}