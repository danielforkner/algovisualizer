import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="vertical-container">
      <h1>HOME</h1>
      <p>Let's visualize algorithms!</p>
      <Link to="sorting">Sorting algorithms</Link>
      <Link to="trees">Traversing trees</Link>
    </div>
  );
};
export default Home;
