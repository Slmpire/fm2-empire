// ============================================================
// FM2 EMPIRE — STATS CARD
// No icon prop — icons caused server→client component errors.
// Uses a simple label instead. Clean, fast, no prop issues.
// ============================================================

type StatsCardProps = {
  label:    string;
  value:    number | string;
  accent?:  boolean;
};

export default function StatsCard({ label, value, accent = false }: StatsCardProps) {
  return (
    <div
      style={{
        display:         "flex",
        flexDirection:   "column",
        gap:             "1rem",
        borderRadius:    "12px",
        padding:         "1.25rem",
        backgroundColor: accent ? "rgba(201,168,76,0.08)" : "#1A1A1A",
        border:          `1px solid ${accent ? "rgba(201,168,76,0.3)" : "#2A2A2A"}`,
      }}
    >
      <span
        style={{
          fontSize:      "0.7rem",
          fontWeight:    600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         accent ? "#C9A84C" : "#888880",
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontSize:   "clamp(1.75rem, 3vw, 2.25rem)",
          fontWeight: 700,
          lineHeight: 1,
          color:      accent ? "#C9A84C" : "#F5F5F0",
          fontFamily: "Georgia, serif",
        }}
      >
        {value}
      </span>
    </div>
  );
}