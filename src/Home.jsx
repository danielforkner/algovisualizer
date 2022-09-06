import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <p>Let's visualize algorithms!</p>
      <Link to="/sorting">Sorting algorithms</Link>
    </div>
  );
};
export default Home;
