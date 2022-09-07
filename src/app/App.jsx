import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import SortMain from '../features/sorting/SortMain';
import Sidebar from '../features/Sidebar';
import TreesMain from '../features/trees/TreesMain';
import BinaryTree from '../features/trees/BinaryTree';
import BinarySearchTree from '../features/trees/BinarySearchTree';

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <main id="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="sorting" element={<SortMain />} />
          <Route path="trees" element={<TreesMain />}>
            <Route index element={<BinaryTree />} />
            <Route path="binarytree" element={<BinaryTree />} />
            <Route path="binarysearchtree" element={<BinarySearchTree />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
