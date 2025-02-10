export function BoxComponent({ title, children }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-30" title={title}>
      {children}
    </div>
  );
}
