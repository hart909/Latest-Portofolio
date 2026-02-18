export function Button({ children, variant = "default" }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition";

  const styles =
    variant === "outline"
      ? "border border-gray-400 hover:bg-gray-100"
      : "bg-black text-white hover:bg-gray-800";

  return <button className={`${base} ${styles}`}>{children}</button>;
}
