import { Outlet } from "react-router";
import ModalBase from "~/components/Generals/Modals";
import { useUI } from "~/context/UIContext";
import Header from "~/components/Generals/Header";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContacts } from "~/context/ContactsContext";
export default function MainLayout() {
  const { isLoadedContacts } = useContacts();
  const { modal, closeModal } = useUI();
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
          {modal && (
            <ModalBase
              title={modal.title}
              message={modal.message}
              code={modal.code}
              onClose={closeModal}
              variant={modal.variant}
            />
          )}
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
