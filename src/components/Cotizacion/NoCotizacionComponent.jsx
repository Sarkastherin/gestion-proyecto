export default function NoCotizacionComponent({children}) {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-700 gap-4 my-6">
      <p className="text-xl font bold">No hay Cotizaciones.</p>
      {children}
    </div>
  );
}
