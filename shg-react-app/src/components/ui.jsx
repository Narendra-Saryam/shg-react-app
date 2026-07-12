export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-amber-100 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-2 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400 ${props.className || ""}`}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-2 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400 ${props.className || ""}`}
    />
  );
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-amber-600 text-white hover:bg-amber-700",
    ghost: "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200",
    danger: "text-rose-500 hover:bg-rose-50",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
