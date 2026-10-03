import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          end
        >
          Úvod
        </NavLink>
        <NavLink 
          to="/nabidka-pomoci" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Nabídka pomoci
        </NavLink>
        <NavLink 
          to="/poptavka-pomoci" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Poptávka pomoci
        </NavLink>
        <NavLink 
          to="/nabidka-spoluprace" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Nabídka spolupráce
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Profil  
        </NavLink>
      </nav>
    </aside>
  );
}
