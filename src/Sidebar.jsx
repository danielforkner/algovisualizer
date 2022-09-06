import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="vertical-container" id="sidebar">
      <Link to="/">Home</Link>
      <Link to="/sorting">Sorting</Link>
    </div>
  );
}
