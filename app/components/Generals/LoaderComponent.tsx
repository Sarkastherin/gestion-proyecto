import { Spinning } from "../Specific/Spinning";
export const LoaderComponent = ({ content }: { content?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-center">
          <Spinning />
          <p className="text-gray-600 text-lg font-medium dark:text-zinc-400">{content || "Cargando..."}</p>
        </div>
      </div>
    </div>
  );
};
