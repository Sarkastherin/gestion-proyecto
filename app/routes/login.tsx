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
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 mx-auto"
      >
        <h2 className="text-2xl text-center dark:text-indigo-400 text-indigo-600 font-semibold">
          Iniciar sesión
        </h2>
        <Input
          id="email"
          label="Email"
          type="email"
          register={register("email", { required: "El email es requerido" })}
          error={errors.email?.message}
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          register={register("password", {
            required: "La contraseña es obligatoria",
          })}
          error={errors.password?.message}
        />

        <Button type="submit">Ingresar</Button>
      </form>
    </div>
  );
}
