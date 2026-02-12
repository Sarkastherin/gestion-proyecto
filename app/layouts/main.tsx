import { Outlet } from "react-router";
import Header from "~/components/Generals/Header";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContacts } from "~/context/ContactsContext";
import { ModalManager } from "~/components/modals/ModalManager";
import { LoaderComponent } from "~/components/Generals/LoaderComponent";
export default function MainLayout() {
  const { isLoadedContacts, setIsLoadedContacts } = useContacts();
  const { auth, session } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    auth();
    if (!session) navigate("/login");
  }, []);
  return (
    <>
      {isLoadedContacts ? (
        <>
          <Header />
          <Outlet />
          <ModalManager />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          {isLoadedContacts === null ? (
            <LoaderComponent content="Conectando... Por favor espere" />
          ) : (
            <p className="text-lg text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-4 rounded mb-4 text-center">
              Problemas para conectarse a la base de datos de clientes y
              proveedores
            </p>
          )}
        </div>
      )}
    </>
  );
}
