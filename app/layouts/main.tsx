import { Outlet } from "react-router";
import Header from "~/components/Generals/Header";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContacts } from "~/context/ContactsContext";
import { ModalManager } from "~/components/modals_temp/ModalManager";
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
        <div className="flex justify-center items-center h-screen w-full font-medium text-lg">
          {isLoadedContacts === null ? (
            <p className="text-yellow-600">Conectando... Por favor espere</p>
          ) : (
            <p className="text-red-600 dark:text-red-400">
              Problemas para conectarse a la base de datos de clientes y
              proveedores
            </p>
          )}
        </div>
      )}
    </>
  );
}
