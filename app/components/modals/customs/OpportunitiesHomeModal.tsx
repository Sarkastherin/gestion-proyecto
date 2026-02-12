import ModalBase from "../ModalBase";
import type { PipelineStage } from "~/routes/home";
import { useNavigate } from "react-router";

export default function OpportunitiesHomeModal({
  open,
  onClose,
  stage,
}: {
  open: boolean;
  onClose: () => void;
  stage: PipelineStage;
}) {
  const navigate = useNavigate();
  return (
    <ModalBase
      title={`Oportunidades ${stage.title}`}
      open={open}
      zIndex={50}
      onClose={onClose}
      width="max-w-lg"
    >
      <div
        className="px-2 pt-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 270px)" }}
      >
        <ul>
          {stage.items.map((item) => (
            <li
              key={item.id}
              title="Ir a la oportunidad"
              className="cursor-pointer p-3 mb-2 text-sm rounded-lg border border-zinc-200/70 bg-white/85 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-zinc-600"
              onClick={() => navigate(`opportunities/${item.id}/resumen`)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </ModalBase>
  );
}
