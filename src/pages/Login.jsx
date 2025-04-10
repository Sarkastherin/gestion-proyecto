import {useAuth} from "../context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {Input} from "../components/Generals/Inputs"
import { useNavigate } from "react-router-dom";
import {Button} from "../components/Buttons"
export default function Login() {
    const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { singIn, auth, session } = useAuth();
  useEffect(() => {
    auth();
    if (!session) navigate("/login");
  }, []);
  useEffect(() => {
    if (session) navigate("/");

  }, [session]);
  
  const onSubmit = async (login) => {
    const {data, error} = await singIn(login);
    if(error) {
        console.log(error);
    }
    ;
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Bienvenido al sistema de gestión de proyectos
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Ingresa en tu cuenta
          </p>

          <div className="flex flex-col gap-2">
            <Input label="Email" type="email" {...register('email')}/>
            <Input label="Contraseña" type="password" {...register('password')}/>
          </div>
            <Button
            className="w-full"
            variant="primary"
            type="submit"
            text="Ingresar"
            onSubmit={handleSubmit}
            />
          
          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
