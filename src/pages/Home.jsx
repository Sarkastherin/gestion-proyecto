import { NavLink } from "react-router-dom"
function Home() {
  return (
    <nav className="flex flex-col items-center justify-center h-screen">
      <NavLink to='/oportunidades'>Oportunidades</NavLink>
      <NavLink to='/materiales'>Materiales</NavLink>
    </nav>
  )
}
export default Home