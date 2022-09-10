import Drawer from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="vertical-container" id="sidebar">
      {/* <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="right"
    > */}
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
      {/* </Drawer> */}
    </div>
  );
}
