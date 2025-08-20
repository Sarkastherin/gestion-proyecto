import { Outlet } from "react-router";
import ModalBase from "~/components/Generals/Modals";
import { useUI } from "~/context/UIContext";
import Header from "~/components/Generals/Header";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContacts } from "~/context/ContactsContext";
import ModalProgressive from "~/components/Specific/ModalProgressive";
import ModalAlert from "~/components/Specific/ModalAlert";
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
          <ModalProgressive />
          <ModalAlert />
          {/* Modal para mensajes genéricos */}
          {modal && (
            <ModalBase
              title={modal.title}
              message={modal.message}
              code={modal.code}
              onClose={closeModal}
              variant={modal.variant}
              handleAccept={modal.handleAccept}
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
