import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
}
export default Layout;
