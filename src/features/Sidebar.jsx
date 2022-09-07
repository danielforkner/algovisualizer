import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="vertical-container" id="sidebar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
      >
        Home
      </NavLink>
      <NavLink
        to="sorting"
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
      >
        Sorting
      </NavLink>
      <NavLink
        to="trees"
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
      >
        Trees
      </NavLink>
    </div>
  );
}
