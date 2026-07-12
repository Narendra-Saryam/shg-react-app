import { IndianRupee } from "lucide-react";

export function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-sm">
      <p className="text-xs text-amber-100">{label}</p>
      <p className="mt-1 flex items-center gap-0.5 text-lg font-bold">
        <IndianRupee size={18} />
        {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
