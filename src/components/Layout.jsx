import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <Outlet />
    </div>
  )
}
export default Layout;
