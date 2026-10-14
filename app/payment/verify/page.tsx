import { Suspense } from "react";
import VerifyContent from "./VerifyContent";

export default function PaymentVerifyPage() {
  return (
    <Suspense
      fallback={
        <section
          className="relative pt-32 min-h-screen"
          style={{ backgroundColor: "var(--color-fm2-black)" }}
        >
          <div className="container-fm2 section-padding max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-4 text-center py-20">
              <p
                className="text-sm"
                style={{ color: "var(--color-fm2-muted)" }}
              >
                Loading payment verification...
              </p>
            </div>
          </div>
        </section>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}