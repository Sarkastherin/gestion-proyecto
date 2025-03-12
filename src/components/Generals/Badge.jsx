export default function Badge({ text, variant }) {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-sm whitespace-nowrap";
  const variants = {
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
  };
  return <span className={`${baseClasses} ${variants[variant]}`}>{text}</span>;
}
