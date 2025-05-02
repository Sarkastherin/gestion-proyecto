export default function Badge({ variant, className, children }) {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-sm whitespace-nowrap";
  const variants = {
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
    blue: "bg-blue-100 text-blue-700",
    "Nuevo": "bg-blue-100 text-blue-700",
    "Desestimada": "bg-gray-100 text-gray-700",
    "En proceso": "bg-amber-100 text-amber-700",
    "Enviada": "bg-indigo-100 text-indigo-700",
    "Revisión": "bg-orange-100 text-orange-700",
    "Ganada": "bg-green-100 text-green-700",
    "Perdida": "bg-red-100 text-red-700",

  };
  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>;
}
