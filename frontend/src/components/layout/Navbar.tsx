import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Doktorská Škola</div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          end
        >
          Úvod
        </NavLink>
        <NavLink 
          to="/nabidka-pomoci" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Nabídka pomoci
        </NavLink>
        <NavLink 
          to="/poptavka-pomoci" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Poptávka pomoci
        </NavLink>
        <NavLink 
          to="/nabidka-spoluprace" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Nabídka spolupráce
        </NavLink>
      </div>
    </nav>
  );
}
