const CellHead = ({ element, w, flex = "flex-none" }) => {
  return <th className={`px-1 ${w} ${flex}`}>{element}</th>;
};
export default function Table({ cells, children }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="flex items-center px-6 py-2 text-sm text-neutral-700 border-b border-neutral-300 text-left">
          {cells.map((cell) => (
            <CellHead key={cell.element} w={cell.w} flex={cell.flex} element={cell.element}/>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
