import Drawer from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="container" id="sidebar">
      <div id="homeLink">
        <NavLink to="/">ALGOVISUALIZED</NavLink>
      </div>
      <div id="navLinks">
        <NavLink
          to="sorting"
          className={({ isActive }) =>
            isActive ? 'activeLink' : 'inactiveLink'
          }
        >
          Sorting
        </NavLink>
        <NavLink
          to="arrays"
          className={({ isActive }) =>
            isActive ? 'activeLink' : 'inactiveLink'
          }
        >
          Arrays
        </NavLink>
        <NavLink
          to="trees"
          className={({ isActive }) =>
            isActive ? 'activeLink' : 'inactiveLink'
          }
        >
          Trees
        </NavLink>
      </div>
    </div>
  );
}
