import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
const ModalGeneral = () => {
  return (
    <Modal
      modalId={"general-modal"}
      title={"Error"}
      disableXButton={true}
      variant={"danger"}
    >
      <div className="flex flex-col gap-2">
        <p>
          Ha ocurrido un error inesperado, por favor intente nuevamente más tarde.
        </p>
      </div>
    </Modal>
  );
};
function Layout() {
  const { auth, session } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    auth();
    if (!session) navigate("/login");
  }, []);
  return (
    <div className="bg-neutral-100 min-h-screen">
      <Outlet />
      <ModalGeneral/>
    </div>
  );
}
export default Layout;
