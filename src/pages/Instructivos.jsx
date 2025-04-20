import React from "react";
import { Button } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
const Instructivos = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative z-10 bg-primary py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[600px] text-center">
                <h2 className="mb-2 font-bold leading-none text-indigo-500 sm:text-[30px] md:text-[60px]">
                  Proximamente
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-green-500">
                  Se esta trabajando en ello
                </h4>
                <p className="mb-8 text-lg text-indigo-500">
                  Cuando este lista te avisaremos
                </p>
                <Button
                  className="min-w-40"
                  variant={"primary"}
                  onClick={() => navigate(`/`)}
                >
                  Ir al inicio
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
};

export default Instructivos;
