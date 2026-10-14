import { Suspense } from "react";
import AdminLoginContent from "./AdminLoginContent";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            backgroundColor: "#080808",
            color: "#888880",
            fontSize: "0.875rem",
          }}
        >
          Loading admin login...
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}