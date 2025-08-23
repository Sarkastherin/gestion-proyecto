import { ButtonNavigate } from "~/components/Specific/Buttons";

export default function FooterUITables({
  justify,
  buttonNavigate: { title, route },
  children,
}: {
  justify: "justify-between" | "justify-end";
  buttonNavigate: { title: string; route: string };
  children?: React.ReactNode;
}) {
  return (
    <span className="fixed bottom-0 w-full">
      <div
        className={`flex ${justify} w-full px-10 py-5 hover:bg-zinc-200 hover:dark:bg-zinc-900`}
      >
        {children}
        <div className="w-42">
          <ButtonNavigate variant="yellow" route={route}>
            {title}
          </ButtonNavigate>
        </div>
      </div>
    </span>
  );
}
