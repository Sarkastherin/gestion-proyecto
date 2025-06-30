import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bienvenido" },
    { name: "description", content: "Bienvenido" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="mt-20 grid place-content-center">
        <p className="font-bold text-xl">Dashboard</p>
      </div>
    </>
  );
}
