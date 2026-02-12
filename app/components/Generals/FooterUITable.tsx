import { ButtonNavigate } from "~/components/Specific/Buttons";
import { variants } from "../Forms/Buttons";

export default function FooterUITables({
  justify,
  buttonNavigate,
  children,
}: {
  justify: "justify-between" | "justify-end";
  buttonNavigate?: { title: string; route: string; color: keyof typeof variants; };
  
  children?: React.ReactNode;
}) {
  return (
    <span className="fixed bottom-0 w-full">
      <div
        className={`flex ${justify} w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900`}
      >
        {children}
        <div className="w-fit">
          {buttonNavigate && (
            <ButtonNavigate variant={buttonNavigate.color} route={buttonNavigate.route}>
              {buttonNavigate.title}
            </ButtonNavigate>
          )}
        </div>
      </div>
    </span>
  );
}
