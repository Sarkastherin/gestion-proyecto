import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="bg-neutral-100 h-screen">
      <Outlet />
    </div>
  )
}
export default Layout;
