import { Outlet } from 'react-router-dom';
import './styles/styles.css';

export default function TreesMain() {
  return (
    <div className="main-content">
      <h1>Tree Traversal</h1>
      <div className="links">
        {/* <NavLink
          to="binarytree"
          className={({ isActive }) =>
            isActive ? 'activeTreeLink' : 'inactiveTreeLink'
          }
        >
          Binary Trees
        </NavLink> */}
        {/* <NavLink
          to="binarysearchtree"
          className={({ isActive }) =>
            isActive ? 'activeTreeLink' : 'inactiveTreeLink'
          }
        >
          Binary Search Tree
        </NavLink> */}
      </div>
      {/* <div>Number of nodes: {`[25]`}</div>
      <div>Method of traversal: {`[Depth-first]`}</div> */}

      <Outlet />
    </div>
  );
}
