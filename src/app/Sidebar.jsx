import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Sidebar() {
  return (
    <div className="container" id="sidebar">
      <div id="homeLink">
        <NavLink to="/">ALGOVISUALIZED</NavLink>
        <a
          href="https://github.com/danielforkner/algovisualizer"
          target="_blank"
          rel="noreferrer"
          id="githubLink"
        >
          <GitHubIcon fontSize="large" sx={{ color: 'black' }} />
        </a>
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
        <NavLink
          to="recursion"
          className={({ isActive }) =>
            isActive ? 'activeLink' : 'inactiveLink'
          }
        >
          Recursion
        </NavLink>
      </div>
    </div>
  );
}
