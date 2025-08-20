import type React from "react";

export const ContainerWithTitle = ({
  title,
  width,
  children,
}: {
  title: string;
  width?: string | "w-full"
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <main className={`pt-12 pb-18 lg:px-8 sm:px-6 mx-auto `}>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
};
export const ContainerToForms = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full max-w-7xl px-10 mt-8 mx-auto pb-18">{children}</div>;
};
