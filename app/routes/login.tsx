import type { Route } from "./+types/home";
import { Input } from "~/components/Forms/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "~/components/Forms/Buttons";
import { useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { useUI } from "~/context/UIContext";
import { useEffect } from "react";
import { useUIModals } from "~/context/ModalsContext";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inicio de sesión" },
    { name: "description", content: "Inicio de sesión" },
  ];
}
type FormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const { openModal } = useUIModals();
  const navigate = useNavigate();
  const { signIn, auth, session } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = async (login: FormValues) => {
    const { data, error } = await signIn(login);
    if (error) {
      openModal("ERROR", {
        message: error.message || "Hubo un problema al intentar ingresar.",
      });
    }
    navigate("/");
  };
  useEffect(() => {
    auth()
  }, []);
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/20" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/20" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-14">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-center gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900/60 dark:text-emerald-200">
              Gestion de proyectos
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white md:text-5xl">
              Accede a tu tablero con claridad y control.
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Revisa avances, centraliza materiales y mantén a tu equipo alineado en un solo lugar.
            </p>
            <div className="sr-only flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/60">
                Reportes en tiempo real
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/60">
                Seguimiento de costos
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm dark:bg-slate-900/60">
                Accesos seguros
              </span>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Iniciar sesion
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  Usa tu correo y clave para continuar.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  register={register("email", { required: "El email es requerido" })}
                  error={errors.email?.message}
                />

                <Input
                  id="password"
                  label="Contrasena"
                  type="password"
                  register={register("password", {
                    required: "La contrasena es obligatoria",
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className="sr-only mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                <span className="rounded-full bg-emerald-100/70 px-2 py-1 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                  Entorno seguro
                </span>
                <span>Soporte interno 24/7</span>
              </div>

              <Button type="submit" className="mt-6 w-full">
                Ingresar
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
