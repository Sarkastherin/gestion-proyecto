export function BoxComponent({ title, children,  size = 'md' }) {
  return (
    <div className={`max-w-${size === 'md' ? '[1200px]': 'full'} mx-auto px-6 py-30`} title={title}>
      {children}
    </div>
  );
}
export function BoxComponentScrolling({ title, children,  size = 'md' }) {
  return (
    <div className={`max-w-${size === 'md' ? '[1200px]': 'full'} mx-auto overflow-y-auto pt-4`} title={title} style={{ height: "calc(100vh - 15rem)" }}>
      {children}
    </div>
  )}