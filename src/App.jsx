import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import SortMain from './sorting/SortMain';

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sorting" element={<SortMain />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
